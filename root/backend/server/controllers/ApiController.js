import cloudinary from '../utils/cloudinary.js';

export const uploadImage = async (req, res) => {
    try {
        const fileStr = req.body.data;

        const uploadedResponse = await cloudinary.v2.uploader.upload(fileStr, {
            folder: 'insta_clone'
        })

        //console.log(uploadedResponse);
        res.status(200).json({ message: { messageBody: "Image succesfully uploaded", messageError: false } });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: { messageBody: "Error uploading image", messageError: true } });

    }
}

export const requestImagesExplore = async (req, res) => {
    try {
        const { resources } = await cloudinary.v2.search
                                                    .expression('folder:insta_clone')
                                                    .sort_by('public_id', 'desc')
                                                    .max_results(30)
                                                    .execute();
        const publicIDs = resources.map(file => file.public_id); // Get array of all public IDs
        //console.log(publicIDs)
        res.send(publicIDs) // Send img IDs to display them


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: { messageBody: "Error requesting image", messageError: true } });

    }
}