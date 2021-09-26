import React from 'react';
import { Route, Switch } from 'react-router';
import DetailPage from './pages/DetailPage';
import LandingPage from './pages/LandingPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <>
        <Switch>
          <Route path="/" component={LandingPage} exact/>
          <Route path="/detail" component={DetailPage} />
        </Switch>
      </>
    );
  }
}

export default App;