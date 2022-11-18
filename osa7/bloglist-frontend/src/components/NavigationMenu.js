import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { Menu, Button, StyledLink } from './StyledComponents';

const NavigationMenu = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const padding = {
    padding: 5,
  };

  return (
    <Menu>
      <StyledLink colortheme='light' to="/">Blogs</StyledLink>
      <StyledLink colortheme='light' to="/users">Users</StyledLink>
      {user &&
      <>
        <span style={padding}>
          {user.name} logged in.
        </span>
        <Button type="button" priority="secondary" onClick={handleLogout}>
        Logout
        </Button>
      </>
      }
    </Menu>
  );
};

export default NavigationMenu;