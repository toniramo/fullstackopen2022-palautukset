import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likeBlog, removeBlog } from '../reducers/blog';
import { useNavigate } from 'react-router-dom';
import { commentBlog } from '../reducers/blog';
import { Button } from '../components/StyledComponents';

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
    display: (blog && user) && blog.user.username === user.username ? '' : 'none',
  };

  const handleRemove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog));
      navigate('/');
    }
  };

  const handleComment= (event) => {
    event.preventDefault();
    dispatch(commentBlog(blog, event.target.comment.value));
    event.target.comment.value='';
  };

  if (!blog) return null;

  return (
    <>
      <h2>{`${blog.title} ${blog.author && `by ${blog.auhor}`}`}</h2>
      <div>{blog.info}</div>
      <div>{blog.likes} likes <Button onClick={handleLike}>Like</Button></div>
      <div>added by {blog.user.name}</div>
      <div style={{ marginTop:20 }}><Button style={removeButtonStyle} priority="secondary" onClick={handleRemove}>Remove</Button></div>
      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <input name="comment" onSubmit={() => this.value=''}/> <Button type="submit" priority="secondary">Add comment</Button>
      </form>
      <ul>
        {blog.comments.map(comment => {
          return (
            <li key={`${comment}_${Math.random()}` /*use random in case there are identical comments*/}>
              {comment}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default BlogView;