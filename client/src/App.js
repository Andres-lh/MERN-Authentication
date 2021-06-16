import {  BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './components/Auth';
import PrivateRoute from './components/PrivateRoute';
import PrivateScreen from './components/PrivateScreen';

function App() {
  return (
        <Router>
          <div className="App">
            <Switch>
              <PrivateRoute exact path ="/" component={PrivateScreen}/>
              <Route exact path="/login" component={Auth} />
            </Switch>
          </div>
        </Router>
  );
}

export default App;
