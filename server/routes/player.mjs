import playerController from "../controllers/player.ctrl.mjs";

export default router => {
  router.route("/players/delete").get(playerController.deletePlayers);

  /* GET */
  router.route("/players").get(playerController.getAll);

  router.route("/player/:id").get(playerController.getPlayer);

  /* POST */
  router.route("/player").post(playerController.savePlayer);

  /* PATCH */
  router.route("/player/joinEvent").patch(playerController.joinPlayerEvent);

  router.route("/player/team/addRunner").patch(playerController.addRunnerToTeam);
};
