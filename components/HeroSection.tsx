"use client";

export default function HeroSection() {
  const handleApplyClick = () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Now Hiring · Remote · Worldwide
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Build the future with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
            PeopleFirst HR
          </span>
        </h1>

        <p className="text-lg md:text-xl text-indigo-200 max-w-2xl mx-auto mb-10 leading-relaxed">
          We believe in putting people first. Join a team that values talent,
          drives innovation, and builds products that matter — all from wherever
          you call home.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleApplyClick}
            className="bg-white text-indigo-900 font-semibold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base"
          >
            Apply Now
          </button>
          <a
            href="#job-details"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("job-details")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-200 text-base"
          >
            View Job Details
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Team Members", value: "200+" },
            { label: "Countries", value: "32" },
            { label: "Open Roles", value: "12" },
            { label: "Glassdoor Rating", value: "4.8★" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-indigo-300 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
