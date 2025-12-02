import React from 'react';
import CardItem from './CardItem';

function CardList({ cards }) {
  return (
    <div className="card-list">
      {cards.map((card) => (
        <CardItem key={card.id.card} card={card} />
      ))}
    </div>
  );
}

export default CardList;