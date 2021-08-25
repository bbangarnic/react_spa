import { Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';

export const userDB = [
  { id: 1, username: 'john', desc: 'frontend developer' },
  { id: 2, username: 'sam', desc: 'backend developer' },
];

export default function Profile({ match }) {
  const { username } = match.params;
  const profile = userDB.find((user) => user.username === username);
  if (!profile) return <Route component={NotFound} />;
  return (
    <div>
      <h3>
        {profile.username} - {profile.desc}
      </h3>
    </div>
  );
}
