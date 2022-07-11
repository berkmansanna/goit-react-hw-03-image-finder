import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImgWithQuery } from 'API/api';

import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';
import { Button } from './Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from './Loader/Loader';
import { imgMapper } from 'utils/imgMapper';

import s from './App.module.css';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    largeImg: null,
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;

    if (prevQuery !== nextQuery) {
      try {
        this.setState({ isLoading: true, page: 1, images: [] });
        const images = await fetchImgWithQuery(query);
        this.setState({
          images: imgMapper(images),
        });
      } catch {
        return toast.error("Sorry, we didn't find anything");
      } finally {
        this.setState({ isLoading: false });
      }
    }
    if (prevPage !== nextPage && nextPage !== 1) {
      try {
        this.setState({ isLoading: true });
        const newImages = await fetchImgWithQuery(query, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...imgMapper(newImages)],
        }));
      } catch {
        return toast.error("Sorry, we didn't find anything");
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  formSubmitHandler = query => {
    this.setState({ query });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleImgClick = largeImg => {
    this.setState({ largeImg });
  };

  handleModalClose() {
    this.setState({ largeImg: null });
  }

  render() {
    const { query, images, largeImg, isLoading } = this.state;

    return (
      <div className={s.app}>
        <SearchBar onSubmit={this.formSubmitHandler} />
        <ToastContainer autoClose={3000} />

        {isLoading && <Loader />}

        {images.length > 0 && (
          <ImageGallery
            images={this.state.images}
            onClick={this.handleImgClick}
          />
        )}

        {images.length > 0 && !isLoading && <Button onClick={this.loadMore} />}

        {largeImg && (
          <Modal
            imgLarge={largeImg}
            alt={query}
            onClose={this.handleImgClick}
          />
        )}
      </div>
    );
  }
}
