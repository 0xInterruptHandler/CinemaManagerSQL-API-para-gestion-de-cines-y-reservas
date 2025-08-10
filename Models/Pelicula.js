import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Pelicula = sequelize.define("Pelicula", {
    PeliculaTitulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PeliculaDescripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    PeliculaGenero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PeliculaImagenPoster: {
      type: DataTypes.STRING,
      allowNull: false, // URL to the poster image
    },
  },
  { timestamps: true }
);
export default Pelicula;