import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Leaf, 
  Rabbit, 
  Droplet, 
  Plus, 
  Minus, 
  ShieldCheck, 
  ChevronRight, 
  Star, 
  Truck, 
  CheckCircle2, 
  MessageCircle,
  ArrowLeft,
  Share2
} from 'lucide-react';

const mockProduct = {
  id: 1,
  name: 'Sérum Renovador Capitã Aqua',
  price: 99.97,
  oldPrice: 149.97,
  discount: '33% OFF',
  images: [
    '/images/product_face_cream.png',
    '/images/category_skin_new.jpg',
    '/images/product_bottle.png',
  ],
  shortDesc: 'Hidratação profunda e restauração da barreira cutânea com ativos botânicos de alta performance.',
  description: 'O Sérum Renovador Capitã Aqua é uma fórmula exclusiva da Matú, desenvolvida para peles que buscam hidratação intensa sem peso. Sua textura leve em gel-soro penetra instantaneamente, entregando um complexo de ácido hialurônico botânico e extratos da flora brasileira.',
  benefits: [
    'Hidratação profunda por até 48 horas',
    'Restaura a luminosidade natural da pele',
    'Estimula a regeneração celular',
    'Textura ultra-leve de rápida absorção'
  ],
  howToUse: 'Com o rosto limpo e levemente úmido, aplique 3-5 gotas sobre a palma das mãos e pressione suavemente sobre o rosto, pescoço e colo. Use de manhã e à noite antes do seu hidratante habitual.',
  composition: 'Aqua (Água), Aloe Barbadensis Leaf Juice (Extrato de Aloe Vera), Glycerin (Glicerina Vegetal), Hyaluronic Acid (Ácido Hialurônico Botânico), Euterpe Oleracea Fruit Extract (Extrato de Açaí), Sodium Benzoate, Potassium Sorbate.',
  rating: 4.9,
  reviewsCount: 128,
  reviews: [
    { id: 1, user: 'Ana Paula', rating: 5, comment: 'Incrível! Deixa a pele muito macia e sequinha.', date: '3 dias atrás' },
    { id: 2, user: 'Larissa M.', rating: 5, comment: 'Melhor sérum que já usei na vida. O cheiro é maravilhoso.', date: '1 semana atrás' }
  ]
};

