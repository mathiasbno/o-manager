import runner from "./runner";
import nation from "./nation";
import team from "./team";
import event from "./event";

export default router => {
  runner(router);
  nation(router);
  team(router);
  event(router);
};
