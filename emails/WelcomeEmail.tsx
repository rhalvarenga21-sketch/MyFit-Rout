import * as React from 'react';

interface WelcomeEmailProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<WelcomeEmailProps>> = ({
  firstName,
}) => (
  <div style={{
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5'
  }}>
    <div style={{
      backgroundColor: '#ffffff',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{
        color: '#333',
        fontSize: '28px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        🎉 Bem-vindo ao MyFitRout!
      </h1>
      
      <p style={{
        color: '#666',
        fontSize: '16px',
        lineHeight: '1.6',
        marginBottom: '20px'
      }}>
        Olá {firstName},
      </p>
      
      <p style={{
        color: '#666',
        fontSize: '16px',
        lineHeight: '1.6',
        marginBottom: '20px'
      }}>
        Obrigado por sua compra! Seu treino personalizado está pronto.
      </p>
      
      <div style={{
        backgroundColor: '#4CAF50',
        color: '#ffffff',
        padding: '15px 30px',
        textAlign: 'center',
        borderRadius: '5px',
        margin: '30px 0',
        fontSize: '18px',
        fontWeight: 'bold'
      }}>
        Acesse seu treino agora!
      </div>
      
      <p style={{
        color: '#666',
        fontSize: '14px',
        lineHeight: '1.6',
        marginTop: '30px',
        textAlign: 'center',
        borderTop: '1px solid #eee',
        paddingTop: '20px'
      }}>
        Qualquer dúvida, estamos à disposição!<br />
        Equipe MyFitRout
      </p>
    </div>
  </div>
);