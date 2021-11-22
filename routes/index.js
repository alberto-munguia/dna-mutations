const express = require('express')
const router  = express.Router()

const { hasMutation, statistics } = require('../controllers/mutations')

router.post('/mutation', hasMutation)
router.get('/stats', statistics)

module.exports = router
