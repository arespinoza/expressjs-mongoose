const webpush = require('web-push');
const anuncio = require("../models/anuncio");
const Anuncio = require("../models/anuncio");
const Rol = require("../models/dbpersonal/rol");
const anuncioCtrl = {};

//notificaciones web-push
const vapidKeys = {
  "publicKey":"BJCNp08HbTp-nZLiGq06HaFt0-a62ET-w9eM9I4k3CNA8JYO5X-Bs_CMqlhUiSUNjP53OXXaMBc4smHnfuY3-_0",
  "privateKey":"kz-12dC8satYcCvj5nlN1aWwURBkM-7MU9AXbHabE84"
};
webpush.setVapidDetails(
  'mailto: example@fce.unju.edu.ar',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

/**
 * Recupera todos los Anuncios
 */
anuncioCtrl.getAnuncios = async (req, res) => {

  criteria = {};
  if(req.query.tituloAnuncio!=null && req.query.tituloAnuncio!=""){
      criteria.tituloAnuncio = { $regex: req.query.tituloAnuncio, $options: "i" }};
  if(req.query.estado!=null && req.query.estado!=""){
      criteria.estado = req.query.estado};

  var anuncios = await Anuncio.find(criteria).sort({ fechaEntrega : 'desc'})
    .populate("redactor")
    .populate("mediosDePublicacion")
    .populate("destinatarios")
    .populate("area");

  res.json(anuncios);
};

anuncioCtrl.getAnunciosFiltro = async (req, res) => {
  var tempAreas = req.body.areas;
  criteria = {};
  if(req.body.areas!=null){
    criteria.area = {$in: tempAreas}
  }
  if(req.body.estado!=null && req.body.estado!=""){
    criteria.estado = req.body.estado};

  var anuncios = await Anuncio.find(criteria)
    .populate("redactor")
    .populate("mediosDePublicacion")
    .populate("destinatarios")
    .populate("area").sort({fechaVigenciaEntrada: -1});

  console.log(anuncios);

  //hago el filtro por roles

  if(req.body.roles!=null && req.body.roles!=""){
    var resultAnuncios=[];
    var arrayRoles = req.body.roles.split(',');
    for (const anuncio of anuncios) {
      for (const idrol of anuncio.destinatarios) {
        var unRol = await Rol.findById(idrol);
        if (arrayRoles.includes(unRol.nombreRol, 0)){
          resultAnuncios.push(anuncio);
          break;
        }
      }    
    }
    anuncios = resultAnuncios;
  };
  res.json(anuncios);
};


/* anuncioCtrl.generarCodigoQR = async(req,res)=>{
  var url = req.query.url;
  const qr = await  qrcode.toDataURL(url);
  res.json({
    status:"1",
    msg:"codigo qr creado correctamente",
    codigoqr: qr
  })

}*/

/**
 * Agregar un nuevo Anuncio
 */
anuncioCtrl.crearAnuncio = async (req, res) => {
  var anuncio = new Anuncio(req.body);
  try {
    await anuncio.save();
    res.json({
      status: "1",
      msg: "Anuncio agregado Exitosamente",
    });
  } catch (error) {
    res.status(400).json({
      status: "0",
      msg: "Error al agregar Anuncio",
    });
  }
};
/**
 * Obtener un Anuncio en especifico
 */
anuncioCtrl.getAnuncio = async (req, res) => {
  const anuncio = await Anuncio.findById(req.params.id)
    .populate("mediosDePublicacion")
    .populate("destinatarios")
    .populate("redactor")
    .populate("area");
  res.json(anuncio);
};

/**
 * Actualizar un Anuncio
 */
anuncioCtrl.editarAnuncio = async (req, res) => {
  const vanuncio = new Anuncio(req.body);
  try {
    await Anuncio.updateOne({ _id: req.body._id }, vanuncio);
    res.json({
      status: "1",
      msg: "Anuncio Actualizado",
    });
  } catch (error) {
    res.status(400).json({
      status: "0",
      msg: "Error procesando la operacion - Actualizar",
    });
  }
};
/**
 * Eliminar un Anuncio
 */
anuncioCtrl.eliminarAnuncio = async (req, res) => {
  try {
    await Anuncio.deleteOne({ _id: req.params.id });
    res.json({
      status: "1",
      msg: "Anuncio Eliminado",
    });
  } catch (error) {
    res.status(400).json({
      status: "0",
      msg: "Error procesando la operacion - Eliminar",
    });
  }
};

/**
 * Enviar Notificacion push
 */
anuncioCtrl.sendNotificationPush = async (req, res) => {

  const pushSubscription = { "endpoint": "https://fcm.googleapis.com/fcm/send/dZqQH_mpDnA:APA91bFERsVn5nylUyMT73wt01k7YZ-yxwwWKkJLWORj2ro8wjgWvbArcbIQX7ZHPdDkaQrR29YurJJTvfI8LMtO18inWfi07luqtWRnJS9qoAa43cO2EYv2BRBsz51F0iUOKRvEXDKb", "expirationTime": null, "keys": { "p256dh": "BOsHc2whxk4kroOYQBgU1Av5rfB51hWpIvzHJeSahtuxVC6K2Mt0CZlRFTHR9Hz515vuSNzvW_dx_CHgUGmsBo4", "auth": "Gyy1a72kMBCeNbleancdrQ" } }
  
  //vibrate: [100,50,100],
  //"requireInteraction":true,
  //"renotify":true,
  //data:{url:'https://aplicaciones.fce.unju.edu.ar/servicioapp/#/guiautogestion'},

  const payload = {
    "notification": {
        "title": "APP FCE Digital",
        "body": "Bienvenido a la APP FCE - Digital de la Facultad de Ciencias Económicas de la UNJu.",
        "icon":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQybBkMjhlrGemDKErq2WkD2gguFlJsSTEckoDKGaTX_w&s",
        //"actions": [
        //  {"action": "foo", "title": "Open new tab"},
        //  {"action": "baz", "title": "Navigate last"}
        //],
        "data": {
          "onActionClick": {
            "default": {"operation": "openWindow", "url": "https://aplicaciones.fce.unju.edu.ar/servicioapptest/#/guiautogestion"},
            //"foo": {"operation": "openWindow", "url": "https://www.unju.edu.ar/"},
            //"baz": {"operation": "navigateLastFocusedOrOpen", "url": "https://www.unju.edu.ar/"}
          }
        

    }
  }}


 
  webpush.sendNotification(
    pushSubscription,
    JSON.stringify(payload)
    ).then(res=>{
      console.log("enviado")
    }).catch(error=>{
      console.log("error", error)
    })

  res.status(400).json({
    status: "1",
    msg: "Notificacion enviada correctamente...",
  });
};


module.exports = anuncioCtrl;
