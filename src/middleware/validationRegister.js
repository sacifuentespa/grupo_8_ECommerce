const { body, check } = require("express-validator");
const path = require("path");
const bycrypt = require("bcryptjs");

let acceptedFormats = ['.jpg', '.png', '.webp', '.jpeg', '.jfif']


const validationRegister = [
    body("name").notEmpty().withMessage("El campo Nombre(s) no puede quedar vacío"),
    body("lastName").notEmpty().withMessage("El campo Apellido(s) no puede quedar vacío"),
    body("email").isEmail().withMessage("Debes ingresar un email válido"),
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener mínimo 6 caractéres"),
    body("confirmPassword").isLength({ min: 6 }).withMessage("La confirmación de la contraseña debe tener 6 caractéres"),
    body("confirmPassword").custom((value, { req }) => {
        if (req.body.password == value) {
            return true
        } else {
            return false
        }
    }).withMessage("Las contraseñas deben coincidir"),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        if (file) {
            let fileExtension = path.extname(file.originalname)
            if (!acceptedFormats.includes(fileExtension)) {
                throw new Error(`Las extensiones permitidas son ${acceptedFormats.join(', ')}`);
            }
        }
        return true; 
    }),
    body("terminos").notEmpty().withMessage("Debes estar de acuerdo con los terminos y condiciones"),
];

module.exports = validationRegister;

// body('avatar').custom((value, {req}) =>{
    // if(req.file != undefined){
        // return true
    // }
    // return false;
// }).withMessage('Debe elegir su avatar y debe ser un archivo con formato: .JPG ó JPEG ó PNG')