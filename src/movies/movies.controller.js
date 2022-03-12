const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next){
    const foundMovie = await service.read(req.params.id);

    if(foundMovie){
        res.locals.movie = foundMovie;
        return next();
    }

    next({
        status: 404,
        message: "Movie cannot be found."
    })
}


async function list(req, res, next){
    const {is_showing} = req.query;
    is_showing ? res.json({data: await service.listShowing()}) : res.json({data: await service.list()});
}

async function read(req, res, next){
    res.json({data: res.locals.movie});
}

module.exports = {
    movieExists,
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
}