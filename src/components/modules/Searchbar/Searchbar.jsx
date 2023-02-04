import { Component } from 'react';
import PropTypes from 'prop-types';

import scss from './searchbar.module.scss';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleInputChange = evt => {
    const { target } = evt;
    const { value } = target;
    this.setState({ searchQuery: value });
  };

  handleSearchButton = evt => {
    evt.preventDefault();

    const { onSubmit } = this.props;
    const { searchQuery } = this.state;

    if (searchQuery.trim() === '') {
      alert('Enter something');
      return;
    }
    onSubmit(searchQuery);

    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
    const { handleInputChange, handleSearchButton } = this;
    return (
      <header className={scss.searchbar}>
        <form className={scss.searchForm} onSubmit={handleSearchButton}>
          <button className={scss.searchForm__button} type="submit">
            <span className={scss.searchFormButton__label}>Search</span>
          </button>
          <input
            className={scss.searchForm__input}
            name="searchQuery"
            value={searchQuery}
            type="text"
            onChange={handleInputChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
