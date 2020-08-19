import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'     // LINK for not to refresh website (Link to= <=> a)
import './ExploreViewViewStyle.css'
import Navbar from '../navbar/Navbar'
import { Image } from 'cloudinary-react';
import Favorite from '@material-ui/icons/Favorite'
import ModeComment from '@material-ui/icons/ModeComment'

const Explore = (props) => {
    // DISPLAY
    const [imageIDs, setImageIDs] = useState("")

    const loadImages = async () => {
        try {
            const res = await fetch('/api/request/image');
            const data = await res.json();
            setImageIDs(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadImages();
    }, [])


    return (
        <div>
            <div className="navbar-container">
                <Navbar />
            </div>

            <div className="content-container">
                <div className="test">
                    {imageIDs && imageIDs.map((imageId, index) => (
                        <div className="image-container">
                            <Link className="" to="/#">
                                <Image
                                    className="image"
                                    cloudName="rodanm"
                                    publicId={imageId}
                                    width="293"
                                    height="293"
                                    crop="scale" />
                            </Link>
                            <div className="image-overlay">
                                <span>
                                    <Favorite /> Likes
                                </span>
                                <span>
                                    <ModeComment /> Comments {/*post.comments.length*/}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Explore;