import User from '../models/UserModel.js';

// req.params.paramName (url: /:paramName)
export const getUser = (req, res) => {
    User.findOne({ _id: req.params._id })
        .then(selectedUser => {
            if (!selectedUser)
                return res.status(403).json({ message: { messageBody: "Error, no user", messageError: true } });

            selectedUser.password = undefined;
            return res.status(200).send(selectedUser);
        })
        .catch(err => {
            return res.status(403).json({ message: { messageBody: "Error getting user from DB", messageError: true } });
        })
}

// SearchBar
export const searchUser = (req, res) => {
    if (req.body.searchValue == "")
        return res.status(200);

    const searchPattern = new RegExp('^' + req.body.searchValue);
    User.find({username: { $regex: searchPattern }})
        .select('_id username fullName profileImage_PublicId') // Get only '...' from user
        .then(user => {
            return res.status(200).json({ user })
        })
        .catch(err => {
            return res.status(403).json({ message: { messageBody: "Error searching user from DB", messageError: true } });
        })
}
