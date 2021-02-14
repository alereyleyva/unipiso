// Models
const Gasto = require("./GastoModel");
const User = require("../Users/UserModel");

const GastosController = {
  getGastos: async (req, res) => {
    try {
      const Gastos = await Gasto.find();
      return res.status(200).json(Gastos.reverse());
    } catch (err) {
      res.json({ message: "Error al obtener los gastos" });
    }
  },
  getGasto: async (req, res) => {
    const gasto = await Gasto.findOne({ _id: req.params.id });
    if (!gasto)
      return res.json({
        message: "No existe un gasto con el ID proporcionado",
      });
    else return res.status(200).json(gasto);
  },
  createGasto: async (req, res) => {
    const { type, price, paga, deben } = req.body;
    const concept = req.body.concept.trim().toLowerCase();
    try {
      const usersDB = await User.find();
      if (usersDB.length <= 1)
        return res.json({
          message: "Debe haber más de 1 usuario para crear gastos",
        });

      if (concept.length === 0) {
        return res.json({
          message: "El concepto no puede ser vacío",
        });
      }

      if (!price)
        return res.json({
          message: "Debe especificar el coste del gasto",
        });

      if (paga === "Random")
        return res.json({
          message: "Debe especificar la persona que ha pagado",
        });

      let gasto = await Gasto.findOne({
        concept,
      });

      if (gasto)
        return res.json({
          message: "Ya existe un gasto con el concepto proporcionado",
        });

      gasto = new Gasto({
        concept,
        type,
        price,
        paga,
        deben,
      });
      const newGasto = await gasto.save();
      return res.status(201).json({
        message: "Gasto guardado correctamente",
        gasto: newGasto,
      });
    } catch (err) {
      return res.json({
        message: "Error al guardar el gasto",
      });
    }
  },
  deleteGasto: async (req, res) => {
    const ID = req.params.id;
    try {
      const gasto = await Gasto.findOne({ _id: ID });
      gasto.remove();
      res.status(200).json({
        message: "Gasto eliminado correctamente",
      });
    } catch (err) {
      res.json({ error: err.message });
    }
  },
  updateGasto: async (req, res) => {
    const ID = req.params.id;
    // Comprobando si el gasto con el ID dado existe
    let gasto = await Gasto.findOne({ _id: ID });
    if (!gasto) res.json({ message: "El gasto con el ID dado no existe" });
    // Actualizando el usuario
    try {
      gasto = await Gasto.findByIdAndUpdate(ID, req.body);
      const updatedGasto = await Gasto.findOne({ _id: ID });
      res.json({
        message: "El gasto ha sido actualizado correctamente",
        updatedUser: updatedGasto,
      });
    } catch (err) {
      res.json({ message: "Error al actualizar el gasto con el ID dado" });
    }
  },
};

module.exports = GastosController;
