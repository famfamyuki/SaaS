# Product Specification

## Problem

Long-running AI agents change work from a sequence of human tasks into a mixed system of delegation, waiting, review, approval, recovery, and redirection. Existing to-do and calendar tools schedule human work, while agent interfaces manage individual AI runs. Neither is designed to optimize the handoff boundary between machine work and human attention.

The product should answer one question continuously:

> **What is the highest-value state for this human right now, given what their agents are doing, when human attention will next be required, and whether additional work is actually better than recovery or disengagement?**

The product must not equate value with productivity. A useful recommendation may be to work, make a decision, take a break, enjoy a short user-authorized leisure period, or do nothing.

## Long-term product definition

The end-state is **Attention OS**: a control layer that coordinates machine work and human attention across the day.

Its responsibility is not to maximize human utilization. Its responsibility is to minimize wasted coordination, harmful context switching, missed agent checkpoints, and unnecessary interruption while helping users spend reclaimed time in ways they value.

## Human attention modes

The scheduler should model five distinct states.

### 1. Human Work

A task the user wants to advance: email, review, writing, planning, coding, admin, reading, or another project action.

### 2. Human Decision

A judgment required by an agent: approve/reject, choose A/B, clarify intent, review evidence, authorize an action, or redirect work.

### 3. Recovery

A deliberate low-demand interval intended to preserve continuity and avoid reflexively filling every gap with work. Examples may include standing up, getting water, looking away from the screen, walking briefly, or simply pausing.

The product must not diagnose fatigue or make medical/wellness claims. Recovery recommendations should be based on user preferences and ordinary activity/timing signals unless the user explicitly connects a suitable source in a later product version.

### 4. Recreation

Optional user-authorized leisure or entertainment during a bounded interval. Examples might include reading, music, a short game, a saved video, or another activity chosen by the user.

Recreation is **opt-in**. The product should manage the boundary around it, not decide what entertainment the user ought to consume.

### 5. Off / Do Nothing

Protected personal time, intentional inactivity, or a period when no intervention is useful. This is a first-class state, not an error condition.

## Jobs to be done

### Primary

When I delegate a task to an AI agent and it will take a while, help me use or protect the gap in the best way **without making it harder to return to the agent at the right moment**.

### Secondary

When several agents are active, collect the moments that require my judgment so I can review them in the right order instead of polling multiple tools.

### Recovery job

When I have a short gap but another task would create more switching cost than value, make it easy to take a bounded break without losing track of the agent.

### Recreation job

When I explicitly allow it, help me use an appropriate longer gap for a short leisure activity and bring me back cleanly before an important agent checkpoint.

### Later team job

When a team supervises many agents, route human checkpoints to the right person with enough context to decide quickly and safely while respecting focus windows and off-hours.

## Target users

### Beachhead: agent-heavy individual

A developer, researcher, founder, analyst, or operator who regularly runs several AI tasks per day and already maintains a backlog of small human tasks.

### Expansion: multi-agent power user

A user running multiple agents concurrently who loses time checking status, noticing questions late, or switching between interfaces.

### Later: teams

Teams where AI work frequently blocks on approvals, policy decisions, review, or domain expertise.

## Core product behavior

The system should not ask only, "Which task fits this gap?" It should first ask, "Should this gap be filled at all?"

A simplified decision flow:

```text
agent gap detected
      ↓
Is urgent human action already required?
      ├─ yes → Human Decision
      └─ no
          ↓
Is the gap long/reliable enough for another activity?
      ├─ no → Do Nothing / remain in current context
      └─ yes
          ↓
Would a human task produce more value than its switching cost?
      ├─ yes → Human Work
      └─ no
          ↓
Would recovery be appropriate under user rules/preferences?
      ├─ yes → Recovery
      └─ no
          ↓
Is recreation enabled and safely bounded?
      ├─ yes → Recreation
      └─ no → Do Nothing
```

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

### 3. Choose a next state before choosing a task

The MVP scheduler should be allowed to return:

```text
HUMAN_WORK
RECOVERY
NO_RECOMMENDATION
```

`HUMAN_DECISION` is triggered when an agent requires input. `RECREATION` can remain post-MVP until users explicitly request it and boundary management is validated.

### 4. Match a human task when work is appropriate

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
work_score =
  time_fit
+ urgency
+ continuity_bonus
+ completion_probability
- switching_cost
- interruption_risk
```

The system should recommend **one best next action or state**, with a short reason, rather than dumping a large list.

### 5. Recovery recommendation

A recovery recommendation should be lightweight and optional. Example:

```text
Take a 7-minute break

Why:
- next agent checkpoint is about 10 minutes away
- no urgent human task fits cleanly
- you configured breaks after long focus blocks

