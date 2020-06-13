import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux'
import { withFirebase } from '../Firebase';

import { withAuthorization, withEmailVerification } from '../Session';

class GameRoom extends Component {
//   constructor(props) {
//     super(props);
//   }

  render() {
    return <div className="GameRoom">Yo bitcch this is hte game room</div>;
  }
}

const condition = (authUser) => !!authUser;
//checks that authUser is not null

const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
  });

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase,
  connect(mapStateToProps)
)(GameRoom);
