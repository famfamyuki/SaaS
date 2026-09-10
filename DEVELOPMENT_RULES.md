# Development Rules

These rules exist so the project can be resumed months later without rebuilding context or creating an oversized documentation system.

## 1. Status vocabulary

Use these states consistently:

- **Hypothesis** — plausible but not validated.
- **Validated** — supported by direct user/research evidence.
- **Planned** — approved for implementation but not built.
- **Implemented** — code exists.
- **Verified** — implementation has passed its defined checks.
- **Shipped** — available in the intended production environment.
- **Deferred** — intentionally postponed.
- **Rejected** — explicitly decided against.

Never use `implemented`, `verified`, and `shipped` interchangeably.

## 2. Documentation budget

Keep the canonical planning set small. The current six files are the default canonical planning set:

- README.md
- PRODUCT.md
- ARCHITECTURE.md
- ROADMAP.md
- RESEARCH_AND_DECISIONS.md
- DEVELOPMENT_RULES.md

Do not create a new planning document merely because a new topic appears. First update the existing owner file.

Create a new durable document only when:

1. the content has a clearly different lifecycle or audience;
2. putting it in an existing file would materially reduce clarity; and
3. its canonical owner can be named unambiguously.

Temporary implementation notes should live in issues/PRs or be deleted after incorporation into the canonical documents.

## 3. Source-of-truth ownership

- Product purpose, user, scope, metrics → `PRODUCT.md`
- System boundaries, data model, integrations, security → `ARCHITECTURE.md`
- sequence, gates, kill/pivot criteria → `ROADMAP.md`
- market evidence, assumptions, durable decisions → `RESEARCH_AND_DECISIONS.md`
- current project entry point/status and north-star goal → `README.md`
- development process/document hygiene → this file

Avoid duplicating full sections between files. Link instead.

## 4. AI-agent context discipline

When an AI coding agent starts work:

1. read `README.md`;
2. identify which end-state success condition the task advances;
3. read only the canonical file relevant to the task;
4. inspect the current code/tests for the affected area;
5. fetch additional documents only when a concrete dependency requires them.

Do not preload the entire repository documentation into every task.

For implementation prompts, state:

- requested outcome;
- end-state capability advanced;
- files/area likely affected;
- acceptance criteria;
- tests/checks required;
- explicit non-goals.

Do not repeat the whole product vision in every prompt.

## 5. Decision discipline

Any decision that changes product direction, system boundaries, privacy posture, major data contracts, attention modes, or validation gates must be appended to `RESEARCH_AND_DECISIONS.md` with:

```text
Decision ID
Date
Decision
Reason
Supersedes (if applicable)
```

Do not silently rewrite old decisions to make history look consistent. Mark superseded decisions and add the new one.

## 6. Implementation discipline

Before building a feature:

- identify the user/problem hypothesis it serves;
- identify which north-star/end-state capability it advances;
- explain the shortest causal path from this feature to the final Attention OS goal;
- define acceptance criteria;
- define required analytics events;
- identify security/privacy implications;
- identify the smallest reversible implementation.

If a feature cannot be connected to an end-state capability, a validated near-term learning goal, or a required enabling dependency, it should normally be deferred. This is the main scope-control rule for the project.

Prefer small vertical slices over infrastructure-first work.

The scheduler must be implemented **state-first**, not task-first. The valid conceptual states are:

```text
HUMAN_DECISION
HUMAN_WORK
RECOVERY
RECREATION
OFF
NO_RECOMMENDATION
```

A feature must not assume that `HUMAN_WORK` is always preferable to the other states.

## 7. Branch convention

```text
main                 production-ready trunk
feat/<short-name>    feature work
fix/<short-name>     fixes
docs/<short-name>    documentation-only changes
exp/<short-name>     disposable experiments
```

Keep `main` deployable once the project enters active development. Validation prototypes may be explicitly marked experimental and need not meet production standards.

## 8. Definition of done for product changes

A normal implementation is not `Verified` until, where applicable:

