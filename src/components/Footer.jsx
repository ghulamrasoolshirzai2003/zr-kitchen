import { restaurantInfo } from '../data/menuData'
import { InstagramIcon, FacebookIcon, TikTokIcon } from './icons'
import DeliveryBadges from './DeliveryBadges'
import logoFull from '../assets/logo-full.jpg'

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#menu', label: 'Menu' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#reservations', label: 'Reservations' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <a href="#home" className="site-footer__logo">
            <img src={logoFull} alt="ZR Kitchen — Flavor That Stays" />
          </a>
        </div>

        <nav aria-label="Footer">
          <p className="site-footer__heading">Explore</p>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="site-footer__heading">Hours</p>
          <ul>
            {restaurantInfo.hours.map((h) => (
              <li key={h.days}>
                {h.days}: {h.time}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="site-footer__heading">Order Delivery</p>
          <DeliveryBadges className="site-footer__delivery" />
        </div>

        <div>
          <p className="site-footer__heading">Follow</p>
          <div className="social-icons">
            <a
              href={restaurantInfo.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icons__link"
              aria-label="ZR Kitchen on Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href={restaurantInfo.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icons__link"
              aria-label="ZR Kitchen on Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href={restaurantInfo.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icons__link"
              aria-label="ZR Kitchen on TikTok"
            >
              <TikTokIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <span>© {new Date().getFullYear()} ZR Kitchen. All rights reserved.</span>
        <span>Designed for ZR Kitchen.</span>
      </div>
    </footer>
  )
}
