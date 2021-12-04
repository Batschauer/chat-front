import React from 'react';
import Signup from '../../components/Signup';
import { useLocation, useNavigate } from 'react-router';
import './Signup.scss';

export default function SignUpPage() {
    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname || "/";

    function onSingup() {
        navigate('/chat', { replace: true});
    }

    return (
        <div className='singup-page'>
            <Signup callback={onSingup}/>
        </div>
    );
}
