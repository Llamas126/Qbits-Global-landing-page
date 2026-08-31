import { Toaster } from "sonner"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Overview from "./components/Overview"
import Services from "./components/Services"
import Pilares from "./components/Pilares"
import MisionVision from "./components/MisionVision"
import Contacto from "./components/Contacto"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Navbar />
      <Toaster position="top-center" richColors />
      <main>
        <Hero />
        <Overview />
        <Services />
        <Pilares />
        <MisionVision />
        <Contacto />
      </main>
      <Footer />
    </>
  )
}

export default App