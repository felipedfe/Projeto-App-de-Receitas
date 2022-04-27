import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addCocktailToken, addMealToken, addUser } from '../services/localStorage';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validate, setValidate] = useState(false);

  useEffect(() => {
    const validEmail = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gm);
    // regex retirado de https://regexr.com/3e48o
    const passLength = 6;
    const validPassword = password.length > passLength;
    setValidate(validEmail && validPassword);
  }, [email, password]);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
    case 'email':
      setEmail(value);
      break;
    case 'password':
      setPassword(value);
      break;
    default: return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCocktailToken(1);
    addMealToken(1);
    addUser(email);
    history.push('/foods');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="email"
        value={ email }
        data-testid="email-input"
        name="email"
        onChange={ handleChange }
        placeholder="E-mail"
      />
      <input
        type="password"
        value={ password }
        data-testid="password-input"
        name="password"
        onChange={ handleChange }
        placeholder="Password"
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ !validate }
        onClick={ handleSubmit }
      >
        Enter
      </button>
    </form>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
