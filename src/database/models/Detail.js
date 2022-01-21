module.exports = (sequelize, dataTypes) =>{
    let alias = 'Detail'
    let cols = {
        
        color:{
            type: dataTypes.STRING(45)
        },
        amount:{
            type: dataTypes.INTEGER(3)
        },
        products_id:{
            type: dataTypes.INTEGER(15)
        }
    }
    let config = {
        tableName: "details",
        timestamps: false
    }

    const Detail = sequelize.define(alias, cols, config)

    Detail.associate = function (models) {
        Detail.belongsTo(models.Product, { 
            as: "product",
            foreignKey: "products_id"
        })
    }

    return Detail
}