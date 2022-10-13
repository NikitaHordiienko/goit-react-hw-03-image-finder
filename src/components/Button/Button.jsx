import css from './Button.module.css'
import PropTypes from 'prop-types';

const Button = ({ onNextPage }) => {
    return (
        <div className={css.buttonThumb}>
            <button
                className={css.button}
                type="button"
                onClick={onNextPage}
            >Load more</button>
        </div>
    )
}

Button.propTypes = {
    onNextPage: PropTypes.func.isRequired,
}

export default Button;