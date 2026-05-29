import HeroSection from "@/components/HeroSection";
import JobDetailsSection from "@/components/JobDetailsSection";
import ApplicationForm from "@/components/ApplicationForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <JobDetailsSection />
      <ApplicationForm />
      <footer className="bg-gray-900 text-gray-400 text-center py-8 text-sm">
        <p>© 2024 PeopleFirst HR · All rights reserved</p>
        <p className="mt-1 text-gray-600">careers@peoplefirsthr.com</p>
      </footer>
    </main>
  );
}
