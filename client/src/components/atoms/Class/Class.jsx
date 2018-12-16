import React from "react";

import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";
import RaceMetadata from "../RaceMetadata/RaceMetadata";
import TeamTable from "../../TeamTable/TeamTable";

class Card extends React.Component {
  getPlayerTeam(eventClass) {
    const {
      player,
      playerEvent,
      onOpenRunnerSelect,
      onRemoveRunnerFromTeam
    } = this.props;

    const team = player.playerEvents.map(_event => {
      return _event.teams.find(_team => {
        return (_team.playerEventClassId = eventClass._id);
      });
    })[0];

    return (
      <React.Fragment>
        <TextInput />
        <TeamTable
          onOpenRunnerSelect={onOpenRunnerSelect}
          onRemoveRunnerFromTeam={onRemoveRunnerFromTeam}
          playerEvent={playerEvent}
          eventClass={eventClass}
          team={team.runners}
        />
      </React.Fragment>
    );
  }

  render() {
    const { player, eventClass, playerEvent, onJoinPlayerEvent } = this.props;

    const event = player.playerEvents.find(_event => {
      return (_event.playerEventId = playerEvent._id);
    });

    return (
      <React.Fragment>
        <RaceMetadata
          name={eventClass.name}
          startData={eventClass.startData}
          runnersInTeam={eventClass.runnersInTeam}
          points={eventClass.budget}
          lockTime={new Date(eventClass.lockDate).toString()}
        />
        {typeof event !== "undefined" ? (
          this.getPlayerTeam(eventClass)
        ) : (
          <React.Fragment>
            <Button large center onClick={() => onJoinPlayerEvent(playerEvent)}>
              Join {playerEvent.name}
            </Button>
            <TeamTable
              colapsed
              playerEvent={playerEvent}
              eventClass={eventClass}
              team={[]}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Card;
