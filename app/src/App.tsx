import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navigaion from './Navigation'
import Home from './Home'
import Tasks from './Tasks'
import Users from './Users'


function App()
{
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">MY APP</h3>
        <Navigaion />

        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/tasks' component={Tasks} />
          <Route path='/users' component={Users} />

        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
