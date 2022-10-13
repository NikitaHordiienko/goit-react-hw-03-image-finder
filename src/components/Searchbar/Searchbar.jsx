import React, { Component } from "react";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import css from './Searchbar.module.css';

class Searchbar extends Component {

    state= {
        query: '',
    }

    handleChange = event => {
        this.setState({query: event.currentTarget.value})
    }

    handleSumbit = event => {
        const { query } = this.state
        const { onSubmit } = this.props
        
        event.preventDefault();
         
        if (query.trim() === '') {
            toast.error('Please fill out the search field')
            return
        }

        onSubmit(query)

        this.setState({ query: '' });
    }

    render() {
        const { query } = this.state

        return (
            <header className={css.searchbar}>
                <form className={css.searchForm} onSubmit={this.handleSumbit}>
                    <button type="submit" className={css["searchForm-button"]}>
                        <BsSearch className={css.icon} />
                    </button>

                    <input
                        className={css["searchForm-input"]}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={query}
                        onChange={this.handleChange}
                    />
                </form>
            </header>
        )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default Searchbar;