const express = require('express');
const router = express.Router();

router.get('/test', (rec,res) => res.json({msg:'Profile works!'}));

module.exports = router;