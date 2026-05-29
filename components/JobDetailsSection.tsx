export default function JobDetailsSection() {
  const perks = [
    "Fully remote & async-first culture",
    "Competitive equity + salary",
    "Home office stipend ($1,500/yr)",
    "Learning & development budget",
    "Unlimited PTO policy",
    "Top-tier health coverage",
  ];

  const requirements = [
    "5+ years of frontend development experience",
    "Deep expertise in React, Next.js, and TypeScript",
    "Proficiency in modern CSS (Tailwind, CSS Modules)",
    "Experience with REST APIs and GraphQL",
    "Understanding of web performance optimization",
    "Excellent written English communication",
  ];

  const responsibilities = [
    "Lead development of customer-facing React applications",
    "Architect scalable frontend systems and component libraries",
    "Collaborate with design team to implement pixel-perfect UIs",
    "Mentor junior engineers and conduct code reviews",
    "Drive frontend performance improvements across the platform",
    "Contribute to engineering culture and best practices",
  ];

  return (
    <section id="job-details" className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
            Open Position
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Senior Frontend Developer
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {[
              { icon: "🌍", label: "Remote — Worldwide" },
              { icon: "💼", label: "Full-time" },
              { icon: "⏱️", label: "5+ Years Experience" },
              { icon: "💰", label: "$120k–$160k / year" },
            ].map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-sm px-4 py-1.5 rounded-full shadow-sm"
              >
                <span>{badge.icon}</span>
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm">✓</span>
              Requirements
            </h3>
            <ul className="space-y-3">
              {requirements.map((req) => (
                <li key={req} className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="text-indigo-500 mt-0.5">•</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm">⚡</span>
              Responsibilities
            </h3>
            <ul className="space-y-3">
              {responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="text-purple-500 mt-0.5">•</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm">🎁</span>
              Perks & Benefits
            </h3>
            <ul className="space-y-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-indigo-100 text-sm">
                  <span className="text-indigo-300 mt-0.5">✦</span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
