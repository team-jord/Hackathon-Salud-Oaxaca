var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ExamenSchema = new Schema({
  Tipo: {
    type: String
  },
  Fecha: {
    type: String
  },
  Preguntas: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Pregunta'
  }]
});

module.exports = mongoose.model("Examen", ExamenSchema)