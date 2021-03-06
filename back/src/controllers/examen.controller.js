const Examen = require("../models/examen.model.js");

exports.create = async (req, res) => {
  if (!req.body.Tipo) {
    res.status(400).send({
      message: "El examen debe de tener un tipo",
    });
    return;
  }

  const examenNuevo = new Examen({
    Tipo: req.body.Tipo,
    Fecha: req.body.Fecha,
    Preguntas: req.body.Preguntas,
  });

  examenNuevo.save((err, examenNuevo) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        message:
          err.message ||
          `Ocurrio un error al tratar de crear el examen de tipo${req.body.Tipo}`,
      });
    } else {
      res.status(200).send(examenNuevo);
    }
  });
};

exports.findAll = (req, res) => {
  Examen.find()
    .populate("Preguntas")
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          message:
            err.message ||
            `Ocurrio un error al tratar de recuperar todos los expedientes medicos`,
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findOne = (req, res) => {
  Examen.findById(req.params.id)
    .populate("Preguntas")
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          message:
            err.message ||
            `Ocurrio un error al tratar de recuperar todos los expedientes medicos`,
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.update = (req, res) => {
  Examen.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate("Preguntas")
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          message:
            err.message ||
            `Ocurrio un error al tratar de recuperar todos los expedientes medicos`,
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.delete = (req, res) => {
  Examen.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Examen con id: ${req.params.id}, no encontrado`,
        });
      }
      res.send({ message: "Examen eliminado con exito!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: `Examen con id: ${req.params.id}, no encontrado`,
        });
      }
      return res.status(500).send({
        message: `Ocurrio un error al eliminar al examen con id: ${req.params.id}.`,
      });
    });
};