- acceptance criteria pass;
- automated tests relevant to the change pass;
- lint/type checks pass;
- key UI path is manually or browser-verified;
- analytics events are verified;
- failure/empty/loading states are checked;
- quiet-hour and no-intervention behavior is checked when relevant;
- user override/dismiss behavior is checked when relevant;
- documentation is updated only if the durable truth changed.

It is not `Shipped` until production deployment is confirmed.

## 9. Analytics discipline

Use stable event names tied to the domain model. Avoid creating new names for the same semantic action.

Initial event family:

```text
agent_run_started
agent_run_needs_human
agent_run_completed
human_task_started
human_task_completed
attention_mode_selected
recovery_started
recovery_completed
recreation_started
recreation_completed
recommendation_offered
recommendation_accepted
recommendation_skipped
attention_returned_to_agent
attention_entered_off_mode
checkpoint_created
checkpoint_resolved
```

Every event should have an explicit product question it helps answer. Do not instrument merely because data is available.

Do not use analytics to maximize screen time, recreation consumption, notification clicks, or total minutes classified as productive. Core metrics must include disruption and unwanted-intervention guardrails.

## 10. Privacy rule

Default to storing timing/status metadata rather than raw prompt/output content. Any move toward storing agent content requires an explicit product need, threat/privacy review, retention decision, and user-facing control.

Recovery and recreation features must follow additional rules:

- do not infer medical, psychological, fatigue, stress, or burnout state by default;
- do not collect health data merely to improve break suggestions;
- do not infer personal-life routines beyond the configured product scope;
- recreation sources are opt-in and permission-scoped;
- explicit quiet/off-hour policy overrides learned preferences.

## 11. Human-agency rule

The product assists attention allocation; it does not control the user's life.

Every recommendation mode must support an appropriate override such as dismiss, skip, continue current activity, or disable this recommendation type.

The system must not:

- shame users for declining productive work;
- frame rest as failure;
- claim the user medically needs a break without an appropriate explicitly designed health feature;
- keep prompting after the user enters protected off-time;
- silently enable recreation management;
- make non-urgent agent work justify off-hour interruption by default.

## 12. Recreation rule

If recreation is implemented later, optimize **boundary quality**, not content engagement.

Acceptable goals:

- fit within a reliable time window;
- warn before safe return time;
- resume agent work cleanly;
- let the user select permitted activity sources.

Non-goals:

- infinite feeds;
- addictive ranking;
- ad-impression maximization;
- increasing time spent in recreation content;
- building a general entertainment discovery platform.

## 13. Integration rule

No new integration should be added until its user value is clear. Each adapter must normalize into the shared domain model rather than leaking provider-specific state through the core scheduler.

For each integration define:

- authentication scope;
- events/statuses available;
- latency/reliability expectations;
- disconnect behavior;
- data stored;
- deletion behavior;
- fallback when the provider changes or fails.

Recovery/recreation integrations require an additional statement of why access is necessary and how the user disables it.

## 14. Avoid premature platform building

Until real usage requires it, do not build:

- a generic workflow engine;
- a plugin marketplace;
- broad enterprise RBAC;
- complex ML ranking;
- a universal agent protocol;
- a large design system;
- dozens of integration adapters;
- a health/wellness inference layer;
- an entertainment feed or recommendation network.

The core question remains whether attention scheduling, recovery-aware gap handling, and checkpoint coordination create enough user value.

## 15. Resume checklist

When this project is activated for implementation:

1. Read README and the latest decisions.
2. Re-check the external market because agent products and APIs change quickly.
3. Confirm that the README north-star goal still describes the desired end state; if not, change it explicitly before coding.
4. Run or refresh Phase 0 validation.
5. Measure how real users spend gaps: work, recovery, recreation, or nothing.
6. Confirm whether the correct wedge is Wait Companion, recovery-aware scheduling, or Human Checkpoint Queue.
7. Record the activation decision and date in `RESEARCH_AND_DECISIONS.md`.
8. Confirm the final product/repository name; rename the repository if appropriate.
9. Create the smallest implementation scaffold in this repository.
10. Keep the six canonical planning documents as the source of truth and avoid documentation sprawl.
