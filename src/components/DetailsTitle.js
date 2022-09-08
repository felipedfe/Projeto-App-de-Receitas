import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { BsShare } from 'react-icons/bs';
import { addFavorite, getFavorites, removeFromFavorite } from '../services/localStorage';
import MyContext from '../context/MyContext';
import share from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

const DetailsTitle = ({ type, id, recipeDetail }) => {
  const { setLoading } = useContext(MyContext);
  const [favorite, setFavorite] = useState(false);
  const [detail, setDetail] = useState({});
  const [copied, setCopied] = useState(false);
  const { location } = useHistory();

  const renameDetails = () => {
    setLoading(true);
    let details;
    if (type === 'meal') {
      details = {
        id,
        type: 'food',
        nationality: recipeDetail.strArea,
        category: recipeDetail.strCategory,
        alcoholicOrNot: '',
        name: recipeDetail.strMeal,
        image: recipeDetail.strMealThumb,
      };
    } else {
      details = {
        id,
        type,
        nationality: '',
        category: recipeDetail.strCategory,
        alcoholicOrNot: recipeDetail.strAlcoholic,
        name: recipeDetail.strDrink,
        image: recipeDetail.strDrinkThumb,
      };
    }
    setDetail(details);
  };

  useEffect(() => {
    renameDetails();
  }, [recipeDetail]);

  useEffect(() => {
    setLoading(false);
  }, [detail]);

  useEffect(() => {
    const favorites = getFavorites() || [];
    favorites.forEach((item) => {
      if (item.id === id) setFavorite(true);
    });
  }, [id]);

  const handleClick = () => {
    if (favorite) {
      setFavorite(false);
      removeFromFavorite(id);
    } else {
      setFavorite(true);
      addFavorite({ ...detail });
    }
  };

  const handleCopy = () => {
    const { pathname } = location;
    let text = `${window.location.origin}${pathname}`;
    text = text.split('/in-progress').join('');
    copy(text);
    setCopied(true);
  };

  return (
    <section className="details-header">
      <img
        className="details-food-img"
        src={ detail.image }
        alt={ detail.name }
        width="300"
      />
      <h1 className="details-title">
        { detail.name }
      </h1>
      <section className="like-share-sect">
        <section className="copy-sect">
          <button
            className="copy-btn"
            type="button"
            src={ share }
            onClick={ handleCopy }
          >
            <BsShare />
          </button>
          {copied && <p>Link copied!</p>}
        </section>
        <button
          className="like-btn"
          type="button"
          onClick={ handleClick }
          src={ favorite ? blackHeart : whiteHeart }
        >
          { favorite ? <FaHeart /> : <FiHeart /> }
        </button>
      </section>
      {type === 'meal' && (
        <p className="details-cat">{ detail.category }</p>
      )}
      {detail.alcoholicOrNot && (
        <p className="details-cat">
          {detail.alcoholicOrNot}
        </p>)}
    </section>
  );
};

DetailsTitle.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  recipeDetail: PropTypes.shape({
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
};

DetailsTitle.defaultProps = {
  recipeDetail: {
    strArea: '',
    strCategory: '',
    strAlcoholic: '',
    strDrink: '',
    strDrinkThumb: '',
    strMeal: '',
    strMealThumb: '',
  },
};

export default DetailsTitle;
