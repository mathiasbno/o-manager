import nationController from "../controllers/nation.ctrl.mjs";

export default router => {
  router.route("/nations/delete").get(nationController.deleteNation);

  /* GET */
  router.route("/nations").get(nationController.getAll);

  router.route("/nation/:id").get(nationController.getNation);

  /* POST */
  router.route("/nation").post(nationController.saveNation);
};
