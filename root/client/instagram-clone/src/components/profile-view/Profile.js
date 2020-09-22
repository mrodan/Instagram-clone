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
import { Grid3x3 } from 'react-bootstrap-icons';
import { Bookmark } from 'react-bootstrap-icons';

const Profile = (props) => {
    const userId = "5f34dc81f1a863138081976d";
    const { clientUsername, client_id, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [profileUser_id, setProfileUser_id] = useState("");
    const [profileUser, setProfileUser] = useState({
        _id: "",
        username: "",
        fullName: "",
        followersCount: "",
        followingCount: "",
        profileImage_PublicId: "",
        bio: "This is my bio..\nThis is my seccond line"
    })
    const [isFollowing, setIsFollowing] = useState(false);
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [userPosts, setUserPosts] = useState([""])

    const getUser = async () => {
        await axios.get(`/user/getbyusername/${props.match.params.username}`)
            .then(res => {
                setProfileUser_id(res.data._id);
                console.log(profileUser_id)
                setProfileUser({
                    _id: res.data._id,
                    username: res.data.username,
                    fullName: res.data.fullName,
                    followersCount: res.data.followersCount,
                    followingCount: res.data.followingCount,
                    profileImage_PublicId: res.data.profileImage_PublicId,
                    bio: res.data.bio
                })
                console.log(profileUser)
            })
    }

    const getPosts = async () => {
        await axios.get(`/post/getbyusername/${props.match.params.username}`)
            .then(res => {
                //res.data.userPost.map(post => (
                //    setUserPosts(old => [...old, post.image_PublicId])
                //))
                console.log(res.data.userPost)

                const publicIDs = res.data.userPost.map(post => post.image_PublicId);
                console.log(publicIDs)
                



                
                console.log(userPosts)
            })
    }

    useEffect(() => {
        getUser();
        if (clientUsername == profileUser.username)
            setIsCurrentUser(true)
        // CHECK FOLLOWING / !FOLLOWING

        getPosts();
        

    })


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
                <div className="middle-section">
                    <Link to={`/profile/${profileUser.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <button className="posts-btn">
                            <svg aria-label="Posts" fillRule="#8e8e8e" height="12" viewBox="0 0 48 48" width="12"><path clipRule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fillRule="evenodd"></path></svg>
                            <span className="try">POSTS</span>
                        </button>
                    </Link>

                    <Link to={`/profile/${profileUser.username}/igtv`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <button className="igtv-btn">
                            <svg aria-label="Posts" fillRule="#8e8e8e" height="12" viewBox="0 0 48 48" width="12"><path d="M41 10c-2.2-2.1-4.8-3.5-10.4-3.5h-3.3L30.5 3c.6-.6.5-1.6-.1-2.1-.6-.6-1.6-.5-2.1.1L24 5.6 19.7 1c-.6-.6-1.5-.6-2.1-.1-.6.6-.7 1.5-.1 2.1l3.2 3.5h-3.3C11.8 6.5 9.2 7.9 7 10c-2.1 2.2-3.5 4.8-3.5 10.4v13.1c0 5.7 1.4 8.3 3.5 10.5 2.2 2.1 4.8 3.5 10.4 3.5h13.1c5.7 0 8.3-1.4 10.5-3.5 2.1-2.2 3.5-4.8 3.5-10.4V20.5c0-5.7-1.4-8.3-3.5-10.5zm.5 23.6c0 5.2-1.3 7-2.6 8.3-1.4 1.3-3.2 2.6-8.4 2.6H17.4c-5.2 0-7-1.3-8.3-2.6-1.3-1.4-2.6-3.2-2.6-8.4v-13c0-5.2 1.3-7 2.6-8.3 1.4-1.3 3.2-2.6 8.4-2.6h13.1c5.2 0 7 1.3 8.3 2.6 1.3 1.4 2.6 3.2 2.6 8.4v13zM34.6 25l-9.1 2.8v-3.7c0-.5-.2-.9-.6-1.2-.4-.3-.9-.4-1.3-.2l-11.1 3.4c-.8.2-1.2 1.1-1 1.9.2.8 1.1 1.2 1.9 1l9.1-2.8v3.7c0 .5.2.9.6 1.2.3.2.6.3.9.3.1 0 .3 0 .4-.1l11.1-3.4c.8-.2 1.2-1.1 1-1.9s-1.1-1.2-1.9-1z"></path></svg>
                            <span className="try">IGTV</span>
                        </button>
                    </Link>

                    <Link to={`/profile/${profileUser.username}/saved`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <button className="saved-btn">
                            <svg aria-label="Saved" fillRule="#8e8e8e" height="12" viewBox="0 0 48 48" width="12"><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
                            <span className="try">SAVED</span>
                        </button>
                    </Link>

                    <Link to={`/profile/${profileUser.username}/tagged`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <button className="tagged-btn">
                            <svg aria-label="Tagged" fillRule="#8e8e8e" height="12" viewBox="0 0 48 48" width="12"><path d="M41.5 5.5H30.4c-.5 0-1-.2-1.4-.6l-4-4c-.6-.6-1.5-.6-2.1 0l-4 4c-.4.4-.9.6-1.4.6h-11c-3.3 0-6 2.7-6 6v30c0 3.3 2.7 6 6 6h35c3.3 0 6-2.7 6-6v-30c0-3.3-2.7-6-6-6zm-29.4 39c-.6 0-1.1-.6-1-1.2.7-3.2 3.5-5.6 6.8-5.6h12c3.4 0 6.2 2.4 6.8 5.6.1.6-.4 1.2-1 1.2H12.1zm32.4-3c0 1.7-1.3 3-3 3h-.6c-.5 0-.9-.4-1-.9-.6-5-4.8-8.9-9.9-8.9H18c-5.1 0-9.4 3.9-9.9 8.9-.1.5-.5.9-1 .9h-.6c-1.7 0-3-1.3-3-3v-30c0-1.7 1.3-3 3-3h11.1c1.3 0 2.6-.5 3.5-1.5L24 4.1 26.9 7c.9.9 2.2 1.5 3.5 1.5h11.1c1.7 0 3 1.3 3 3v30zM24 12.5c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6 9.6-4.3 9.6-9.6-4.3-9.6-9.6-9.6zm0 16.1c-3.6 0-6.6-2.9-6.6-6.6 0-3.6 2.9-6.6 6.6-6.6s6.6 2.9 6.6 6.6c0 3.6-3 6.6-6.6 6.6z"></path></svg>
                            <span className="try">TAGGED</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div >


    );
}

export default Profile;