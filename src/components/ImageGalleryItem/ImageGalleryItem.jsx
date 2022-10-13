import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({image, onOpenModal}) => {
    return (
        <li className={css.imageGalleryItem}>
            <img className={css["imageGalleryItem-image"]}
                src={image.webformatURL}
                alt={image.tags}
                onClick={() => onOpenModal(image.largeImageURL, image.tags)}/>
        </li>
    )
}

export default ImageGalleryItem;