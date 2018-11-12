import processController from "../controllers/process.ctrl.mjs";

export default router => {
  /* GET */
  router.route("/process").get(processController.processEvent);
};
