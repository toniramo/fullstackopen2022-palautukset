import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const User = () => {
  const id = useParams().id;

  const user  = useSelector(state => {
    return state.users.find(user => user.id === id);
  });

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map(blog => {
          return (
            <li key={blog.id}>
              {blog.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default User;