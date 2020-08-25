import React from 'react';
import { Image, Transformation } from 'cloudinary-react';
import './SearchbarStyle.css'


const UserSearch = (props) => {



    return (
        <div className="user-search-container">

            <div className="profile-img">
                <Image className="profile-img-circle" cloudName="rodanm" publicId={props.imgId} >
                    <Transformation width="32" height="32" crop="scale" />
                </Image>
            </div>

            <div className="info">
                <div className="username">
                    {props.username}
                </div>
                <div className="fullName">
                    {props.fullName}
                </div>
            </div>

        </div>
    );
}

export default UserSearch;