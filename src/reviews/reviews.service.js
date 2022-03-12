const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

// add critic details array to review
const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});
// add critic category and details to review
const reduceCritic = reduceProperties("review_id",{
  critic_created_at: ["critic", "created_at"],
  critic_updated_at: ["critic", "updated_at"],
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"],
  critic_critic_id: ["critic", "critic_id"]

})

// get review by id
// to be used for validation
function read(review_id) {
  // >> select *
  // >> from reviews
  // >> where review_id = { review_id };

  return knex("reviews").select("*").where({ review_id }).first();
  // .first() returns first row in table as an object
}

// delete a review by id
function destroy(review_id) {
  // >> select *
  // >> from reviews
  // >> where review_id = { review_id };

  return knex("reviews").where({ review_id }).del();
}

// update review
function update(updatedReview) {
  // >> delete from reviews
  // >> where review_id = { updatedReview.review_id };

  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
}

// return updated review with critic details
function readReviewWithCritic(review_id) {
  // >> select *
  // >> from reviews as r
  // >> join critics as c
  // >> on r.critic_id = c.critic_id
  // >> where r.movie_id = { movie_id };

  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ "r.review_id": review_id })
    .first()
    .then(addCritic);

  // .then(addCritic) transform critc info to a critic object within review object
}

function readReviewsByMovie(movieId){
  /*
  >> SELECT *, with specifics
  >> FROM reviews AS r
  >> JOIN critics AS c
  >> ON r.critic_id = c.critic_id
  >> WHERE r.movie_id = movieId
  */
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*", "c.created_at as critic_created_at", "c.updated_at as critic_updated_at", "c.critic_id as critic_critic_id")
    .where({"r.movie_id": movieId})
    .then(reduceCritic);
    // >> Then reduces Critic to it's own category using reduce properties. 
}

module.exports = {
  read,
  delete: destroy,
  update,
  readReviewWithCritic,
  readReviewsByMovie,
};
