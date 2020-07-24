import React, { useState } from 'react';
import './SearchbarStyle.css'
import SearchIcon from '@material-ui/icons/Search'

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState("");

    const onClickHandler = (e) => {
        e.preventDefault();
        // Called from div (icon&span) to allow input function When placeholder is cliked
        return document.getElementById("searchbar")?.focus();
    }

    const onChangeHanlder = (e) => {
        //setSearchValue({ ...searchValue, [e.target.name]: e.target.value }); // does not work when text is deleted
        setSearchValue(e.target.value); // Works when text is deleted
        //console.log(searchValue);
    }

    return (
        <div className="searchbar-container">
            <input id="searchbar" onChange={onChangeHanlder} />

            {searchValue === "" ? (
                <div className="searchbar-placeholder" onClick={onClickHandler}>
                    <SearchIcon id="searchbar-placeholder-icon" />
                    <span>Search</span>
                </div>
            ) : null}
        </div>
    );
}

//<span>Search</span>

export default SearchBar;