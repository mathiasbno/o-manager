import processController from "../controllers/process.ctrl.mjs";

export default router => {
  /* GET */
  router.route("/process/preview/:eventor/:eventId").get(processController.previewEvent);

  router.route("/process/:eventor/:eventId").get(processController.processEvent);
};
