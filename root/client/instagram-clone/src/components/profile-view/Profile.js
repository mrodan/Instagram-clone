import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext'
import UserServices from '../../Services/UserServices'
import { Link } from 'react-router-dom'     // LINK for not to refresh website (Link to= <=> a)
import { Image, Transformation } from 'cloudinary-react';
import Navbar from '../navbar/Navbar'
import './ProfileStyle.css'
import { GearWide } from 'react-bootstrap-icons';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { PersonCheckFill } from 'react-bootstrap-icons';
import { CaretDownFill } from 'react-bootstrap-icons';

const Profile = () => {
    const userId = "5f34dc81f1a863138081976d";
    const { clientUsername, client_id, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [profileUser, setProfileUser] = useState({
        username: "",
        fullName: "",
        followersCount: 0,
        followingCount: 0,
        profileImage_PublicId: "",
        bio: "This is my bio..\nThis is my seccond line"
    })

    const getUser = async () => {
        await axios.get(`/user/get/${userId}`)
            .then(res => {
                //console.log(res)
                setProfileUser({
                    username: res.data.username,
                    fullName: res.data.fullName,
                    followersCount: res.data.followersCount,
                    followingCount: res.data.followingCount,
                    profileImage_PublicId: res.data.profileImage_PublicId,
                    bio: "This is my bio..\nThis is my seccond line"
                })


            })
    }

    useEffect(() => {
        getUser();
        if (clientUsername == profileUser.username)
            setIsCurrentUser(true)
        // CHECK FOLLOWING / !FOLLOWING
    }, [])


    const currentUserRender = () => {
        return (
            <>
                <div className="edit-profile">
                    <button className="edit-profile-btn">Edit Profile</button>
                </div>
                <div className="settings-gear">
                    <GearWide size={23} />
                </div>
            </>
        )
    }

    // <img className="" src="https://i.ibb.co/c6DJBvS/user-Check-Icon.png" alt="" />
    const followingRender = () => {
        return (
            <>
                <div className="message">
                    <button className="message-btn">Message</button>
                </div>
                <div className="unfollow">
                    <button className="unfollow-btn">
                        <PersonCheckFill size={16} className="person-check-icon" />
                    </button>
                </div>
                <div className="suggested-following">
                    <button className="suggested-following-btn"> <CaretDownFill size={10} /> </button>
                </div>
                <div className="user-options">
                    <button className="user-options-btn"> <MoreHorizIcon style={{ fontSize: 29 }} /> </button>
                </div>
            </>
        )
    }

    const notFollowingRender = () => {
        return (
            <>
                <div className="follow">
                    <button className="follow-btn">Follow</button>
                </div>
                <div className="suggested-notFollowing">
                    <button className="suggested-notFollowing-btn"> <CaretDownFill size={10} /> </button>
                </div>
                <div className="user-options">
                    <button className="user-options-btn"> <MoreHorizIcon style={{ fontSize: 29 }} /> </button>
                </div>
            </>
        )
    }
    /*
                                {isCurrentUser ? currentUserRender() :
                                    isFollowing ? followingRender() : notFollowingRender()}
    */

    return (
        <div className="profile-container">
            <div className="navbar-container">
                <Navbar />
            </div>
            <div className="content-container">
                <div className="top-section">
                    <div className="profile-image">
                        <Image className="img-circle" cloudName="rodanm" publicId="insta_clone/zium2cugs61p27oq5zzs.jpg" >
                            <Transformation width="150" height="150" crop="scale" />
                        </Image>
                    </div>
                    <div className="user-info">
                        <div className="user-actions">
                            <div className="title-username">
                                {profileUser.username}
                            </div>
                            {currentUserRender()}
                        </div>
                        <div className="user-stats">
                            <p className="user-stats-counter">20&nbsp;</p>posts&emsp;&emsp;&ensp;
                            <p className="user-stats-counter">{profileUser.followersCount}&nbsp;</p>followers&emsp;&emsp;&ensp;
                            <p className="user-stats-counter">{profileUser.followingCount}&nbsp;</p>following&emsp;&emsp;&ensp;
                        </div>
                        <div className="title-fullName">
                            {profileUser.fullName}
                        </div>
                        <div className="bio">
                            {profileUser.bio}
                        </div>
                        <div>
                            Followed by
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Profile;