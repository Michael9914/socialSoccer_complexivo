/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

const { getUsuarios, crearUsuario, actualizarUsuarioPlan, borrarUsuario, actualizarUser, usuariosAdmin, actualizarUsuarioAdmin, deleteUser } = require('../controllers/usuarios');
//const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get( '/', usuariosAdmin );
router.get( '/', getUsuarios );

router.post( '/',
    //validarJWT ,
    crearUsuario 
);

router.put( '/',
    
     //   mdAutenticacion.verificaToken,

    actualizarUser
);

router.put( '/:id',
    
       // mdAutenticacion.verificaToken,

        actualizarUsuarioAdmin
);
router.put( '/plan',
    
     //   mdAutenticacion.verificaToken,

     actualizarUsuarioPlan
);


router.delete( '/:id',
mdAutenticacion.verificaToken,
    borrarUsuario
);

router.delete( '/:id',
  
    deleteUser
);



module.exports = router;