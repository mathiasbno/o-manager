import React from "react";
import { connect } from "redux-zero/react";

import actions from "../store/actions/index";

import NoEvents from "../components/atoms/NoEvents/NoEvents";
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
      onRemoveRunnerFromTeam
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
            onRemoveRunnerFromTeam={onRemoveRunnerFromTeam}
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
        {playerEvents.length ? playerEvents.map((playerEvent, i) => (
          <Card key={`${i}-playerEvent`}>
            <Title title={'hello'} />
            {this.getPlayerEventClasses(playerEvent)}
          </Card>
        )) : <NoEvents />}
      </PageWrapper>
    );
  }
}

const mapToProps = ({
  team,
  playerEvents,
  getPlayerEvents,
  onJoinPlayerEvent,
  onOpenRunnerSelect,
  onRemoveRunnerFromTeam
}) => ({
  team,
  playerEvents,
  getPlayerEvents,
  onJoinPlayerEvent,
  onOpenRunnerSelect,
  onRemoveRunnerFromTeam
});

export default connect(
  mapToProps,
  actions
)(Event);
