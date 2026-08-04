import { Card, CardContent } from "@/components/ui/card";

const skills = [
  {
    command: "/intake-summary",
    title: "Intake Summary",
    desc: "Converts raw consultation notes into a structured case brief: parties, facts, deadlines, evidence checklist, and conflicts flag. Run first on any new matter — creates the anchor file every other skill reads from.",
  },
  {
    command: "/engagement-letter",
    title: "Engagement Letter",
    desc: "Generates a retainer and engagement letter from client intake data — scope, fees (hourly, flat, or contingency), and required ethical disclosures.",
  },
  {
    command: "/court-deadline",
    title: "Court Deadline Reasoning",
    desc: "Computes a court or filing deadline from a trigger date and rule you provide. Shows step-by-step reasoning. Drafts a Google Calendar event — you confirm before it's created.",
  },
  {
    command: "/meeting-prep",
    title: "Meeting Prep Brief",
    desc: "Pulls context from your matter folder to produce a one-page brief before a client meeting, deposition, mediation, or court appearance.",
  },
  {
    command: "/billing-narrative",
    title: "Billing Narrative",
    desc: "Drafts a billing-code-appropriate time narrative from your rough notes or an email thread. You confirm accuracy and paste into Clio, MyCase, or any billing system.",
  },
  {
    command: "/new-matter-organizer",
    title: "New-Matter Organizer",
    desc: "Creates the standard folder tree and task checklist for a new matter based on practice area. Sorts existing documents by type. Proposes everything — no files or folders created without your confirmation.",
  },
  {
    command: "/flat-fee-calculator",
    title: "Flat-Fee Repricing Calculator",
    desc: "Builds a revenue-impact model comparing hourly billing to flat-fee pricing for tasks you've sped up with AI. Outputs a CSV with candidate price points that preserve margin instead of giving the time savings away for free.",
  },
  {
    command: "/research-memo",
    title: "Verified-Source Research Memo",
    desc: "Drafts a legal research memo citing only the source documents you attach — no web search, no case-law database. Refuses to cite anything not supplied and appends a mandatory citation-verification checklist.",
  },
];

export default function Skills() {
  return (
    <section className="bg-muted py-20" id="skills">
      <div className="mx-auto max-w-[960px] px-6">
        <h2 className="mb-3 text-center text-[1.9rem]">8 skills included</h2>
        <p className="mx-auto mb-12 max-w-[560px] text-center font-sans text-base text-muted-foreground">
          Each skill knows which files and emails to read, what to draft, and to
          wait for your confirmation before taking any action.
        </p>
        <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 p-0">
          {skills.map((s) => (
            <li key={s.command}>
              <Card className="h-full">
                <CardContent className="flex flex-col gap-2">
                  <code className="w-fit rounded bg-accent px-2 py-0.5 font-mono text-xs text-accent-foreground">
                    {s.command}
                  </code>
                  <strong className="font-serif text-[1.05rem] text-navy">
                    {s.title}
                  </strong>
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
