import { Card, CardContent } from "@/components/ui/card";

const skills = [
  {
    command: "/client-status-update",
    title: "Client Status Update",
    desc: "Reads your matter folder and recent Gmail, then drafts a personalized update email in your voice. You review it; one confirm to send.",
  },
  {
    command: "/demand-letter",
    title: "Demand Letter",
    desc: "Drafts practice-area-specific demand letters from your intake files. Supports personal injury, contract breach, employment, and collections.",
  },
  {
    command: "/engagement-letter",
    title: "Engagement Letter",
    desc: "Generates a retainer and engagement letter from client intake data — scope, fees (hourly, flat, or contingency), and required disclosures.",
  },
  {
    command: "/intake-summary",
    title: "Intake Summary",
    desc: "Converts raw consultation notes into a structured case brief: parties, facts, deadlines, evidence checklist, and conflicts flag. The anchor document every other skill reads from.",
  },
  {
    command: "/meeting-prep",
    title: "Meeting Prep Brief",
    desc: "Pulls context from your matter folder to produce a one-page brief before a client meeting, deposition, mediation, or court appearance.",
  },
];

export default function Skills() {
  return (
    <section className="bg-muted py-20" id="skills">
      <div className="mx-auto max-w-[960px] px-6">
        <h2 className="mb-3 text-center text-[1.9rem]">5 skills included</h2>
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
