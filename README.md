# AI Wait OS

> Working title. Product name and repository name can be changed later.

## Status

**Stage:** Incubation / product planning only  
**Development:** Not started  
**Project established:** 2026-09-10  
**Repository:** This repository is dedicated to AI Wait OS

## North-star goal

The final goal is **Attention OS**:

> **In a world where humans and many AI agents work asynchronously in parallel, Attention OS continuously decides when the human should be interrupted, when they should be left alone, and what the highest-value next human state or action is — so the person no longer has to patrol AI progress manually and can move naturally between work, decisions, recovery, recreation, and off-time.**

The product is successful only if it reduces coordination burden while preserving human agency. It must not turn recovered AI waiting time into an obligation to work more.

## Definition of the final state

The end-state product should make the following workflow normal:

```text
Human defines goals, constraints, and availability
        ↓
Multiple AI agents work in parallel in the background
        ↓
Attention OS normalizes their status and predicts when humans may be needed
        ↓
Attention Engine chooses the best human state
        ├─ Human Decision
        ├─ Human Work
        ├─ Recovery
        ├─ Optional Recreation
        ├─ Off
        └─ No Intervention
        ↓
Only worthwhile checkpoints interrupt the human
        ↓
Low-urgency work is batched or deferred to a clean boundary
        ↓
The system learns timing, interruption cost, preferences, and routing patterns
        ↓
Humans stop polling agents; agents stop waiting unnecessarily on humans
```

At maturity, the product should work across multiple agent providers and human task sources rather than becoming a front end for one AI vendor.

### End-state success conditions

The final product should be able to:

1. **See cross-agent work state** — understand active, blocked, completed, failed, and `needs_human` states across supported agents.
2. **Route human judgment** — turn agent requests into a prioritized Human Checkpoint Queue with enough context to decide quickly.
3. **Choose human state before task** — decide whether work, decision, recovery, recreation, off-time, or no intervention is appropriate before selecting a concrete activity.
4. **Protect transitions** — avoid harmful context switching and return the user at a clean boundary rather than immediately whenever technically possible.
5. **Separate machine time from human availability** — allow AI to operate continuously without making the human continuously available.
6. **Learn without taking control away** — improve duration, switching-cost, and timing predictions while keeping explicit user policies and overrides authoritative.
7. **Scale from one person to teams** — route scarce human attention across many agents and qualified people with risk, urgency, ownership, and auditability.
8. **Remain useful as agents become faster and more autonomous** — the value must come from attention orchestration and human checkpoints, not from staring at a loading screen.

## One-line thesis

AI is shifting from instant answers to long-running, parallel agents. The scarce resource becomes **human attention**: what should the person do while agents work, when should they return to review or decide, and when is the best action actually to rest, disengage, or enjoy a short break?

AI Wait OS is a coordination layer that turns agent runtime into valuable human time without forcing every available minute into more work.

## Long-term product

The end-state is **Attention OS**: an operating layer for human attention in an agentic world.

It coordinates five classes of human state:

1. **Human Work** — useful tasks that fit the available time and context.
2. **Human Decision** — approvals, reviews, clarifications, and direction changes needed by agents.
3. **Recovery** — deliberate short breaks when additional work would reduce continuity or create unnecessary fatigue.
4. **Recreation** — optional, user-authorized leisure or entertainment that can fit a bounded interval.
5. **Off / Do Nothing** — protected personal time or intentional non-intervention when the system should stay quiet.

The system must never assume that a free minute should be monetized or filled with productivity. Sometimes the highest-value recommendation is `TAKE_A_BREAK`, `ENJOY_RECREATION`, or `DO_NOTHING`.

## Product direction

The project should evolve in four layers:

1. **Wait Companion — MVP**  
   Detect or register an active AI task, estimate the usable gap, and recommend one appropriate next state: a small human task, a short break, or nothing.
2. **Human Checkpoint Queue**  
   Aggregate approvals, questions, reviews, and decisions from multiple agents into one prioritized queue.
3. **Attention Orchestrator**  
   Coordinate agent runs, human work, recovery windows, optional recreation, and clean return timing.
