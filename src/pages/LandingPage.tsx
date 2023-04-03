import BrandsList from "../components/LandingPageComponents/BrandsList";
import Hero from "../components/LandingPageComponents/Hero";

function LandingPage() {
  const grade: number = 100;

  return (
    <main>
      <Hero />
      {/* <Hero grade={grade} />
      <Hero /> */}
      <BrandsList />
    </main>
  );
}

export default LandingPage;
