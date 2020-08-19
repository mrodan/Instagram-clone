import React, { useState, useEffect } from 'react';
import { Image } from 'cloudinary-react';

const UploadTest = () => {
    // UPLOAD AND REQUEST
    const [fileInput, setFileInput] = useState('')
    const [previewSource, setPreviewSource] = useState()

    const onChangeFileInputHandler = (e) => {
        const file = e.target.files[0]; // grabs one file [0] (can grab multi)
        previewFile(file);
    }

    const previewFile = (file) => {
        const reader = new FileReader(); // Built-in js API
        reader.readAsDataURL(file); // Convert img into url string
        reader.onloadend = () => {
            // We set the onloanded property to be this func to display preview img
            setPreviewSource(reader.result);
        }
    }

    const submitFileHandler = (e) => {
        e.preventDefault();
        if (!previewSource) return;
        uploadImage(previewSource);
    }

    const uploadImage = async (base64EncodedImage) => {
        //console.log(base64EncodedImage) // Submit to server
        try {
            await fetch('/api/upload/image', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': "Application/json" }
            })
        } catch (error) {
            console.log(error);
        }

    }

    // DISPLAY
    const [imageIDs, setImageIDs] = useState("")

    const loadImages = async () => {
        try {
            const res = await fetch('/api/request/image');
            const data = await res.json();
            setImageIDs(data);
            //console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadImages();
    }, [])


    return (
        <div>
            <div>
                <h1>UploadTest</h1>
                <form onSubmit={submitFileHandler} className="form">
                    <input type='file'
                           name='image'
                           onChange={onChangeFileInputHandler}
                           value={fileInput}
                           className='form-input' />
                    <button className='btn' type='submit'>Submit</button>
                </form>
                {previewSource && (
                    <img src={previewSource}
                        alt="chosen"
                        style={{ height: '293px', width: '293px' }} />
                )}
            </div>

            <div>
                <h1>Display</h1>
                <div>
                    {imageIDs && imageIDs.map((imageId, index) => (
                        <Image 
                               cloudName="rodanm"
                               publicId={imageId}
                               width="293"
                               height="293"
                               crop="scale" />
                    ))}
                </div>

            </div>




        </div >

    )
}

export default UploadTest;