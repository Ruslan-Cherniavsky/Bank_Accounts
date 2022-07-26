const express = require('express')
const router = express.Router()

import {
    getActions,
    postAction,

} from '../hendlers/index'

//----GET---
router.get('/:accountNumber', getActions)


//----USER ---

router.post('/postpayload', postAction)


export default router;
