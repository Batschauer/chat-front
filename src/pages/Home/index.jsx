import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './Home.scss';
import { Link } from 'react-router-dom';

export default function Home() {
  const header = () => <span className='p-card-title'>Seja bem vindo!</span>;

  return (
      <Card header={header} className='home-page'>
          <span className='p-desc-1'>Experimente enviar mensagens utilizando algoritmos de criptografia assimétrica</span>
          <span className='p-desc-2'>Diffie-Hellman e RSA</span>
          <Link className='p-start-btn' to='/chat'>Iniciar</Link>
      </Card>
  );
}
