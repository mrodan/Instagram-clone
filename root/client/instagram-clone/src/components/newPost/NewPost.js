import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext'
import { Link } from 'react-router-dom'     // LINK for not to refresh website (Link to= <=> a)
import { Image, Transformation } from 'cloudinary-react';
import './NewPostStyle.css'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { Form, TextArea } from 'semantic-ui-react'

const NewPost = () => {
    const { username, _id, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [newPost, setNewPost] = useState({
        caption: ""
        //usersTagged: [""],
        //location: "",
    })
    const [fileInput, setFileInput] = useState('')
    const [previewSource, setPreviewSource] = useState()

    const previewFile = (file) => {
        const reader = new FileReader(); // Built-in js API to read files
        reader.readAsDataURL(file); // Convert img into url string
        reader.onloadend = () => {
            setPreviewSource(reader.result); // We set the onloanded property to be this func to display preview img
        }
    }

    const onChangeFileInput = (e) => {
        const file = e.target.files[0]; // grabs one file [0] (can grab multi)
        previewFile(file);
    }

    const onChangePostData = (e) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
        //console.log(newPost);
    }

    // Submit img to server
    const uploadImage = async (base64EncodedImage) => {
        //console.log(base64EncodedImage);
        // axios.post(reqUrl, data, headers) .then .catch
        await axios.post("/post/upload",
            { imageData: base64EncodedImage, caption: newPost.caption },
            { headers: { 'Content-Type': "Application/json" } })
            .then((res) => {
                //console.log(res)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const onSubmitNewPost = (e) => {
        e.preventDefault();
        if (!previewSource) return;
        uploadImage(previewSource);
    }


    return (
        <div className="newpost-container">
            <Form onSubmit={onSubmitNewPost} action="">

                <div className="nav-newpost">
                    <h4 className="newpost-title">New Post</h4>
                    <button className="share" type="submit" >Share</button>

                </div>

                <div className="user-info-upload">
                    <div>
                        <Image className="profile-info" cloudName="rodanm" publicId="insta_clone/defaultUserImg_riym54.jpg" >
                            <Transformation width="32" crop="scale" />
                        </Image>
                        <Link to="/#" className="link-profile">
                            {username}
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
                            alt="Preview Image"
                            style={{ height: '488px', width: '488px' }}
                            className="preview-image" />
                    )}
                </div>

                <div>
                    <label htmlFor="caption" />
                    <TextArea
                        name="caption"
                        value={newPost.caption}
                        onChange={onChangePostData}
                        placeholder="Write a caption..."
                        className="caption" />
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