import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChevronLeft, ChevronRight, Leaf, Rabbit, Recycle, Droplets, Play } from 'lucide-react';

/* ─── UTILS ─── */
const getReelId = (url) => {
  if (!url) return null;
  // Patterns: instagram.com/reels/ID, instagram.com/reel/ID, instagram.com/p/ID
  const match = url.match(/(?:reels?|p)\/([^/?#&]+)/);
  return match ? match[1] : null;
};

/* ─── DATA ─── */
const sliderContent = [
  {
    id: 1,
    image: '/images/banner_kit_matu_mobile.png',
    mobileImage: '/images/banner_kit_matu_mobile.png'
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
  { id: 1, videoUrl: 'https://www.instagram.com/reel/CosXAKtAJgh/', poster: '/images/media__1775931116204.png', product: 'Reparador Spray 60ml', oldPrice: 'R$ 116,97', price: 'R$ 58,48', thumb: '/images/product_bottle.png' },
  { id: 2, videoUrl: 'https://www.instagram.com/reel/DRvEhw0ibdT/', poster: '/images/media__1775931109284.png', product: 'Shampoo Sólido Matú', oldPrice: 'R$ 89,97', price: 'R$ 59,97', thumb: '/images/product_shampoo_solid.png' },
  { id: 3, videoUrl: 'https://www.instagram.com/reel/DUs8zcSjsky/', poster: '/images/category_skin.png', product: 'Sérum Facial Capitã', oldPrice: 'R$ 149,97', price: 'R$ 99,97', thumb: '/images/product_face_cream.png' },
  { id: 4, videoUrl: 'https://www.instagram.com/reel/DWSF0DFCZsF/', poster: '/images/category_body.png', product: 'Óleo Corporal Premium', oldPrice: 'R$ 129,97', price: 'R$ 79,97', thumb: '/images/product_body_oil.png' },
  { id: 5, videoUrl: 'https://www.instagram.com/reel/DWT8mMGRXPC/', poster: '/images/category_hair.png', product: 'Máscara Reconstrutora', oldPrice: 'R$ 99,97', price: 'R$ 69,97', thumb: '/images/product_face_wash.png' },
  { id: 6, videoUrl: 'https://www.instagram.com/reel/DSSuPLNiemm/', poster: '/images/category_oil.png', product: 'Tônico Equilibrante', oldPrice: 'R$ 79,97', price: 'R$ 49,97', thumb: '/images/product_face_wash.png' }
];



const newArrivals = [
  { id: 5, name: 'Sérum Reparador 60ml - Cherry Oil', price: 79.97, image: '/images/product_bottle.png' },
  { id: 6, name: 'Manteiga de Karité Premium', price: 59.90, image: '/images/product_bottle.png' },
  { id: 7, name: 'Tônico Facial Equilibrante', price: 69.90, image: '/images/product_face_wash.png' },
  { id: 8, name: 'Óleo Multifuncional Argan', price: 89.90, image: '/images/product_body_oil.png' }
];

const testimonials = [
  { id: 1, name: 'Mariana Silva', highlight: 'Eu amei 😍', text: 'Os produtos da Matú mudaram minha relação com o espelho.', rating: 5, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 2, name: 'Camila Torres', highlight: 'Muito bom!', text: 'Finalmente encontrei um shampoo que realmente limpa sem agredir. ', rating: 5, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 3, name: 'Juliana Paiva', highlight: 'Incrível!', text: 'O óleo corporal é meu momento de paz no dia. ', rating: 5, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 4, name: 'Beatriz Costa', highlight: 'Recomendo muito!', text: 'O tônico equilibrante é perfeito para minha pele mista.', rating: 5, image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 5, name: 'Fernanda Lima', highlight: 'Pele impecável!', text: 'Não vivo mais sem o sérum renovador.', rating: 5, image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 6, name: 'Helena Souza', highlight: 'Sensação única!', text: 'A manteiga de karité é um milagre para áreas secas.', rating: 5, image: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&q=80&w=150&h=150' }
];

// Duplicate for infinite effect
const infiniteInsta = Array(10).fill(instagramReels).flat();
const infiniteBestSellers = Array(10).fill(bestSellers).flat();
const infiniteNewArrivals = Array(10).fill(newArrivals).flat();
const infiniteTestimonials = Array(10).fill(testimonials).flat();

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
        <div className="m-badges">
          {product.badge && <span className="m-badge">{product.badge}</span>}
          {product.discount && <span className="m-badge m-badge-discount">{product.discount}</span>}
        </div>
        <img src={product.image} alt={product.name} />
      </div>
      <div className="m-product-info">
        <h3>{product.name}</h3>
        <div className="m-price-block">
          <div className="m-prices">
            {product.oldPrice && <span className="m-old-price">R$ {product.oldPrice.toFixed(2).replace('.', ',')}</span>}
            <span className="m-price">R$ {product.price.toFixed(2).replace('.', ',')}</span>
          </div>
          <span className="m-installments">Ou 6x de <strong>R$ {(product.price / 6).toFixed(2).replace('.', ',')}</strong> Sem Juros</span>
        </div>
        <button className="m-btn-buy" onClick={() => addToCart(product)}>
          {product.type === 'social' ? 'Saiba Mais' : 'Comprar'}
        </button>
      </div>
    </div>
  );
}

/* ─── REEL PLAYER COMPONENT ─── */
function ReelPlayer({ reel, isSelected }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const reelId = getReelId(reel.videoUrl);
  const isDirectVideo = reel.videoUrl?.match(/\.(mp4|webm|ogg)$/) || reel.videoUrl?.includes('video');

  // Handle direct video files (Premium experience)
  if (isDirectVideo) {
    return (
      <div className="reelfy-video-container">
        <video
          src={reel.videoUrl}
          poster={reel.poster}
          autoPlay={isSelected}
          muted
          loop
          playsInline
          className="reelfy-video-element"
        />
      </div>
    );
  }

  // Handle Instagram Embeds
  return (
    <div className={`reelfy-player-wrapper ${isSelected ? 'is-active' : ''}`}>
      {/* Background Poster - Prioritize local images as they are more reliable */}
      <img 
        src={reel.poster} 
        alt={reel.product} 
        className={`reelfy-poster-img ${isSelected ? 'is-dimmed' : ''}`} 
        loading="lazy"
        onError={(e) => { 
          // If local fails, try Instagram media as fallback
          if (reelId && !e.target.src.includes('instagram.com')) {
            e.target.src = `https://www.instagram.com/p/${reelId}/media/?size=l`;
          }
        }}
      />
      
      {/* Embed Iframe - Using standard 'p' embed which is often more stable for cross-domain */}
      {isSelected && reelId && (
        <iframe
          src={`https://www.instagram.com/p/${reelId}/embed/`}
          className="reelfy-iframe is-visible"
          frameBorder="0"
          scrolling="no"
          allowTransparency="true"
          allow="autoplay; encrypted-media"
        />
      )}

      {/* Overlay for non-selected items */}
      {!isSelected && reelId && (
        <div className="reelfy-play-overlay">
          <Play size={48} fill="white" color="white" />
        </div>
      )}
      
      {/* Error State Placeholder if no link */}
      {!reelId && !isDirectVideo && (
        <div className="reelfy-error-placeholder">
          <span>Configurar Link</span>
        </div>
      )}
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function Home({ addToCart }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [tSlide, setTSlide] = useState(0);
  const [centeredInsta, setCenteredInsta] = useState(2);
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const instaTrackRef = useRef(null);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [activeBen, setActiveBen] = useState(0);
  const benTrackRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const track = instaTrackRef.current;
    if (!track) return;

    const handleScroll = () => {
      if (isDraggingRef.current) return;
      const cards = track.querySelectorAll('.rf-video-item');
      const trackCenter = track.getBoundingClientRect().left + track.offsetWidth / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      cards.forEach((card, i) => {
        const cardCenter = card.getBoundingClientRect().left + card.offsetWidth / 2;
        const distance = Math.abs(trackCenter - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      });
      setCenteredInsta(closestIndex);
    };

    track.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => track.removeEventListener('scroll', handleScroll);
  }, []);

  // Benefits carousel scroll observer
  useEffect(() => {
    const track = benTrackRef.current;
    if (!track) return;
    const handleScroll = () => {
      const items = track.querySelectorAll('.ben-circular-item');
      const trackCenter = track.getBoundingClientRect().left + track.offsetWidth / 2;
      let closest = 0, minDist = Infinity;
      items.forEach((item, i) => {
        const center = item.getBoundingClientRect().left + item.offsetWidth / 2;
        const dist = Math.abs(trackCenter - center);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActiveBen(closest);
    };
    track.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => track.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide(p => (p + 1) % sliderContent.length), 5000);
    const tTimer = setInterval(() => setTSlide(p => (p + 1) % infiniteTestimonials.length), 6000);
    return () => { clearInterval(timer); clearInterval(tTimer); };
  }, [activeSlide, tSlide]);

  const startDrag = (e) => {
    isDraggingRef.current = true;
    const track = instaTrackRef.current;
    track.style.scrollSnapType = 'none';
    track.style.scrollBehavior = 'auto';
    startXRef.current = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    scrollLeftRef.current = track.scrollLeft;
  };
  const endDrag = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const track = instaTrackRef.current;
    // Re-enable snap after a short delay so it snaps to nearest
    setTimeout(() => {
      track.style.scrollSnapType = 'x mandatory';
      track.style.scrollBehavior = 'smooth';
    }, 50);
  };
  const onDrag = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    const walk = (x - startXRef.current) * 1.5;
    instaTrackRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleDotClick = (idx) => {
    setCenteredInsta(idx);
    const track = instaTrackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll('.rf-video-item');
    if (cards[idx]) {
      const cardCenter = cards[idx].offsetLeft + cards[idx].offsetWidth / 2;
      const trackCenter = track.offsetWidth / 2;
      track.scrollTo({ left: cardCenter - trackCenter, behavior: 'smooth' });
    }
  };

  const swipeScroll = (className, dir) => {
    const container = document.querySelector(`.${className}`);
    if (container) {
      const card = container.querySelector('.swipe-item');
      if (card) {
        const cardWidth = card.offsetWidth + 15;
        const maxScroll = container.scrollWidth - container.offsetWidth;
        const current = container.scrollLeft;

        // Loop logic: if at end, jump to middle copy
        if (dir === 'right') {
          if (current >= maxScroll - 50) {
            container.scrollTo({ left: 10, behavior: 'auto' });
            setTimeout(() => container.scrollBy({ left: cardWidth, behavior: 'smooth' }), 50);
          } else {
            container.scrollBy({ left: cardWidth, behavior: 'smooth' });
          }
        } else {
          if (current <= 50) {
            container.scrollTo({ left: maxScroll - 10, behavior: 'auto' });
            setTimeout(() => container.scrollBy({ left: -cardWidth, behavior: 'smooth' }), 50);
          } else {
            container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
          }
        }
      }
    }
  };

  const maxTSlide = testimonials.length - 1;
  const nextT = () => setTSlide(p => (p + 1) % infiniteTestimonials.length);
  const prevT = () => setTSlide(p => (p - 1 + infiniteTestimonials.length) % infiniteTestimonials.length);

  return (
    <div className="home-root">

      {/* ═══════════════ 1. HERO BANNER (DUAL SYSTEM) ═══════════════ */}
      <section className="hero-banner-section">
        {sliderContent.map((s, i) => (
          <div key={s.id} className={`hero-slide ${i === activeSlide ? 'active' : ''}`}>
            <img src={s.image} alt="Banner" className="hero-img-desktop" loading={i === 0 ? "eager" : "lazy"} />
            <img src={s.mobileImage} alt="Banner" className="hero-img-mobile" loading={i === 0 ? "eager" : "lazy"} />
          </div>
        ))}
        <div className="hero-dots">
          {sliderContent.map((_, i) => (
            <button key={i} className={`hero-dot ${i === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(i)} aria-label={`Ir para slide ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* ═══════════════ 2. BEST SELLERS ═══════════════ */}
      <section className="sect" id="produtos">
        <div className="ctnr" style={{ position: 'relative' }}>
          <div className="sect-head">
            <h2 className="font-rounded">Mais Vendidos</h2>
            <Link to="/#produtos" className="see-more">Ver Mais <span className="sm-arrow"><ChevronRight size={14} /></span></Link>
          </div>
          <div className="swipe-track bs-track desktop-grid-4">
            {infiniteBestSellers.map((p, i) => <ProductCard key={`${p.id}-${i}`} product={p} addToCart={addToCart} />)}
          </div>
          <button className="rf-nav-btn prev" onClick={() => swipeScroll('bs-track', 'left')} aria-label="Anterior">
            <ChevronLeft size={20} />
          </button>
          <button className="rf-nav-btn next" onClick={() => swipeScroll('bs-track', 'right')} aria-label="Próximo">
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      <section className="sect sect-bg sect-instagram">
        <div className="ctnr" style={{ position: 'relative' }}>
          <div className="sect-head">
            <h2>Quem usa Matú recomenda 💚</h2>
            <p className="sect-sub" style={{ marginTop: '1.5rem' }}>Acompanhe nossa rotina botânica e dicas de autocuidado.</p>
          </div>
          <div
            className="rf-gallery-main rf-carousel reelfy-scroll-container"
            id="instaTrack"
            ref={instaTrackRef}
            onMouseDown={startDrag}
            onMouseLeave={endDrag}
            onMouseUp={endDrag}
            onMouseMove={onDrag}
            onTouchStart={startDrag}
            onTouchEnd={endDrag}
            onTouchMove={onDrag}
          >
            {infiniteInsta.map((r, i) => (
              <div key={`${r.id}-${i}`} className={`rf-video-item swipe-item ${centeredInsta % instagramReels.length === i % instagramReels.length ? 'is-selected' : ''}`}>
                <div className="reelfy_card card_type-overlay_product reelfy_card_autoplay">
                  <div className="reelfy_card_video_wrapper">
                    <div className="reelfy_card_video">
                      <ReelPlayer reel={r} isSelected={centeredInsta % instagramReels.length === i % instagramReels.length} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="rf-nav-btn prev" onClick={() => swipeScroll('reelfy-scroll-container', 'left')} aria-label="Anterior">
            <svg viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50 L 70,10 L 60,0 Z" fill="currentColor"></path></svg>
          </button>
          <button className="rf-nav-btn next" onClick={() => swipeScroll('reelfy-scroll-container', 'right')} aria-label="Próximo">
            <svg viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50 L 70,10 L 60,0 Z" fill="currentColor" transform="translate(100, 100) rotate(180)"></path></svg>
          </button>

          <div className="reelfy-dots">
            {instagramReels.map((_, idx) => (
              <span key={idx} className={`rf-dot ${centeredInsta === idx ? 'is-active' : ''}`} aria-hidden="true" onClick={() => handleDotClick(idx)}></span>
            ))}
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
                {/*<p>MÁSCARA HIDRATANTE PROFISSIONAL</p>*/}
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
              <img src="/images/category_oil.png" alt="Finalizadores" loading="lazy" />
              <div className="bento-content">
                <h3>Finalizadores</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. PARALLAX BANNER (DUAL SYSTEM) ═══════════════ */}
      <section className="parallax-banner-section">
        <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1920&h=800&fit=crop" alt="Matú Natureza" className="par-img-desktop" loading="lazy" />
        <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&h=1000&fit=crop" alt="Matú Natureza Mobile" className="par-img-mobile" loading="lazy" />
      </section>

      {/* ═══════════════ 6. NEW ARRIVALS ═══════════════ */}
      <section className="sect">
        <div className="ctnr" style={{ position: 'relative' }}>
          <div className="sect-head">
            <h2 className="font-rounded">Nossas Novidades</h2>
            <Link to="/#produtos" className="see-more">Ver Mais <span className="sm-arrow"><ChevronRight size={14} /></span></Link>
          </div>
          <div className="swipe-track na-track desktop-grid-4">
            {infiniteNewArrivals.map((p, i) => <ProductCard key={`${p.id}-${i}`} product={p} addToCart={addToCart} />)}
          </div>
          <button className="rf-nav-btn prev" onClick={() => swipeScroll('na-track', 'left')} aria-label="Anterior">
            <ChevronLeft size={20} />
          </button>
          <button className="rf-nav-btn next" onClick={() => swipeScroll('na-track', 'right')} aria-label="Próximo">
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      <section className="sect sect-white">
        <div className="ctnr">
          <div className="sect-head">
            <h2>Depoimentos</h2>
          </div>
          <div className="testimonials-slider-container">
            <div className="t-track" style={{ transform: `translateX(-${tSlide * 100}%)` }}>
              {infiniteTestimonials.map((t, i) => (
                <div key={`${t.id}-${i}`} className="test-card-new">
                  <div className="test-header">
                    <img src={t.image} alt={t.name} className="test-avatar" />
                    <div className="test-meta">
                      <div className="test-stars">
                        {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="var(--color-stars)" stroke="none" />)}
                      </div>
                      <span className="test-name">{t.name.split(' ')[0]}</span>
                    </div>
                  </div>
                  <h4 className="test-highlight">{t.highlight}</h4>
                  <p className="test-text">{t.text}</p>
                </div>
              ))}
            </div>

            <div className="t-controls-row">
              <div className="t-progress-bar" style={{ maxWidth: '40%' }}>
                <div className="t-progress-fill" style={{ width: `${((tSlide % testimonials.length + 1) / testimonials.length) * 100}%` }} />
              </div>
              <div className="t-nav-btns">
                <button className="t-nav-btn" onClick={prevT} aria-label="Depoimento anterior"><ChevronLeft size={20} /></button>
                <button className="t-nav-btn" onClick={nextT} aria-label="Próximo depoimento"><ChevronRight size={20} /></button>
              </div>
            </div>
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
                <a href="#contato" className="btn btn-primary" style={{ background: '#2D5A44', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>Entre em Contato</a>
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
          <div className="swipe-track ben-track desktop-grid-4" ref={benTrackRef}>
            {benefitsData.map((b, i) => (
              <div key={i} className="ben-circular-item swipe-item">
                <div className="ben-circular-icon">{b.icon}</div>
                <span className="ben-circular-label">{b.title}</span>
              </div>
            ))}
          </div>
          <div className="carousel-dots-mobile hide-desktop">
            {benefitsData.map((_, i) => (
              <span key={i} className={`c-dot ${activeBen === i ? 'active' : ''}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── STYLES ─── */}
      <style>{`
.home-root { width: 100%; overflow-x: hidden; background-color: #FFFFFF; color: #1F2937; }
.sect { padding: 4.5rem 0; }
.sect-bg { background-color: #F9FAFB; }
.ctnr { max-width: 1300px; margin: 0 auto; padding: 0 4%; }
.ctnr-full { max-width: 1400px; margin: 0 auto; padding: 0 4%; }
.sect-head { margin-bottom: 2.5rem; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 1rem; }
.sect-head h2 { font-size: 3.2rem; font-weight: 900; color: #000000; letter-spacing: -0.04em; line-height: 1.1; }
.see-more { display: flex; align-items: center; gap: .5rem; font-weight: 700; font-size: .95rem; color: #1F2937; text-decoration: none; transition: opacity 0.2s; }
.sm-arrow { width: 28px; height: 28px; border-radius: 50%; background: #2D5A44; color: #fff; display: flex; align-items: center; justify-content: center; }

.hero-banner-section { position: relative; width: 100%; overflow: hidden; margin-top: 125px; }
.hero-slide { position: absolute; inset: 0; opacity: 0; transition: opacity 1.2s ease; z-index: 1; }
.hero-slide.active { opacity: 1; z-index: 2; position: relative; }
.hero-img-desktop { display: block; width: 100%; height: auto; }
.hero-img-mobile { display: none; width: 100%; height: auto; }
.hero-dots { position: absolute; bottom: 25px; left: 50%; transform: translateX(-50%); display: flex; gap: 10px; z-index: 10; }
.hero-dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(45, 90, 68, 0.3); border: none; cursor: pointer; transition: all .3s; }
.hero-dot.active { width: 32px; border-radius: 6px; background: #2D5A44; }

.bento-grid { display: grid; grid-template-columns: 1fr; grid-auto-rows: 250px; gap: 16px; padding: 2rem 0; }
@media(min-width: 768px) {
  .bento-grid { grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(2, 300px); gap: 24px; }
  .item-large { grid-column: 1 / 3; grid-row: 1 / 3; }
  .item-small { grid-column: 3 / 4; grid-row: 1 / 2; }
  .item-small:nth-child(3) { grid-column: 4 / 5; grid-row: 1 / 2; }
  .item-medium { grid-column: 3 / 5; grid-row: 2 / 3; }
}
.bento-item { position: relative; overflow: hidden; border-radius: 24px; background: #F9FAFB; }
.bento-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.bento-item:hover img { transform: scale(1.05); }
.bento-content { position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 2rem; color: #fff; }
.bento-content h3 { font-size: 2rem; font-weight: 800; color: #FFFFFF; margin: 0; }

.m-product-card { background: #FFFFFF; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; border: 1px solid #E5E7EB; }
.m-product-img { position: relative; aspect-ratio: 1/1.15; overflow: hidden; background: #F9FAFB; }
.m-product-img img { width: 100%; height: 100%; object-fit: cover; }
.m-badges { position: absolute; top: 12px; left: 12px; display: flex; flex-direction: column; gap: 6px; align-items: flex-start; z-index: 10; }
.m-badge { background: #2D5A44; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: .75rem; font-weight: 800; white-space: nowrap; }
.m-product-info { padding: 1.5rem; display: flex; flex-direction: column; flex: 1; text-align: center; }
.m-product-info h3 { font-size: 1.05rem; font-weight: 700; color: #1F2937; margin-bottom: .8rem; }
.m-price-block { display: flex; flex-direction: column; align-items: center; gap: 2px; margin-bottom: 0.8rem; }
.m-prices { display: flex; align-items: center; gap: 8px; justify-content: center; }
.m-old-price { color: #9CA3AF; text-decoration: line-through; font-size: 0.95rem; font-weight: 500; }
.m-price { font-size: 1.3rem; font-weight: 800; color: #2D5A44; }
.m-installments { font-size: 0.85rem; color: #4B5563; line-height: 1.2; }
.m-btn-buy { width: 100%; background: #2D5A44; color: #FFFFFF; border: none; padding: .85rem; border-radius: 50px; font-weight: 800; text-transform: uppercase; cursor: pointer; }

.swipe-track { display: flex !important; flex-wrap: nowrap; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; width: 100%; gap: 1.2rem; }
.swipe-track::-webkit-scrollbar { display: none; }
.swipe-item { scroll-snap-align: center; flex-shrink: 0; width: 85vw; }
@media(min-width: 868px) {
  .swipe-track.desktop-grid-4 { display: flex !important; overflow-x: auto; }
  .swipe-item { width: 300px; }
}

.reelfy-scroll-container { display: flex; gap: 15px; overflow-x: auto; scroll-behavior: smooth; scrollbar-width: none; padding: 3rem 0; align-items: center; scroll-snap-type: x mandatory; cursor: grab; -webkit-overflow-scrolling: touch; }
.reelfy-scroll-container::-webkit-scrollbar { display: none; }
.rf-video-item { flex-shrink: 0; width: calc(20% - 12px); scroll-snap-align: center; transition: transform 0.5s ease, opacity 0.5s ease; transform: scale(0.85); opacity: 0.6; transform-origin: center center; position: relative; }
.rf-video-item.is-selected { transform: scale(1.15); opacity: 1; z-index: 5; }
.reelfy_card { position: relative; border-radius: 24px; overflow: hidden; aspect-ratio: 9/16; background: #000; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
.reelfy_card_video_wrapper { width: 100%; height: 100%; position: relative; }
.reelfy-poster-img { width: 100%; height: 100%; object-fit: cover; }
.reelfy_card_product { position: absolute; bottom: 12px; left: 10px; right: 10px; background: #FFFFFF; border-radius: 12px; padding: 10px; display: flex; align-items: center; gap: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); z-index: 10; }
.reelfy_card_product__image { width: 48px; height: 48px; border-radius: 10px; background: #fff; flex-shrink: 0; overflow: hidden; }
.reelfy_card_product__image img { width: 100%; height: 100%; object-fit: cover; }
.reelfy_card_product__content { display: flex; flex-direction: column; gap: 4px; overflow: hidden; text-align: left; }
.reelfy_card_product__title { font-size: 13px; font-weight: 800; color: #000; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.reelfy_card_product__prices { display: flex; gap: 8px; align-items: center; }
.rf-old-price { color: #999; text-decoration: line-through; font-size: 11px; font-weight: 500; }
.rf-new-price { color: #000; font-weight: 800; font-size: 13px; }
.reelfy-dots { display: flex; justify-content: center; gap: 8px; margin-top: 1rem; }
.rf-dot { width: 8px; height: 8px; border-radius: 50%; background: #ddd; transition: all 0.3s; cursor: pointer; }
.rf-dot.is-active { background: #2D5A44; }

.rf-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  background: rgba(255,255,255,0.95);
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  color: #111;
  transition: all 0.3s;
}
.rf-nav-btn:hover { background: #2D5A44; color: #fff; transform: translateY(-50%) scale(1.1); }
.rf-nav-btn svg { width: 14px; height: 14px; }
.rf-nav-btn.prev { left: 20px; }
.rf-nav-btn.next { right: 20px; }

@media(max-width: 768px) {
  .hero-img-desktop, .par-img-desktop { display: none; }
  .hero-img-mobile, .par-img-mobile { display: block; }
  .rf-video-item { width: calc(40% - 10px); }
  .rf-video-item.is-selected { transform: scale(1.2); }
  .reelfy-scroll-container { padding: 2rem 5%; gap: 12px; }
  .rf-nav-btn { display: none; }
  .faq-layout { grid-template-columns: 1fr; gap: 2.5rem; }
}

.reelfy-video-container { width: 100%; height: 100%; position: relative; background: #000; overflow: hidden; }
.reelfy-video-element { width: 100%; height: 100%; object-fit: cover; }
.reelfy-player-wrapper { width: 100%; height: 100%; position: relative; background: #000; overflow: hidden; }
.reelfy-iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: none; z-index: 2; }
.reelfy-poster-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; transition: opacity 0.3s ease; }
.reelfy-poster-img.is-dimmed { opacity: 0.3; }
.reelfy-play-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.2); opacity: 0.8; transition: opacity 0.3s; z-index: 3; }
.reelfy-error-placeholder { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: #1a1a1a; color: #444; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; }
.rf-video-item.is-selected .reelfy-play-overlay { opacity: 0; pointer-events: none; }

.parallax-banner-section { position: relative; width: 100%; height: 400px; overflow: hidden; }
.par-img-desktop { display: block; width: 100%; height: 100%; object-fit: cover; }
.par-img-mobile { display: none; width: 100%; height: 100%; object-fit: cover; }

/* ═══════ 7. TESTIMONIALS (NEW STYLE) ═══════ */
.testimonials-slider-container { position: relative; overflow: hidden; margin-top: 2rem; padding: 20px 0; }
.t-track { display: flex; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); width: 100%; gap: 20px; }
.test-card-new { 
  background: #F3F4F6; 
  padding: 1.8rem; 
  border-radius: 12px; 
  display: flex; 
  flex-direction: column; 
  text-align: left; 
  transition: all 0.3s ease; 
  min-width: 100%;
  flex-shrink: 0;
  height: fit-content;
}
.test-card-new:hover { transform: translateY(-5px); }
.test-header { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1rem; }
.test-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
.test-meta { display: flex; flex-direction: column; gap: 2px; }
.test-stars { display: flex; gap: 2px; }
.test-name { font-size: 0.8rem; color: #6B7280; font-weight: 500; }
.test-highlight { font-size: 1rem; font-weight: 800; color: #1F2937; margin-bottom: 0.5rem; }
.test-text { font-size: 0.85rem; color: #4B5563; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

.t-controls-row { display: flex; align-items: center; justify-content: space-between; margin-top: 2.5rem; gap: 2rem; }
.t-progress-bar { flex: 1; height: 1px; background: #E5E7EB; position: relative; }
.t-progress-fill { position: absolute; left: 0; top: 0; height: 100%; background: #2D5A44; transition: width 0.6s ease; }
.t-nav-btns { display: flex; gap: 12px; }
.t-nav-btn { width: 40px; height: 40px; border-radius: 50%; border: 1px solid #E5E7EB; background: #fff; display: flex; align-items: center; justify-content: center; color: #1F2937; cursor: pointer; transition: all 0.2s; }
.t-nav-btn:hover { background: #F9FAFB; border-color: #1F2937; }

@media(max-width: 992px) {
  .t-group { grid-template-columns: 1fr; }
}

/* ═══════ 8. FAQ ═══════ */
.faq-layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: 4rem; align-items: start; }
.faq-left h2 { font-size: 3.2rem; color: #000000; margin-bottom: 1rem; font-weight: 900; letter-spacing: -0.04em; }
.faq-left p { color: #4B5563; line-height: 1.7; margin-bottom: 2.5rem; font-size: 1.05rem; }
.faq-cta-box { background: #F9FAFB; padding: 2rem; border-radius: 16px; border: 1px solid #E5E7EB; }
.faq-cta-box p strong { color: #1F2937; margin-bottom: 0.5rem; display: block; font-size: 1.1rem; }
.faq-resp { font-size: .85rem; color: #6B7280; display: block; margin-bottom: 1.5rem; }
.faq-right { background: #FFFFFF; border-radius: 20px; }
.faq-item { border-bottom: 1px solid #E5E7EB; }
.faq-item:last-child { border-bottom: none; }
.faq-item summary { padding: 1.5rem 0; list-style: none; display: flex; justify-content: space-between; align-items: center; font-size: 1.1rem; font-weight: 700; cursor: pointer; color: #1F2937; }
.faq-arrow { transition: transform .3s; opacity: .5; }
.faq-item[open] .faq-arrow { transform: rotate(90deg); opacity: 1; color: #2D5A44; }
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
.c-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(45, 90, 68, 0.2); transition: all 0.3s ease; }
.c-dot.active { width: 24px; border-radius: 4px; background: #2D5A44; }

/* ═══════ MEDIA QUERIES ═══════ */
@media(max-width: 768px) {
  .hero-img-desktop, .par-img-desktop { display: none; }
  .hero-img-mobile, .par-img-mobile { display: block; }
  .faq-layout { grid-template-columns: 1fr; gap: 2.5rem; }
  .hide-mobile { display: none !important; }
  .hide-desktop { display: flex; }
  /* Depoimentos mobile */
  .test-card-new { padding: 1.5rem; min-width: 100%; }
  .test-highlight { font-size: 0.95rem; }
  .test-text { font-size: 0.8rem; -webkit-line-clamp: 2; }
  .t-track { gap: 12px; }
  .t-controls-row { margin-top: 1.5rem; }
  .t-nav-btn { width: 36px; height: 36px; }
  /* Benefits carousel - centered with dots */
  .ben-circular-item.swipe-item { width: 60vw; }
}
      `}</style>
    </div>
  );
}