4. **AI Workforce Attention Layer**  
   For teams, route scarce human judgment across many agents while protecting human focus and off-hours.

The long-term product is **not a waiting-room app**. Waiting time is the wedge; human-attention orchestration is the durable problem.

## Product invariants

These constraints should remain true even as implementation changes:

- Human attention, not screen time, is the scarce resource being optimized.
- The system may recommend doing nothing.
- Recovery is not a failure state.
- Recreation is opt-in and boundary-managed, never engagement-maximized.
- Off-hours are protected by default.
- High-risk or authorization checkpoints remain human-controlled unless an explicit future policy system says otherwise.
- Cross-provider interoperability is preferred over dependence on one agent vendor.
- User policies and direct overrides outrank learned recommendations.
- A feature that increases activity but worsens interruption burden is not progress toward the goal.

## Initial target user

Start with high-frequency agent users rather than the general public:

- developers running coding agents;
- researchers running long-form research agents;
- founders/operators delegating work to several AI systems;
- later, teams supervising many agents.

These users experience repeated long-running tasks and have measurable coordination cost when attention is poorly allocated.

## Core product loop

```text
Agent task starts
      ↓
Estimate usable gap + confidence
      ↓
Choose the best human state
      ├─ Human work
      ├─ Human decision
      ├─ Recovery
      ├─ Optional recreation
      └─ Do nothing
      ↓
Protect a clean return boundary
      ↓
Agent finishes or asks for input
      ↓
Return now / finish current activity / defer safely
      ↓
Review / approve / redirect
      ↓
Learn timing and preference signals
```

## Strategic principles

- Do not optimize for keeping users on a loading screen.
- Do not optimize for maximum utilization of every minute.
- Optimize for **valuable attention allocation and smooth transitions**.
- Treat recovery as a legitimate output of the scheduler, not a failure to find work.
- Treat recreation as opt-in and bounded; never assume the system should manage all personal leisure.
- Protect off-hours by default. Non-urgent agent work should be allowed to continue without pulling the human back in.
- The user must always be able to override, disable, or narrow what the system manages.

## Primary hypotheses

- H1: frequent agent users accumulate meaningful fragmented gaps during a workday.
- H2: a subset of those gaps can be used without causing more context-switching cost than value.
- H3: some gaps are better spent on recovery than on another task.
- H4: duration-aware next-action selection is substantially better than a normal to-do list during agent runtime.
- H5: as users run more agents concurrently, human approvals and review requests become a larger bottleneck than raw agent runtime.
- H6: cross-agent attention history can improve recommendations while still preserving user control and privacy.

All remain **hypotheses**, not validated facts for this product.

## MVP boundary

The first version should do only five things well:

1. accept an agent run manually or through one simple integration;
2. estimate a usable time window;
3. recommend one suitable next state at a time;
4. include `break` and `no recommendation` as valid outputs;
5. return the user to the agent when action is needed.

Recreation management should not be required for MVP. First prove that the scheduler can distinguish **work versus recovery versus no intervention**. Recreation can be added only after users explicitly want it.

Do **not** begin with a universal agent integration platform, autonomous task execution, a full calendar replacement, a wellness/health product, an enterprise approval engine, or an advertising model.

## Canonical documents

- [`PRODUCT.md`](./PRODUCT.md) — users, jobs, UX, attention modes, scope, metrics, monetization
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — system boundaries, data model, attention/recovery engine, integrations, privacy
- [`ROADMAP.md`](./ROADMAP.md) — validation gates, phases, success and kill criteria
- [`RESEARCH_AND_DECISIONS.md`](./RESEARCH_AND_DECISIONS.md) — evidence, assumptions, competitor frame, durable decisions
- [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md) — future implementation and documentation rules

## Next trigger

Do not start a large build merely because the idea sounds plausible. Resume implementation when there is time to run Phase 0 validation in `ROADMAP.md`. Re-check the fast-moving agent market first, validate both productivity and recovery behavior, choose the strongest wedge, record that decision, then create the implementation scaffold in this repository.
