import React, { Component } from 'react'
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';
import * as SOCIAL_AUTH_ERRORS from '../../../constants/socialAuthErrors';

import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

class SignInFacebookBase extends Component {
    constructor(props) {
      super(props);
   
      this.state = { error: null };
    }
   
    onSubmit = event => {
      this.props.firebase
        .handleSignInWithFacebook()
        .then(socialAuthUser => {
          // Create a user in your Firebase Realtime Database too
          return this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.additionalUserInfo.profile.name,
            email: socialAuthUser.additionalUserInfo.profile.email,
            roles: {},
          });
      })
        .then(socialAuthUser => {
          this.setState({ error: null });
          this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
          if (error.code === SOCIAL_AUTH_ERRORS.ERROR_CODE_ACCOUNT_EXISTS) {
            error.message = SOCIAL_AUTH_ERRORS.ERROR_MSG_ACCOUNT_EXISTS;
          }
          this.setState({ error });
        });
   
      event.preventDefault();
    };
   
    render() {
      const { error } = this.state;
   
      return (
        <form onSubmit={this.onSubmit}>
          <button type="submit">Sign In with Facebook</button>
   
          {error && <p>{error.message}</p>}
        </form>
      );
    }
  }

  const SignInFacebook = compose(
    withRouter,
    withFirebase
  )(SignInFacebookBase)
   
  export default SignInFacebook