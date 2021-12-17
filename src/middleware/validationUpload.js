const { body, check } = require ('express-validator');
const path = require('path')

let acceptedFormats = ['.jpg', '.png', '.webp', '.jpeg', '.jfif']

const validations = [
    body('productName').notEmpty().withMessage('El producto debe tener un nombre').bail()
    .isLength({min:3}).withMessage('El nombre debe tener por lo menos 5 caracteres'), 
    body('productPrice').notEmpty().withMessage('El producto debe tener un precio'),
    body('productDescriptionUpload').notEmpty().withMessage('El producto debe tener una descripción')
    .isLength({min:15}).withMessage('La descripción debe tener por lo menos 15 caracteres'),  
    check('mainImageUpload').custom((value, {req})=>{
        if(req.files["mainImageUpload"]){
        let fileExtension = path.extname(req.files["mainImageUpload"][0].originalname)
        if(!acceptedFormats.includes(fileExtension)){
            throw new Error(`Las extensiones permitidas son ${acceptedFormats.join(', ')}`)
        //sin el else el value queda como undefined haciendo que haya errores en la validación aunque se cumplan los requisitos
        }else{
            return fileExtension
        }
    }
        if (!req.files["mainImageUpload"]){
            throw new Error('Debes subir una imagen principal')
        }
    }
    ), 
    check('imagesUpload').custom((value, {req})=>{
        if(req.files["imagesUpload"]){
            for(let i = 0; i<req.files["imagesUpload"].length;i++){
            let fileExtension = path.extname(req.files["imagesUpload"][i].originalname)
            if(!acceptedFormats.includes(fileExtension)){
            throw new Error(`Las extensiones permitidas son ${acceptedFormats.join(', ')}`)
            }else{
            return fileExtension
        }
    }}
    }
    ),
    body('aimUpload').notEmpty().withMessage('Debemos saber que quieres hacer con tu producto'),
]

module.exports = validations;