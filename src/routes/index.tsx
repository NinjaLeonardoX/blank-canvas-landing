import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "../assets/hero-abstract.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumina — Light, made simple" },
      { name: "description", content: "A quiet space for focused work and calm creativity." },
      { property: "og:title", content: "Lumina" },
      {
        property: "og:description",
        content: "A quiet space for focused work and calm creativity.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[oklch(0.97_0.01_85)] px-6 text-center">
      <img
        src={heroImage}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="relative z-10 max-w-xl">
        <p className="text-sm font-medium tracking-widest uppercase text-[oklch(0.55_0.06_35)]">
          Coming soon
        </p>
        <h1 className="mt-4 text-5xl font-light tracking-tight text-[oklch(0.15_0.02_30)] sm:text-6xl">
          Lumina
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[oklch(0.45_0.03_40)]">
          A quiet space for focused work and calm creativity. No noise, no clutter — just light.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#"
            className="inline-flex items-center rounded-full bg-[oklch(0.15_0.02_30)] px-8 py-3 text-sm font-medium text-[oklch(0.97_0.01_85)] transition-colors hover:bg-[oklch(0.25_0.03_35)]"
          >
            Join the waitlist
          </a>
          <Link
            to="/dashboard"
            className="inline-flex items-center rounded-full border border-[oklch(0.15_0.02_30)] px-8 py-3 text-sm font-medium text-[oklch(0.15_0.02_30)] transition-colors hover:bg-[oklch(0.15_0.02_30)] hover:text-[oklch(0.97_0.01_85)]"
          >
            Open dashboard
          </Link>
        </div>
      </div>
      <div className="absolute bottom-6 left-0 right-0 z-10 text-center text-xs text-[oklch(0.55_0.04_40)]">
        © 2026 Lumina
      </div>
    </div>
  );
}
