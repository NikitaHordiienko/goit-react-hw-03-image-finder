import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const ImageGallery = ({images, onOpenModal}) => {
    return (
        <ul className={css.imageGallery}>
            {images.map(image => {
                return (
                    <ImageGalleryItem
                        key={image.id}
                        image={image}
                        onOpenModal={onOpenModal}
                    />
                )
            })}            
        </ul>
    )
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
            webformatURL: PropTypes.string.isRequired,
        })
    ),
    onOpenModal: PropTypes.func.isRequired,
}

export default ImageGallery;