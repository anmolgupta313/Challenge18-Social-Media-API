const router= require('express').Router();
const thoughtRoutes= require('./thought-routes')
const userRoute= require('./user-routes')

router.use('/users',userRoute);
router.use('/thoughts',thoughtRoutes);

module.exports= router