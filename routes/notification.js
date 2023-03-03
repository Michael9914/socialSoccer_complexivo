const { Router } = require('express');

const Notification = require('../controllers/notification')

const router = Router();

router.post('/',Notification.creaNotification);
router.get('/',Notification.getNotificationId);
//All usuer UPDI
router.get('/updi',Notification.getAllUPDI);
router.put('/',Notification.actualizarNotificationes);
router.delete('/:_id',Notification.eliminarNotification);


module.exports = router;