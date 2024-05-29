import React from 'react';

const SearchBox = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
        type="text"
        placeholder="Search.."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default SearchBox
