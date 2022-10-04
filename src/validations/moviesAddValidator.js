const {check} = require('express-validator');
module.exports = [
    check('title').notEmpty()
    .withMessage('El título es requerido')
    .isLength({min: 3})
    .withMessage('Debe contener 3 caracteres como mínimo')
    .isAlpha('en-US').withMessage('Debe ingresar solo letras.').bail(),
    check('rating').notEmpty()
    .withMessage('El rating es requerido'),
    check('awards').notEmpty()
    .withMessage('Awards es requerido'),
    check('release_date').notEmpty()
    .withMessage('Release_date es requerido'),
    check('length').notEmpty()
    .withMessage('Length es requerido'),
    check('genre').notEmpty()
    .withMessage('El Género es requerido')
]