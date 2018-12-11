import runner from "./runner";
import nation from "./nation";
import team from "./team";
import playerEvent from "./playerEvent";
import player from "./player";
import event from "./event";
import process from "./process";

export default router => {
  runner(router);
  nation(router);
  team(router);
  playerEvent(router);
  player(router);
  event(router);
  process(router);
};
