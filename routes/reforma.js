const { Router } = require('express');

const Reformas = require('../controllers/reforma')

const router = Router();

//informe largo
router.post('/',Reformas.creaReforma);
 
router.get('/',Reformas.getReformaId);
router.get('/todos',Reformas.getReforma );
router.get('/:_id',Reformas.getIdIReforma);
router.put('/',Reformas.actualizarReforma);
router.delete('/:_id',Reformas.eliminarReforma);
//archivos



module.exports = router;