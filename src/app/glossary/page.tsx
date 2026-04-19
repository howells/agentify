import { glossaryTerms } from "@/data/glossary";
import { GlossaryGrid } from "@/components/GlossaryGrid";

export const metadata = {
  title: "Agentic Glossary — Agent Surface",
  description:
    "24 essential terms for the AI agent era — plain-language definitions of MCP, RAG, LLMOps, A2A, and the infrastructure concepts every C-suite and PM should understand.",
};

export default function GlossaryPage() {
  return (
    <main className="flex flex-col items-center bg-fd-background text-fd-foreground">
      {/* Hero */}
      <section className="w-full max-w-5xl px-6 pt-24 pb-12 sm:px-10">
        <p className="text-xs font-medium uppercase tracking-widest text-fd-muted-foreground font-mono">
          Agentic Glossary
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          The language of
          <br />
          intelligent software.
        </h1>
        <p className="mt-6 max-w-xl text-[0.9375rem] leading-7 text-fd-muted-foreground">
          24 concepts every product leader and executive needs to navigate the AI
          agent landscape. Filter by category or scroll through all. Click any
          card to go deeper.
        </p>
      </section>

      {/* Terms */}
      <section className="w-full border-t border-fd-border">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:px-10 overflow-hidden">
          <GlossaryGrid terms={glossaryTerms} />
        </div>
      </section>

      {/* Footer note */}
      <section className="w-full border-t border-fd-border">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:px-10">
          <p className="text-sm leading-7 text-fd-muted-foreground max-w-lg">
            Definitions are written for product and business audiences. For
            technical depth, see the{" "}
            <a
              href="/docs"
              className="text-fd-foreground underline underline-offset-4 hover:no-underline"
            >
              full documentation
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
