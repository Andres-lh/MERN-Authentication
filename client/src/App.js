import {  BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './components/Auth';
import PrivateRoute from './components/Routing/PrivateRoute';
import PrivateScreen from './components/PrivateScreen';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
        <Router>
          <div className="App">
            <Switch>
              <PrivateRoute exact path ="/" component={PrivateScreen}/>
              <Route exact path="/login" component={Auth} />
              <Route exact path="/forgotPassword" component={ForgotPassword} />
              <Route exact path="/users/resetpassword/:resetToken" component={ResetPassword} />
            </Switch>
          </div>
        </Router>
  );
}

export default App;
