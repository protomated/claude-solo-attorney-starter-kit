export default function Footer() {
  return (
    <footer className="bg-navy-dark py-14 font-sans text-sm text-[#8899bb]">
      <div className="mx-auto max-w-[960px] px-6">
        <div className="mb-10 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-8">
          <div>
            <strong className="mb-2.5 block text-[0.85rem] uppercase tracking-wider text-[#d0daea]">
              Solo Attorney Claude Starter Kit
            </strong>
            <p className="leading-relaxed">
              A free Claude Desktop plugin by{" "}
              <a
                href="https://protomated.com"
                className="text-[#6b8bbf] no-underline hover:text-[#aac0e0] hover:underline"
              >
                Protomated
              </a>
              .
            </p>
          </div>
          <div>
            <strong className="mb-2.5 block text-[0.85rem] uppercase tracking-wider text-[#d0daea]">
              Links
            </strong>
            <ul className="flex list-none flex-col gap-1.5 p-0">
              <li>
                <a
                  href="/downloads/solo-attorney-starter-kit.zip"
                  download
                  className="text-[#6b8bbf] no-underline hover:text-[#aac0e0] hover:underline"
                >
                  Download
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/protomated/claude-solo-attorney-starter-kit"
                  className="text-[#6b8bbf] no-underline hover:text-[#aac0e0] hover:underline"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/protomated/claude-solo-attorney-starter-kit/issues"
                  className="text-[#6b8bbf] no-underline hover:text-[#aac0e0] hover:underline"
                >
                  Report an issue
                </a>
              </li>
            </ul>
          </div>
          <div>
            <strong className="mb-2.5 block text-[0.85rem] uppercase tracking-wider text-[#d0daea]">
              Protomated
            </strong>
            <ul className="flex list-none flex-col gap-1.5 p-0">
              <li>
                <a
                  href="https://protomated.com/call"
                  className="text-[#6b8bbf] no-underline hover:text-[#aac0e0] hover:underline"
                >
                  Book a call
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@protomated.com"
                  className="text-[#6b8bbf] no-underline hover:text-[#aac0e0] hover:underline"
                >
                  hello@protomated.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="border-t border-[#1e2e4a] pt-6 text-xs leading-relaxed text-[#4a5e80]">
          This plugin is a drafting tool. It does not provide legal advice. All
          AI-generated output must be reviewed by a licensed attorney before
          use. &copy; {new Date().getFullYear()} Protomated.
        </p>
      </div>
    </footer>
  );
}
