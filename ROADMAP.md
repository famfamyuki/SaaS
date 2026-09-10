# Validation and Roadmap

## Operating rule

This project is intentionally **validation-gated**. Do not advance because a phase is exciting; advance when the previous phase produces evidence.

The product must validate not only whether AI waiting gaps can be used productively, but also whether some gaps are better left unfilled or used for recovery. The long-term system should optimize valuable attention allocation, not maximum human utilization.

## Phase 0 — Problem validation

### Goal

Confirm that fragmented agent runtime creates a problem large enough that users want a dedicated solution, and identify how users naturally spend those gaps today.

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
- Which gaps did you naturally use to rest or disengage?
- Did filling a gap with another task ever make returning harder?
- Would you ever want short leisure/recreation during longer gaps, or would that feel intrusive?
- What tiny tasks were already available in your backlog?

### Lightweight measurement

For a subset of users, collect a 3–5 day diary:

```text
agent start time
agent source
time until completion / human checkpoint
what the user did during the gap
activity type: work | decision | recovery | recreation | nothing
whether they checked status manually
whether useful work was completed
whether recovery felt worthwhile
whether return was late
disruption rating 1–5
value rating 1–5
```

### Gate A — continue only if

Evidence shows all of the following:

- frequent users experience several eligible gaps per workday;
- at least some gaps are long enough for useful low-switch-cost actions or meaningful recovery;
- manual polling, missed checkpoints, unstructured switching, or uncertainty about what to do is a recurring annoyance;
- users can describe a current workaround or clear cost;
- the system can plausibly add value without trying to fill every gap.

If users mostly leave the AI running and experience no meaningful coordination problem, do not build the Wait Companion. Investigate the Human Checkpoint Queue directly instead.

If users consistently prefer breaks to microtasks, treat that as evidence for a recovery-first wedge rather than as product failure.

---

## Phase 1 — Concierge prototype

### Goal

Test next-state recommendation behavior before building integrations.

### Product

A minimal web prototype where the user:

1. enters an active AI task and rough expected duration;
2. adds small human tasks with duration and interruptibility;
3. configures a simple break preference and minimum actionable gap;
4. receives one recommendation: `work`, `break`, or `nothing`;
5. marks accept/skip and records when the AI finishes or asks for input.

No automatic provider integration is required. Recreation does not need to be implemented yet.

### What to learn

- Are duration-based recommendations trusted?
- When does the user prefer working, taking a break, or doing nothing?
- What minimum gap is actually useful?
- What switching contexts are especially costly?
- How much buffer is needed before returning to the AI task?
- Are break recommendations useful or annoying?
- Does the user want the system to suggest recreation at all?

### Gate B — MVP-worthy signal

Target evidence, not rigid vanity thresholds. A healthy signal would look like:

- repeated use across multiple days by several testers;
- accepted work recommendations are often completed or meaningfully advanced;
- accepted break recommendations are positively rated often enough to justify keeping recovery as a first-class state;
- users report less checking/decision overhead rather than more;
- return timing is usually acceptable;
- users do not feel pressured to fill every idle minute;
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
- `HUMAN_WORK`, `RECOVERY`, and `NO_RECOMMENDATION` outputs;
- completion/needs-human notification;
- quiet-hour / off-hour preference;
- recommendation outcome analytics;
- one validated integration or detection mechanism.

### MVP success criteria

Evaluate over real workdays:

- eligible gaps per active user;
- recommendation acceptance rate by mode;
- useful work completion/advance rate;
- accepted recovery value rating;
- no-intervention value rating;
- late-return rate;
- disruption rating;
- unwanted-intervention rate;
- quiet-hour interruption rate;
- repeated weekly usage;
- automatic-source usage versus manual runs.

The key test is whether users feel they need to think less about *what to do while AI works* while also feeling **less interrupted, not more managed**.

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
- recommendation logic that can choose between human work, recovery, no intervention, and another agent review;
- clean return/defer behavior across several active agents.

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
- focus/off-hour interruption policy;
- routing rules for teams later.

The critical metric changes from gap utilization to **time-to-required-human-decision** and downstream agent unblock time.

The queue must not assume every checkpoint deserves immediate interruption. It should be able to defer non-urgent work until a clean human boundary or next work period.

---

## Phase 5 — Attention Orchestrator

Only after the previous layers prove useful:

- cross-agent priority model;
- learned human timing/preferences;
- work vs recovery vs no-intervention selection;
- calendar/focus awareness;
- task-manager/project integrations;
- boundary/return manager;
- team routing and ownership;
- organization policies;
- analytics on agent idle time caused by human bottlenecks;
- explicit off-hour protection.

The product should answer:

1. What should the human do now?
2. Should the human do anything at all right now?
3. Which agent deserves human attention next?
4. Can this safely wait until a better interruption point or the next work period?

---

## Phase 6 — Optional Recreation Layer

Add only if earlier validation shows users actively want it.

### Goal

Allow the user to reclaim suitable AI waiting gaps for bounded leisure without losing the return boundary.

### Principles

- explicit opt-in;
- user-selected allowed activities/sources;
- bounded duration;
- safe-return warning;
- no infinite-feed optimization;
- no engagement-based monetization;
- recreation should never become mandatory for the core product.

### Validation questions

- Does recreation create more value than a simple break for longer gaps?
- Can users return reliably without overshooting important checkpoints?
- Does the feature reduce perceived waiting or merely create another source of distraction?
- Do users want system suggestions or only a user-triggered recreation mode?

If the answer is weak, keep the product focused on work, recovery, and checkpoint coordination.

---

## Phase 7 — AI Workforce Attention Layer

For team/enterprise use, coordinate scarce human judgment across many agents while protecting human capacity.

Potential capabilities:

- team checkpoint routing;
- role/skill-aware assignment;
- risk policies;
- follow-the-sun review windows;
- quiet-hour and escalation policies;
- audit logs;
- agent-blocked-on-human analytics;
- human attention capacity analytics;
- review batching when immediacy is unnecessary.

The goal is not to maximize human occupancy. The goal is to keep important agent work moving while minimizing needless human interruption.

---

## Kill / pivot criteria

A disciplined project needs explicit reasons not to continue.

### Kill or radically rethink Wait Companion if

- most usable gaps are too short to beat context-switch cost;
- users strongly prefer genuine breaks and do not want system recommendations;
- automatic task detection requires brittle/invasive access users will not grant;
- notifications from native AI tools already solve the problem sufficiently;
- users do not return repeatedly after novelty wears off;
- the product increases perceived pressure to stay productive during every gap.

### Pivot toward Recovery-aware coordination if

- users value not having to decide whether to work or rest more than they value task matching;
- users frequently use agent gaps as natural breaks and want clean return timing;
- productivity-only recommendations cause noticeable disruption.

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
- actual distribution of gap activities: work, recovery, recreation, or nothing;
- whether major agent platforms expose run-status/checkpoint APIs or webhooks;
- browser-extension feasibility and policy constraints;
- notification fatigue thresholds;
- task-duration estimation accuracy;
- interruption/context-switch research relevant to microtasking;
- evidence on break timing without turning the product into a health product;
- user appetite for optional bounded recreation;
- willingness to pay for individual productivity versus team orchestration;
- enterprise permission and audit requirements.

## No fixed launch date

This is a future project. A date should be assigned only after Phase 0 has an owner and sufficient development capacity. Until then, the repository is a durable incubation plan rather than an active sprint.
