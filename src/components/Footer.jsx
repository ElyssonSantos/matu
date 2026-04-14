import React from 'react';
import { Leaf, Rabbit, Recycle, Droplets, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="benefits-section">
          <div className="benefit-circle-item">
            <div className="icon-circle">
              <Leaf size={32} />
            </div>
            <span>100% Natural</span>
          </div>
          <div className="benefit-circle-item">
            <div className="icon-circle">
              <Rabbit size={32} />
            </div>
            <span>Cruelty-Free</span>
          </div>
          <div className="benefit-circle-item">
            <div className="icon-circle">
              <Recycle size={32} />
            </div>
            <span>Sustentável</span>
          </div>
          <div className="benefit-circle-item">
            <div className="icon-circle">
              <Droplets size={32} />
            </div>
            <span>Ingredientes Selecionados</span>
          </div>
        </div>
      </div>

      <div className="footer-sand-bg">
        <div className="container">
          <div className="footer-content">
            <div className="footer-col brand-col">
              <img src="/images/logo.png" alt="MATÚ" className="footer-logo" />
              <p>Cosméticos naturais que respeitam sua pele e o seu tempo. Beleza que vem de dentro — e da natureza.</p>
            </div>

            <div className="footer-col">
              <h3>Navegação</h3>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/#produtos">Produtos</a></li>
                <li><a href="/#sobre">Nossa Essência</a></li>
                <li><a href="/login">Minha Conta</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Suporte</h3>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Envio e Entrega</a></li>
                <li><a href="#">Trocas e Devoluções</a></li>
                <li><a href="#">Termos de Uso</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Newsletter</h3>
              <p>Assine para receber novidades e 10% OFF na sua primeira compra.</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="E-mail" required />
                <button type="submit" className="btn-newsletter-submit">
                  <ChevronRight size={20} />
                </button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Matú Cosméticos. Arte e Natureza em harmonia.</p>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: white;
          padding-top: 6rem;
          color: var(--color-text-medium);
          overflow-x: hidden;
        }

        .benefits-section {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-bottom: 8rem;
          text-align: center;
        }

        .benefit-circle-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .icon-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: none;
        }

        .benefit-circle-item span {
          font-weight: 600;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-primary);
        }

        .footer-sand-bg {
          background-color: var(--color-bg-sand);
          width: 100vw;
          margin-left: 50%;
          transform: translateX(-50%);
          padding: 6rem 0 2rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 4rem;
          padding-bottom: 4rem;
        }

        .footer-logo {
          height: 85px;
          margin-bottom: 2rem;
        }

        .footer-col h3 {
          font-size: 1rem;
          margin-bottom: 2rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-dark);
        }

        .footer-col ul {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          list-style: none;
        }

        .footer-col a {
          font-size: 0.95rem;
        }

        .footer-col a:hover {
          color: var(--color-primary);
          padding-left: 5px;
        }

        .newsletter-form {
          display: flex;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }

        .newsletter-form input {
          flex: 1;
          padding: 0.8rem 1.2rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          font-family: var(--font-body);
          outline: none;
        }

        .btn-newsletter-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
          background-color: var(--color-primary);
          color: white;
          border-radius: var(--radius-md);
          transition: all 0.3s ease;
        }

        .btn-newsletter-submit:hover {
          background-color: var(--color-accent);
          transform: scale(1.05);
        }

        .footer-bottom {
          padding: 2.5rem 0;
          border-top: 1px solid rgba(0,0,0,0.05);
          text-align: center;
          font-size: 0.85rem;
          letter-spacing: 0.02em;
        }

        @media (max-width: 992px) {
          .benefits-section {
            grid-template-columns: repeat(2, 1fr);
          }
          .footer-content {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .footer { padding-top: 4rem; }
          .benefits-section { 
            grid-template-columns: repeat(2, 1fr); 
            gap: 1.5rem; 
            margin-bottom: 4rem;
          }
          .benefit-circle-item span { font-size: 0.65rem; }
          .icon-circle { width: 50px; height: 50px; }
          .icon-circle svg { width: 20px; height: 20px; }
          
          .footer-sand-bg { padding: 4rem 0 2rem; }
          .footer-content { grid-template-columns: 1fr; gap: 3rem; }
          .footer-col h2 { font-size: 2.5rem; }
          .newsletter-form { flex-direction: row; }
        }
      `}</style>
    </footer>
  );
}
