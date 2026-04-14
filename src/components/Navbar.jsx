import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Menu, X } from 'lucide-react';

export default function Navbar({ toggleCart, cartCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="top-bar">
        <div className="ticker-container">
          <div className="ticker-content">
            Frete grátis em compras acima de R$ 249,97 • Conheça nossa nova linha de óleos essenciais • Matú: Natureza em cada gota •
          </div>
        </div>
      </div>
      
      <header className="navbar">
        <div className="container nav-content">
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
            <Menu />
          </button>

          <Link to="/" className="brand-logo">
            <img src="/images/logo.png" alt="MATÚ" className="logo-img" />
          </Link>

          <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <button className="close-menu-btn" onClick={() => setMobileMenuOpen(false)}>
              <X />
            </button>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/#produtos" onClick={() => setMobileMenuOpen(false)}>Produtos</Link>
            <Link to="/#sobre" onClick={() => setMobileMenuOpen(false)}>Nossa Essência</Link>
          </nav>

          <div className="nav-actions">
            <Link to="/login" className="btn-icon">
              <User size={22} />
            </Link>
            <button className="btn-icon cart-btn" onClick={toggleCart}>
              <ShoppingBag size={22} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>

        <style>{`
          .top-bar {
            background-color: var(--color-primary);
            color: white;
            height: 35px;
            display: flex;
            align-items: center;
            font-size: 0.8rem;
            font-weight: 500;
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 101;
            letter-spacing: 0.05em;
          }

          .navbar {
            position: fixed;
            top: 35px;
            left: 0;
            width: 100%;
            z-index: 100;
            height: 80px;
            display: flex;
            align-items: center;
            background-color: white;
            border-bottom: 1px solid var(--color-border);
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          }

          .nav-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }

          .brand-logo {
            display: flex;
            align-items: center;
          }

          .logo-img {
            height: 60px;
            width: auto;
            object-fit: contain;
          }

          .nav-links {
            display: flex;
            gap: 3rem;
            align-items: center;
          }

          .nav-links a {
            font-weight: 600;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--color-text-dark);
            position: relative;
          }

          .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background-color: var(--color-primary);
            transition: width 0.3s ease;
          }

          .nav-links a:hover::after {
            width: 100%;
          }

          .nav-actions {
            display: flex;
            gap: 1.2rem;
            align-items: center;
          }

          .cart-btn {
            position: relative;
          }

          .cart-badge {
            position: absolute;
            top: 4px;
            right: 4px;
            background-color: var(--color-accent);
            color: white;
            font-size: 0.65rem;
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            font-weight: 700;
          }

          .mobile-menu-btn, .close-menu-btn {
            display: none;
            color: var(--color-primary);
          }

          @media (max-width: 768px) {
            .nav-links {
              position: fixed;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100vh;
              background-color: white;
              flex-direction: column;
              justify-content: center;
              padding: 2rem;
              transition: left 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
            }

            .nav-links.active {
              left: 0;
            }

            .mobile-menu-btn {
              display: block;
            }

            .close-menu-btn {
              display: block;
              position: absolute;
              top: 2rem;
              right: 2rem;
            }

            .nav-links a {
              font-size: 1.5rem;
            }
          }
        `}</style>
      </header>
    </>
  );
}


