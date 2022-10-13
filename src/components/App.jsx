import React, { Component } from "react";
import Status from "services/Status";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";
import { getPixabayImages } from "services/pixabayAPI";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import css from "./App.module.css"

class App extends Component {

  state = {
    status: Status.IDLE,
    images: [],
    currentPage: 1,
    query: '',
    isModalOpen: false,
    error: null,
    largeImageURL: '',
    largeImageALT: '',
    totalImages: 0,
  }
  
  componentDidUpdate(_, prevState) {

    const prevQuery = prevState.query;
    const nextQuery = this.state.query;

    if (prevQuery !== nextQuery) {
      this.setState({ status: Status.PENDING })
      
      setTimeout(() => {
        this.getImagesFromApi(); 
      }, 1500)
           
    }
  }

  getImagesFromApi = async () => {
    const { currentPage, query } = this.state;
    
    try {
      const { hits, totalHits } = await getPixabayImages(query, currentPage);
 
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          currentPage: prevState.currentPage + 1,
          status: Status.RESOLVED,
          totalImages: hits.length,
        }))
      
        if (totalHits === 0) {
          this.setState({ status: Status.REJECTED })
        }

    } catch (error) {
      console.log(error)    
      this.setState({ error })
    }
  }

  handleSearchBarSubmit = query => {
    this.setState({
      images: [],
      query: query,
      currentPage: 1,
      error: null
    });
  }

  toggleModal = () => {
    this.setState(prevState => ({isModalOpen: !prevState.isModalOpen}))
  }

  handleImageClick = (url, alt) => {
    this.setState({ largeImageURL: url, largeImageALT: alt });
    this.toggleModal();
  }

  render() {
    const { status, images, totalImages, isModalOpen, largeImageALT, largeImageURL } = this.state
    
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearchBarSubmit} />
        {status === 'idle' && <h2 className={css.title}>Gallery is empty</h2>}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <h2 className={css.title}>Sorry, there is nothing that matches your search. Try something else.</h2>}
        {status === 'resolved' && (
          <>
            <ImageGallery images={images} onOpenModal={this.handleImageClick} />
            {totalImages >= 12 && (<Button onNextPage={this.getImagesFromApi}/>)  }
            {isModalOpen && (
              <Modal
                src={largeImageURL}
                alt={largeImageALT}
                onModalClose={this.toggleModal}
              />)}
          </>
        )}      
        <ToastContainer autoClose={1000} theme="colored" />      
      </div>
    )
  }  
}

export default App;