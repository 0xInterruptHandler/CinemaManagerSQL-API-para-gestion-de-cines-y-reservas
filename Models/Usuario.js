import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Usuario = sequelize.define("Usuario", {
    UsuarioNombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UsuarioCorreo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    UsuarioPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UsuarioRol: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'usuario_regular',  
    },
  },
  {
    timestamps: true,  
  }
);

export default Usuario;