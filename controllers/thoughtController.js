const {Thought}= require('../models');

module.exports={
    getThoughts(req,res){
        Thought.find()
        .select('-__v')
        .then(thoughtData=>{
            res.status(200).json(thoughtData);
        })
        .catch(err=>{
            res.status(500).json(err);
            console.log(err)
        })
    },

    getThoughtById(req,res){
        Thought.findOne({_id:req.params.id})
        .select('-__v')
        .then(thoughtById=>{
            if(!thoughtById){
                res.status(404).json({message:"Invalid Id"})
            }res.status(200).json(thoughtById)
        })
        .catch(err=>{
            res
            .status(500).json(err)
        })
    },

    createThought(req,res){
        Thought.create(req.body)
        .then(thoughtCreate=>{
            res.status(200).json(thoughtCreate)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    },

    updateThought(req,res){
        Thought.findOneAndUpdate({_id:req.params.id},req.body)
        .then(thoughtUpdate=>{
            if(!thoughtUpdate){
                res.status(404).json({message:"Invalid Id"})
            }res.status(200).json(thoughtUpdate)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    },

    deleteThought(req,res){
        Thought.findOneAndDelete({_id:req.params.id})
        .then(delThought=>{
            if(!delThought){
                res.status(404).json({message:"Invalid Id"})
            }res.status(200).json(delThought)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    },

    addReaction(req,res){
        Thought.findOneAndUpdate({_id:req.params.id},
            {$push:{reactions:req.body}})
            .then(reactionAdd=>{
                if(!reactionAdd){
                    res.status(404).json({message:"Invalid Id"})
                }res.status(200).json(reactionAdd)
            })
            .catch(err=>{
                res.status(500).json(err);
            })
    },

    deleteReaction(req,res){
        Thought.findOneAndUpdate({_id:req.params.id},
            {$pull:{reactions:{reactionId:req.params.reactionId}}})
            .then(delReaction=>{
                if(!delReaction){
                    res.status(404).json({message:"Invalid Id"})
                }res.status(200).json(delReaction)
            })
            .catch(err=>{
                res.status(500).json(err);
            })
    }
}