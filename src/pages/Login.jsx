import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    alert('Link de acesso enviado para o seu e-mail!');
  };

  return (
    <div className="login-page">
      <div className="login-container animate-fade-in">
        <h1 className="login-title">Acesse sua conta</h1>
        <p className="login-subtitle">Minimalismo até no acesso. Insira seu e-mail e enviaremos um link seguro para você entrar, sem precisar lembrar de senhas.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Seu e-mail</label>
            <input 
              type="email" 
              id="email" 
              placeholder="ex: voce@exemplo.com" 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-full login-btn">
            Continuar com E-mail
          </button>
        </form>

        <div className="login-footer">
          <p>
            Ao continuar, você concorda com nossos <Link to="#">Termos e Privacidade</Link>.
          </p>
          <p className="mt-2">
            Ainda não conhece a Matú? <Link to="/#produtos" className="text-primary">Descubra nossa essência.</Link>
          </p>
        </div>
      </div>

      <style>{`
        .login-page {
          min-height: calc(100vh - var(--header-height) - 300px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: calc(var(--header-height) + 2rem) 1rem 4rem;
          background-color: var(--color-bg-sand);
        }

        .login-container {
          background-color: var(--color-bg-surface);
          width: 100%;
          max-width: 450px;
          padding: 3rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-soft);
          text-align: center;
        }

        .login-title {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .login-subtitle {
          font-size: 0.95rem;
          color: var(--color-text-medium);
          margin-bottom: 2.5rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          text-align: left;
        }

        .form-group label {
          display: block;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: var(--color-text-dark);
        }

        .form-group input {
          width: 100%;
          padding: 1rem 1.25rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          font-family: var(--font-body);
          font-size: 1rem;
          transition: border-color 0.3s ease;
          background-color: var(--color-bg-main);
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--color-primary);
          background-color: white;
        }

        .login-btn {
          font-size: 1.1rem;
          padding: 1rem;
        }

        .login-footer {
          margin-top: 2rem;
          font-size: 0.85rem;
          color: var(--color-text-light);
        }

        .login-footer a {
          text-decoration: underline;
        }

        .text-primary {
          color: var(--color-primary);
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
