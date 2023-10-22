/*
 * Copyright (c) 2018-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Header } from 'semantic-ui-react';
import logo from './logo.svg';

const Home = () => {
  const history = useHistory();
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const login = async () => {
    history.push('/login');
  };

  const resourceServerExamples = [
    {
      label: 'Node/Express Resource Server Example',
      url: 'https://github.com/okta/samples-nodejs-express-4/tree/master/resource-server',
    },
    {
      label: 'Java/Spring MVC Resource Server Example',
      url: 'https://github.com/okta/samples-java-spring/tree/master/resource-server',
    },
    {
      label: 'ASP.NET Core Resource Server Example',
      url: 'https://github.com/okta/samples-aspnetcore/tree/master/samples-aspnetcore-3x/resource-server',
    },
  ];

  if (!authState) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div id="home">
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="120" height="60"><path d="M153.7 54.5c-17.3 0-31.4 14-31.4 31.4a31.33 31.33 0 1 0 62.8 0c0-17.4-14.1-31.4-31.4-31.4zm0 47.1c-8.7 0-15.7-7-15.7-15.7s7-15.7 15.7-15.7 15.7 7 15.7 15.7-7 15.7-15.7 15.7zm55.1-5.2c0-2.5 3-3.7 4.7-1.9l20.9 21.8c.2.2.4.5 1.1.7.3.1.8.1 1.3.1H251c2.5 0 3.3-2.9 2.1-4.4l-23.5-24-1.2-1.3c-2.7-3.2-2.4-4.4.7-7.7L247.8 59c1.2-1.5.4-4.4-2.2-4.4h-12.8c-.5 0-.9 0-1.2.1-.8.2-1 .5-1.2.7-.1.1-10.4 11.2-16.7 18-1.7 1.9-4.8.6-4.8-1.9V35.9c0-1.8-1.5-2.5-2.7-2.5h-10.5c-1.8 0-2.7 1.2-2.7 2.3v79c0 1.8 1.5 2.3 2.7 2.3h10.5c1.6 0 2.7-1.2 2.7-2.4v-.8zm85.6 17.9l-1.1-10.5c-.2-1.4-1.5-2.4-2.9-2.2l-2.4.2c-8.4 0-15.2-6.6-15.6-14.8V73.3c0-1.7 1.2-3 2.9-3h14c1 0 2.5-.8 2.5-2.7v-9.9c0-1.9-1.2-3-2.3-3h-14.1c-1.6 0-3-1.2-3-2.8V36c0-1-.7-2.5-2.7-2.5h-10.4c-1.3 0-2.6.8-2.6 2.4V87c.4 16.9 14.3 30.5 31.4 30.5 1.4 0 2.8-.1 4.2-.3 1.2-.2 2.3-1.5 2.1-2.9zm75.6-13.2c-8.9 0-10.2-3.2-10.2-15.1V57.3c0-1-.7-2.7-2.7-2.7h-10.5c-1.3 0-2.7 1-2.7 2.7v1.3c-4.6-2.6-9.8-4.1-15.5-4.1-17.3 0-31.4 14-31.4 31.4a31.33 31.33 0 0 0 31.4 31.4c7.8 0 14.9-2.8 20.4-7.5 3 4.5 7.7 7.5 15.1 7.5 1.3 0 8 .2 8-2.9v-11.2c-.1-1-.9-2.1-1.9-2.1zm-41.6.5c-8.7 0-15.7-7-15.7-15.7s7-15.7 15.7-15.7 15.7 7 15.7 15.7c-.1 8.7-7.1 15.7-15.7 15.7z" transform="matrix(.400641 0 0 .400641 -38.998399 -.228366)" fill="#007dc1"/></svg>
        <Header as="h1">Okta To Do Sample App</Header>

        { authState.isAuthenticated && !userInfo
        && <div>
          <h1>Loading your to do tasks! This shouldn't take too long.</h1>
          <svg height="80" width="80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" data-testid="vortex-svg" aria-label="vortex-loading" class="vortex-wrapper" aria-busy="true" role="status"><g transform="translate(50,50)"><g transform="scale(0.7)"><g transform="translate(-50,-50)"><g transform="rotate(137.831 50 50)"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" values="360 50 50;0 50 50" keyTimes="0;1" dur="1" keySplines="0.5 0.5 0.5 0.5" calcMode="spline"></animateTransform><path fill="red" d="M30.4,9.7c-7.4,10.9-11.8,23.8-12.3,37.9c0.2,1,0.5,1.9,0.7,2.8c1.4-5.2,3.4-10.3,6.2-15.1 c2.6-4.4,5.6-8.4,9-12c0.7-0.7,1.4-1.4,2.1-2.1c7.4-7,16.4-12,26-14.6C51.5,3.6,40.2,4.9,30.4,9.7z"></path><path fill="green" d="M24.8,64.2c-2.6-4.4-4.5-9.1-5.9-13.8c-0.3-0.9-0.5-1.9-0.7-2.8c-2.4-9.9-2.2-20.2,0.4-29.8 C10.6,25.5,6,36,5.3,46.8C11,58.6,20,68.9,31.9,76.3c0.9,0.3,1.9,0.5,2.8,0.8C31,73.3,27.6,69,24.8,64.2z"></path><path fill="blue" d="M49.6,78.9c-5.1,0-10.1-0.6-14.9-1.8c-1-0.2-1.9-0.5-2.8-0.8c-9.8-2.9-18.5-8.2-25.6-15.2 c2.8,10.8,9.5,20,18.5,26c13.1,0.9,26.6-1.7,38.9-8.3c0.7-0.7,1.4-1.4,2.1-2.1C60.7,78.2,55.3,78.9,49.6,78.9z"></path><path fill="yellow" d="M81.1,49.6c-1.4,5.2-3.4,10.3-6.2,15.1c-2.6,4.4-5.6,8.4-9,12c-0.7,0.7-1.4,1.4-2.1,2.1 c-7.4,7-16.4,12-26,14.6c10.7,3,22.1,1.7,31.8-3.1c7.4-10.9,11.8-23.8,12.3-37.9C81.6,51.5,81.4,50.6,81.1,49.6z"></path><path fill="orange" d="M75.2,12.9c-13.1-0.9-26.6,1.7-38.9,8.3c-0.7,0.7-1.4,1.4-2.1,2.1c5.2-1.4,10.6-2.2,16.2-2.2 c5.1,0,10.1,0.6,14.9,1.8c1,0.2,1.9,0.5,2.8,0.8c9.8,2.9,18.5,8.2,25.6,15.2C90.9,28.1,84.2,18.9,75.2,12.9z"></path><path fill="purple" d="M94.7,53.2C89,41.4,80,31.1,68.1,23.7c-0.9-0.3-1.9-0.5-2.8-0.8c3.8,3.8,7.2,8.1,10,13 c2.6,4.4,4.5,9.1,5.9,13.8c0.3,0.9,0.5,1.9,0.7,2.8c2.4,9.9,2.2,20.2-0.4,29.8C89.4,74.5,94,64,94.7,53.2z"></path></g></g></g></g></svg>
          </div>}

        {authState.isAuthenticated && userInfo
        && (
        <div>
          <p id="welcome">
            Welcome, &nbsp;
            {userInfo.name}
            !
          </p>
          <p>
            You have successfully authenticated against your Okta org, and have been redirected back to this application.  You now have an ID token and access token in local storage.
            Visit the
            {' '}
            <a href="/profile">My Profile</a>
            {' '}
            page to take a look inside the ID You can access the sample to do app by visiting the
            {' '}
            <a href="/todoapp">To Do App</a>
            {' '}
            section.
          </p>
        </div>
        )}

        {!authState.isAuthenticated
        && (
        <div>
          <p>If you&lsquo;re viewing this page then you have successfully started this React application.</p>
          <p>
            <span>This example shows you how to use the </span>
            <a href="https://github.com/okta/okta-react/tree/master">Okta React Library</a>
            <span> to add the </span>
            <a href="https://developer.okta.com/docs/guides/implement-auth-code-pkce">PKCE Flow</a>
            <span> to your application.</span>
          </p>
          <p>
            When you click the login button below, you will be presented the login page on the Okta Sign-In Widget hosted within the application.
            After you authenticate, you will be logged in to this application with an ID token and access token. These tokens will be stored in local storage and can be retrieved at a later time.
          </p>
          <Button id="login-button" primary onClick={login}>Login</Button>
        </div>
        )}

      </div>
    </div>
  );
};
export default Home;
