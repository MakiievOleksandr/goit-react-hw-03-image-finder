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
  };

  handleSubmitBtn = searchQuery => {
    this.setState({ searchQuery, gallery: [], page: 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.fetchPosts();
    }
  }

  async fetchPosts() {
    try {
      this.setState({ loading: true });
      const { searchQuery, page } = this.state;
      const data = await searchImage(searchQuery, page);
      this.setState(({ gallery }) => ({
        gallery: [...gallery, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
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
    const { searchQuery, gallery, loading, error, showMoodal, details } =
      this.state;

    return (
      <div>
        <div className="{scss.imageFinder}">
          <Searchbar searchQuery={searchQuery} onSubmit={handleSubmitBtn} />
        </div>
        <div className="gallery">
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

          <ImageGallery items={gallery} showImage={showImage} />
        </div>
        {Boolean(gallery.length) && <Button onLoadMore={handleLoadMore} />}
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
