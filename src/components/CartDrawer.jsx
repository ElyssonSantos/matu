import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartDrawer({ isOpen, onClose, items, onRemove, onUpdateQuantity }) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeShippingThreshold = 150; // R$ 150 para frete grátis
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const remaining = freeShippingThreshold - subtotal;

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        
        <div className="cart-header">
          <h2>Seu Carrinho</h2>
          <button className="btn-icon" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="cart-progress">
          {remaining > 0 ? (
            <p>Faltam <strong>R$ {remaining.toFixed(2).replace('.', ',')}</strong> para frete grátis!</p>
          ) : (
            <p><strong>Parabéns!</strong> Você ganhou frete grátis 🌿</p>
          )}
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} strokeWidth={1} color="var(--color-border)" />
              <p>Seu carrinho está vazio.</p>
              <button className="btn btn-primary" onClick={onClose}>
                Ver produtos
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-price">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                  <div className="item-actions">
                    <div className="quantity-control">
                      <button onClick={() => onUpdateQuantity(item.id, -1)}><Minus size={14} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)}><Plus size={14} /></button>
                    </div>
                    <button className="remove-btn" onClick={() => onRemove(item.id)}>Remover</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <p className="shipping-note">Frete calculado na próxima etapa.</p>
            <button className="btn btn-primary btn-checkout">
              Finalizar Compra
            </button>
          </div>
        )}

      </div>

      <style>{`
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0,0,0,0.4);
          backdrop-filter: blur(2px);
          z-index: 1000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .cart-overlay.open {
          opacity: 1;
          pointer-events: all;
        }

        .cart-drawer {
          position: fixed;
          top: 0;
          right: -100%;
          width: 100%;
          max-width: 400px;
          height: 100vh;
          background-color: var(--color-bg-surface);
          z-index: 1001;
          display: flex;
          flex-direction: column;
          transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: -5px 0 30px rgba(0,0,0,0.05);
        }

        .cart-drawer.open {
          right: 0;
        }

        .cart-header {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--color-border);
        }

        .cart-header h2 {
          margin: 0;
          font-family: var(--font-body);
          font-size: 1.25rem;
          font-weight: 600;
        }

        .cart-progress {
          padding: 1.5rem;
          background-color: var(--color-bg-main);
          border-bottom: 1px solid var(--color-border);
        }

        .cart-progress p {
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
          text-align: center;
        }

        .progress-bar {
          height: 6px;
          background-color: var(--color-border);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background-color: var(--color-primary);
          transition: width 0.3s ease;
        }

        .cart-items {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .empty-cart {
          text-align: center;
          margin: auto;
          color: var(--color-text-light);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .cart-item {
          display: flex;
          gap: 1rem;
        }

        .cart-item img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: var(--radius-sm);
          background-color: var(--color-bg-sand);
        }

        .item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .item-details h4 {
          margin: 0;
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 500;
        }

        .item-price {
          font-weight: 600;
          color: var(--color-text-dark);
          margin-bottom: 0;
        }

        .item-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .quantity-control {
          display: flex;
          align-items: center;
          gap: 1rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          padding: 0.25rem 0.75rem;
        }

        .quantity-control button {
          color: var(--color-text-medium);
        }
        
        .quantity-control button:hover {
          color: var(--color-text-dark);
        }

        .remove-btn {
          font-size: 0.8rem;
          text-decoration: underline;
          color: var(--color-text-medium);
        }

        .cart-footer {
          padding: 1.5rem;
          border-top: 1px solid var(--color-border);
          background-color: white;
        }

        .cart-total {
          display: flex;
          justify-content: space-between;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .shipping-note {
          font-size: 0.8rem;
          color: var(--color-text-light);
          margin-bottom: 1.5rem;
        }

        .btn-checkout {
          width: 100%;
          padding: 1rem;
          font-size: 1.1rem;
        }
      `}</style>
    </>
  );
}
