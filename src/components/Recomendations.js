import React from 'react';
import PropTypes from 'prop-types';
import CarouselRecom from './CarouselRecom';

const Recomendations = ({ type }) => {
  if (type === 'meal') {
    return (
      <section className="recomendation-sect">
        <CarouselRecom type="meal" />
      </section>
    );
  } return (
    <section className="recomendation-sect">
      <CarouselRecom type="drink" />
    </section>
  );
};

Recomendations.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Recomendations;