[Start break] [Keep working] [Dismiss]
```

The system should not claim that a break is medically necessary. It should make its reasoning transparent and respect user-defined rules.

### 6. Return cleanly

When the agent completes or requires input, the app should avoid interrupting in the middle of a short human action if a brief delay is harmless. It should support states such as:

- return now;
- finish current microtask, then return;
- finish current break/recreation interval, then return;
- agent needs urgent input;
- agent finished, review when ready;
- defer review until next work period.

This distinction is strategically important: the product is an attention scheduler, not merely a notifier.

## Off-hours behavior

Off-hours should be protected by default.

A user should be able to define:

- work windows;
- focus windows;
- quiet/off-hours;
- which checkpoint risk levels may interrupt off-hours;
- whether completed agent work should wait until the next work period.

A typical behavior might be:

```text
21:30
Codex finishes a non-urgent task
Research agent is still running

→ no immediate interruption
→ results collected in the morning review queue
```

The system should help decouple 24/7 machine operation from 24/7 human availability.

## Recreation boundaries — post-MVP

If recreation is introduced, the product should optimize **clean boundaries**, not engagement.

Possible behavior:

```text
agent checkpoint expected in ~12 min
user has enabled recreation for gaps >= 10 min

→ offer a 9-minute leisure block
→ warn before the safe-return boundary
→ stop prompting once the user exits work mode
```

Principles:

- opt-in only;
- user selects allowed recreation categories or activities;
- no infinite-feed optimization;
- no incentives tied to longer engagement;
- easy disable/override;
- never interrupt protected off-time merely to pull the user back to non-urgent work.

## MVP screens

Keep the first product small:

1. **Now** — active agent run, usable gap, recommended next state/action.
2. **Tasks** — lightweight backlog with duration and interruptibility.
3. **Runs** — current/recent agent runs and status.
4. **Review** — session history showing whether recommendations were useful or disruptive.
5. **Preferences** — minimum gap, break rules, quiet hours, and intervention level.

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
- consequence of delay;
- whether it may interrupt focus/off-hours.

The queue prioritizes checkpoints by business impact, urgency, risk, blocking depth, human effort, and interruption policy.

## Non-goals for MVP

- replacing the user's calendar;
- replacing project-management software;
- replacing leisure or wellness apps;
- diagnosing health, fatigue, stress, or medical state;
- executing arbitrary actions autonomously;
- storing full agent prompts and outputs by default;
- supporting every AI provider at launch;
- optimizing for engagement time or advertising impressions;
- gamifying work before utility is validated;
- managing the user's entire personal life.

## Metrics

### North-star candidate

**Valuable Agent Gap Rate (VAGR):** percentage of eligible agent waiting gaps in which the system produces an outcome the user considers worthwhile — productive progress, useful recovery, chosen recreation, or intentionally preserved time — without a harmful late return.

This replaces a narrower productivity-only metric. Maximizing utilization alone could make the user experience worse.

### Supporting outcome metrics

- useful work completed/advanced during eligible gaps;
- accepted recovery recommendations;
- user-rated value of preserved/no-intervention gaps;
- checkpoint response latency;
- downstream agent unblock time.

### Guardrail metrics

- late-return rate;
- user-reported disruption/context-switch cost;
- recommendation skip rate;
- incorrect duration-fit rate;
- unwanted-intervention rate;
- quiet-hour interruption rate;
- notification mute/disable rate.

### Activation

A user experiences at least three agent gaps, accepts or positively rates at least one recommendation, and returns successfully to the originating agent without unwanted interruption.

### Retention signals

- agent runs registered per active day;
- recommendations accepted per week;
- repeated use after 7 and 30 days;
- number of integrated agent sources;
- checkpoints handled through the queue later;
- sustained use without increasing notification suppression.

## Monetization hypothesis

### Free

Manual runs, small task backlog, basic time matching, basic recovery/no-intervention choices, limited history.

### Pro

Automatic agent detection/integrations, smarter estimates, cross-device sync, richer task sources, advanced quiet-hour rules, analytics, personalization, optional recreation boundaries.

### Teams

Shared checkpoint routing, roles/permissions, audit log, SLA/urgency policies, team focus/off-hour policies, team analytics, enterprise integrations.

Avoid monetizing the waiting or recreation surface with ads unless future evidence radically changes the strategy; that would create incentives to maximize waiting and screen time rather than user value.

## Durable moat candidates

The defensibility, if any, should come from accumulated orchestration intelligence rather than the UI itself:

- personalized agent-duration estimates;
- learned switching-cost model;
- knowledge of which tasks are safe to interrupt;
- user-specific preference for work versus recovery versus no intervention;
- safe-return timing;
- cross-agent state normalization;
- checkpoint prioritization history;
- organization-specific approval, focus, and routing rules.

A future abstraction for this personalized layer is the **Human Attention Graph**: a model of contexts, task durations, interruption costs, checkpoint patterns, and user-controlled preferences. It must remain explainable and subordinate to explicit user controls.

None of these should be treated as a moat until actual usage demonstrates that the data materially improves outcomes.
