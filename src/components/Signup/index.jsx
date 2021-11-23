import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { singup } from '../../services/login';
import './Signup.scss';

export default function Signup({ onClose }) {
  const [userName, setUserName] = useState('');

  function handleSubmit() {
    console.log('Username: ', userName);
    singup({ userName: userName, password: '' });
    onClose?.();
  }

  function handleChange(e) {
    setUserName(e.target.value);
  }

  return (
    <Card className='sgup' title='Cadastre-se'>
      <div className='sgup__data'>
        <label htmlFor='inputUser'>Nome de usuário</label>
        <input type='text' maxlenght='20' id='inputUser' onChange={handleChange} />
      </div>
      <Button
        className='p-button-sm'
        label='Enviar'
        icon='pi pi-check'
        iconPos='right'
        onClick={handleSubmit}
      />
    </Card>
  );
}
