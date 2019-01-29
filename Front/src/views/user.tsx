import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

export class User extends React.Component {
  public render() {
    return (
      <div className='user'>
        <Switch>
          <Route path='/user/login/pwd' />
          <Route path='/user/login/wx' />
        </Switch>
      </div>
    );
  }
}
