const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");
const User = require("../Users/UserModel");

const GastoSchema = new mongoose.Schema({
  concept: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    default: "Random",
  },
  price: {
    type: Number,
    required: true,
  },
  paga: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    autopopulate: true,
  },
  date: {
    type: String,
    required: true,
    default: new Date().toDateString(),
  },
  deben: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true,
    },
  ],
});

GastoSchema.plugin(autopopulate);

GastoSchema.pre("save", async function (next) {
  this.populate(["paga", "deben"], async (err, gasto) => {
    if (err) throw new Error("Error al procesar el gasto");
    try {
      const userPaga = gasto.paga;
      if (gasto.type === "Comun" || gasto.type === "Especifico") {
        const personasAfectadas = gasto.deben.length + 1;
        for (user of gasto.deben) {
          let newDebe = user.debe + gasto.price / personasAfectadas;
          await User.findByIdAndUpdate(user._id, { $set: { debe: newDebe } });
        }
        let newFaltan =
          userPaga.faltan + (gasto.price - gasto.price / personasAfectadas);
        await User.findByIdAndUpdate(userPaga._id, {
          $set: { faltan: newFaltan },
        });
      } else {
        let userDebe = gasto.deben[0];
        let newDebe = userDebe.debe + gasto.price;
        let newFaltan = userPaga.faltan + gasto.price;
        await User.findByIdAndUpdate(userDebe._id, { $set: { debe: newDebe } });
        await User.findByIdAndUpdate(userPaga._id, {
          $set: { faltan: newFaltan },
        });
      }
      next();
    } catch (error) {
      throw new Error("Error al procesar el gasto");
    }
  });
});

GastoSchema.pre("remove", async function (next) {
  this.populate(["paga", "deben"], async (err, gasto) => {
    if (err) throw new Error(err.message);
    try {
      const userPaga = gasto.paga;
      if (gasto.type === "Comun" || gasto.type === "Especifico") {
        const personasAfectadas = gasto.deben.length + 1;
        for (user of gasto.deben) {
          let newDebe = user.debe - gasto.price / personasAfectadas;
          await User.findByIdAndUpdate(user._id, { $set: { debe: newDebe } });
        }
        let newFaltan =
          userPaga.faltan - (gasto.price - gasto.price / personasAfectadas);
        await User.findByIdAndUpdate(userPaga._id, {
          $set: { faltan: newFaltan },
        });
      } else {
        let userDebe = gasto.deben[0];
        let newDebe = userDebe.debe - gasto.price;
        let newFaltan = userPaga.faltan - gasto.price;
        await User.findByIdAndUpdate(userDebe._id, { $set: { debe: newDebe } });
        await User.findByIdAndUpdate(userPaga._id, {
          $set: { faltan: newFaltan },
        });
      }
      next();
    } catch (error) {
      throw new Error(error.message);
    }
  });
});

module.exports = mongoose.model("Gasto", GastoSchema);
