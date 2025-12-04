import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CalculatorTabs from "@/components/CalculatorTabs";
import RouteInfo from "@/components/RouteInfo";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <CalculatorTabs />
      <RouteInfo />
      <Footer />
    </div>
  );
};

export default Index;