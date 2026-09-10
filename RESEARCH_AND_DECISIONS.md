# Research and Durable Decisions

Last updated: 2026-09-10

## Why this opportunity may exist

The market signal is not simply that AI sometimes takes time. The stronger signal is that leading agent products are normalizing **long-running, parallel, background work** and human supervision.

### Current evidence

1. **OpenAI — Codex**  
   OpenAI describes Codex as supporting multi-agent workflows and always-on background work, with agents operating in parallel across projects.  
   Source: https://openai.com/codex/

2. **OpenAI — Codex mobile / supervision rhythm (2026-05-14)**  
   OpenAI explicitly describes a collaboration rhythm in which agents take on longer-running work and humans step in to answer questions, review findings, change direction, approve next actions, or add ideas.  
   Source: https://openai.com/index/work-with-codex-from-anywhere/

3. **OpenAI — how agents are transforming work (2026-06-25)**  
   OpenAI reports a shift from short interactions to delegated, long-horizon tasks. It states that by May 2026, 70.2% of users in the cited internal analysis had made a Codex request estimated to correspond to more than one hour of human work, and that very heavy users were distributing many agent-hours across parallel agents.  
   Source: https://openai.com/index/how-agents-are-transforming-work/

4. **Anthropic — autonomous Claude Code workflows**  
   Anthropic describes subagents, hooks, and background tasks as mechanisms supporting more autonomous and parallel workflows.  
   Source: https://www.anthropic.com/news/enabling-claude-code-to-work-more-autonomously

5. **Anthropic — Claude Code usage research (2026-06-16)**  
   Anthropic's analysis of roughly 400,000 Claude Code sessions reports that people tend to make more planning decisions while Claude makes more execution decisions, consistent with a shift in the human role toward direction and supervision.  
   Source: https://www.anthropic.com/research/claude-code-expertise

6. **Existing productivity category**  
   Products such as Sunsama already use AI for task duration estimates and planning. This validates demand for time-aware task management but also means AI Wait OS should not position itself as merely another AI to-do/calendar product.  
   Source: https://www.sunsama.com/features/ai

## Interpretation

These sources support the macro premise that delegated AI work is becoming longer-running and more parallel. They **do not validate this product**. The remaining questions are whether the handoff between agent runtime and human attention is painful enough to support a dedicated product, and whether the most valuable outcome of a gap is work, recovery, deliberate non-intervention, or occasionally user-authorized recreation.

## Competitive frame

### Category A — agent-native interfaces

Examples include coding-agent command centers and individual AI applications. They increasingly provide:

- background execution;
- notifications;
- parallel tasks;
- per-agent review and approval.

**Risk:** they can eliminate simple "waiting screen" pain natively.

**Opportunity:** each product sees mostly its own agents. A cross-agent attention layer can coordinate the human across tools.

### Category B — calendars and AI task managers

Examples include Sunsama, Motion, Reclaim, and similar products. They optimize human schedules, priorities, focus time, and duration estimates.

**Risk:** they can add agent-aware features.

**Opportunity:** their primitive is usually a calendar/task. AI Wait OS's primitive is an `AgentRun`, a `Checkpoint`, an `AttentionMode`, and the timing relationship between machine work and human attention.

### Category C — workflow/orchestration platforms

Agent workflow systems coordinate machine steps.

**Risk:** they can add approval nodes and queues.

**Opportunity:** AI Wait OS should focus on the **human attention plane across workflows**, rather than competing to execute all agent workflows itself.

### Category D — wellness/break/entertainment tools

These products may help users take breaks, focus, or consume leisure content.

**Risk:** a recovery or recreation feature can become generic and undifferentiated if it is disconnected from agent timing.

**Opportunity:** AI Wait OS does not need to replace these categories. Its differentiated role is deciding **when a gap should remain empty, when recovery is appropriate, when a small task fits, and when a user-authorized leisure block can end cleanly before an agent checkpoint**.

## Most important strategic distinction

Bad framing:

> Fill the time while an AI is loading.

Better framing:

> Allocate human attention while autonomous systems work.

Best long-term framing:

> Coordinate machine work and human attention without assuming every available minute should become more work.

The first disappears as native notifications improve. The second becomes more important as the number of concurrent agents rises. The third adds a crucial constraint: the system should preserve human agency, recovery, and off-hours rather than optimizing for maximum occupancy.

## Durable decisions

### D-001 — 2026-09-10 — Waiting time is the wedge, not the end-state

**Decision:** Build toward human-attention orchestration, not a waiting-room entertainment product.

**Reason:** Background execution and native notifications are likely to reduce visible waiting, while multi-agent supervision creates a persistent coordination problem.

