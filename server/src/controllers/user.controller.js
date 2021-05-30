const asyncHandler = require("express-async-handler")
const Answer = require("../models/answers.model");
const Question = require("../models/questions.models");
const User = require("../models/user.model");
const Space = require("../models/spaces.models");
const responseHandler = require("../helpers/responseHandler")
const Notification = require("../models/notification.model")


// @desc    Get logged in user's questions
// @route   GET /user/myquestions
// @access  Private
const getMyQuestions = asyncHandler(async (req, res) => {
    const questions = await Question.find({ user: req.user._id })
    res.json(orders)
})

// @desc    Get logged in user's answers
// @route   GET /user/myanswers
// @access  Private
const getMyAnswers = asyncHandler(async (req, res) => {
    const answers = await Answer.find({ user: req.user._id })
    res.json(orders)
})

const followUser = async( req, res) => {
    try{
        if( req.user._id === req.params.user_id){
            return res.status(405).json(responseHandler( false, 405, "Sorry, you made a follow request to yourself!", null))
        } 
        else{
            const user = await User.findById( req.user._id );
            if( user.following.includes(req.params.user_id)){
                return res.status(405).json(responseHandler( false, 405, "Already following", null))
            } 
            else{
            User.findByIdAndUpdate( req.params.user_id , {
                $push: {followers: req.user._id}
            },{
                new: true
            }, (err, result) => {
                if(err){
                    return res.status(400).json(responseHandler( false, 405, "Already following", null))
                }
            User.findByIdAndUpdate( req.user._id,{
                $push: {following: req.params.user_id}
            }, {
                new: true
            }).then((async (result) => {

                try{
                    const notification = new Notification({
                        notificationFor: req.params.user_id,
                        notificationBy: req.user._id,
                        notificationTitle: `${user.firstName} started following you, their user id is ${user._id}!`,
                        followNotification: user._id,
                        status: "unread" 
                    }) 
    
                    await notification.save()
                }
                catch(e){
                    console.log(e)
                    return res
                    .status(400)
                    .json(
                        responseHandler
                        ( false, 
                          400, 
                          "Something went wrong", 
                          null 
                        )
                    );
                }

                const {role, _id, firstName, lastName, email, following, followers} = result

                res.status(200).json(responseHandler(true, 200, "Followed!", {role, _id, firstName, lastName, email, following, followers}));
            }))
        }) } }
          
    } catch (e) {
        console.log(e)
        return res.status(400).json(responseHandler( false, 400, "Something went wrong", null ));
    }

}

const followSpace = async( req, res ) => {
    try {
        const user = await User.findById( req.user._id );
        const space = await Space.findById( req.params.space_id );
        if ( space.followers.includes( req.user._id )){
            return res.status(400).json(responseHandler( false, 400, "Already Following", null ));
        } else {

            Space.findByIdAndUpdate( req.params.space_id , {
                $push: { followers: req.user._id}
            }, {
                new: true
            }, ( err, result ) => {
                if(err){
                    return res.status(400)(responseHandler( false, 400, "Something Went Wrong!", null))
                }
            User.findByIdAndUpdate( req.user._id, {
                $push: { following: req.params.space_id }
            }, {
                new: true
            })
            }).then(result => {
                res.status(200).json(responseHandler(true, 200, "You start following", result));
            })
        }
    } catch (e) {
        return res.status(400).json({error: err})
    }
}

const unfollowSpace = async(req, res) => {
    try{
        if( req.user._id === req.params.space_id){
            return res.status(405).json(responseHandler( false, 405, "Action not Allowed", null ));
        } else {
            const user = await User.findById( req.user._id );
            if( !user.following.includes(req.params.space_id)){
                return res.status(405).json(responseHandler( false, 405, "You need to follow first", null))
            } 
            else{
            Space.findByIdAndUpdate( req.params.space_id , {
                $pull: {followers: req.user._id}
            },{
                new: true
            }, (err, result) => {
                if(err){
                    return res.status(400).json({error: err})
                }
            User.findByIdAndUpdate( req.user._id,{
                $pull: {following: req.params.space_id}
            }, {
                new: true
            }).then(result => {
                res.status(200).json(responseHandler(true, 200, "Unfollow done", result));
            })
        }) }
        }
    }    
    catch(e) {
        return res.status(400).json(responseHandler( false, 400, "Something Went Wrong", null))
    }
}


const unfollowUser = async( req, res) => {
    try{
        if( req.user._id === req.params.user_id){
            return res.status(405).json(responseHandler( false, 405, "Action not allowed", null))
        } 
        else{
            const user = await User.findById( req.user._id );
            if( !user.following.includes(req.params.user_id)){
                return res.status(405).json(responseHandler( false, 405, "You need to follow first", null))
            } 
            else{
            User.findByIdAndUpdate( req.params.user_id , {
                $pull: {followers: req.user._id}
            },{
                new: true
            }, (err, result) => {
                if(err){
                    return res.status(400).json({error: err})
                }
            User.findByIdAndUpdate( req.user._id,{
                $pull: {following: req.params.user_id}
            }, {
                new: true
            }).then(result => {
                res.status(200).json(responseHandler(true, 200, "Unfollow done", result));
            })
        }) } }
          
    } catch (e) {
        return res.status(400).json(responseHandler( false, 400, "Something went wrong", null ));
    }

}


module.exports = userController = {
   getMyAnswers,
   getMyQuestions,
   followUser,
   unfollowUser,
   followSpace,
   unfollowSpace
};
