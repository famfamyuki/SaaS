# AI Wait OS

> Working title. Product name and repository name can be changed later.

## Status

**Stage:** Incubation / product planning only  
**Development:** Not started  
**Project established:** 2026-09-10  
**Repository:** This repository is now dedicated to AI Wait OS

## One-line thesis

AI is shifting from instant answers to long-running, parallel agents. The scarce resource becomes **human attention**: what should the person do while agents work, and when should the person return to review, approve, redirect, or decide?

AI Wait OS is a coordination layer that turns agent runtime into useful human time without creating harmful context switching.

## Product direction

The project should evolve in three layers, in this order:

1. **Wait Companion — MVP**  
   Detect or register an active AI task, estimate the usable gap, and recommend a human task that fits the remaining time and switching cost.
2. **Human Checkpoint Queue**  
   Aggregate approvals, questions, reviews, and decisions from multiple agents into one prioritized queue.
3. **Human Attention Orchestrator**  
   Coordinate many agent runs and human tasks, deciding when human attention is actually needed and what deserves it next.

The long-term product is **not a waiting-room app**. Waiting time is the wedge; human-attention orchestration is the durable problem.

## Initial target user

Start with high-frequency agent users rather than the general public:

- developers running coding agents;
- researchers running long-form research agents;
- founders/operators delegating work to several AI systems;
- later, teams supervising many agents.

These users experience repeated long-running tasks and have measurable opportunity cost when attention is poorly allocated.

## Core product loop

```text
Agent task starts
      ↓
Estimate usable gap + confidence
      ↓
Select a human task with low enough switching cost
      ↓
Human completes / skips / continues task
      ↓
Agent finishes or asks for input
      ↓
Return at a clean interruption point
      ↓
Review / approve / redirect
      ↓
Learn duration and preference signals
```

## Strategic principle

Do not optimize for keeping users on a loading screen. Agent products increasingly support background work, notifications, parallel execution, and mobile supervision. The product must remain valuable even when the user leaves the originating AI app completely.

## Primary hypotheses

- H1: frequent agent users accumulate meaningful fragmented gaps during a workday.
- H2: a subset of those gaps can be used without causing more context-switching cost than value.
- H3: duration-aware task matching is substantially better than a normal to-do list during those gaps.
- H4: as users run more agents concurrently, human approvals and review requests become a larger bottleneck than raw agent runtime.
- H5: cross-agent attention history can become a defensible personalization layer.

All five remain **hypotheses**, not validated facts for this product.

## MVP boundary

The first version should do only four things well:

1. accept an agent run manually or through one simple integration;
2. estimate a usable time window;
3. recommend one suitable human task at a time;
4. return the user to the agent when action is needed.

Do **not** begin with a universal agent integration platform, autonomous task execution, a full calendar replacement, an enterprise approval engine, or an advertising model.

## Canonical documents

- [`PRODUCT.md`](./PRODUCT.md) — users, jobs, UX, scope, metrics, monetization
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — system boundaries, data model, integrations, privacy
- [`ROADMAP.md`](./ROADMAP.md) — validation gates, phases, success and kill criteria
- [`RESEARCH_AND_DECISIONS.md`](./RESEARCH_AND_DECISIONS.md) — evidence, assumptions, competitor frame, durable decisions
- [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md) — future implementation and documentation rules

## Next trigger

Do not start a large build merely because the idea sounds plausible. Resume implementation when there is time to run the Phase 0 validation in `ROADMAP.md`. Re-check the fast-moving agent market first, run validation, choose between the Wait Companion and Human Checkpoint Queue wedges, record that decision, then create the implementation scaffold in this repository.
