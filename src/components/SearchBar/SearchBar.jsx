import { Component } from 'react';
import { toast } from 'react-toastify'
import PropTypes from 'prop-types';
import s from './SearchBar.module.css'

export class SearchBar extends Component {
  state = {
    query: '',
  };

  handelChange = e => {
    this.setState({
      query: e.currentTarget.value.toLowerCase(),
    });
  };

  handelSubmit = e => {
    const {query} = this.state
    e.preventDefault();
    if (query.trim() === '') {
     return toast.error("Empty field. Write something!");
    }
    this.props.onSubmit(this.state);
    this.formReset();
  };

  formReset = () => {
    this.setState({
      query: '',
    });
  };

  render() {
    return (
      <header className={s.searchBar}>
        <form className={s.searchForm} onSubmit={this.handelSubmit}>
          <button className={s.searchFormButton} type="submit">
            <span className={s.searchFormButtonLabel}>Search</span>
          </button>

          <input
            type="text"
            name="query"
            value={this.state.query}
            className={s.searchFormInput}
            onChange={this.handelChange}
              autoComplete="off"
              autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
