# Architecture Plan

## Architecture goal

Build the smallest system that can validate attention scheduling, while keeping integrations replaceable. The core domain must not depend on any one AI provider, task manager, browser, notification channel, health source, or entertainment provider.

The scheduler must be able to decide that the best next state is **work, human decision, recovery, recreation, or no intervention**. It must not be structurally biased toward maximizing human utilization.

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
             Attention Engine
       ┌───────────┼────────────┐
       ↓           ↓            ↓
 Work Scheduler  Recovery     Checkpoint Queue
                Engine
       └───────────┼────────────┘
                   ↓
          Boundary / Return Manager
                   ↓
             Notification Layer
                   ↓
                User UI
                   ↓
             Outcome Events
                   ↓
          Estimation / Learning
```

`Recreation` can be introduced later as an opt-in activity source feeding the same Boundary / Return Manager. It should not become a separate engagement engine.

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

### AttentionMode

A first-class enum describing the scheduler's selected human state:

```text
HUMAN_WORK
HUMAN_DECISION
RECOVERY
RECREATION
OFF
NO_RECOMMENDATION
```

`OFF` is an explicit protected state. `NO_RECOMMENDATION` means the scheduler should not introduce a new activity even though the user may still be in a work period.

### AttentionPolicy

User-controlled boundaries for intervention.

Suggested fields:

```text
id
user_id
minimum_actionable_gap_seconds
return_buffer_seconds
recovery_enabled
recreation_enabled
recreation_min_gap_seconds?
quiet_hours?
work_windows?
allowed_off_hour_interrupt_risk?
intervention_level: minimal | balanced | proactive
```

These settings should be explicit and inspectable. The system must not infer an always-on work schedule by default.

### Recommendation

Records what the scheduler suggested and why.

```text
id
agent_run_id?
human_task_id?
attention_mode
usable_gap_seconds
score?
reason_codes[]
offered_at
accepted_at?
completed_at?
skipped_at?
late_return?
user_value_rating?
```

A recommendation may have no `human_task_id`, for example when the output is `RECOVERY` or `NO_RECOMMENDATION`.

### Checkpoint

Represents required human judgment.

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
may_interrupt_focus
may_interrupt_off_hours
resolved_at?
resolution?
```

### AttentionSession

Groups an agent wait interval and the human state/activity during it.

Suggested fields:

```text
id
started_at
ended_at?
trigger_agent_run_id?
selected_mode
activity_id?
safe_return_at?
actual_return_at?
interrupted
user_value_rating?
```

This enables measurement without requiring storage of raw agent conversations.

### RecoveryPreference

Do not model medical state. Model user preferences and ordinary timing rules.

Possible fields:

```text
recovery_enabled
preferred_break_lengths[]
min_focus_block_before_suggesting_break?
allowed_recovery_actions[]?
```

This object describes preferences, not diagnoses.

### RecreationPreference — post-MVP

Possible fields:

```text
recreation_enabled
minimum_gap_seconds
allowed_activity_sources[]
maximum_suggested_block_seconds?
return_warning_seconds
```

