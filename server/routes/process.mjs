import processController from "../controllers/process.ctrl.mjs";

export default router => {
  /* GET */
  router.route("/process/relay").get(processController.processRelayEvent);
};
