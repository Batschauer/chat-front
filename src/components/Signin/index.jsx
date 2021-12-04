import React from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { useFormik } from 'formik';
import './Signin.scss';
import { Button } from 'primereact/button';
import { singin } from '../../services/login';
import { Link } from 'react-router-dom';

export default function Signin({ callback }) {
  async function handleSubmit(values) {
    const { username } = values;
    
    const isLogedIn = await singin({ ...values });
    if (isLogedIn) {
      callback?.(username);
    }
  }

  const formik = useFormik({
    initialValues: {
      username: '',
    },
    onSubmit: handleSubmit,
  });

  const header = () => <span className='p-card-title'>Entrar</span>;

  const footer = () => {
    return (
        <Link className='p-start-btn' to='/signup'>Cadastre-se</Link>
    );
  };

  return (
    <>
      <Card className='sgin' header={header} footer={footer}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <span className='p-float-label'>
              <InputText
                className='p-inputtext p-component p-username-input'
                id='username'
                onChange={formik.handleChange}
              />
              <label htmlFor='username'>Nome de usuário</label>
            </span>
            <Button type='submit'>Entrar</Button>
          </div>
        </form>
      </Card>
    </>
  );
}
