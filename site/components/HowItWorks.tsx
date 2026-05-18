const steps = [
  {
    n: "1",
    title: "Download and install",
    desc: "Double-click the .mcpb file. Claude Desktop installs the plugin automatically — no Terminal, no config files.",
  },
  {
    n: "2",
    title: "Connect Gmail and your matters folder",
    desc: "One click each in Claude Desktop → Connectors. Anthropic handles the OAuth; your credentials never touch our servers.",
  },
  {
    n: "3",
    title: "Type a skill command",
    desc: "Claude reads your files, drafts the document, and waits for your review and confirmation before sending or saving anything.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20" id="how-it-works">
      <div className="mx-auto max-w-[960px] px-6">
        <h2 className="mb-12 text-center text-[1.9rem]">How it works</h2>
        <ol className="mx-auto flex max-w-[640px] list-none flex-col gap-7 p-0">
          {steps.map((s) => (
            <li key={s.n} className="flex items-start gap-5">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-sans text-base font-bold text-primary-foreground">
                {s.n}
              </span>
              <div>
                <strong className="mb-1.5 block font-serif text-[1.05rem] text-navy">
                  {s.title}
                </strong>
                <p className="font-sans text-[0.95rem] leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
