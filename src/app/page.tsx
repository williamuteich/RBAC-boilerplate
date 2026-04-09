import Hero from "./components/home/hero";
import Problem from "./components/home/problem";
import Solution from "./components/home/solution";
import AIFeatures from "./components/home/ai-features";
import MetricsDifferential from "./components/home/metrics-differential";
import HowItWorks from "./components/home/how-it-works";
import Pricing from "./components/home/pricing";
import Cta from "./components/home/cta";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 selection:bg-blue-600 selection:text-white">
      <Hero />
      <Problem />
      <Solution />
      <AIFeatures />
      <MetricsDifferential />
      <HowItWorks />
      <Pricing />
      <Cta />
    </div>
  );
}