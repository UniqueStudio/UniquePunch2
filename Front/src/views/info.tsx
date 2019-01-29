import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

export class Info extends React.Component {
  public render() {
    return (
      <div className='info'>
        <Switch>
          <Route path='/info/list' />
          <Route path='/info/detail/:id' />
        </Switch>
      </div>
    );
  }
}
