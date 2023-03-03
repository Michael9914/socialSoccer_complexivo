const { Router } = require('express');

const Responde = require('../controllers/responder')

const router = Router();

//informe largo
router.post('/',Responde.crearResponsable);
router.get('/',Responde.getResponder);





module.exports = router;