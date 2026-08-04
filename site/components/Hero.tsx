export default function Hero() {
  return (
    <section className="bg-navy py-20 text-center text-white">
      <div className="mx-auto max-w-[960px] px-6">
        <span className="mb-6 inline-block rounded-full bg-accent px-4 py-1 font-sans text-xs font-bold uppercase tracking-widest text-accent-foreground">
          Free Claude Desktop Plugin
        </span>
        <h1 className="mx-auto mb-5 max-w-3xl text-[clamp(2rem,5vw,3rem)] text-white">
          Your AI-powered solo practice&nbsp;&mdash;<br />
          set up in 5 minutes.
        </h1>
        <p className="mx-auto mb-9 max-w-[620px] font-sans text-lg leading-relaxed text-[#b0bcd4]">
          8 pre-built skills that turn Claude Desktop into a solo attorney
          operations assistant. Organize new matters, draft engagement letters,
          compute court deadlines, prep for meetings, write billing
          narratives, model flat-fee repricing, and draft verified-source
          research memos &mdash; from your own files, without leaving Claude.
        </p>
        <a
          href="#download"
          className="inline-block rounded-lg bg-primary px-8 py-3.5 font-sans text-base font-semibold text-primary-foreground no-underline transition-colors hover:bg-primary/90 hover:no-underline"
        >
          Download free &rarr;
        </a>
        <p className="mt-4 font-sans text-sm text-[#8899bb]">
          Requires Claude for Work, Claude Team, or Claude Enterprise.{" "}
          <a href="#compliance" className="text-[#8899bb]">
            Why?
          </a>
        </p>
      </div>
    </section>
  );
}
