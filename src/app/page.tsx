import Home from '@/pages/Home';
import About from '@/pages/About';
import FAQ from '@/pages/FAQ';
import Footer from '@/components/Footer';
import Feedback from '@/pages/Feedback';

// TO-DO: Add GSAP to all except components
// TO-DO: Make Responsive
// TO-DO: Check where Bootstrap can be added
// TO-DO: Responsiveness

export default function App() {
  return (
      <div>
        <Home />
        <About />
        <FAQ />
        <Feedback />
        <Footer />
      </div>
  );
}
