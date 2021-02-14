// Models
const Item = require("./ItemModel");

const ItemController = {
  getItems: async (req, res) => {
    try {
      const Items = await Item.find();
      res.json(Items);
    } catch (err) {
      res.json({ message: "Error al obtener los items" });
    }
  },
  getItem: async (req, res) => {
    const item = await Item.findOne({ _id: req.params.id });
    if (!item) {
      res.json({ message: "No existe un item con el ID proporcionado" });
    } else {
      res.json(item);
    }
  },
  createItem: async (req, res) => {
    try {
      const name = req.body.name.trim().toLowerCase();
      if (name === "")
        return res.json({ message: "Un item vacío no es válido" });

      let item = await Item.findOne({ name });

      if (item)
        return res.json({
          message: "Ya he existe un item con el nombre proporcionado",
        });

      item = new Item({ name: req.body.name });

      const newItem = await item.save();

      return res.json({
        message: "Item guardado correctamente",
        item: newItem,
      });
    } catch (err) {
      return res.json({
        message: "Error en el servidor",
      });
    }
  },
  deleteItem: async (req, res) => {
    const ID = req.params.id;
    try {
      const deleteItem = await Item.findByIdAndDelete(ID);
      res.json({
        message: "Item eliminado correctamente",
        item: deleteItem,
      });
    } catch (err) {
      res.json({ message: "No se ha podido eliminar el item" });
    }
  },
  updateItem: async (req, res) => {
    const ID = req.params.id;

    // Comprobando si el item con el ID dado existe
    let item = await Item.findOne({ _id: ID });
    if (!item) res.json({ message: "El item con el ID dado no existe" });

    // Actualizando el item
    try {
      item = await Item.findByIdAndUpdate(ID, req.body);
      const updatedItem = await Item.findOne({ _id: ID });
      res.json({
        message: "El gasto ha sido actualizado correctamente",
        item: updatedItem,
      });
    } catch (err) {
      res.json({ message: "Error al actualizar el gasto con el ID dado" });
    }
  },
};

module.exports = ItemController;
