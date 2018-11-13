import runnerController from "../controllers/runner.ctrl.mjs";

export default router => {
  /* DELETE */
  router.route("/runners/delete").get(runnerController.deleteRunners);

  /* GET */
  router.route("/runners").get(runnerController.getAll);
  router.route("/runners/event/:id").get(runnerController.getAllByEvent);
  router
    .route("/runners/price/:id")
    .get(runnerController.getAllByPriceForEvent);
  router.route("/runner/:id").get(runnerController.getRunner);

  /* POST */
  router.route("/runner").post(runnerController.saveRunner);
};
