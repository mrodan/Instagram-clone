import React, { useState, useEffect } from 'react';
import './ExploreViewViewStyle.css'
import Navbar from '../navbar/Navbar'
import { Image } from 'cloudinary-react';
import { BrowserRouter as Router, Route } from "react-router-dom";

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
                        <Image
                            className="image"
                            cloudName="rodanm"
                            publicId={imageId}
                            width="293"
                            height="293"
                            crop="scale" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Explore;