The user determines permitted sources/categories. The product must not build an addictive content-ranking system.

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
attention.mode.selected
recovery.started
recovery.completed
recreation.started
recreation.completed
recommendation.offered
recommendation.accepted
recommendation.skipped
attention.returned_to_agent
attention.entered_off_mode
checkpoint.created
checkpoint.resolved
```

This allows adapters to change without rewriting product logic and makes analytics/auditing straightforward.

## Attention Engine

The engine should use two stages.

### Stage 1 — choose the human state

Inputs:

- urgent/checkpoint state;
- estimated remaining agent time;
- duration uncertainty;
- current work/off-hour policy;
- current human activity and its interruptibility;
- candidate task availability;
- recent focus/activity timing where explicitly available;
- user recovery preferences;
- recreation opt-in state.

Output:

```text
HUMAN_DECISION
HUMAN_WORK
RECOVERY
RECREATION
OFF
NO_RECOMMENDATION
```

### Stage 2 — choose an activity within that state

If `HUMAN_WORK`, rank HumanTasks.

If `RECOVERY`, choose from user-configured break actions or offer an unstructured break.

If `RECREATION`, choose only from user-authorized sources/activities and only when the boundary can be enforced safely.

If `HUMAN_DECISION`, prioritize Checkpoints.

If `OFF` or `NO_RECOMMENDATION`, suppress unnecessary prompts.

## Scheduling logic — MVP

Use deterministic heuristics. Machine learning is unnecessary before enough behavior exists to learn from.

### Work inputs

- estimated remaining agent time;
- uncertainty buffer;
- human task estimated duration;
- interruption risk;
- task priority;
- context similarity;
- user-defined minimum gap.

### Recovery inputs

- current gap length;
- recent continuous work duration where observable without invasive monitoring;
- user-configured break preference;
- absence of urgent checkpoints;
- whether a clean return boundary exists.

### Output

- attention mode;
- recommended task/action when relevant;
- score where relevant;
- explanation/reason codes;
- safe-return deadline;
- interruption policy.

A correct `NO_RECOMMENDATION` is a feature. Some gaps should remain breaks, current-context continuation, or intentional inactivity.

## Boundary / Return Manager

This is a core component, not notification polish.

It manages the transition from a human activity back to an agent checkpoint or result.

Possible states:

```text
RETURN_NOW
FINISH_CURRENT_ACTIVITY
WARN_AND_RETURN
DEFER_TO_NEXT_WORK_WINDOW
NO_RETURN_NEEDED
```

Inputs include checkpoint urgency, agent-blocking impact, user policy, activity interruptibility, safe-return deadline, and quiet hours.

The goal is to reduce both:

1. humans waiting on agents;
2. agents waiting unnecessarily on humans.

## Off-hours architecture

Off-hours must be explicit policy state rather than a notification preference layered on top.

When `AttentionMode = OFF`:

- non-urgent completed runs are queued for the next review window;
- non-urgent checkpoints are deferred when policy permits;
- urgent/high-risk checkpoints may interrupt only according to user/team policy;
- agents may continue running in the background;
- the system should not recommend work or recreation merely because agent runtime created a gap.

This decouples 24/7 machine availability from human availability.

## Recreation architecture — later

Recreation should plug into the same scheduler through an `ActivitySource` interface, not a feed-ranking subsystem.

```text
ActivitySource
  listCandidates(available_seconds, policy)
  start(activity)
  getBoundaryBehavior(activity)
```

Examples could include a saved reading list, music, a short game, or user-defined activity shortcuts. The system should avoid recommending infinite-scroll feeds as a default design pattern.

## Later learning

Only after sufficient data, personalize:

- actual vs predicted human-task duration;
- actual vs predicted agent duration;
- recommendation acceptance probability;
- context switching cost;
- user preference for work vs recovery vs no intervention;
- safe recreation duration when enabled;
- preferred break behavior;
- acceptable notification timing;
- checkpoint response patterns.

Keep learned output bounded by explicit user/team policy. A learned model must never silently override quiet hours or permission boundaries.

## Human Attention Graph — future abstraction

A later personalization layer may represent relationships among:

```text
contexts
human tasks
agent runs
checkpoint types
estimated durations
switching costs
interruptibility
recovery preferences
safe return boundaries
work/off-hour policies
```

This graph should model **attention logistics**, not intimate psychological or medical profiles.

## Integration strategy

Integration complexity is the largest likely engineering trap. Progress in stages:

### Stage A — manual

The user starts an agent timer/run manually. This validates scheduling behavior independently from provider APIs.

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

### Stage E — optional recovery/recreation sources

Only after users demonstrate demand. These sources must remain optional and permission-scoped.

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
5. **Data separation.** Keep integration credentials, normalized metadata, optional content, and personal preference data separated.
6. **Deletion/export.** Design records so user data can be exported and deleted without reconstructing hidden dependencies.
7. **Fail safe.** If completion timing is uncertain, prefer not to start an activity that risks delaying critical review.
8. **No hidden life optimization.** Do not infer or optimize personal-life behavior outside the user's configured scope.
9. **No health inference by default.** Recovery logic is not a fatigue/stress/medical classifier.
10. **Quiet hours are policy.** Learned models and recommendation systems cannot silently override them.

## Reliability requirements for later integrations

- idempotent event ingestion;
- duplicate-event handling;
- stale run detection;
- source disconnect/reconnect behavior;
- clock/time-zone normalization;
- notification delivery state;
- graceful fallback when an integration cannot report progress;
- clear distinction between `completed`, `needs_human`, and `unknown`;
- deterministic off-hour behavior;
- safe cancellation of pending return notifications when agent state changes.

## Architectural non-goals

Do not initially build:

- a generalized workflow engine;
- distributed multi-agent execution infrastructure;
- a new foundation model;
- a universal MCP/agent protocol;
- an autonomous enterprise authorization layer;
- a health/wellness inference system;
- an entertainment recommendation feed;
- complex predictive ML before the heuristic loop is validated.
