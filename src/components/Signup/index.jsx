import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { singup } from '../../services/login';
import { useFormik } from 'formik';
import './Signup.scss';

export default function Signup({ callback }) {
    const formik = useFormik({
      initialValues: {
        username: '',
      },
      onSubmit: handleSubmit,
    });

    async function handleSubmit(values) {
      const { username } = values;
      
      singup({ userName: username, password: '' });
      setTimeout(callback?.(), 1000);
    }

    const header = () => <span className='p-card-title'>Cadastre-se</span>;

    return (
        <Card className='sgup' header={header}>
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
                    <Button
                        className='p-button-sm'
                        label='Enviar'
                        icon='pi pi-check'
                        iconPos='right'
                        type='submit'
                    />
                </div>
            </form>
        </Card>
    );
}