### D-002 — 2026-09-10 — Start with agent-heavy users

**Decision:** Validate first with developers/researchers/founders/operators who use long-running agents frequently.

**Reason:** They encounter the hypothesized problem more often, making signal easier to measure.

### D-003 — 2026-09-10 — Manual-first validation

**Decision:** Validate time matching manually before building broad integrations.

**Reason:** Integration work is expensive and can hide whether the core behavior is useful.

### D-004 — 2026-09-10 — Heuristics before ML

**Decision:** Initial scheduling should be deterministic and explainable.

**Reason:** There is no proprietary behavioral dataset yet; premature ML adds complexity without evidence of benefit.

### D-005 — 2026-09-10 — Human Checkpoint Queue is the primary strategic expansion

**Decision:** If wait-gap utility is weak but agent-to-human blocking is strong, pivot early to the checkpoint queue rather than forcing the original concept.

**Reason:** Agent completion time itself may cease to be a user problem, whereas delayed human judgment can still bottleneck autonomous work.

### D-006 — 2026-09-10 — Avoid engagement-maximizing incentives

**Decision:** Do not optimize the product for screen time or ad impressions in the initial strategy.

**Reason:** The product should reduce attention waste. Incentives that benefit from longer waiting conflict with the core value proposition.

### D-007 — 2026-09-10 — Working name is `AI Wait OS`

**Decision:** Use `AI Wait OS` / repository candidate `ai-wait-os` as a descriptive placeholder only.

**Reason:** It is clear during incubation, but the final brand should reflect human attention rather than waiting if the product advances toward orchestration.

### D-008 — 2026-09-10 — Recovery is a first-class scheduler outcome

**Decision:** The scheduler must be able to recommend recovery or no intervention instead of always recommending another productive task.

**Reason:** Maximizing use of every waiting minute can create harmful context switching and make the product feel like an efficiency pressure system. The durable product goal is valuable attention allocation, not maximum human utilization.

### D-009 — 2026-09-10 — Recreation belongs in the final vision but remains opt-in

**Decision:** Bounded recreation/leisure may be managed by the final Attention OS, but only when the user explicitly enables it. It is not required for MVP.

**Reason:** Leisure can be a legitimate way to reclaim longer agent gaps, but unsolicited entertainment management would expand product scope, increase distraction risk, and undermine user agency.

### D-010 — 2026-09-10 — Manage recreation boundaries, not content addiction

**Decision:** If recreation is implemented, optimize safe duration and clean return timing rather than engagement or content consumption.

**Reason:** The product's advantage is coordination with agent timing. Building a feed-ranking or engagement engine would conflict with the core mission and create bad incentives.

### D-011 — 2026-09-10 — Off-hours are protected policy state

**Decision:** Off-hours must be a first-class scheduling policy. Non-urgent AI results and checkpoints should normally wait for the next work period.

**Reason:** AI can work 24/7; humans should not be forced into 24/7 availability. One of the product's long-term values is separating machine operating time from human availability.

### D-012 — 2026-09-10 — Recovery logic is not a health product

**Decision:** Do not diagnose fatigue, stress, burnout, or medical state. Base early recovery suggestions on explicit preferences and ordinary timing/context signals.

**Reason:** The product needs only enough information to coordinate attention. Medical or psychological inference adds risk, privacy burden, and unnecessary scope.

### D-013 — 2026-09-10 — The final product optimizes states before tasks

**Decision:** The Attention Engine should first choose among `HUMAN_DECISION`, `HUMAN_WORK`, `RECOVERY`, `RECREATION`, `OFF`, and `NO_RECOMMENDATION`, then choose a concrete activity only when relevant.

**Reason:** Task ranking alone encodes the wrong assumption that every available gap should contain a task. State-first scheduling better represents the actual product mission.

## Open questions

- How many genuinely usable agent gaps does a power user experience each day?
- What is the minimum useful gap after accounting for context-switch cost?
- How often is the best outcome work, recovery, recreation, or no intervention?
- When do users perceive recovery suggestions as helpful versus patronizing or intrusive?
- Do users want recreation to be suggested automatically, or only available as a user-triggered mode?
- Which leisure activities can be bounded reliably enough to support clean return timing?
- Which agent tools expose reliable completion and `needs_human` signals?
- Will users grant a cross-agent service enough visibility to coordinate their work?
- How much content must be stored to make checkpoints understandable?
- Which checkpoint types may safely be deferred until a clean interruption point?
- How should quiet-hour and off-hour policies work for individuals versus teams?
- Is individual willingness to pay sufficient, or is team/enterprise orchestration the better business?
- Which source should be the first automatic integration?

Treat these as research questions, not assumptions to silently convert into requirements.
