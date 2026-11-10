import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import ProductShowcase from '@/components/ProductShowcase/ProductShowcase';
import Applications from '@/components/Applications/Applications';
import WhyChoose from '@/components/WhyChoose/WhyChoose';
import Packaging from '@/components/Packaging/Packaging';
import GlobalSupply from '@/components/GlobalSupply/GlobalSupply';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <ProductShowcase />
        <Applications />
        <WhyChoose />
        <Packaging />
        <GlobalSupply />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
