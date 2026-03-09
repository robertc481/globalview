import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import PortfolioPreview from "@/components/PortfolioPreview";
import ReviewsSection from "@/components/ReviewsSection";
import CTASection from "@/components/CTASection";

const slides = [
  { src: "/images/1.jpg", alt: "GV Construction project 1" },
  { src: "/images/2.jpg", alt: "GV Construction project 2" },
  { src: "/images/3.jpg", alt: "GV Construction project 3" },
  { src: "/images/4.jpg", alt: "GV Construction project 4" },
  { src: "/images/5.jpg", alt: "GV Construction project 5" },
];

export default function HomePage() {
  return (
    <>
      <HeroSlider images={slides} />
      <AboutSection />
      <PortfolioPreview />
      <ReviewsSection />
      <CTASection />
    </>
  );
}
