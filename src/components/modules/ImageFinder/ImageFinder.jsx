import { Component } from 'react';
import { Bars } from 'react-loader-spinner';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from 'components/shared/Button/Button';
import ImageDetails from './ImageDetails/ImageDetails';

import Modal from 'components/shared/Modal/Modal';

import { searchImage } from 'components/shared/services/posts-api';

class ImageFinder extends Component {
  state = {
    gallery: [],
    searchQuery: '',
    page: 1,
    loading: false,
    showMoodal: false,
    details: null,
    error: null,
    perPage: 0,
  };

  handleSubmitBtn = query => {
    this.setState({ searchQuery: query, page: 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (
      prevState.searchQuery === '' ||
      searchQuery !== prevState.searchQuery ||
      prevState.page !== page
    ) {
      if (searchQuery !== prevState.searchQuery) {
        this.setState({
          gallery: [],
        });
      }

      this.fetchPosts();
    }
  }

  async fetchPosts() {
    try {
      this.setState({
        loading: true,
      });
      const { searchQuery, page } = this.state;
      const { data, perPage } = await searchImage(searchQuery, page);
      this.setState(({ gallery }) => ({
        gallery: [...gallery, ...data.hits],
        perPage,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  showImage = img => {
    this.setState({
      details: img,
      showMoodal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showMoodal: false,
      details: null,
    });
  };

  render() {
    const { handleSubmitBtn, handleLoadMore, closeModal, showImage } = this;
    const {
      searchQuery,
      gallery,
      loading,
      error,
      showMoodal,
      details,
      perPage,
    } = this.state;

    return (
      <div>
        <div className="{scss.imageFinder}">
          <Searchbar searchQuery={searchQuery} onSubmit={handleSubmitBtn} />
        </div>
        <div className="gallery">
          <ImageGallery
            items={gallery}
            showImage={showImage}
            query={searchQuery}
          />
          {loading && (
            <Bars
              height="80"
              width="180"
              color="#000000"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )}
          {error && loading ? loading : <p>{error}</p>}
        </div>
        {!loading && gallery.length % perPage === 0 && gallery.length > 0 && (
          <Button onLoadMore={handleLoadMore} />
        )}

        {showMoodal && (
          <Modal close={closeModal}>
            <ImageDetails details={details} />
          </Modal>
        )}
      </div>
    );
  }
}

export default ImageFinder;

ImageFinder.defaultProps = {
  gallery: [],
};
