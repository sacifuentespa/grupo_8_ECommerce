module.exports = (sequelize, dataTypes) =>{
    let alias = 'Users'
    let cols = {
        idUsers:{
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: dataTypes.INTEGER,
        },
        name:{
            allowNull: false,
            type: dataTypes.STRING
        },
        lastName:{
            allowNull: false,
            type: dataTypes.STRING
        },
        email:{
            allowNull: false,
            type: dataTypes.STRING
        },
        password:{
            allowNull: false,
            type: dataTypes.STRING
        },
        avatar:{
            allowNull: false,
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: "users",
        timestamps: false
    }
    

    const User = sequelize.define(alias, cols, config)

    return User
}