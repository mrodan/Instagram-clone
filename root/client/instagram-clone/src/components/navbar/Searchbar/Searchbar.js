import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './SearchbarStyle.css';
import UserSearch from './UserSearch';
import SearchIcon from '@material-ui/icons/Search';

const SearchBar = (props) => {
    const [searchValue, setSearchValue] = useState("");
    const [searchUsersData, setSearchUsersData] = useState([]);
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(!open);

    const onClickHandler = (e) => {
        e.preventDefault();
        return document.getElementById("searchbar")?.focus(); // Called from div (icon&span) to allow input function When placeholder is cliked
    }


    const postSearchedValues = async (searchValue) => {
        // axios.post(reqUrl, data, headers) .then .catch
        await axios.post('/user/search-user',
            { searchValue: searchValue },
            { headers: { 'Content-Type': 'Application/json' } })
            .then(results => {
                setSearchUsersData(results.data.user)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getUserSearch = (e) => {
        setSearchValue(e.target.value);
        //console.log(searchValue);
        //setSearchUsersData([])
        postSearchedValues(searchValue);
    }

    const userRender = () => {
        return (
            <UserSearch username="aug13" fullName="Agosto Langosta" imgId="insta_clone/zium2cugs61p27oq5zzs.jpg" />
        )
    }
    // <UserSearch username={user.username} fullName={user.fullNAme} imgId={user.profileImage_PublicId} />


    return (
        <>
            <div className="searchbar-container">
                <input
                    type='text'
                    onChange={getUserSearch}
                    id="searchbar" />

                {searchValue === "" ? (
                    <div className="searchbar-placeholder" onClick={onClickHandler}>
                        <SearchIcon id="searchbar-placeholder-icon" />
                        <span>Search</span>
                    </div>
                ) : <div>
                        <ul className="search-dropdown">
                            {
                                searchUsersData.map(user => (
                                    <li key={user.username}>
                                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/profile/${user.username}`}>
                                            <UserSearch username={user.username} fullName={user.fullName} imgId={user.profileImage_PublicId} />
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                }





            </div>
        </>
    );
}

export default SearchBar;