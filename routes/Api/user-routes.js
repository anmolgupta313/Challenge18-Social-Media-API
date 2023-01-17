const router= require('express').Router();

const{getUser,
    getUserById,
    createUser,
    updateUser,
    delUser,
    addFriend,
    removeFriend}= require('../../controllers/userController');

    router.route('/')
    .get(getUser)
    .post(createUser)

    router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(delUser)

    router.route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

    module.exports= router