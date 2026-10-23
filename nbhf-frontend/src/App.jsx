import Home from './components/Home'
import PrivacyPolicy from "./pages/PrivacyPolicy"
import TermsAndConditions from "./pages/TermsAndConditions"
import About from "./pages/About"
import AgriWaste from "./pages/AgriWaste"
import CowDung from "./pages/CowDung"
import Contact from "./pages/Contact"
import Order from "./pages/Order"
import Products from "./pages/Products"
import Industries from "./pages/Industries"
import Faqs from "./pages/Faqs"
import Admin from "./pages/Admin"
import { Routes, Route, Navigate } from 'react-router-dom'



const App = () => {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/agri-waste" element={<AgriWaste />} />
        <Route path="/products/cow-dung" element={<CowDung />} />
        <Route path="/agri-waste" element={<Navigate to="/products/agri-waste" replace />} />
        <Route path="/cow-dung" element={<Navigate to="/products/cow-dung" replace />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order" element={<Order />} />
        <Route path="/admin" element={<Admin />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
    </>
  )
}

export default App