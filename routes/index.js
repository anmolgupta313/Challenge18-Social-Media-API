const router= require('express').Router();

const apiRoutes= require('./Api');

router.use('/api',apiRoutes)

module.exports= router;