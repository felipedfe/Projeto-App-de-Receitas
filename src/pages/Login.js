import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addCocktailToken, addMealToken, addUser } from '../services/localStorage';
import MyContext from '../context/MyContext';
import logo from '../images/undraw_cooking_lyxy.svg';
import '../style/Login.css';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validate, setValidate] = useState(false);
  const { getMealsAndDrinks } = useContext(MyContext);

  useEffect(() => {
    getMealsAndDrinks('meal');
    getMealsAndDrinks('drink');
  }, []);

  useEffect(() => {
    const validEmail = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gm);
    // regex retirado de https://regexr.com/3e48o
    const passLength = 6;
    const validPassword = password.length > passLength;
    setValidate(validEmail && validPassword);
  }, [email, password]);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCocktailToken(1);
    addMealToken(1);
    addUser(email);
    history.push('/foods');
  };

  return (
    <section className="login-content">
      <img src={ logo } alt="recipes app" />
      <h1>Recipes App</h1>
      <form onSubmit={ handleSubmit } className="login-form">
        <input
          className="login-input"
          type="email"
          value={ email }
          data-testid="email-input"
          name="email"
          onChange={ handleChange }
          placeholder="E-mail"
        />
        <input
          className="login-input"
          type="password"
          value={ password }
          data-testid="password-input"
          name="password"
          onChange={ handleChange }
          placeholder="Password"
        />
        <button
          className="login-btn"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !validate }
          onClick={ handleSubmit }
        >
          Enter
        </button>
      </form>
    </section>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
