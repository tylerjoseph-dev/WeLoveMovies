const router = require("express").Router({mergeParams: true});
const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route('/').get(controller.list).all(methodNotAllowed);
router.route('/:id').get(controller.read).all(methodNotAllowed);
router.use('/:id/theaters',controller.movieExists, theatersRouter);
router.use('/:id/reviews', controller.movieExists, reviewsRouter);
module.exports = router;