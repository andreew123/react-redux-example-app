import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Containers
import HomeContainer from './containers/HomeContainer';
import CalendarContainer from './containers/CalendarContainer';
import FinanceContainer from './containers/FinanceContainer';
import BillingContainer from './containers/BillingContainer';
import SettingsContainer from './containers/SettingsContainer';
import ProfileContainer from './containers/ProfileContainer';

// Pages
export default (
  <Router history={browserHistory}>
        <Route path="/">
            <IndexRoute component={HomeContainer} />
        </Route>
        <Route path="calendar">
            <IndexRoute component={CalendarContainer} />
        </Route>
        <Route path="finance">
            <IndexRoute component={FinanceContainer} />
        </Route>
        <Route path="billing">
            <IndexRoute component={BillingContainer} />
        </Route>
        <Route path="settings">
            <IndexRoute component={SettingsContainer} />
        </Route>
        <Route path="profile">
            <IndexRoute component={ProfileContainer} />
        </Route>
  </Router>
);
