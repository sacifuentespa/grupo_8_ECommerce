const { body, check } = require ('express-validator');
const path = require('path')

let acceptedFormats = ['.jpg', '.png', '.webp', '.jpeg', '.jfif']

const validationsEdit = [
    body('productName').notEmpty().withMessage('El producto debe tener un nombre').bail()
    .isLength({min:3}).withMessage('El nombre debe tener por lo menos 5 caracteres'), 
    body('productPrice').notEmpty().withMessage('El producto debe tener un precio'),
    body('productDescriptionUpload').notEmpty().withMessage('El producto debe tener una descripción')
    .isLength({min:15}).withMessage('La descripción debe tener por lo menos 15 caracteres').isLength({max:1500})
        .withMessage('La descripción debe tener menos de 1500 caracteres'),
    check('mainImageUpload').custom((value, {req})=>{
        if(req.files["mainImageUpload"]){
        let fileExtension = path.extname(req.files["mainImageUpload"][0].originalname)
        if(!acceptedFormats.includes(fileExtension)){
            throw new Error(`Las extensiones permitidas son ${acceptedFormats.join(', ')}`)
        }else{
            //sin el else el value queda como undefined haciendo que haya errores en la validación aunque se cumplan los requisitos
            return fileExtension
        }
    }
    //la validacion del upload y el edit son muy parecidas pero con diferencias clave;
        // para editar el producto no es necesario subir una imagen (ya hay una imagen)
        //agregado para que el value no sea undefined
    else{
        return '.jpg'
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
    //agregado para que el value no sea undefined
    else{return '.jpg'}
    }
    ),
    body('aimUpload').notEmpty().withMessage('Debemos saber que quieres hacer con tu producto'),
]

module.exports = validationsEdit;