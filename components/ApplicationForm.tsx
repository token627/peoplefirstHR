"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationSchema, ApplicationSchema } from "@/lib/validation";
import { FormState } from "@/types/application";

const ROLES = [
  "Senior Frontend Developer",
  "Senior Full Stack Developer",
  "React Native Developer",
  "Engineering Manager",
  "Other",
];

export default function ApplicationForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationSchema>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: ApplicationSchema) => {
    setFormState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Submission failed");
      }

      setFormState("success");
      reset();
    } catch (err) {
      setFormState("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (formState === "success") {
    return (
      <section id="apply" className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Application Submitted!</h2>
          <p className="text-gray-600 text-lg mb-8">
            Thanks for applying to PeopleFirst HR. We&apos;ve received your application and will
            be in touch shortly via email.
          </p>
          <button
            onClick={() => setFormState("idle")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Submit Another Application
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
            Apply Today
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Submit Your Application
          </h2>
          <p className="text-gray-500 mt-3">
            Takes less than 5 minutes. We review every application personally.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          {/* Honeypot — hidden from real users */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="absolute -left-[9999px] opacity-0 pointer-events-none"
            aria-hidden="true"
            {...register("honeypot")}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Jane Smith"
                className={`w-full px-4 py-3 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.fullName ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
                }`}
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="mt-1.5 text-sm text-red-600">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="jane@example.com"
                className={`w-full px-4 py-3 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.email ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
                }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1.5">
                Role Applying For <span className="text-red-500">*</span>
              </label>
              <select
                id="role"
                className={`w-full px-4 py-3 border rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none bg-white ${
                  errors.role ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
                {...register("role")}
                defaultValue=""
              >
                <option value="" disabled>Select a role</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              {errors.role && (
                <p className="mt-1.5 text-sm text-red-600">{errors.role.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1.5">
                Years of Experience <span className="text-red-500">*</span>
              </label>
              <input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="e.g. 6"
                className={`w-full px-4 py-3 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.experience ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
                }`}
                {...register("experience")}
              />
              {errors.experience && (
                <p className="mt-1.5 text-sm text-red-600">{errors.experience.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="interestNote" className="block text-sm font-medium text-gray-700 mb-1.5">
              Why are you interested in this role? <span className="text-red-500">*</span>
            </label>
            <textarea
              id="interestNote"
              rows={5}
              placeholder="Tell us what excites you about this opportunity and what you'd bring to the team..."
              className={`w-full px-4 py-3 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none ${
                errors.interestNote ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
              }`}
              {...register("interestNote")}
            />
            {errors.interestNote && (
              <p className="mt-1.5 text-sm text-red-600">{errors.interestNote.message}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="portfolioUrl" className="block text-sm font-medium text-gray-700 mb-1.5">
                Portfolio URL <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="portfolioUrl"
                type="url"
                placeholder="https://yourportfolio.com"
                className={`w-full px-4 py-3 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.portfolioUrl ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
                }`}
                {...register("portfolioUrl")}
              />
              {errors.portfolioUrl && (
                <p className="mt-1.5 text-sm text-red-600">{errors.portfolioUrl.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-1.5">
                LinkedIn URL <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="linkedinUrl"
                type="url"
                placeholder="https://linkedin.com/in/yourname"
                className={`w-full px-4 py-3 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.linkedinUrl ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
                }`}
                {...register("linkedinUrl")}
              />
              {errors.linkedinUrl && (
                <p className="mt-1.5 text-sm text-red-600">{errors.linkedinUrl.message}</p>
              )}
            </div>
          </div>

          {formState === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
              {errorMessage || "Something went wrong. Please try again."}
            </div>
          )}

          <button
            type="submit"
            disabled={formState === "loading"}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed text-base flex items-center justify-center gap-2"
          >
            {formState === "loading" ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Submitting Application...
              </>
            ) : (
              "Submit Application"
            )}
          </button>

          <p className="text-center text-xs text-gray-400">
            By submitting, you agree to our privacy policy. We never share your data.
          </p>
        </form>
      </div>
    </section>
  );
}
