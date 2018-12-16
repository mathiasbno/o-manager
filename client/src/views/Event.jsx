import React from "react";
import { connect } from "redux-zero/react";

import actions from "../store/actions/index";

import Card from "../components/atoms/Card/Card";
import PageWrapper from "../components/atoms/PageWrapper/PageWrapper";
import Title from "../components/atoms/Title/Title";
import Class from "../components/atoms/Class/Class";

class Event extends React.Component {
  componentDidMount() {
    const { playerEvents, getPlayerEvents } = this.props;

    if (!playerEvents.length) getPlayerEvents();
  }

  getPlayerEventClasses(playerEvent) {
    const {
      player,
      onJoinPlayerEvent,
      onOpenRunnerSelect,
      onCloseRunnerSelect
    } = this.props;

    return (
      <React.Fragment>
        {playerEvent.eventClasses.map((eventClass, i) => (
          <Class
            eventClass={eventClass}
            playerEvent={playerEvent}
            player={player}
            onJoinPlayerEvent={onJoinPlayerEvent}
            onOpenRunnerSelect={onOpenRunnerSelect}
            onCloseRunnerSelect={onCloseRunnerSelect}
            key={i}
          />
        ))}
      </React.Fragment>
    );
  }

  render() {
    const { playerEvents } = this.props;

    return (
      <PageWrapper>
        {playerEvents.map((playerEvent, i) => (
          <Card key={`${i}-playerEvent`}>
            <Title title={playerEvent.event.name} />
            {this.getPlayerEventClasses(playerEvent)}
          </Card>
        ))}
      </PageWrapper>
    );
  }
}

const mapToProps = ({
  team,
  playerEvents,
  getPlayerEvents,
  onJoinPlayerEvent,
  onOpenRunnerSelect
}) => ({
  team,
  playerEvents,
  getPlayerEvents,
  onJoinPlayerEvent,
  onOpenRunnerSelect
});

export default connect(
  mapToProps,
  actions
)(Event);
