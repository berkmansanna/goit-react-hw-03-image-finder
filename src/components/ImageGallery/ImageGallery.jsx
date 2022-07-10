import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { fetchImgWithQuery } from 'API/api';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import { Button } from '../Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from '../Loader/Loader';

export class ImageGallery extends Component {
  state = {
    page: 1,
    images: [],
    largeImg: null,
    isLoading: false,
  };

  // async componentDidMount() {
  //   const { query } = this.props;
  //   if (query.trim() !== '') {
  //     try {
  //       this.setState({ isLoading: true });
  //       const images = await fetchImgWithQuery(query);
  //       this.setState({ images });
  //     } catch (error) {
  //       return toast.error("Sorry, we didn't find anything");
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }
  // }

  async componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { page } = this.state;
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (prevQuery !== nextQuery) {
      try {
        this.setState({ isLoading: true , page: 1, images: [] });
        const images = await fetchImgWithQuery(query);
        this.setState({
          images
        });
      } catch {
        return toast.error("Sorry, we didn't find anything");
      } finally {
        this.setState({ isLoading: false });
      }
    }

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevPage !== nextPage && nextPage !== 1) {
      try {
        this.setState({ isLoading: true});
        const newImages = await fetchImgWithQuery(query, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
        }));
      } catch {
        return toast.error("Sorry, we didn't find anything");
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

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
    const { images, largeImg, isLoading } = this.state;
    const { query } = this.props;

    return (
      <>
        <ul className={s.ImageGallery}>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              onClick={this.handleImgClick}
              key={id}
              small={webformatURL}
              large={largeImageURL}
              alt={tags}
            />
          ))}

          {isLoading && <Loader />}

          {largeImg && (
            <Modal
              imgLarge={largeImg}
              alt={query}
              onClose={this.handleImgClick}
            />
          )}
        </ul>
        {images.length > 0 && !isLoading && <Button onClick={this.loadMore} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string,
};