export default function Product({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState('beneficios');
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Decodifica o nome do produto da URL
  const productName = decodeURIComponent(id || 'Sérum Renovador Capitã Aqua');

  // No mundo real, buscaríamos os dados pelo nome/slug. 
  // Aqui, adaptamos o mockProduct para o nome atual.
  const product = { 
    ...mockProduct, 
    name: productName,
    // Ajuste simples para simular produtos diferentes baseado no nome
    price: productName.includes('Manteiga') ? 78.50 : 99.97,
    oldPrice: productName.includes('Manteiga') ? 95.00 : 149.97
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity, id: id });
  };

  return (
    <div className="pdp-container">
      {/* ─── BREADCRUMB ─── */}
      <div className="pdp-breadcrumb">
        <div className="ctnr">
          <Link to="/"><ArrowLeft size={16} /> Voltar para Home</Link>
          <span className="divider">/</span>
          <span>Produtos</span>
          <span className="divider">/</span>
          <span className="current">{product.name}</span>
        </div>
      </div>

      <div className="pdp-main-grid ctnr">
        {/* ─── LEFT: GALLERY ─── */}
        <div className="pdp-gallery-section">
          <div className="pdp-thumbnails">
            {mockProduct.images.map((img, idx) => (
              <div 
                key={idx} 
                className={`pdp-thumb-item ${activeImg === idx ? 'active' : ''}`}
                onClick={() => setActiveImg(idx)}
              >
                <img src={img} alt={`${mockProduct.name} ${idx}`} />
              </div>
            ))}
          </div>
          
          <div className="pdp-main-img-wrapper">
             <div className="pdp-badge-top">Novidade</div>
             <div 
                className={`pdp-main-img-inner ${isZoomed ? 'zoomed' : ''}`}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
             >
                <img 
                  src={mockProduct.images[activeImg]} 
                  alt={mockProduct.name} 
                  style={isZoomed ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` } : {}}
                />
             </div>
             <div className="pdp-gallery-controls">
                <button aria-label="Compartilhar"><Share2 size={18} /></button>
             </div>
          </div>
        </div>

        {/* ─── RIGHT: PRODUCT INFO ─── */}
        <div className="pdp-info-section">
          <div className="pdp-header">
            <div className="pdp-rating-strip" onClick={() => setActiveTab('reviews')}>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(mockProduct.rating) ? "var(--color-primary)" : "none"} color="var(--color-primary)" />
                ))}
              </div>
              <span className="rating-count">({mockProduct.reviewsCount} avaliações)</span>
            </div>
            
            <h1 className="pdp-title">{product.name}</h1>
            <p className="pdp-short-desc">{product.shortDesc}</p>
          </div>

          <div className="pdp-price-block">
             <div className="pdp-price-header">
                <span className="old-price">R$ {product.oldPrice.toFixed(2).replace('.', ',')}</span>
                <span className="discount-badge">{product.discount}</span>
             </div>
             <div className="current-price">
                <span className="currency">R$</span>
                <span className="value">{product.price.toFixed(2).replace('.', ',')}</span>
             </div>
             <div className="pdp-installments">
                Ou 6x de <strong>R$ {(product.price / 6).toFixed(2).replace('.', ',')}</strong> sem juros
             </div>
          </div>

          <div className="pdp-buy-controls">
             <div className="pdp-qty-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Diminuir"><Minus size={18} /></button>
                <span className="qty-val">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} aria-label="Aumentar"><Plus size={18} /></button>
             </div>
             <button className="pdp-btn-add" onClick={handleAddToCart}>
                Adicionar ao Carrinho
             </button>
          </div>

          <div className="pdp-secondary-actions">
            <a href="https://wa.me/5511999999999" className="pdp-btn-wa">
               <MessageCircle size={20} /> 
               Reservar pelo WhatsApp
            </a>
          </div>

          {/* ─── TRUST SEALS ─── */}
          <div className="pdp-trust-seals">
             <div className="seal-item">
                <Leaf size={24} />
                <span>Natural & Vegano</span>
             </div>
             <div className="seal-item">
                <Rabbit size={24} />
                <span>Livre de Crueldade</span>
             </div>
             <div className="seal-item">
                <CheckCircle2 size={24} />
                <span>Testado Dermat.</span>
             </div>
             <div className="seal-item">
                <Truck size={24} />
                <span>Entrega Expressa</span>
             </div>
          </div>

          {/* ─── ACCORDION / TABS ─── */}
          <div className="pdp-details-tabs">
             <div className="pdp-tabs-nav">
                <button className={activeTab === 'beneficios' ? 'active' : ''} onClick={() => setActiveTab('beneficios')}>Benefícios</button>
                <button className={activeTab === 'uso' ? 'active' : ''} onClick={() => setActiveTab('uso')}>Modo de Uso</button>
                <button className={activeTab === 'composicao' ? 'active' : ''} onClick={() => setActiveTab('composicao')}>Composição</button>
             </div>
             <div className="pdp-tabs-panel">
                {activeTab === 'beneficios' && (
                  <div className="tab-pane animate-fade-in">
                    <p>{mockProduct.description}</p>
                    <ul className="pdp-benefits-list">
                       {mockProduct.benefits.map((b, i) => (
                         <li key={i}><CheckCircle2 size={16} /> {b}</li>
                       ))}
                    </ul>
                  </div>
                )}
                {activeTab === 'uso' && (
                  <div className="tab-pane animate-fade-in">
                    <p className="pdp-usage-text">{mockProduct.howToUse}</p>
                  </div>
                )}
                {activeTab === 'composicao' && (
                  <div className="tab-pane animate-fade-in">
                    <p className="pdp-comp-text">{mockProduct.composition}</p>
                    <p className="pdp-comp-notice"><strong>Nota:</strong> Nossas formulações podem ser atualizadas para maior eficácia. Consulte sempre o rótulo da embalagem.</p>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>

      {/* ─── REVIEWS SECTION ─── */}
      <section className="pdp-reviews-section">
         <div className="ctnr">
            <h2 className="section-title">O que dizem sobre a Matú</h2>
            <div className="reviews-summary">
               <div className="summary-left">
                  <span className="avg-total">{mockProduct.rating}</span>
                  <div className="stars-row">
                     {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="var(--color-primary)" color="var(--color-primary)" />)}
                  </div>
                  <span className="total-label">Baseado em {mockProduct.reviewsCount} opiniões</span>
               </div>
               <div className="summary-right">
                  {/* Simplificado */}
                  <button className="btn-write-review">Escrever uma Avaliação</button>
               </div>
            </div>

            <div className="reviews-list">
               {mockProduct.reviews.map(rev => (
                 <div key={rev.id} className="review-card">
                    <div className="review-header">
                       <span className="reviewer-name">{rev.user}</span>
                       <div className="rev-stars">
                          {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="var(--color-primary)" color="var(--color-primary)" />)}
                       </div>
                    </div>
                    <p className="review-comment">"{rev.comment}"</p>
                    <span className="review-date">{rev.date}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* ─── MOBILE STICKY BOTTOM ─── */}
      <div className="pdp-mobile-sticky-bar">
         <div className="sticky-info">
            <span className="name">{product.name}</span>
            <span className="price">R$ {product.price.toFixed(2).replace('.', ',')}</span>
         </div>
         <button className="btn-sticky-buy" onClick={handleAddToCart}>
            Adicionar ao Carrinho
         </button>
      </div>

      {/* ─── STYLES ─── */}
      <style>{`
        :root {
          --color-matu-green: #2E5E4E;
          --color-matu-beige: #F9F5F0;
          --color-matu-gold: #D4AF37;
          --color-matu-text: #1A1A1A;
          --color-matu-text-light: #666666;
          --color-matu-border: #E5E1DA;
        }

        .pdp-container {
          background-color: var(--color-bg-surface);
          color: var(--color-matu-text);
          padding-bottom: 5rem;
          margin-top: var(--header-height);
        }

        .ctnr {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 5%;
        }

        /* Breadcrumb */
        .pdp-breadcrumb {
          padding: 1.5rem 0;
          font-size: 0.85rem;
        }
        .pdp-breadcrumb .ctnr {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--color-matu-text-light);
        }
        .pdp-breadcrumb a {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--color-matu-text);
          font-weight: 500;
        }
        .pdp-breadcrumb .divider { margin: 0 4px; opacity: 0.3; }
        .pdp-breadcrumb .current { font-weight: 400; opacity: 0.7; }

        /* Main Layout */
        .pdp-main-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.93fr;
          gap: 5rem;
          align-items: start;
          padding-top: 2rem;
        }

        /* Gallery */
        .pdp-gallery-section {
          display: flex;
          gap: 1.5rem;
          position: sticky;
          top: 154px;
        }
        .pdp-thumbnails {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .pdp-thumb-item {
          width: 80px;
          border: 1px solid var(--color-matu-border);
          border-radius: 8px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s;
        }
        .pdp-thumb-item.active { border-color: var(--color-matu-green); border-width: 2px; }
        .pdp-thumb-item img { width: 100%; height: auto; display: block; filter: brightness(0.98); }
        
        .pdp-main-img-wrapper {
          flex: 1;
          background: #F4F4F4;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          aspect-ratio: 4/5;
        }
        .pdp-main-img-inner { width: 100%; height: 100%; overflow: hidden; cursor: zoom-in; }
        .pdp-main-img-inner img { 
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
          transition: transform 0.4s ease-out; 
        }
        .pdp-main-img-inner.zoomed img { transform: scale(1.6); }

        .pdp-badge-top {
          position: absolute;
          top: 20px;
          left: 20px;
          background: var(--color-matu-green);
          color: #fff;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          z-index: 5;
        }
        .pdp-gallery-controls {
           position: absolute;
           bottom: 20px;
           right: 20px;
           z-index: 5;
        }
        .pdp-gallery-controls button {
           background: rgba(255,255,255,0.8);
           width: 40px;
           height: 40px;
           border-radius: 50%;
           display: flex;
           align-items: center;
           justify-content: center;
           transition: all 0.3s;
        }
        .pdp-gallery-controls button:hover { background: #fff; transform: scale(1.1); }

        /* Product Info */
        .pdp-info-section { display: flex; flex-direction: column; }
        .pdp-rating-strip { display: flex; align-items: center; gap: 10px; cursor: pointer; margin-bottom: 2rem; }
        .pdp-rating-strip .stars { display: flex; gap: 4px; }
        .rating-count { font-size: 0.85rem; color: var(--color-matu-text-light); text-decoration: underline; }

        .pdp-title { font-size: 2.8rem; font-weight: 600; line-height: 1.15; color: var(--color-matu-green); margin-bottom: 1.5rem; letter-spacing: -0.02em; }
        .pdp-short-desc { font-size: 1.15rem; color: var(--color-matu-text-light); line-height: 1.5; margin-bottom: 3rem; }

        .pdp-price-block { margin-bottom: 3.5rem; }
        .pdp-price-header { display: flex; align-items: center; gap: 15px; margin-bottom: 8px; }
        .old-price { color: var(--color-matu-text-light); text-decoration: line-through; font-size: 1.1rem; }
        .discount-badge { background: #FDECEC; color: #E54B4B; padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 0.85rem; }
        .current-price { display: flex; align-items: flex-start; gap: 4px; color: var(--color-matu-green); }
        .current-price .currency { font-size: 1.3rem; font-weight: 600; margin-top: 6px; }
        .current-price .value { font-size: 3.5rem; font-weight: 700; line-height: 0.9; }
        .pdp-installments { margin-top: 15px; font-size: 0.95rem; color: var(--color-matu-text-light); }
        .pdp-installments strong { color: var(--color-matu-text); font-weight: 700; }

        .pdp-buy-controls { display: flex; gap: 15px; margin-bottom: 1.2rem; }
        .pdp-qty-selector { 
          display: flex; 
          align-items: center; 
          border: 1px solid var(--color-matu-border); 
          border-radius: 8px; 
          padding: 0 8px;
          min-width: 120px;
          justify-content: space-between;
        }
        .pdp-qty-selector button { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; color: var(--color-matu-text-light); transition: color 0.2s; }
        .pdp-qty-selector button:hover { color: var(--color-matu-text); }
        .qty-val { font-weight: 600; font-size: 1.1rem; }

        .pdp-btn-add { 
          flex: 1; 
          background: var(--color-matu-green); 
          color: #fff; 
          font-weight: 700; 
          text-transform: uppercase; 
          letter-spacing: 1px; 
          font-size: 0.95rem; 
          border-radius: 8px;
          transition: all 0.3s;
        }
        .pdp-btn-add:hover { background: #1C3C31; transform: translateY(-2px); box-shadow: 0 10px 25px rgba(46,94,78,0.2); }

        .pdp-btn-wa {
           display: flex;
           align-items: center;
           justify-content: center;
           gap: 10px;
           width: 100%;
           padding: 1rem;
           border: 1px solid var(--color-matu-border);
           border-radius: 8px;
           color: var(--color-matu-text);
           font-weight: 600;
           transition: all 0.3s;
           margin-bottom: 3.5rem;
        }
        .pdp-btn-wa:hover { border-color: #25D366; color: #25D366; background: #F7FFF9; }

        /* Seals */
        .pdp-trust-seals {
           display: grid;
           grid-template-columns: repeat(2, 1fr);
           gap: 20px;
           padding: 2.5rem 0;
           border-top: 1px solid var(--color-matu-border);
           border-bottom: 1px solid var(--color-matu-border);
           margin-bottom: 3.5rem;
        }
        .seal-item { display: flex; align-items: center; gap: 12px; }
        .seal-item svg { color: var(--color-matu-green); opacity: 0.8; }
        .seal-item span { font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.2; }

        /* Details Tabs */
        .pdp-details-tabs { width: 100%; }
        .pdp-tabs-nav { 
          display: flex; 
          gap: 30px; 
          border-bottom: 1px solid var(--color-matu-border);
          margin-bottom: 2rem;
        }
        .pdp-tabs-nav button {
          padding: 15px 0;
          font-weight: 700;
          color: var(--color-matu-text-light);
          position: relative;
          font-size: 0.95rem;
          text-transform: uppercase;
        }
        .pdp-tabs-nav button.active { color: var(--color-matu-green); }
        .pdp-tabs-nav button.active::after { 
           content: ''; 
           position: absolute; 
           bottom: -1px; 
           left: 0; 
           width: 100%; 
           height: 3px; 
           background: var(--color-matu-green); 
        }
        .pdp-tabs-panel { min-height: 150px; line-height: 1.7; color: var(--color-matu-text-light); }
        .pdp-benefits-list { list-style: none; margin-top: 1.5rem; display: flex; flex-direction: column; gap: 10px; }
        .pdp-benefits-list li { display: flex; align-items: center; gap: 10px; color: var(--color-matu-text); font-weight: 500; font-size: 0.95rem; }
        .pdp-benefits-list li svg { color: var(--color-matu-green); }
        .pdp-usage-text, .pdp-comp-text { font-size: 1rem; }
        .pdp-comp-notice { margin-top: 1.5rem; font-size: 0.85rem; }

        /* Reviews */
        .pdp-reviews-section { padding: 8rem 0; background-color: var(--color-matu-beige); margin-top: 5rem; }
        .section-title { font-size: 2.2rem; text-align: center; margin-bottom: 4rem; }
        .reviews-summary { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          background: #fff; 
          padding: 3rem; 
          border-radius: 16px; 
          margin-bottom: 4rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }
        .summary-left { display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .avg-total { font-size: 4rem; font-weight: 700; line-height: 1; color: var(--color-matu-green); }
        .stars-row { display: flex; gap: 4px; }
        .total-label { font-size: 0.85rem; color: var(--color-matu-text-light); }
        .btn-write-review { 
          padding: 1rem 2rem; 
          border: 1px solid var(--color-matu-green); 
          color: var(--color-matu-green); 
          font-weight: 700; 
          border-radius: 50px; 
          text-transform: uppercase;
        }

        .reviews-list { display: grid; gap: 20px; }
        .review-card { background: #FFF; padding: 2.5rem; border-radius: 12px; }
        .review-header { display: flex; justify-content: space-between; margin-bottom: 1rem; }
        .reviewer-name { font-weight: 700; font-size: 1.05rem; }
        .review-comment { font-style: italic; font-size: 1.1rem; color: #333; margin-bottom: 1.5rem; line-height: 1.6; }
        .review-date { font-size: 0.8rem; color: var(--color-matu-text-light); }

        /* Mobile Adjustments */
        .pdp-mobile-sticky-bar { display: none; }

        @media (max-width: 992px) {
           .pdp-main-grid { grid-template-columns: 1fr; gap: 3rem; }
           .pdp-gallery-section { flex-direction: column-reverse; position: static; }
           .pdp-thumbnails { flex-direction: row; }
           .pdp-thumb-item { width: 70px; }
           .pdp-title { font-size: 2.2rem; }
        }

        @media (max-width: 768px) {
           .pdp-breadcrumb { display: none; }
           .pdp-main-grid { padding-top: 0; }
           .pdp-info-section { padding-bottom: 80px; }
           
           .pdp-mobile-sticky-bar {
              display: flex;
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              background: #fff;
              padding: 15px 20px;
              box-shadow: 0 -4px 15px rgba(0,0,0,0.1);
              z-index: 1000;
              align-items: center;
              justify-content: space-between;
              gap: 15px;
           }
           .sticky-info { display: flex; flex-direction: column; }
           .sticky-info .name { font-weight: 700; font-size: 0.9rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 140px; }
           .sticky-info .price { font-weight: 700; color: var(--color-matu-green); }
           .btn-sticky-buy { 
             flex: 1; 
             background: var(--color-matu-green); 
             color: #fff; 
             height: 50px; 
             border-radius: 8px; 
             font-weight: 700; 
             text-transform: uppercase; 
             font-size: 0.85rem; 
           }
           .pdp-price-block .value { font-size: 2.8rem; }
        }
      `}</style>
    </div>
  );
}
