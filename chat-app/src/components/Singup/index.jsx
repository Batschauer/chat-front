import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { singup } from '../../services/login';
import './Singup.scss';

export default function Singup() {
  const [userName, setUserName] = useState('');

  function handleSubmit() {
    console.log('Username: ', userName);
    singup({ userName: 'batschauer', password: '123'});
  }

  return (
    <Card className='sgup' title='Cadastre-se'>
      <div className='sgup__data'>
        <label htmlFor='inputUser'>Nome de usuário</label>
        <input type='text' maxlength='20' id='inputUser' onChange={ (e) => setUserName(e.value) } />
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
