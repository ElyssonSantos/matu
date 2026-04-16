import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChevronLeft, ChevronRight, Leaf, Rabbit, Recycle, Droplets } from 'lucide-react';

/* ─── DATA ─── */
const sliderContent = [
  { 
    id: 1, 
    image: '/images/slider_1.png', 
    mobileImage: '/images/hero_bg_1775930365612.png' 
  },
  { 
    id: 2, 
    image: '/images/slider_2.png', 
    mobileImage: '/images/slider_2.png' 
  },
  { 
    id: 3, 
    image: '/images/slider_3.png', 
    mobileImage: '/images/slider_3.png' 
  }
];

const categories = [
  { id: 1, name: 'Capitã Aqua', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&fit=crop' },
  { id: 2, name: 'Capitã Nutre', image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800&fit=crop' },
  { id: 3, name: 'Capitã Force', image: 'https://images.unsplash.com/photo-1615397323602-5eef6317bc2d?q=80&w=800&fit=crop' },
  { id: 4, name: 'Finalizadores', image: 'https://images.unsplash.com/photo-1570194065650-d6faeb4ae288?q=80&w=800&fit=crop' }
];

const bestSellers = [
  { id: 1, name: 'Kit Progressiva Capilar 1L + Shampoo Capilar 1L | Magic Premium', price: 359.97, installments: '6x de R$ 59,99 Sem Juros', image: '/images/product_shampoo_solid.png', badge: '🔥 Mais vendidos' },
  { id: 2, name: 'Kit Fios de Madame - Linha Botox Capilar', price: 289.97, oldPrice: 369.97, installments: '6x de R$ 48,32 Sem Juros', image: '/images/product_shampoo_solid.png', badge: '🔥 Mais vendidos', discount: '22% OFF' },
  { id: 3, name: 'Progressiva Capilar 1L Passo 02 | Magic Premium', price: 299.97, installments: '6x de R$ 49,99 Sem Juros', image: '/images/product_shampoo_solid.png', badge: '🔥 Mais vendidos' },
  { id: 4, name: 'KIT EFEITO CARACÓIS + pH EQUILIBRE', price: 369.97, oldPrice: 659.97, installments: '6x de R$ 61,66 Sem Juros', image: '/images/product_shampoo_solid.png', discount: '44% OFF', type: 'social' }
];

const instagramReels = [
  { id: 1, poster: '/images/slider_1.png', product: 'Reparador Spray 60ml', oldPrice: 'R$ 116,97', price: 'R$ 58,48' },
  { id: 2, poster: '/images/slider_2.png', product: 'Shampoo Sólido Matú', oldPrice: 'R$ 89,97', price: 'R$ 59,97' },
  { id: 3, poster: '/images/slider_3.png', product: 'Sérum Facial Capitã', oldPrice: 'R$ 149,97', price: 'R$ 99,97' },
  { id: 4, poster: '/images/category_body.png', product: 'Óleo Corporal Premium', oldPrice: 'R$ 129,97', price: 'R$ 79,97' },
  { id: 5, poster: '/images/category_hair.png', product: 'Máscara Reconstrutora', oldPrice: 'R$ 99,97', price: 'R$ 69,97' },
  { id: 6, poster: '/images/category_oil.png', product: 'Tônico Equilibrante', oldPrice: 'R$ 79,97', price: 'R$ 49,97' }
];

const newArrivals = [
  { id: 5, name: 'Sérum Reparador 60ml - Cherry Oil', price: 79.97, image: '/images/product_bottle.png' },
  { id: 6, name: 'Manteiga de Karité Premium', price: 59.90, image: '/images/product_bottle.png' },
  { id: 7, name: 'Tônico Facial Equilibrante', price: 69.90, image: '/images/product_face_wash.png' },
  { id: 8, name: 'Óleo Multifuncional Argan', price: 89.90, image: '/images/product_body_oil.png' }
];

const testimonials = [
  { id: 1, name: 'Mariana Silva', text: 'Os produtos da Matú mudaram minha relação com o espelho. A textura é leve e o resultado é uma pele viçosa de verdade.', rating: 5, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 2, name: 'Camila Torres', text: 'Finalmente encontrei um shampoo sólido que realmente limpa sem agredir. E o cheiro é maravilhoso.', rating: 5, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 3, name: 'Juliana Paiva', text: 'O óleo corporal é meu momento de paz no dia. Sinto que estou dando o melhor para o meu corpo.', rating: 5, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 4, name: 'Beatriz Costa', text: 'O tônico equilibrante é perfeito para minha pele mista. Reduziu a oleosidade sem ressecar.', rating: 5, image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 5, name: 'Fernanda Lima', text: 'Não vivo mais sem o sérum renovador. Minha pele está mais firme e com um brilho natural incrível.', rating: 5, image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 6, name: 'Helena Souza', text: 'A manteiga de karité é um milagre para áreas secas. Uso no corpo todo e sinto a diferença imediata.', rating: 5, image: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&q=80&w=150&h=150' }
];

const faqData = [
  { q: "Como posso entrar em contato com vocês?", a: "Você pode nos contatar via WhatsApp, e-mail (contato@matu.com.br) ou através de nossas redes sociais. Estamos disponíveis de segunda a sexta, das 9h às 18h." },
  { q: "Quais são os benefícios de comprar na Matú?", a: "Ao escolher a Matú, você apoia uma marca 100% natural, vegana e cruelty-free. Nossos produtos são artesanais e focados em ingredientes botânicos de alta performance." },
  { q: "Como funciona o parcelamento das compras?", a: "Oferecemos parcelamento em até 6x sem juros em todos os cartões de crédito, com parcela mínima de R$ 50,00." },
  { q: "É seguro comprar na Matú?", a: "Sim! Utilizamos os protocolos de segurança mais modernos (SSL) e gateways de pagamento certificados para garantir total proteção aos seus dados." },
  { q: "Posso rastrear meu pedido?", a: "Com certeza. Assim que seu pedido for despachado, você receberá um código de rastreio via e-mail e WhatsApp para acompanhar cada passo da entrega." },
  { q: "Quais métodos de pagamento estão disponíveis?", a: "Aceitamos Pix (com 5% de desconto), Cartão de Crédito e Boleto Bancário." }
];

const benefitsData = [
  { icon: <Leaf size={32} />, title: '100% Natural', desc: 'Fórmulas puras, sem toxinas ou parabenos.' },
  { icon: <Rabbit size={32} />, title: 'Cruelty Free', desc: 'Beleza limpa. Nunca testado em animais.' },
  { icon: <Recycle size={32} />, title: 'Sustentável', desc: 'Embalagens e processos eco-conscientes.' },
  { icon: <Droplets size={32} />, title: 'Hidratação 48h', desc: 'Ativos botânicos de absorção profunda.' }
];

/* ─── REUSABLE PRODUCT CARD ─── */
function ProductCard({ product, addToCart }) {
  return (
    <div className="m-product-card swipe-item">
      <div className="m-product-img">
        {product.badge && <span className="m-badge">{product.badge}</span>}
        {product.discount && <span className="m-badge m-badge-discount">{product.discount}</span>}
        <img src={product.image} alt={product.name} />
      </div>
      <div className="m-product-info">
        <h3>{product.name}</h3>
        <div className="m-price-block">
          {product.oldPrice && <span className="m-old-price">R$ {product.oldPrice.toFixed(2).replace('.', ',')}</span>}
          <span className="m-price">R$ {product.price.toFixed(2).replace('.', ',')}</span>
          <span className="m-installments">Ou 6x de <strong>R$ {(product.price / 6).toFixed(2).replace('.', ',')}</strong> Sem Juros</span>
        </div>
        <button className="m-btn-buy" onClick={() => addToCart(product)}>
          {product.type === 'social' ? 'Saiba Mais' : 'Comprar'}
        </button>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function Home({ addToCart }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [tSlide, setTSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide(p => (p + 1) % sliderContent.length), 5000);
    return () => clearInterval(timer);
  }, [activeSlide]);

  const swipeScroll = (className, dir) => {
    const container = document.querySelector(`.${className}`);
    if (container) {
      container.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
    }
  };

  const nextT = () => setTSlide(p => (p + 1) % testimonials.length);
  const prevT = () => setTSlide(p => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="home-root">

      {/* ═══════════════ 1. HERO BANNER (DUAL SYSTEM) ═══════════════ */}
      <section className="hero-banner-section">
        {sliderContent.map((s, i) => (
          <div key={s.id} className={`hero-slide ${i === activeSlide ? 'active' : ''}`}>
            {/* Desktop Banner */}
            <img src={s.image} alt="Banner" className="hero-img-desktop" />
            {/* Mobile Banner */}
            <img src={s.mobileImage} alt="Banner" className="hero-img-mobile" />
          </div>
        ))}
        <div className="hero-dots">
          {sliderContent.map((_, i) => (
            <button key={i} className={`hero-dot ${i === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(i)} />
          ))}
        </div>
      </section>

      {/* ═══════════════ 2. BEST SELLERS ═══════════════ */}
      <section className="sect" id="produtos">
        <div className="ctnr">
          <div className="sect-head">
            <h2>Mais Vendidos</h2>
            <Link to="/#produtos" className="see-more">Ver Coleção <span className="sm-arrow"><ChevronRight size={14} /></span></Link>
          </div>
          <div className="swipe-track bs-track desktop-grid-4">
            {bestSellers.map(p => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}
          </div>
        </div>
      </section>

      {/* ═══════════════ 3. INSTAGRAM REELS ═══════════════ */}
      <section className="sect sect-bg">
        <div className="ctnr">
          <div className="sect-head">
            <h2>Matú no Instagram</h2>
            <p className="sect-sub">Acompanhe nossa rotina botânica e dicas de autocuidado.</p>
          </div>
          <div className="slider-wrapper">
            <button className="slider-nav prev" onClick={() => swipeScroll('reels-track', 'left')}><ChevronLeft size={22} /></button>
            <div className="swipe-track reels-track hide-scrollbar">
              {instagramReels.map(r => (
                <div key={r.id} className="reel-card swipe-item" onClick={() => window.open('https://instagram.com/matu.cosmeticos', '_blank')}>
                  <img src={r.poster} alt={r.product} className="reel-poster" />
                  <div className="reel-overlay">
                    <div className="reel-product-pill">
                      <img src="/images/product_face_wash.png" alt="" className="reel-thumb" />
                      <div>
                        <span className="reel-pname">{r.product}</span>
                        <span className="reel-pprice"><s>{r.oldPrice}</s> {r.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="slider-nav next" onClick={() => swipeScroll('reels-track', 'right')}><ChevronRight size={22} /></button>
          </div>
        </div>
      </section>

      {/* ═══════════════ 4. CAPITÃ AQUA HIGHLIGHT (BENTO GRID) ═══════════════ */}
      <section className="sect">
        <div className="ctnr-full">
          <div className="bento-grid">
            <Link to="/#produtos" className="bento-item item-large">
              <img src="/images/category_skin.png" alt="Capitã Aqua" />
              <div className="bento-content">
                <h3>Capitã Aqua</h3>
                <p>MÁSCARA HIDRATANTE PROFISSIONAL</p>
              </div>
            </Link>
            <Link to="/#produtos" className="bento-item item-small">
              <img src="/images/category_hair.png" alt="Capitã Nutre" />
              <div className="bento-content">
                <h3>Capitã Nutre</h3>
              </div>
            </Link>
            <Link to="/#produtos" className="bento-item item-small">
              <img src="/images/category_body.png" alt="Capitã Force" />
              <div className="bento-content">
                <h3>Capitã Force</h3>
              </div>
            </Link>
            <Link to="/#produtos" className="bento-item item-medium">
              <img src="/images/category_oil.png" alt="Finalizadores" />
              <div className="bento-content">
                <h3>Finalizadores</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. PARALLAX BANNER (DUAL SYSTEM) ═══════════════ */}
      <section className="parallax-banner-section">
        {/* Desktop Image */}
        <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1920&h=800&fit=crop" alt="Matú Natureza" className="par-img-desktop" />
        {/* Mobile Image */}
        <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&h=1000&fit=crop" alt="Matú Natureza Mobile" className="par-img-mobile" />
        <div className="par-overlay" />
        <div className="par-content">
          <h2>Sua verdadeira beleza desperta quando você se reconecta à natureza.</h2>
          <p>Rituais que respeitam o seu tempo e o meio ambiente.</p>
        </div>
      </section>

      {/* ═══════════════ 6. NEW ARRIVALS ═══════════════ */}
      <section className="sect">
        <div className="ctnr">
          <div className="sect-head">
            <h2>Nossas Novidades</h2>
            <Link to="/#produtos" className="see-more">Ver Mais <span className="sm-arrow"><ChevronRight size={14} /></span></Link>
          </div>
          <div className="swipe-track na-track desktop-grid-4">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}
          </div>
        </div>
      </section>

      {/* ═══════════════ 7. TESTIMONIALS ═══════════════ */}
      <section className="sect sect-bg">
        <div className="ctnr">
          <div className="sect-head"><h2>Relatos de Experiência</h2><p className="sect-sub">O que as pessoas estão sentindo com a Matú.</p></div>
          <div className="slider-wrapper">
            <button className="slider-nav prev" onClick={prevT}><ChevronLeft size={22} /></button>
            <div className="swipe-track test-track desktop-grid-3">
              {testimonials.map((t, idx) => (
                <div key={t.id} className="test-card swipe-item">
                  <div className="test-top">
                    <img src={t.image} alt={t.name} className="test-avatar" />
                    <div className="test-stars">{[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="#16A34A" stroke="none" />)}</div>
                  </div>
                  <p className="test-text">"{t.text}"</p>
                  <div className="test-author">
                    <span className="test-name">{t.name}</span>
                    <span className="test-role">Cliente Verificada</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="slider-nav next" onClick={nextT}><ChevronRight size={22} /></button>
          </div>
        </div>
      </section>

      {/* ═══════════════ 8. FAQ ═══════════════ */}
      <section className="sect">
        <div className="ctnr">
          <div className="faq-layout">
            <div className="faq-left">
              <span className="tag-label">Dúvidas</span>
              <h2>FAQ</h2>
              <p>Encontre aqui as respostas para as dúvidas mais comuns sobre a Matú.</p>
              <div className="faq-cta-box">
                <p><strong>Não encontrou sua resposta?</strong></p>
                <span className="faq-resp">Tempo médio de resposta: 24h</span>
                <a href="#contato" className="btn btn-primary" style={{ background: '#16A34A', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>Entre em Contato</a>
              </div>
            </div>
            <div className="faq-right">
              {faqData.map((item, i) => (
                <details key={i} className="faq-item">
                  <summary>{item.q}<ArrowRight className="faq-arrow" size={16} /></summary>
                  <div className="faq-answer"><p>{item.a}</p></div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 9. BENEFITS (CIRCULAR STYLE) ═══════════════ */}
      <section className="sect sect-white" style={{ paddingBottom: '7rem' }}>
        <div className="ctnr">
          <div className="swipe-track ben-track desktop-grid-4 ben-mobile-carousel">
            {benefitsData.map((b, i) => (
              <div key={i} className="ben-circular-item swipe-item">
                <div className="ben-circular-icon">{b.icon}</div>
                <span className="ben-circular-label">{b.title}</span>
              </div>
            ))}
          </div>
          <div className="carousel-dots-mobile hide-desktop">
            {benefitsData.map((_, i) => (
              <span key={i} className={`c-dot ${i === 0 ? 'active' : ''}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── STYLES ─── */}
      <style>{`
/* ═══════ FOUNDATION ═══════ */
.home-root { width: 100%; overflow-x: hidden; background-color: #FFFFFF; color: #1F2937; }
.sect { padding: 4.5rem 0; }
.sect-bg { background-color: #F9FAFB; } /* Matu elegant alternate background */
.ctnr { max-width: 1300px; margin: 0 auto; padding: 0 4%; }
.ctnr-full { max-width: 1400px; margin: 0 auto; padding: 0 4%; }
.sect-head { margin-bottom: 2.5rem; }
.sect-head h2 { font-size: 2.2rem; font-weight: 800; color: #16A34A; }
.sect-head.center { text-align: center; justify-content: center; }
.sect-sub { color: #1F2937; max-width: 550px; font-size: 1.05rem; margin-top: 0.5rem; }
.tag-label { display: inline-block; font-size: .8rem; font-weight: 800; text-transform: uppercase; letter-spacing: .15em; color: #16A34A; margin-bottom: 1rem; }
.sect-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 1rem; }
.see-more { display: flex; align-items: center; gap: .5rem; font-weight: 700; font-size: .95rem; color: #1F2937; text-decoration: none; transition: opacity 0.2s; }
.see-more:hover { opacity: 0.7; }
.sm-arrow { width: 28px; height: 28px; border-radius: 50%; background: #16A34A; color: #fff; display: flex; align-items: center; justify-content: center; }

/* ═══════ 1. HERO (DUAL BANNER) ═══════ */
.hero-banner-section { position: relative; width: 100%; overflow: hidden; }
.hero-slide { position: absolute; inset: 0; opacity: 0; transition: opacity 1.2s ease; z-index: 1; }
.hero-slide.active { opacity: 1; z-index: 2; position: relative; }
/* Desktop Banner - aspect-[21/9] */
.hero-img-desktop { display: block; width: 100%; height: auto; aspect-ratio: 21/9; object-fit: cover; object-position: center; }
/* Mobile Banner - aspect-[4/5] */
.hero-img-mobile { display: none; width: 100%; height: auto; aspect-ratio: 4/5; object-fit: cover; object-position: center; }
.hero-dots { position: absolute; bottom: 25px; left: 50%; transform: translateX(-50%); display: flex; gap: 10px; z-index: 10; }
.hero-dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.5); border: none; cursor: pointer; transition: all .3s; }
.hero-dot.active { width: 32px; border-radius: 6px; background: #fff; }

/* ═══════ 4. CAPITÃ AQUA BENTO GRID ═══════ */
.bento-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 250px;
  gap: 16px;
  padding: 2rem 0;
}
@media(min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 300px);
    gap: 24px;
  }
  .item-large { grid-column: 1 / 3; grid-row: 1 / 3; }
  .item-small { grid-column: 3 / 4; grid-row: 1 / 2; }
  .item-small:nth-child(3) { grid-column: 4 / 5; grid-row: 1 / 2; }
  .item-medium { grid-column: 3 / 5; grid-row: 2 / 3; }
}
.bento-item {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  background: #F9FAFB;
}
.bento-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.bento-item:hover img { transform: scale(1.05); }
.bento-content {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  color: #fff;
  transition: background 0.3s ease;
}
.bento-item:hover .bento-content {
  background: rgba(0,0,0,0.5);
}
.bento-content h3 { 
  font-size: 2rem; 
  font-weight: 800; 
  color: #FFFFFF; 
  margin: 0; 
  text-transform: none; 
  letter-spacing: -0.02em;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
.bento-content p { font-size: 0.9rem; font-weight: 600; opacity: 0.95; margin-top: 0.5rem; letter-spacing: 0.05em; text-transform: uppercase; color: #FFFFFF; }

/* ═══════ PRODUCT CARD ═══════ */
.m-product-card { background: #FFFFFF; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; border: 1px solid #E5E7EB; transition: transform .3s ease, box-shadow .3s ease; }
.m-product-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.06); }
.m-product-img { position: relative; aspect-ratio: 1/1.15; overflow: hidden; background: #F9FAFB; }
.m-product-img img { width: 100%; height: 100%; object-fit: cover; }
.m-badge { position: absolute; top: 12px; left: 12px; background: #16A34A; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: .75rem; font-weight: 800; z-index: 3; }
.m-badge-discount { left: auto; right: 12px; background: #111827; }
.m-product-info { padding: 1.5rem; display: flex; flex-direction: column; flex: 1; text-align: center; }
.m-product-info h3 { font-size: 1.05rem; font-weight: 700; color: #1F2937; margin-bottom: .8rem; min-height: 2.8em; line-height: 1.4; }
.m-price-block { display: flex; flex-direction: column; margin-bottom: 1.2rem; }
.m-old-price { text-decoration: line-through; color: #9CA3AF; font-size: .85rem; margin-bottom: 0.1rem; }
.m-price { font-size: 1.3rem; font-weight: 800; color: #16A34A; }
.m-installments { font-size: .8rem; color: #6B7280; margin-top: 0.2rem; }
.m-btn-buy { width: 100%; background: #16A34A; color: #FFFFFF; border: none; padding: .85rem; border-radius: 50px; font-weight: 800; text-transform: uppercase; letter-spacing: .05em; cursor: pointer; transition: background .2s; }
.m-btn-buy:hover { background: #15803d; }

/* ═══════ MOBILE-FIRST SWIPE SYSTEM ═══════ */
.swipe-track {
  display: flex !important;
  flex-wrap: nowrap;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  width: 100%;
  gap: 1.2rem;
  padding-bottom: 1rem;
}
.swipe-track::-webkit-scrollbar { display: none; }
.swipe-item {
  scroll-snap-align: center;
  flex-shrink: 0;
  width: 80vw;
}
@media(min-width: 480px) { .swipe-item { width: 300px; } }
@media(min-width: 868px) {
  .swipe-track { gap: 1.5rem; padding-bottom: 0; }
  .swipe-track.desktop-grid-4 { display: grid !important; grid-template-columns: repeat(4, 1fr); overflow-x: visible; }
  .swipe-track.desktop-grid-3 { display: grid !important; grid-template-columns: repeat(3, 1fr); overflow-x: visible; }
  .desktop-grid-4 .swipe-item, .desktop-grid-3 .swipe-item { width: 100%; }
}

/* ═══════ 4. INSTAGRAM REELS ═══════ */
.slider-wrapper { position: relative; display: flex; align-items: center; margin-top: 1rem; }
.reel-card { aspect-ratio: 9/16; border-radius: 12px; overflow: hidden; position: relative; cursor: pointer; background: #000; }
.reel-poster { width: 100%; height: 100%; object-fit: cover; opacity: 0.9; transition: opacity 0.3s; }
.reel-card:hover .reel-poster { opacity: 1; }
.reel-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 1rem; background: linear-gradient(transparent, rgba(0,0,0,.8)); }
.reel-product-pill { display: flex; align-items: center; gap: .8rem; background: rgba(255,255,255,.98); border-radius: 8px; padding: .6rem; }
.reel-thumb { width: 40px; height: 40px; object-fit: cover; border-radius: 4px; flex-shrink: 0; }
.reel-pname { display: block; font-size: .8rem; font-weight: 800; color: #1F2937; }
.reel-pprice { font-size: .75rem; color: #16A34A; font-weight: 700; margin-top: 2px; display: block; }
.reel-pprice s { color: #9CA3AF; font-weight: normal; margin-right: 4px; }
.slider-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 50%; background: #FFFFFF; color: #16A34A; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,.15); z-index: 10; border: 1px solid #E5E7EB; cursor: pointer; transition: all .2s; }
.slider-nav:hover { background: #16A34A; color: #FFFFFF; border-color: #16A34A; }
.slider-nav.prev { left: -22px; }
.slider-nav.next { right: -22px; }
@media(max-width: 868px) { .slider-nav { display: none; } }

/* ═══════ 5. PARALLAX ═══════ */
.parallax-banner-section { position: relative; width: 100%; overflow: hidden; }
.par-img-desktop { display: block; width: 100%; height: auto; aspect-ratio: 21/9; object-fit: cover; }
.par-img-mobile { display: none; width: 100%; height: auto; aspect-ratio: 4/5; object-fit: cover; }
.par-overlay { position: absolute; inset: 0; background: rgba(0, 30, 20, 0.45); }
.par-content { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem; z-index: 2; }
.par-content h2 { color: #FFFFFF; font-size: 2.8rem; max-width: 850px; line-height: 1.15; font-weight: 800; text-shadow: 0 2px 10px rgba(0,0,0,0.3); }
.par-content p { color: #FFFFFF; font-size: 1.25rem; margin-top: 1.5rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5); font-weight: 500; }

/* ═══════ 7. TESTIMONIALS ═══════ */
.test-card { background: #FFFFFF; padding: 2rem; border-radius: 16px; border: 1px solid #E5E7EB; display: flex; flex-direction: column; gap: 1.2rem; }
.test-top { display: flex; justify-content: space-between; align-items: center; }
.test-avatar { width: 55px; height: 55px; border-radius: 50%; object-fit: cover; border: 2px solid #F9FAFB; }
.test-stars { display: flex; gap: 2px; }
.test-text { font-size: 1rem; line-height: 1.7; color: #4B5563; font-style: italic; flex: 1; }
.test-author { display: flex; flex-direction: column; }
.test-name { font-weight: 800; color: #16A34A; font-size: 1rem; }
.test-role { font-size: .8rem; color: #6B7280; margin-top: 2px; }

/* ═══════ 8. FAQ ═══════ */
.faq-layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: 4rem; align-items: start; }
.faq-left h2 { font-size: 2.8rem; color: #16A34A; margin-bottom: 1rem; }
.faq-left p { color: #4B5563; line-height: 1.7; margin-bottom: 2.5rem; font-size: 1.05rem; }
.faq-cta-box { background: #F9FAFB; padding: 2rem; border-radius: 16px; border: 1px solid #E5E7EB; }
.faq-cta-box p strong { color: #1F2937; margin-bottom: 0.5rem; display: block; font-size: 1.1rem; }
.faq-resp { font-size: .85rem; color: #6B7280; display: block; margin-bottom: 1.5rem; }
.faq-right { background: #FFFFFF; border-radius: 20px; }
.faq-item { border-bottom: 1px solid #E5E7EB; }
.faq-item:last-child { border-bottom: none; }
.faq-item summary { padding: 1.5rem 0; list-style: none; display: flex; justify-content: space-between; align-items: center; font-size: 1.1rem; font-weight: 700; cursor: pointer; color: #1F2937; }
.faq-arrow { transition: transform .3s; opacity: .5; }
.faq-item[open] .faq-arrow { transform: rotate(90deg); opacity: 1; color: #16A34A; }
.faq-answer { padding-bottom: 1.5rem; color: #4B5563; line-height: 1.7; font-size: 1rem; }

/* ═══════ 9. BENEFITS (CIRCULAR) ═══════ */
.ben-circular-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
}
.ben-circular-icon {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: #2D5A44; /* Matu Deep Green */
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(45, 90, 68, 0.1);
}
.ben-circular-item:hover .ben-circular-icon {
  transform: scale(1.1);
  box-shadow: 0 8px 25px rgba(45, 90, 68, 0.2);
}
.ben-circular-label {
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #2D5A44;
}
@media(min-width: 768px) {
  .ben-circular-icon { width: 110px; height: 110px; }
  .ben-circular-label { font-size: 0.8rem; }
}

/* Carousel Dots Mobile */
.hide-desktop { display: none; }
.carousel-dots-mobile { display: flex; justify-content: center; gap: 8px; margin-top: 2rem; }
.c-dot { width: 8px; height: 8px; border-radius: 50%; background: #E5E7EB; transition: all 0.3s ease; }
.c-dot.active { width: 24px; border-radius: 4px; background: #16A34A; }

/* ═══════ MEDIA QUERIES ═══════ */
@media(max-width: 768px) {
  .hero-img-desktop, .par-img-desktop { display: none; }
  .hero-img-mobile, .par-img-mobile { display: block; }
  .par-content h2 { font-size: 1.8rem; }
  .faq-layout { grid-template-columns: 1fr; gap: 2.5rem; }
  .hide-mobile { display: none !important; }
  .hide-desktop { display: flex; }
}
      `}</style>
    </div>
  );
}
