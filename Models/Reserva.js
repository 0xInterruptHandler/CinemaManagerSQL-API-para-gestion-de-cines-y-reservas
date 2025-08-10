import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import {Usuario} from "./Usuario.js";
import {HorarioEspectaculo} from "./HorarioEspectaculo.js";

const Reserva = sequelize.define("Reserva", {

    ReservaAsientos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);

// Define relationships: Reserva Pertenece a un Usuario y a un HorarioEspectaculo
Reserva.belongsTo(Usuario, { foreignKey: 'UsuarioCodigo' });
Reserva.belongsTo(HorarioEspectaculo, { foreignKey: 'HorarioEspectaculoCodigo' });

// Usuario Tiene muchas Reservas
Usuario.hasMany(Reserva, { foreignKey: 'UsuarioCodigo' });

// HorarioEspectaculo Tiene muchas Reservas
HorarioEspectaculo.hasMany(Reserva, { foreignKey: 'HorarioEspectaculoCodigo' });

export default Reserva;
