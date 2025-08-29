export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-semibold">About</h1>
      <p className="mt-4 text-slate-600 dark:text-slate-300">Our mission is to craft clean, modern, and highly appealing products that feel fast and accessible to everyone.</p>
      <div className="mt-10 space-y-6">
        <section>
          <h2 className="font-semibold">Timeline</h2>
          <ul className="mt-3 list-disc pl-6 text-sm text-slate-600 dark:text-slate-400">
            <li>2024 — Joyful Vibe started with a vision</li>
            <li>2025 — Public launch with multi-language support</li>
          </ul>
        </section>
        <section>
          <h2 className="font-semibold">Values</h2>
          <ul className="mt-3 list-disc pl-6 text-sm text-slate-600 dark:text-slate-400">
            <li>Empathy-driven design</li>
            <li>Accessibility by default</li>
            <li>Performance as a feature</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

