import playerEventController from "../controllers/playerEvent.ctrl.mjs";

export default router => {
  router.route("/playerEvents/delete").get(playerEventController.deletePlayerEvents);

  /* GET */
  router.route("/playerEvents").get(playerEventController.getAll);

  router.route("/playerEvent/:id").get(playerEventController.getPlayerEvent);

  /* POST */
  router.route("/playerEvent").post(playerEventController.savePlayerEvent);
};
