import { MotionConfig } from 'framer-motion'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import ClosedBanner from './components/ClosedBanner'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Statement from './components/Statement'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Reservations from './components/Reservations'
import Location from './components/Location'
import Footer from './components/Footer'
import OrderCart from './components/OrderCart'
import AdminLayout from './pages/AdminLayout'
import AdminOrders from './pages/AdminOrders'
import AdminSales from './pages/AdminSales'
import AdminMenu from './pages/AdminMenu'
import AdminTables from './pages/AdminTables'
import AdminQRCode from './pages/AdminQRCode'

import './components/Header.css'
import './components/Hero.css'
import './components/About.css'
import './components/Menu.css'
import './components/Statement.css'
import './components/Gallery.css'
import './components/Testimonials.css'
import './components/Reservations.css'
import './components/Location.css'
import './components/Footer.css'
import './components/OrderCart.css'
import './components/ClosedBanner.css'
import './components/DeliveryBadges.css'
import './pages/Admin.css'

function MainSite() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <ClosedBanner />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Menu />
        <Statement />
        <Gallery />
        <Testimonials />
        <Reservations />
        <Location />
      </main>
      <Footer />
      <OrderCart />
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainSite />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOrders />} />
              <Route path="sales" element={<AdminSales />} />
              <Route path="menu" element={<AdminMenu />} />
              <Route path="tables" element={<AdminTables />} />
              <Route path="qr" element={<AdminQRCode />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </MotionConfig>
  )
}
