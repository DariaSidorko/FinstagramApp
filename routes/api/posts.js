const express = require('express');
const router = express.Router();

router.get('/test', (rec,res) => res.json({msg:'Post works!'}));

module.exports = router;