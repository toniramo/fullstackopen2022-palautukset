import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likeBlog, removeBlog } from '../reducers/blog';
import { useNavigate } from 'react-router-dom';

const BlogView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = useParams().id;
  const blog = useSelector(state => {
    return state.blogs.find(blog => blog.id === String(id));
  });
  const user = useSelector(state => state.user);

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const removeButtonStyle = {
    background: 'salmon',
    border: 'solid',
    borderWidth: 0.1,
    bottomMargin: 20,
    topMargin: 20,
    display: (blog && user) && blog.user.username === user.username ? '' : 'none',
  };

  const handleRemove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog));
      navigate('/');
    }
  };

  if (!blog) return null;

  return (
    <>
      <h2>{`${blog.title} ${blog.author && `by ${blog.auhor}`}`}</h2>
      <div>{blog.info}</div>
      <div>{blog.likes} likes <button onClick={handleLike}>Like</button></div>
      <div>added by {blog.user.name}</div>
      <div style={{ marginTop:20 }}><button style={removeButtonStyle} onClick={handleRemove}>Remove</button></div>
    </>

  );
};

export default BlogView;