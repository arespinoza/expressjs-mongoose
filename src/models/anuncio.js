const mongoose = require("mongoose");
const { Schema } = mongoose;
const Medio = require("./medio");
const Rol = require("./dbpersonal/rol");
const Persona = require("./dbpersonal/persona");
const Area = require("./dbpersonal/area");
const AnuncioSchema = new Schema({
  tituloAnuncio:{ type: String, required: true }, 
  contenidoAnuncio: { type: String, required: true },
  tipoContenido: { type: String, required: true },
  fechaVigenciaEntrada: { type: String, required: true },
  fechaVigenciaSalida: { type: String, required: true },  
  estado: { type: String, required: true },
  recursos:  [{type: String}],
  urlmasinfo: { type: String},
  tiempoLectura: { type: String, required: true },
  mediosDePublicacion: [{ type: Schema.Types.ObjectId, ref: Medio, required: true }],
  destinatarios: [{ type: Schema.Types.ObjectId, ref: Rol, required: true }],
  redactor: { type: Schema.Types.ObjectId, ref: Persona, required: true },
  area: { type: Schema.Types.ObjectId, ref: Area, required: true }
});

module.exports = mongoose.conanuncio.model("Anuncio", AnuncioSchema);

