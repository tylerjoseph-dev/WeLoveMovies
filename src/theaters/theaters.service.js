const knex = require("../db/connection");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
    theater_id: ["theater_id"],
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    is_showing: ["movies", null, "is_showing"],
    movie_theater_id: ["movies", null, "theater_id"],
    movie_created_at: ["movies", null, "created_at"],
    movie_updated_at: ["movies", null, "updated_at"],
})

async function list(){
    const theaters = knex("theaters as t");
    return theaters
        .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .select("*")
        .then(reduceMovies)
}

async function theatersPlaying(id){
    return knex("movies_theaters as mt")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .select("t.theater_id", "t.name", "t.address_line_1", "t.address_line_2", "t.city", "t.state", "t.zip", "t.created_at", "t.updated_at", "mt.movie_id", "mt.is_showing")
        .where({is_showing:true})
        .where({"m.movie_id": id})
}
module.exports = {
    list,
    theatersPlaying,
}