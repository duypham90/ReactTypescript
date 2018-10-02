import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserList from './components/user/UserList';

export const Routes = () => (
    <Router>
        <Switch>
            <Route path='/' component={UserList} />
            <Route path='/Category' component={UserList} />
            <Route path='/Product' component={UserList} />
        </Switch>
    </Router>
);
