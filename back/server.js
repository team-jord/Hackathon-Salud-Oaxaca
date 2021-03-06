// back/node_modules/whatwg-url/lib/encoding.js
// https://stackoverflow.com/questions/69187442/const-utf8encoder-new-textencoder-in-node-js

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./src/models");
require("dotenv").config();
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const aws = require("aws-sdk");
const { promisify } = require("util");
const randomBytes = promisify(crypto.randomBytes);
const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccesKey = process.env.AWS_SECRET_KEY;

const s3 = new aws.S3({
  //apiVersion: '2006-03-01',
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccesKey,
  region: region,
  signatureVersion: "v4",
});

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 8080;
var corsOptions = {
  origin: "https://empower-18f9d.web.app/",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );

  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

  next();
});

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Conectado a la base de datos!");
  })
  .catch((err) => {
    console.log(
      `Ocurrio un error al tratar de conectarlo a la base de datos! ${err}`
    );
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido" });
});

require("./src/routes/usuario.routes")(app);
require("./src/routes/evento.routes")(app);
require("./src/routes/medicamento.routes")(app);
require("./src/routes/enfermedad.routes")(app);
require("./src/routes/pregunta.routes")(app);
require("./src/routes/examen.routes")(app);
require("./src/routes/perfilMedico.routes")(app);
require("./src/routes/habito.routes")(app);

app.post("/api/s3Url", upload.single("foto"), async (req, res) => {
  const stream = fs.createReadStream(req.file.path);

  const ext = path.extname(req.file.originalname).toLowerCase();

  let fileType = "";

  if (ext == ".png") {
    fileType = "image/png";
  } else if (ext == ".jpg" || ext == ".jpeg") {
    fileType = "image/jpg";
  } else {
    res.send({ data: "error" });
  }

  stream.on("error", function (err) {
    console.log("error in read stream: ", err);
    throw err;
  });

  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  let params = {
    Bucket: bucketName,
    Body: stream,
    Key: imageName,
    ContentType: fileType,
  };
  const data = await s3.upload(params).promise();

  res.send({ data: data.Key });
});

app.get("/api/s3Url2/:key", async (req, res) => {
  const key = req.params.key;
  const imagen = await getImagen(key);
  res.send(imagen);
});

app.listen(PORT, () => {
  console.log(`Server en el puerto ${PORT}`);
});
