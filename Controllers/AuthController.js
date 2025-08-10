import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../Models/Usuario.js';

// Registro del usuario y autenticación

const register = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;

  try {
    const existeUsuario = await Usuario.findOne({ where: { UsuarioCorreo: correo } });

    if (existeUsuario) {
      return res.status(400).json({ message: 'El usuario ya existe.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      UsuarioNombre: nombre,
      UsuarioCorreo: correo,
      UsuarioPassword: hashedPassword,
      UsuarioRol: rol || 'usuario_regular',
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.UsuarioRol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error registrando usuario', error });
  }
};

// Login del usuario y generación de token JWT
const login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const existeUsuario = await Usuario.findOne({ where: { UsuarioCorreo: correo } });

    if (!existeUsuario) {
      return res.status(400).json({ message: 'Credenciales incorrectas.' });
    }

    const coincide = await bcrypt.compare(password, existeUsuario.UsuarioPassword);

    if (!coincide) {
      return res.status(400).json({ message: 'Credenciales incorrectas.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: existeUsuario.id, rol: existeUsuario.UsuarioRol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error iniciando sesion', error });
  }
};

export { register, login };
