const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// verify review id from params exists
async function reviewExists(req, res, nxt) {
  const foundReview = await service.read(req.params.reviewId);

  if (foundReview) {
    res.locals.review = foundReview;
    return nxt();
  }

  nxt({
    status: 404,
    message: "Review cannot be found.",
  });
}

async function list(req, res, next){
  const {id} = req.params;
   const data = await service.readReviewsByMovie(id)
   res.json({data:data})
}

// delete review
async function destroy(req, res) {
  await service.delete(res.locals.review.review_id);

  res.sendStatus(204);
}

// update a review
async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };

  await service.update(updatedReview);

  const data = await service.readReviewWithCritic(res.locals.review.review_id);
  
  res.json({ data });
}

module.exports = {
  list,
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};
