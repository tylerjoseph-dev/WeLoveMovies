const service = require("./theaters.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res){
    const {id} = req.params;
    if(id){
        return res.json({ data: await service.theatersPlaying(id)})
    }
    res.json({ data: await service.list()})
}

module.exports = {
    list: asyncErrorBoundary(list),
}