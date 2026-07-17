# Engineer Onboarding: n8n Template Catalog (NTC)
Read this before you pull your first issue. Bookmark it. It is the reference for how we build.

## What this project is

We build a catalog of free, deployable n8n workflow templates for solo and small law firms. Firms up to 10 attorneys. The catalog is a lead magnet. A prospect deploys a free template. Then they hire Protomated to build the advanced version.

## Why it exists

Protomated sells client acquisition and operations systems to law firms. Firms lose clients in the gaps. Only about 7 percent of inquiries become signed clients. A quarter of booked consults never show. Missed deadlines drive about 24.6 percent of malpractice claims. Each template plugs one of these leaks. Each template must replace a paid tool, recover lost revenue, or save a role real hours each week.

## Your role

You pull a pending template from the Backlog. You build the workflow in n8n. You test it end to end. You write a short deploy guide. You record a Loom walkthrough. You move the issue to Growth Review when it passes the quality bar.

## The one hard rule

We never touch the client's legal work. This is core to Protomated's positioning and to ABA Opinion 512. Do not build automation that drafts legal text, analyzes clauses, summarizes case law, redacts for privilege, or makes a legal judgment. If a template seems to need any of that, stop and flag the growth manager. Operational tasks are fine. Fine examples: routing leads, sending reminders, filling firm provided form fields, filing documents, calculating deadlines from firm entered rules.

## Every client-facing template inherits the guardrail

Wrap client facing automations with the OPS1 compliance layer. That means disclaimer insertion, opt-out handling, and an audit log. OPS1 is built first in Sprint 2. After that, reuse it on every client facing template.

## The stack

Build on what these firms already run. Practice management: Clio, MyCase, PracticePanther, Docketwise. Email and calendar: Microsoft 365, Outlook, Google Workspace. Billing: QuickBooks. E-sign: DocuSign. Reviews: Google Business Profile. Calls and SMS: Twilio, CallRail. Our CRM for captured leads: Salesmate. Forms on our site: Fluent Forms. Our own product: LegalContext.

## Definition of done for your stage (In Development)

The workflow is built and tested in n8n. A deploy guide draft exists. A Loom walkthrough is recorded. The template passes all five quality bar checks below. The custom fields on the issue are correct.

## The quality bar

1. Money or leak test. It replaces a paid tool, recovers revenue, or saves 2 or more hours per week. Name the figure.
2. Compliance test. It does not touch legal work.
3. Searchability test. There is a phrase a firm owner would actually type that this ranks for.
4. Deployability test. A firm gets value in under 15 minutes with our guide. If not, it is a Build, not a free template.
5. Upsell test. There is a clear done-for-you version behind it.

## How issues are organized

Each template is one issue. Issues sit under Sprint Epics, Sprint 1 to 4, as subtasks. Pillar Epics group work by Get, Convert, Keep, Ops, and Authority. The custom fields on each issue tell you Tier, Pillar, Practice Area, Channel, Complexity, Replaces, Target Keyword, and Upsell Target.

## The pillars

Get: be found, be trusted, respond first. Convert: turn an inquiry into a signed retainer. Keep: run the matter and keep the client. Ops: cross-cutting foundation every firm needs. Authority: content and SEO trackers, not deployed to clients.

## What happens after you finish

You move the issue to Growth Review. The growth manager validates it and writes the landing page or the n8n listing. Dele gives final review. Then it publishes. See the companion article, Growth Manager Onboarding, for their half of the process.