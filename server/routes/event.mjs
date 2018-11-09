import eventController from "../controllers/event.ctrl.mjs";

export default router => {
  router.route("/events/delete").get(eventController.deleteEvents);

  /* GET */
  router.route("/events").get(eventController.getAll);

  router.route("/event/:id").get(eventController.getEvent);

  /* POST */
  router.route("/event").post(eventController.saveEvent);
};
