import React from 'react';

function CardItem({ card }) {
  
  const artId = card.id.art;
  const imageUrl = `https://gwent.one/image/gwent/assets/card/art/low/${artId}.jpg`;
  
  const { power, provision, type, color, faction } = card.attributes;
  const { ability, flavor } = card;

  return (
    <div className="card-item">
      <img src={imageUrl} alt={card.name} />
      <div className="card-info">
        <h3>{card.name}</h3>
        
        <div className="card-stats">
          {power > 0 && <span className="stat-power">Power: {power}</span>}
          {provision > 0 && <span className="stat-provision">Provision: {provision}</span>}
          <span className="stat-color">{color}</span>
        </div>

        <p className="card-type">
          {type} ({faction ? faction : 'Neutral'})
        </p>

        <div className="card-divider"></div>

        <p className="card-ability">{ability}</p>
        
        {flavor && <div className="card-divider"></div>}

        <p className="card-flavor">{flavor}</p>
      </div>
    </div>
  );
}

export default CardItem;