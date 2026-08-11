import AboutIntro from "./_components/AboutIntro";
import PageBanner from "../_components/PageBanner";
import AboutSection from "./_components/AboutSection";

const AboutPage = () => {
  return (
    <div>
      <PageBanner title="About" />
      <AboutIntro />
      <AboutSection />
    </div>
  );
};

export default AboutPage;
