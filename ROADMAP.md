# Validation and Roadmap

## Operating rule

This project is intentionally **validation-gated**. Do not advance because a phase is exciting; advance when the previous phase produces evidence.

## Phase 0 — Problem validation

### Goal

Confirm that fragmented agent runtime creates a problem large enough that users want a dedicated solution.

### Research target

Interview roughly 15–20 people who use long-running AI agents frequently. Prioritize developers and other power users who already delegate multiple tasks per day.

Ask about actual recent sessions, not hypothetical preferences:

- Which AI tools did you run yesterday?
- How long did tasks take?
- What did you do while they ran?
- How often did you manually check status?
- Did an agent ever wait on you for approval or clarification?
- Did you start another task and forget to return?
- Which gaps felt useful versus too short or disruptive?
- What tiny tasks were already available in your backlog?

### Lightweight measurement

For a subset of users, collect a 3–5 day diary:

```text
agent start time
agent source
time until completion / human checkpoint
what the user did during the gap
whether they checked status manually
whether a useful task was completed
whether return was late
disruption rating 1–5
```

### Gate A — continue only if

Evidence shows all of the following:

- frequent users experience several eligible gaps per workday;
- at least some gaps are long enough for useful low-switch-cost actions;
- manual polling, missed checkpoints, or unstructured task switching is a recurring annoyance;
- users can describe a current workaround or clear cost.

If users mostly leave the AI running and experience no meaningful coordination problem, do not build the Wait Companion. Investigate the Human Checkpoint Queue directly instead.

---

## Phase 1 — Concierge prototype

### Goal

Test the recommendation behavior before building integrations.

### Product

A minimal web prototype where the user:

1. enters an active AI task and rough expected duration;
2. adds small human tasks with duration and interruptibility;
3. receives one recommended next action;
4. marks complete/skip;
5. records when the AI finishes or asks for input.

No automatic provider integration is required.

### What to learn

- Are duration-based recommendations trusted?
- Does the user prefer working, taking a break, or starting another agent?
- What minimum gap is actually useful?
- What switching contexts are especially costly?
- How much buffer is needed before returning to the AI task?

### Gate B — MVP-worthy signal

Target evidence, not rigid vanity thresholds. A healthy signal would look like:

- repeated use across multiple days by several testers;
- accepted recommendations are often completed or meaningfully advanced;
- users report less checking/decision overhead rather than more;
- return timing is usually acceptable;
- at least a few users ask for automatic detection or task integrations.

If users like the idea but do not repeatedly use the manual version, automatic integration alone should not be assumed to fix the product.

---

## Phase 2 — MVP 0.1

### Scope

Build the smallest durable product around the validated loop:

- account + preferences;
- active agent-run state;
- lightweight human-task backlog;
- heuristic attention scheduler;
- completion/needs-human notification;
- recommendation outcome analytics;
- one validated integration or detection mechanism.

### MVP success criteria

Evaluate over real workdays:

- eligible gaps per active user;
- recommendation acceptance rate;
- useful completion/advance rate;
- late-return rate;
- disruption rating;
- repeated weekly usage;
- automatic-source usage versus manual runs.

The key test is whether users feel they need to think less about *what to do while AI works*.

---

## Phase 3 — MVP 0.2: Multi-agent awareness

### Goal

Move from a gap utility to an agent supervision product.

Add:

- multiple concurrent `AgentRun`s;
- unified statuses;
- priority/urgency;
- `needs_human` events;
- a basic checkpoint inbox;
- recommendation logic that can choose between human work and another agent review.

### Gate C

Continue toward a dedicated checkpoint product if users repeatedly have several concurrent agents and human-response delay materially blocks progress.

---

## Phase 4 — Human Checkpoint Queue

Build the stronger long-term wedge:

- normalized approvals/questions/reviews;
- estimated human effort;
- risk and urgency;
- blocking-depth priority;
- concise context packet;
- resolve/defer/escalate actions;
- routing rules for teams later.

The critical metric changes from gap utilization to **time-to-required-human-decision** and downstream agent unblock time.

---

## Phase 5 — Human Attention Orchestrator

Only after the previous layers prove useful:

- cross-agent priority model;
- learned human timing/preferences;
- calendar/focus awareness;
- task-manager/project integrations;
- team routing and ownership;
- organization policies;
- analytics on agent idle time caused by human bottlenecks.

The final product should answer both:

1. What should the human do now?
2. Which agent deserves human attention next?

---

## Kill / pivot criteria

A disciplined project needs explicit reasons not to continue.

### Kill or radically rethink Wait Companion if

- most usable gaps are too short to beat context-switch cost;
- users strongly prefer genuine breaks rather than productive microtasks;
- automatic task detection requires brittle/invasive access users will not grant;
- notifications from native AI tools already solve the problem sufficiently;
- users do not return repeatedly after novelty wears off.

### Pivot toward Checkpoint Queue if

- waiting itself is not painful, but agents frequently block on approvals/questions;
- users run many agents and spend time polling several interfaces;
- missed human checkpoints are more expensive than idle human gaps.

### Pivot toward team operations if

- individuals have too few checkpoints, but teams have routing/ownership/SLA problems;
- compliance/auditability becomes the strongest willingness-to-pay driver.

## Suggested research backlog

Before serious implementation, investigate:

- actual distributions of agent runtimes and human-response delays;
- whether major agent platforms expose run-status/checkpoint APIs or webhooks;
- browser-extension feasibility and policy constraints;
- notification fatigue thresholds;
- task-duration estimation accuracy;
- interruption/context-switch research relevant to microtasking;
- willingness to pay for individual productivity versus team orchestration;
- enterprise permission and audit requirements.

## No fixed launch date

This is a future project. A date should be assigned only after Phase 0 has an owner and sufficient development capacity. Until then, the repository is a durable incubation plan rather than an active sprint.
