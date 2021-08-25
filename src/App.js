import { NavLink, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Users from './pages/Users';
import NotFound from './pages/NotFound';
import History from './components/History';

export const activeStyle = {
  background: 'tomato',
  color: 'white',
};

function App() {
  return (
    <div>
      <header>
        <History />
        <ul>
          <li>
            <NavLink activeStyle={activeStyle} exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={activeStyle} to="/search">
              Search
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={activeStyle} to="/users">
              Users
            </NavLink>
          </li>
        </ul>
      </header>
      <hr />
      <Switch>
        <Route path="/users" component={Users} />
        <Route path="/search" component={Search} />
        <Route path="/" exact component={Home} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
