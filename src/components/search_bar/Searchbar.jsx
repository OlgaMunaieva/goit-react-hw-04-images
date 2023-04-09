import '../styles.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = ({ target: { value } }) => {
    setSearchQuery(value);
  };

  const setForm = ({ value }) => {
    value = searchQuery;
    setSearchQuery(value);
  };

  const handleOnSubmit = event => {
    event.preventDefault();
    setSearchQuery(event.target.value);
    onSubmit(searchQuery);
    setForm(event.target);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleOnSubmit}>
        <button type="submit" className="SearchForm-button">
          <FiSearch />
        </button>
        <input
          className="SearchForm-input"
          onChange={handleChange}
          value={searchQuery}
          type="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
