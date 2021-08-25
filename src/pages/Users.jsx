import { NavLink, Route } from 'react-router-dom';
import { activeStyle } from '../App';
import User, { userDB } from '../components/User';

export default function Users() {
  return (
    <div>
      <ul>
        {userDB.map((user) => (
          <li key={user.id}>
            <NavLink activeStyle={activeStyle} to={`/users/${user.username}`}>
              Go to {user.username}'s profile
            </NavLink>
          </li>
        ))}
      </ul>
      <Route
        path="/users"
        exact
        render={() => <p>유저 링크를 선택해 주세요.</p>}
      />
      <Route path="/users/:username" component={User} />
    </div>
  );
}
