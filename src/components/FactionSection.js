import React, { useState } from 'react';
import CardList from './CardList';

function FactionSection({ factionName, cards, isInitiallyOpen }) {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <section className="faction-section" id={factionName}>
      <h2 
        className={`faction-header ${isOpen ? 'open' : 'closed'}`} 
        onClick={toggleOpen}
      >
        {factionName}
      </h2>
      {isOpen && <CardList cards={cards} />}
    </section>
  );
}

export default FactionSection;