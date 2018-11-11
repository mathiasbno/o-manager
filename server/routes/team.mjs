import teamController from "../controllers/team.ctrl.mjs";

export default router => {
  router.route("/teams/delete").get(teamController.deleteTeams);

  /* GET */
  router.route("/teams").get(teamController.getAll);

  router.route("/team/:id").get(teamController.getTeam);

  /* POST */
  router.route("/team").post(teamController.saveTeam);
};
