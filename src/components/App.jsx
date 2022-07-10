import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from './App.module.css';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';

export class App extends Component {
  state = {
    query: '',
  };

  formSubmitHandler = ({ query }) => {
    this.setState({ query });
  };

  render() {
    return (
      <div className={s.app}>
        <SearchBar onSubmit={this.formSubmitHandler} />
        <ToastContainer autoClose={3000} />
        <ImageGallery query={this.state.query} />
      </div>
    );
  }
}
