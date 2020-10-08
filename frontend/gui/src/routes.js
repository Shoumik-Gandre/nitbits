import React from 'react';
import { Route } from 'react-router-dom';
import Hoc from './hoc/hoc';
import Login from './containers/Login';
import Register from './containers/Register';
import HomePageLayout from './containers/Home';

const BaseRouter = () => (
    <Hoc>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/" component={HomePageLayout} />
    </Hoc>
)

export default BaseRouter;