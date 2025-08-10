import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import {Pelicula} from "./Pelicula.js";
const HorarioEspectaculo = sequelize.define("HorarioEspectaculo", {
    HorarioEspectaculoFecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    HorarioEspectaculoHora: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    HorarioEspectaculoCapacidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);

// Relacion: Una pelicula tiene muchos horarios de espectaculo
Pelicula.hasMany(HorarioEspectaculoFecha, { foreignKey: 'PeliculaCodigo', onDelete: 'CASCADE' });
HorarioEspectaculoFecha.belongsTo(Movie, { foreignKey: 'PeliculaCodigo' });
