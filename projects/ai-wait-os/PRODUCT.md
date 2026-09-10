# Product Specification

## Problem

Long-running AI agents change work from a sequence of human tasks into a mixed system of delegation, waiting, review, approval, and redirection. Existing to-do and calendar tools schedule human work, while agent interfaces manage individual AI runs. Neither is designed to optimize the handoff boundary between the two.

The product should answer one question continuously:

> **What is the highest-value thing this human should do right now, given what their agents are doing and when human attention will next be required?**

## Jobs to be done

### Primary

When I delegate a task to an AI agent and it will take a while, help me use the gap productively **without making it harder to return to the agent at the right moment**.

### Secondary

When several agents are active, collect the moments that require my judgment so I can review them in the right order instead of polling multiple tools.

### Later team job

When a team supervises many agents, route human checkpoints to the right person with enough context to decide quickly and safely.

## Target users

### Beachhead: agent-heavy individual

A developer, researcher, founder, analyst, or operator who regularly runs several AI tasks per day and already maintains a backlog of small human tasks.

### Expansion: multi-agent power user

A user running multiple agents concurrently who loses time checking status, noticing questions late, or switching between interfaces.

### Later: teams

Teams where AI work frequently blocks on approvals, policy decisions, review, or domain expertise.

## MVP user experience

### 1. Start / detect an agent run

MVP may begin with manual entry:

- task name;
- expected duration or duration range;
- source agent/tool;
- optional urgency.

The architecture must allow later replacement with browser-extension events, APIs, webhooks, desktop events, or native integrations.

### 2. Calculate usable gap

Do not treat the full predicted runtime as usable. Reserve return buffer and account for uncertainty.

Example:

```text
predicted agent completion: 9 min
prediction uncertainty buffer: 2 min
return/context recovery buffer: 1 min
usable gap: 6 min
```

### 3. Match a human task

Each human task should eventually carry:

- expected duration;
- interruptibility;
- cognitive load;
- context-switch cost;
- deadline/urgency;
- location/device requirements;
- project/context;
- confidence in duration estimate.

MVP can use a simpler subset: duration, priority, interruptibility, and context.

A first scoring model can be heuristic rather than ML:

```text
score =
  time_fit
+ urgency
+ continuity_bonus
+ completion_probability
- switching_cost
- interruption_risk
```

The system should recommend **one best next action**, with a short reason, rather than dumping a large list.

### 4. Return cleanly

When the agent completes or requires input, the app should avoid interrupting in the middle of a short human action if a brief delay is harmless. It should support states such as:

- return now;
- finish current microtask, then return;
- agent needs urgent input;
- agent finished, review when ready.

This distinction is strategically important: the product is an attention scheduler, not merely a notifier.

## MVP screens

Keep the first product small:

1. **Now** — active agent run, usable gap, recommended human task.
2. **Tasks** — lightweight backlog with duration and interruptibility.
3. **Runs** — current/recent agent runs and status.
4. **Review** — session history showing whether recommendations were useful.

Do not build a large dashboard before usage proves it is necessary.

## Human Checkpoint Queue — post-MVP

A checkpoint is any agent event that requires human action, for example:

- approve/reject;
- choose A/B;
- answer a clarifying question;
- review a result;
- authorize a risky action;
- provide missing information;
- redirect a stalled agent.

Each checkpoint should contain:

- originating agent and task;
- exact decision required;
- urgency/deadline;
- estimated human time;
- risk level;
- minimum context needed to decide;
- consequence of delay.

The queue prioritizes checkpoints by business impact, urgency, risk, blocking depth, and human effort.

## Non-goals for MVP

- replacing the user's calendar;
- replacing project-management software;
- executing arbitrary actions autonomously;
- storing full agent prompts and outputs by default;
- supporting every AI provider at launch;
- optimizing for engagement time or advertising impressions;
- gamifying work before utility is validated.

## Metrics

### North-star candidate

**Useful Agent Gap Rate (UAGR):** percentage of eligible agent waiting gaps in which the user completes or meaningfully advances a useful human task without a harmful late return.

This must be paired with a quality metric because maximizing utilization alone could make work worse.

### Guardrail metrics

- late-return rate;
- user-reported disruption/context-switch cost;
- recommendation skip rate;
- incorrect duration-fit rate;
- notification mute/disable rate.

### Activation

A user experiences at least three agent gaps, accepts at least one recommendation, and returns successfully to the originating agent.

### Retention signals

- agent runs registered per active day;
- recommendations accepted per week;
- repeated use after 7 and 30 days;
- number of integrated agent sources;
- checkpoints handled through the queue later.

## Monetization hypothesis

### Free

Manual runs, small task backlog, basic time matching, limited history.

### Pro

Automatic agent detection/integrations, smarter estimates, cross-device sync, richer task sources, analytics, personalization.

### Teams

Shared checkpoint routing, roles/permissions, audit log, SLA/urgency policies, team analytics, enterprise integrations.

Avoid monetizing the waiting surface with ads unless future evidence strongly supports it; that would create incentives to maximize waiting and screen time rather than user value.

## Durable moat candidates

The defensibility, if any, should come from accumulated orchestration intelligence rather than the UI itself:

- personalized duration estimates;
- learned switching-cost model;
- knowledge of which tasks are safe to interrupt;
- cross-agent state normalization;
- checkpoint prioritization history;
- organization-specific approval and routing rules.

None of these should be treated as a moat until actual usage demonstrates that the data materially improves outcomes.
