const {User} = require('../models/User')

module.exports= { getUser(req,res){
    User.find()
    .select('-__v')
    .populate({
        path:thoughts,
        v:'-__v'
    })
    .populate({
        path:'friends',
        v:'-__V'
    })
    .then(userData=>{
        {
            res.status(200).json(userData);
        }
    })
    .catch(err=>{
        res.status(500).json(err)
    })
},

getUserById(req,res){
    User.findOne({_id:req.params.userId})
    .select('-__v')
    .populate({
        path:'thoughts',
        v:'-__v'
    })
    .populate({
        path:'friends',
        v:"-__v"
    })

    .then((findOneUser=>{
        if(!findOneUser){
            res.status(404).json({message:'No data found'})
        }res.status(200).json(findOneUser)
    }))
    .catch(err=>{
        res.status(500).json(err)
    })
},

createUser(req,res){
    User.create(req.body)
    .then(createUserData=>{
        res.status(200).json(createUserData)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
},

updateUser(req,res){
    User.findOneAndUpdate({_id:req.params.id},body)
    .then(userUpdate=>{
        if(!userUpdate){
            res.status(404).json({message:"Invalid Id"})
        }res.status(200).json(userUpdate)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
},

delUser(req,res){
    User.findOneAndDelete({_id:req.params.id})
    .then(userDel=>{
        if(!userDel){
            res.status(404).json({message:"Invalid id"})
        }res.status(200).json(userDel)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
},

addFriend(req,res){
    User.findOneAndUpdate({_id:req.params.id},
        {$push:{friends:req.params.friendsId}})
        .then(friendUpdate=>{
            if(!friendUpdate){
                res.status(404).json({message:"Invalid id"})
            }res.status(200).json(friendUpdate)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
},

removeFriend(req,res){
    User.findOneAndUpdate({_id:req.params.id},
        {$pull:{friends:req.params.friendsId}})
        .then(friendData=>{
            if(!friendData){
                res.status(404).json({message:"Invalid id"})
            }res.status(200).json(friendData)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
}
}