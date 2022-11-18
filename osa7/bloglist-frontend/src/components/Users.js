import { useSelector } from 'react-redux';
import { StyledLink } from './StyledComponents';

const Users = () => {

  const users = useSelector(state => state.users);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td><StyledLink style={{ fontWeight: 'normal' }} to={`/users/${user.id}`}>{user.name}</StyledLink></td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br/>
    </div>
  );
};

export default Users;