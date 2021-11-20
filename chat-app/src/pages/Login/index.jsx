import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import Signin from '../../components/Signin';
import { useAuth } from '../../hooks/auth';
import './Login.scss';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function onSignIn(userName) {
    auth.signin(userName, () => {
      navigate(from, { replace: true});
    });
  }

  return (
    <div className='login-page'>
      <Signin callback={onSignIn} />
    </div>
  );
}
