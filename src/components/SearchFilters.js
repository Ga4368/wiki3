import React from 'react';

function SearchFilters({
  searchTerm,
  setSearchTerm,
  typeFilter,
  setTypeFilter,
  rarityFilter,
  setRarityFilter
}) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by name..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div className="filter-controls">
        <select 
          className="filter-select" 
          value={typeFilter} 
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Unit">Unit</option>
          <option value="Special">Special</option>
          <option value="Artifact">Artifact</option>
          <option value="Ability">Ability</option>
          <option value="Stratagem">Stratagem</option>
        </select>

        <select 
          className="filter-select" 
          value={rarityFilter} 
          onChange={(e) => setRarityFilter(e.target.value)}
        >
          <option value="All">All Rarities</option>
          <option value="Gold">Gold</option>
          <option value="Bronze">Bronze</option>
        </select>
      </div>
    </div>
  );
}

export default SearchFilters;