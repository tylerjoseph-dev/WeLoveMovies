const knex = require("../db/connection");

async function list(){
    return knex("movies as m")
        .select("m.movie_id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
}

async function listShowing(){
    return knex("movies as m")
        .distinct()
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
        .select("m.movie_id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
        .where({is_showing: true})
}

async function read(id){
    return knex("movies as m")
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
        .select("m.movie_id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url", "m.created_at", "m.updated_at")
        .where({"m.movie_id": id})
        .first()
}

module.exports ={
    list,
    listShowing,
    read,
}