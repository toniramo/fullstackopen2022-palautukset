import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';

const NavigationMenu = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const padding = {
    padding: 5,
  };

  const menuStyle = {
    backgroundColor: 'lightgrey',
    padding: 5,
  };

  return (
    <div style={menuStyle}>
      <Link style={padding} to="/">Blogs</Link>
      <Link style={padding} to="/users">Users</Link>
      {user &&
      <>
        <span style={padding}>
          {user.name} logged in.
        </span>
        <button type="button" onClick={handleLogout}>
        Logout
        </button>
      </>
      }
    </div>
  );
};

export default NavigationMenu;