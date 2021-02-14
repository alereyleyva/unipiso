// Services
const AuthService = require("../Auth/AuthService");

// Models
const User = require("./UserModel");

const UserController = {
  getUsers: async (req, res) => {
    try {
      const Users = await User.find();
      res.json(Users);
    } catch (err) {
      res.json({ message: "Error al obtener los usuarios registrados" });
    }
  },
  getUser: async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.json({ message: "No existe un usuario con el ID proporcionado" });
    } else {
      res.json(user);
    }
  },
  registerUser: async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
      // Comprobando si existe un usuario con el email dado
      let user = await User.findOne({ email });
      if (user) {
        return res.json({
          message: "Ya existe un usuario con el email proporcionado",
        });
      }
      // Comprobando si existe un usuario con el username dado
      user = await User.findOne({ username });
      if (user) {
        return res.json({
          message:
            "Nombre de usuario ya en uso, elija otro nombre que no esté en uso",
        });
      }

      const hashedPassword = await User.hashPassword(password);

      user = new User({
        name,
        username,
        email,
        password: hashedPassword,
      });

      const newUser = await user.save();
      return res.json({
        message: "Usuario registrado correctamente",
        user: newUser,
      });
    } catch (err) {
      return res.json({ message: "No ha sido posible crear el Usuario" });
    }
  },
  loginUser: async (req, res) => {
    try {
      // Comprobando si el username proporcionado está asociado a un usuario de la DB
      const user = await User.findOne({ username: req.body.username });
      if (!user)
        return res.json({
          message:
            "No existe un usuario con el nombre de usuario proporcionado",
        });

      // Comprobando que la password es correcta

      const matchPassword = await User.comparePassword(
        user.password,
        req.body.password
      );
      if (!matchPassword) return res.json({ message: "Contraseña incorrecta" });

      return res.json({
        AccessToken: AuthService.createAccessToken(user),
      });
    } catch (err) {
      return res.json({ message: "Error en el servidor, inténtelo de nuevo" });
    }
  },
  deleteUser: async (req, res) => {
    const ID = req.params.id;

    try {
      // Comprobando si el usuario con el ID dado existe
      const user = await User.findOne({ _id: ID });
      if (!user) res.json({ message: "El usuario con el ID dado no existe" });

      // Eliminando el usuario
      const deletedUser = await User.findByIdAndDelete(ID);
      res.json({
        message: "Usuario eliminado correctamente",
        deletedUser: deletedUser,
      });
    } catch (err) {
      res.json({ message: "Error al eliminar el usuario" });
    }
  },
  updateUser: async (req, res) => {
    const ID = req.params.id;

    try {
      // Comprobando si el usuario con el ID dado existe
      const user = await User.findOne({ _id: ID });
      if (!user) res.json({ message: "El usuario con el ID dado no existe" });

      // Actualizando el usuario
      const updatedUser = await User.findByIdAndUpdate(ID, req.body, {
        new: true,
      });
      res.json({
        message: "El usuario ha sido actualizado correctamente",
        updatedUser,
      });
    } catch (err) {
      res.json({ message: "Error al actualizar el usuario con el ID dado" });
    }
  },
};

module.exports = UserController;
