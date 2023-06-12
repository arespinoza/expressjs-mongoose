const anuncioCtrl = require("./../controllers/anuncio.controller");

const express = require("express");
const router = express.Router();


router.get("/", anuncioCtrl.getAnuncios);
router.post("/filtro", anuncioCtrl.getAnunciosFiltro);
router.get("/:id", anuncioCtrl.getAnuncio);
router.post("/", anuncioCtrl.crearAnuncio);
router.put("/:id", anuncioCtrl.editarAnuncio);
router.delete("/:id", anuncioCtrl.eliminarAnuncio);
router.post("/notification", anuncioCtrl.sendNotificationPush);

//router.get("/filtro/rol", anuncioCtrl.getAnunciosPorRol);
//router.get("/busquedaRangoFecha", anuncioCtrl.anunciosPorFechas);
//router.get("/busquedaAvanzada", anuncioCtrl.busquedaDatosCombinadaPlus);
//router.get("/filtro/area", anuncioCtrl.getAnunciosPorArea);
//router.get("/filtro/redactor", anuncioCtrl.getAnunciosPorRedactor);
//router.get("/filtro/areaYestado", anuncioCtrl.getAnunciosPorAreaYEstado);

module.exports = router;

