# Architecture Plan

## Architecture goal

Build the smallest system that can validate attention scheduling, while keeping integrations replaceable. The core domain must not depend on any one AI provider, task manager, browser, or notification channel.

## Proposed boundaries

```text
Agent Sources                 Human Task Sources
(manual/API/extension)        (internal/manual/integrations)
        │                              │
        └──────────┬───────────────────┘
                   ↓
              Event Ingestion
                   ↓
            Normalized State Store
                   ↓
         Attention Scheduling Engine
             ↙             ↘
 Human Task Recommendation   Checkpoint Queue
             ↘             ↙
             Notification Layer
                   ↓
                User UI
                   ↓
             Outcome Events
                   ↓
          Estimation / Learning
```

## Core domain objects

### AgentRun

Represents one delegated AI task.

Suggested fields:

```text
id
source
external_run_id?
title
status: queued | running | needs_human | completed | failed | cancelled
started_at
expected_finish_at?
duration_estimate_seconds?
duration_confidence?
urgency?
risk_level?
last_event_at
```

### HumanTask

```text
id
title
status
estimated_seconds
estimate_confidence?
priority
interruptibility: high | medium | low
cognitive_load?
context_key?
deadline?
source
```

### Recommendation

Records what the scheduler suggested and why.

```text
id
agent_run_id
human_task_id
usable_gap_seconds
score
reason_codes[]
offered_at
accepted_at?
completed_at?
skipped_at?
late_return?
```

### Checkpoint

Post-MVP object representing required human judgment.

```text
id
agent_run_id
type
question_or_action
priority
risk_level
blocking
estimated_human_seconds
context_summary
created_at
expires_at?
resolved_at?
resolution?
```

### AttentionSession

Groups an agent wait interval and the human work performed during it, enabling later measurement without requiring storage of raw agent conversations.

## Event model

Prefer appendable domain events at integration boundaries:

```text
agent.run.started
agent.run.progress
agent.run.needs_human
agent.run.completed
agent.run.failed
human.task.created
human.task.started
human.task.completed
recommendation.offered
recommendation.accepted
recommendation.skipped
attention.returned_to_agent
checkpoint.created
checkpoint.resolved
```

This allows adapters to change without rewriting product logic and makes analytics/auditing straightforward.

## Scheduling engine

### MVP

Use deterministic heuristics. Machine learning is unnecessary before enough behavior exists to learn from.

Inputs:

- estimated remaining agent time;
- uncertainty buffer;
- human task estimated duration;
- interruption risk;
- task priority;
- context similarity;
- user-defined minimum gap.

Output:

- recommended task or `NO_RECOMMENDATION`;
- score;
- explanation/reason codes;
- safe-return deadline.

A correct `NO_RECOMMENDATION` is a feature. Some gaps should remain breaks or uninterrupted focus.

### Later learning

Only after sufficient data, personalize:

- actual vs predicted human-task duration;
- actual vs predicted agent duration;
- acceptance probability;
- context switching cost;
- preferred break behavior;
- acceptable notification timing.

Keep model output bounded by explicit safety and timing constraints.

## Integration strategy

Integration complexity is the largest likely engineering trap. Progress in stages:

### Stage A — manual

The user starts an agent timer/run manually. This validates the scheduling behavior independently from provider APIs.

### Stage B — one observable source

Choose one source based on validated user demand. Candidate mechanisms:

- browser extension observing supported UI state;
- provider API/webhook;
- local/desktop event bridge;
- developer CLI/SDK hook.

### Stage C — adapter interface

Normalize all providers into the same `AgentRun` and `Checkpoint` events.

### Stage D — human task connectors

Only add calendar/to-do/project integrations after the internal lightweight task list proves the matching loop is useful.

## Initial stack recommendation

Do not lock this until development begins, but a pragmatic web MVP can use:

- TypeScript;
- Next.js or another mature full-stack React framework;
- serverless/edge deployment where appropriate;
- PostgreSQL-compatible persistence;
- a simple background/event mechanism rather than a heavy queue at first;
- product analytics with event names matching the domain events above.

Choose technology for iteration speed and observability, not architecture novelty.

## Privacy and security principles

The product may eventually sit between sensitive agent work and human decisions, so privacy should be structural from the beginning.

1. **Minimize content ingestion.** Store status/timing metadata where possible instead of full prompts or outputs.
2. **Explicit scopes.** Each integration must request only permissions needed for its current feature.
3. **No autonomous approval.** A human checkpoint requiring authorization must remain human-controlled unless a later, explicit policy system is designed and validated.
4. **Auditability.** Record what source generated a checkpoint and what user action resolved it.
5. **Data separation.** Keep integration credentials, normalized metadata, and optional content separated.
6. **Deletion/export.** Design records so user data can be exported and deleted without reconstructing hidden dependencies.
7. **Fail safe.** If completion timing is uncertain, prefer not to start a human task that risks delaying critical review.

## Reliability requirements for later integrations

- idempotent event ingestion;
- duplicate-event handling;
- stale run detection;
- source disconnect/reconnect behavior;
- clock/time-zone normalization;
- notification delivery state;
- graceful fallback when an integration cannot report progress;
- clear distinction between `completed`, `needs_human`, and `unknown`.

## Architectural non-goals

Do not initially build:

- a generalized workflow engine;
- distributed multi-agent execution infrastructure;
- a new foundation model;
- a universal MCP/agent protocol;
- an autonomous enterprise authorization layer;
- complex predictive ML before the heuristic loop is validated.
