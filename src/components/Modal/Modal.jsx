import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import css from './Modal.module.css'

class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleCloseKey)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleCloseKey)
    }

    handleModaleClose = event => {
        const { onModalClose } = this.props;
        if (event.target === event.currentTarget) {
            onModalClose()
        }
    }

    handleCloseKey = event => {
        const { onModalClose } = this.props;

        if (event.code === 'Escape') {
            onModalClose();
        }
    }
    
    render() {
        const { src, alt } = this.props
        
        const jsx = (
            <div className={css.overlay} onClick={this.handleModaleClose}>
                <div className={css.modal}>
                    <img src={src} alt={alt} />
                </div>
            </div>
        )
        return ReactDOM.createPortal( jsx, document.getElementById('modal')
        )
    }
}

Modal.propTypes = {
    onModalClose: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
}

export default Modal;