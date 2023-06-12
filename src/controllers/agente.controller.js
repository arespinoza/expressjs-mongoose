//const Agente = require('../models/agente');


const agenteCtrl = {}
/** 
agenteCtrl.getAgentes = async (req, res) => {

    let criteria= {};
    if ((req.query.estado != null) && (req.query.estado != "")){
        criteria.estado = req.query.estado;
    }

    var agentes = await Agente.find(criteria);
    res.json(agentes);
}


agenteCtrl.createAgente = async (req, res) => {
    var agente = new Agente(req.body);
    try {
        await agente.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Agente guardado.'
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}
agenteCtrl.getAgente = async (req, res) => {
    const agente = await Agente.findById(req.params.id);
    res.json(agente);
}

agenteCtrl.editAgente = async (req, res) => {
    const vagente = new Agente(req.body);
    try {
        await Agente.updateOne({ _id: req.body._id }, vagente);
        res.json({
            'status': '1',
            'msg': 'Agente updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

agenteCtrl.deleteAgente = async (req, res) => {
    try {
        await Agente.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Agente removed'
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}


*/

module.exports = agenteCtrl;
