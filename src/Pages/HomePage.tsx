import About from "../Components/HomePage/About/About";
import Counter from "../Components/HomePage/Counter/Counter";
import FAQ from "../Components/HomePage/FAQ/FAQ";
import HeroSection from "../Components/HomePage/HeroSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <About></About>
      <Counter></Counter>
      <FAQ></FAQ>
    </div>
  );
};

export default HomePage;
