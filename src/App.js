import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchFilters from './components/SearchFilters';
import FactionList from './components/FactionList';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [allCards, setAllCards] = useState([]);
  const [groupedCards, setGroupedCards] = useState({});

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [rarityFilter, setRarityFilter] = useState('All');

  useEffect(() => {
    const proxyUrl = '/gwent-api/?key=data';

    fetch(proxyUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        const responseData = data.response;
        const allItems = Object.values(responseData);

        const cardArray = allItems.filter(item => {
          if (!item.attributes || !item.attributes.type) return false;
          const type = item.attributes.type;
          return type === 'Unit' || type === 'Special' || type === 'Artifact' || type === 'Ability' || type === 'Stratagem';
        });
        
        setAllCards(cardArray);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data: ", error.message);
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filteredCards = allCards;

    if (searchTerm) {
      filteredCards = filteredCards.filter(card =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== 'All') {
      filteredCards = filteredCards.filter(card => 
        card.attributes.type === typeFilter
      );
    }
    
    if (rarityFilter !== 'All') {
      filteredCards = filteredCards.filter(card => 
        card.attributes.color === rarityFilter
      );
    }

    const groups = filteredCards.reduce((acc, card) => {
      const faction = card.attributes.faction ? card.attributes.faction : 'Neutral';
      if (!acc[faction]) {
        acc[faction] = [];
      }
      acc[faction].push(card);
      return acc;
    }, {});

    const sortedGroups = Object.keys(groups).sort((a, b) => {
      if (a === 'Neutral') return -1;
      if (b === 'Neutral') return 1;
      if (a === 'Monsters' && b !== 'Neutral') return -1;
      if (b === 'Monsters' && a !== 'Neutral') return 1;
      return a.localeCompare(b);
    }).reduce((obj, key) => { 
      obj[key] = groups[key]; 
      return obj; 
    }, {});

    setGroupedCards(sortedGroups);
  }, [searchTerm, typeFilter, rarityFilter, allCards]);

  const renderContent = () => {
    if (loading) {
      return <p>Loading cards...</p>;
    }
    if (error) {
      return <p className="error-message">Error loading data: {error.message}</p>;
    }
    if (Object.keys(groupedCards).length === 0) {
      return <p>No matching cards found.</p>; 
    }
    return <FactionList groups={groupedCards} />;
  };

  return (
    <div className="App">
      <Header />
      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        rarityFilter={rarityFilter}
        setRarityFilter={setRarityFilter}
      />
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;