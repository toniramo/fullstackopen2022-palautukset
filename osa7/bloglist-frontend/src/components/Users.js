import { useSelector } from 'react-redux';

const Users = () => {

  const users = useSelector(state => state.users);

  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map(user => {
          return (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Users;