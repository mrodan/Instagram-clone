import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'     // LINK for not to refresh website (Link to= <=> a)
import { Image, Transformation } from 'cloudinary-react';
import './NewPostStyle.css'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { Form, TextArea } from 'semantic-ui-react'

const NewPost = () => {
    const [newPost, setNewPost] = useState({
        image_PublicId: "",
        caption: ""
        //usersTagged: [""],
        //location: "",
    })
    const [fileInput, setFileInput] = useState('')
    const [previewSource, setPreviewSource] = useState()

    const previewFile = (file) => {
        const reader = new FileReader(); // Built-in js API
        reader.readAsDataURL(file); // Convert img into url string
        reader.onloadend = () => {
            // We set the onloanded property to be this func to display preview img
            setPreviewSource(reader.result);
        }
    }

    const onChangeFileInput = (e) => {
        const file = e.target.files[0]; // grabs one file [0] (can grab multi)
        previewFile(file);
    }

    const onChangePostData = (e) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    }

    const onSubmitFile = () => {

    }

    const onSubmitNewPost = () => {

    }


    return (


        <div className="newpost-container">
            <Form onSubmit={onSubmitNewPost} action="">

                <div className="nav-newpost">
                    <h4 className="newpost-title">New Post</h4>
                    <button className="share">Share</button>

                </div>

                <div className="user-info-upload">
                    <div>
                        <Image className="profile-info" cloudName="rodanm" publicId="insta_clone/defaultUserImg_riym54.jpg" >
                            <Transformation width="32" crop="scale" />
                        </Image>
                        <Link to="/#" className="link-profile">
                            chinoRodan
                        </Link>
                    </div>

                    <div className="select-file" onChange={onChangeFileInput}>
                        <AddAPhotoIcon className="add-photo-icon" fontSize="large" color="action" />
                        <label for="file-upload" className="file-upload">
                            Upload File
                        </label>
                        <input type='file'
                            id='file-upload'
                            name='image'
                            value={fileInput} />
                    </div>

                </div>

                <div>
                    {previewSource && (
                        <img src={previewSource}
                            alt="chosen"
                            style={{ height: '488px', width: '488px' }} 
                            className="preview-image"/>
                    )}
                </div>

                <div>
                    <label htmlFor="caption" />
                    <TextArea
                        name="caption"
                        value={newPost.caption}
                        onChange={onChangePostData}
                        placeholder="Write a caption..."
                        className="caption"/>
                </div>

                <div className="tag-location">
                    <div className='tag'>
                        <button className="tag-location-btn">Tag People</button>
                        <LocalOfferIcon className="tag-icon" fontSize="large" color="action" />
                    </div>
                    <div className='location'>
                        <button className="tag-location-btn">Add Location</button>
                        <LocationOnIcon className="location-icon" fontSize="large" color="action" />
                    </div>
                </div>



            </Form>
        </div >
    );
}

export default NewPost;