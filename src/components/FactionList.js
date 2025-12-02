import React from 'react';
import FactionSection from './FactionSection';

function FactionList({ groups }) {
  return (
    <div className="faction-list">
      {Object.entries(groups).map(([factionName, cards], index) => (
        <FactionSection 
          key={factionName} 
          factionName={factionName} 
          cards={cards} 
          isInitiallyOpen={index === 0}
        />
      ))}
    </div>
  );
}

export default FactionList;