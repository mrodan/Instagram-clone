import mongoose from 'mongoose'
import User from '../models/UserModel.js';
import FollowersModel from '../models/FollowersModel.js';

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
    User.find({ username: { $regex: searchPattern } })
        .select('_id username fullName profileImage_PublicId') // Get only '...' from user
        .then(user => {
            return res.status(200).json({ user })
        })
        .catch(err => {
            return res.status(403).json({ message: { messageBody: "Error searching user from DB", messageError: true } });
        })
}

export const followUser = async (req, res) => {
    // Transactions go inside sessions, and sessions are passed to operations to execute in transaction
    const session = await mongoose.connection.startSession();
    session.startTransaction();

    //Check if follow relation exists to save it
    const relation = await FollowersModel.findOne({ $and: [{ follower: req.user._id }, { following: req.body._id }] }).session(session);
    if (!relation) {
        const followRelation = new FollowersModel({
            follower: req.user._id,
            following: req.body._id
        });
        followRelation.save(); // .save uses associated session by default
    }
    else {
        await session.abortTransaction();
        session.endSession();
        res.status(403).json({ message: { messageBody: "Already follows", messageError: true } });
    }

    // Increment following count to client user (follower)
    const follower = await User.findByIdAndUpdate(req.user._id, { $inc: { followingCount: 1 } }, { new: true }).session(session);
    if (!follower) {
        await session.abortTransaction();
        session.endSession();
        res.status(403).json({ message: { messageBody: "Error, no follower user", messageError: true } });
    }

    // Increment follower count to followed user
    const following = await User.findByIdAndUpdate(req.body._id, { $inc: { followersCount: 1 } }, { new: true }).session(session);
    if (!following) {
        await session.abortTransaction();
        session.endSession();
        res.status(403).json({ message: { messageBody: "Error, no following user", messageError: true } });
    }

    await session.commitTransaction(); // Once the transaction is committed, the write operation becomes visible outside of transaction
    session.endSession();
    res.status(200).json({ message: { messageBody: "Follow was succesful", messageError: false } });

    /*
    FollowersModel.findOne({ $and: [{ follower: req.user._id }, { following: req.body._id }] })
        .then(relation => {

            if (!relation) {
                const followRelation = new FollowersModel({
                    follower: req.user._id,
                    following: req.body._id
                })
                followRelation.save()
                    .then(followRelation => {

                        return res.status(200).json({  message: { messageBody: "Follow was succesful", messageError: false } });
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(403).json({ message: { messageBody: "Error saving follow relation to DB", messageError: true } });
                    })
            }
            else {
                return res.status(403).json({ message: { messageBody: "Already follows", messageError: true } });
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(403).json({ message: { messageBody: "Error searching follow relation in DB", messageError: true } });
        })
        */

}

export const unfollowUser = async (req, res) => {
    const session = await mongoose.connection.startSession();
    session.startTransaction();

    const relation = await FollowersModel.findOneAndDelete({ $and: [{ follower: req.user._id }, { following: req.body._id }] }).session(session);
    if (!relation) {
        await session.abortTransaction();
        session.endSession();
        res.status(403).json({ message: { messageBody: "Follow relation does not exists", messageError: true } });
    }

    const follower = await User.findByIdAndUpdate(req.user._id, { $inc: { followingCount: -1 } }, { new: true }).session(session);
    if (!follower) {
        await session.abortTransaction();
        session.endSession();
        res.status(403).json({ message: { messageBody: "Error, no follower user", messageError: true } });
    }

    const following = await User.findByIdAndUpdate(req.body._id, { $inc: { followersCount: -1 } }, { new: true }).session(session);
    if (!following) {
        await session.abortTransaction();
        session.endSession();
        res.status(403).json({ message: { messageBody: "Error, no following user", messageError: true } });
    }

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: { messageBody: "Unfollow was succesfull", messageError: false } });

    /*
    FollowersModel.findOneAndDelete({ $and: [{ follower: req.user._id }, { following: req.body._id }] })
        .then(deletedRelation => {
            if (!deletedRelation)
                return res.status(403).json({ message: { messageBody: "Follow relation does not exists", messageError: true } });

            return res.status(200).json({ message: { messageBody: "Unfollow was succesfull", messageError: false } });
        })
        .catch(err => {
            console.log(err);
            return res.status(403).json({ message: { messageBody: "Error deleting follow relation (unfollowing) in DB", messageError: true } });
        })
        */
}

export const checkFollowing = (req, res) => {
    FollowersModel.findOne({ $and: [{ follower: req.user._id }, { following: req.params._id }] })
        .then(relation => {
            if (!relation)
                return res.status(200).json({ isFollowing: false });

            return res.status(200).json({ isFollowing: true });
        })
        .catch(err => {
            console.log(err);
            return res.status(403).json({ message: { messageBody: "Error checking follow relation", messageError: true } });
        })
}