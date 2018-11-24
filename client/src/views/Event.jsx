import React from "react";
import { connect } from "redux-zero/react";

import Card from "../components/atoms/Card/Card";
import PageWrapper from "../components/atoms/PageWrapper/PageWrapper";
import Title from "../components/atoms/Title/Title";
import Button from "../components/atoms/Button/Button";
import RaceMetadata from "../components/atoms/RaceMetadata/RaceMetadata";
import TeamTable from "../components/TeamTable/TeamTable";

class Event extends React.Component {
  render() {
    const { team } = this.props;

    return (
      <PageWrapper>
        <Card>
          <Title title="Tiomila i Östra Göinge" />
          <RaceMetadata
            name="Tiomila"
            startData="29th of May"
            runnersInTeam="10"
            points="35000"
            lockTime={new Date().toString()}
          />
          <Button large center>
            Join Tiomila
          </Button>
          <TeamTable team={team} colapsed={true} />
        </Card>
      </PageWrapper>
    );
  }
}

const mapToProps = ({ team }) => ({
  team
});

export default connect(mapToProps)(Event);
