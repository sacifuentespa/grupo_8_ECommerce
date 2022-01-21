module.exports = (sequelize, dataTypes) =>{
    let alias = 'Image'
    let cols = {
        
        path:{
            allowNull: false,
            unique: true,
            type: dataTypes.STRING(200)
        },
        products_id:{
            
            allowNull: false,
            type: dataTypes.INTEGER(15)
        },
        type:{
            unique: true,
            allowNull: false,
            type: dataTypes.STRING(45)
        }
    }
    let config = {
        tableName: "images",
        timestamps: false
    }
    

    const Image = sequelize.define(alias, cols, config)

    Image.associate = function (models) {
        Image.belongsTo(models.Product, { 
            as: "product",
            foreignKey: "products_id"
        })
    }

    return Image
}