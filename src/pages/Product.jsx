import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Leaf, Rabbit, Droplet, Plus, Minus, ShieldCheck } from 'lucide-react';

const mockProduct = {
  id: 1,
  name: 'Sérum Renovador Natural',
  price: 89.90,
  image: '/images/product_bottle.png',
  description: 'Um tratamento luxuoso e leve que penetra profundamente na pele. Criado com botânicos selecionados para revitalizar e entregar um brilho natural sem deixar sensação oleosa.',
  ingredients: 'Óleo de Rosa Mosqueta certificado, Esqualano Vegetal, Vitamina E pura, Extrato de Camomila.',
  howToUse: 'Aplique 3 a 4 gotas na pele limpa e levemente úmida. Massageie de baixo para cima com movimentos suaves. Pode ser usado de manhã e à noite.',
  forWho: 'Todos os tipos de pele, especialmente peles secas e que buscam viço natural.',
};

const crossSell = [
  { id: 2, name: 'Óleo Corporal Relaxante', price: 74.50, image: '/images/product_bottle.png' },
  { id: 4, name: 'Creme Hidratante Facial', price: 112.00, image: '/images/product_bottle.png' }
];

export default function Product({ addToCart }) {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('sobre'); // sobre, como-usar, para-quem

  const handleAddToCart = () => {
    // In a real app we would pass quantity and product object
    addToCart({ ...mockProduct, quantity, id: Number(id) || 1 });
  };

  return (
    <div className="product-page">
      <div className="container product-main">
        <div className="product-gallery">
          <img src={mockProduct.image} alt={mockProduct.name} className="main-image" />
        </div>
        
        <div className="product-details">
          <div className="breadcrumb">
            <Link to="/">Home</Link> &gt; <span>Produtos</span> &gt; <span>{mockProduct.name}</span>
          </div>
          
          <h1 className="product-title">{mockProduct.name}</h1>
          <p className="product-price">R$ {mockProduct.price.toFixed(2).replace('.', ',')}</p>
          
          <p className="product-short-desc">{mockProduct.description}</p>
          
          <div className="trust-icons">
            <div className="trust-item"><Leaf size={20} /> Natural</div>
            <div className="trust-item"><Rabbit size={20} /> Vegano</div>
            <div className="trust-item"><ShieldCheck size={20} /> Cruelty-Free</div>
          </div>

          <div className="purchase-actions">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}><Plus size={16} /></button>
            </div>
            
            <button className="btn btn-primary buy-btn" onClick={handleAddToCart}>
              Comprar Agora
            </button>
          </div>

          <div className="product-tabs-container">
            <div className="tabs-header">
              <button className={activeTab === 'sobre' ? 'active' : ''} onClick={() => setActiveTab('sobre')}>Sobre o produto</button>
              <button className={activeTab === 'como-usar' ? 'active' : ''} onClick={() => setActiveTab('como-usar')}>Como usar</button>
              <button className={activeTab === 'para-quem' ? 'active' : ''} onClick={() => setActiveTab('para-quem')}>Indicação</button>
            </div>
            
            <div className="tabs-content animate-fade-in">
              {activeTab === 'sobre' && (
                <div>
                  <p><strong>Benefícios naturais:</strong> Desenvolvido com uma combinação exclusiva de óleos puros essenciais que promovem regeneração celular sem agressão. Sem fragrâncias sintéticas ou conservantes tóxicos.</p>
                  <p className="mt-2"><strong>Ingredientes principais:</strong> {mockProduct.ingredients}</p>
                </div>
              )}
              {activeTab === 'como-usar' && (
                <div>
                  <p>{mockProduct.howToUse}</p>
                </div>
              )}
              {activeTab === 'para-quem' && (
                <div>
                  <p>{mockProduct.forWho}</p>
                </div>
              )}
            </div>
          </div>

          <div className="diferenciais-box">
            <h4>Diferenciais Matú</h4>
            <ul>
              <li><Droplet size={16} /> Produção artesanal de pequenos lotes</li>
              <li><Droplet size={16} /> Livre de sulfatos, parabenos e petrolatos</li>
              <li><Droplet size={16} /> Embalagem reciclável</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="section cross-sell bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Você também pode gostar</h2>
            <p>Combine este produto com outros essenciais da Matú.</p>
          </div>
          <div className="grid grid-cols-4 mt-4 cross-sell-grid">
            {crossSell.slice(0, 2).map(item => (
              <div key={item.id} className="product-card">
                <div className="product-img-wrapper" style={{ cursor: 'pointer' }} onClick={() => window.location.href=`/product/${item.id}`}>
                  <img src={item.image} alt={item.name} />
                  <button className="quick-add" onClick={(e) => { e.stopPropagation(); addToCart({ ...item, quantity: 1 }); }}>+ Rápido</button>
                </div>
                <div className="product-info-minimal">
                  <span className="p-cat">Cuidados</span>
                  <Link to={`/product/${item.id}`}>
                    <h3>{item.name}</h3>
                  </Link>
                  <div className="price-row">
                    <span className="price">R$ {item.price.toFixed(2).replace('.', ',')}</span>
                    <button className="add-link" onClick={() => addToCart({ ...item, quantity: 1 })}>Adicionar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .product-page {
          padding-top: calc(var(--header-height) + 2rem);
        }

        .product-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          margin-bottom: 5rem;
        }

        .main-image {
          width: 100%;
          border-radius: var(--radius-lg);
          object-fit: cover;
          aspect-ratio: 4/5;
          background-color: var(--color-bg-sand);
        }

        .breadcrumb {
          font-size: 0.85rem;
          color: var(--color-text-light);
          margin-bottom: 1.5rem;
        }

        .breadcrumb a {
          color: var(--color-text-medium);
        }

        .product-title {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .product-price {
          font-size: 1.5rem;
          color: var(--color-primary);
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .product-short-desc {
          margin-bottom: 2rem;
          font-size: 1.05rem;
        }

        .trust-icons {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--color-text-medium);
          background-color: var(--color-bg-sand);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
        }

        .purchase-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          padding: 0 1rem;
          height: 3.5rem;
        }

        .quantity-selector button {
          padding: 0 0.5rem;
          color: var(--color-text-medium);
        }

        .quantity-selector span {
          min-width: 2rem;
          text-align: center;
          font-weight: 500;
        }

        .buy-btn {
          flex: 1;
          height: 3.5rem;
          font-size: 1.1rem;
        }

        .product-tabs-container {
          margin-bottom: 2.5rem;
        }

        .tabs-header {
          display: flex;
          gap: 2rem;
          border-bottom: 1px solid var(--color-border);
          margin-bottom: 1.5rem;
        }

        .tabs-header button {
          padding-bottom: 1rem;
          font-weight: 500;
          color: var(--color-text-medium);
          position: relative;
        }

        .tabs-header button.active {
          color: var(--color-primary);
        }

        .tabs-header button.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--color-primary);
        }

        .tabs-content {
          font-size: 0.95rem;
          min-height: 100px;
        }

        .diferenciais-box {
          background-color: var(--color-bg-main);
          padding: 1.5rem;
          border-radius: var(--radius-md);
          border: 1px dashed var(--color-border);
        }

        .diferenciais-box h4 {
          margin-bottom: 1rem;
          font-family: var(--font-body);
        }

        .diferenciais-box ul {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .diferenciais-box li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.95rem;
          color: var(--color-text-medium);
        }

        .diferenciais-box li svg {
          color: var(--color-primary-light);
        }

        .bg-light { background-color: var(--color-bg-main); }
        .mt-4 { margin-top: 2rem; }

        .product-img-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: var(--radius-lg);
          margin-bottom: 1.5rem;
        }

        .product-img-wrapper img {
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .product-card:hover .product-img-wrapper img {
          transform: scale(1.05);
        }

        .quick-add {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          background-color: white;
          color: var(--color-primary);
          padding: 0.6rem 1.2rem;
          border-radius: var(--radius-full);
          font-weight: 600;
          font-size: 0.85rem;
          opacity: 0;
          transition: all 0.3s ease;
          border: none;
          white-space: nowrap;
        }

        .product-card:hover .quick-add {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .product-info-minimal {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .p-cat {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-light);
        }

        .product-info-minimal h3 {
          font-size: 1.1rem;
          color: var(--color-text-dark);
          line-height: 1.4;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.5rem;
        }

        .price-row .price {
          font-weight: 700;
          color: var(--color-primary);
          font-size: 1rem;
        }

        .add-link {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-primary);
          background: none;
          border: none;
          padding: 0;
          text-decoration: underline;
          cursor: pointer;
        }

        @media (max-width: 992px) {
          .product-main {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .main-image {
            max-height: 500px;
          }
          .cross-sell-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .purchase-actions {
            flex-direction: column;
          }
          .tabs-header {
            overflow-x: auto; white-space: nowrap;
          }
        }
      `}</style>
    </div>
  );
}
