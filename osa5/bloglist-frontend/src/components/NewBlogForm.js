import { React, useState } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

const NewBlogForm = ({ handleCreateNew }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    handleCreateNew({ title, author, url });
  };

  return (
    <form
      onSubmit={(event) => {
        addBlog(event);
        setTitle('');
        setAuthor('');
        setUrl('');
      }}
    >
      <Input
        label="title"
        type="text"
        value={title}
        name="title"
        onChange={setTitle}
      />
      <Input
        label="author"
        type="text"
        value={author}
        name="author"
        onChange={setAuthor}
      />
      <Input
        label="url"
        type="text"
        value={url}
        name="url"
        onChange={setUrl} />
      <button
        type="submit"
        id="create-button"
      >
        Create
      </button>
    </form>
  );
};

export default NewBlogForm;

NewBlogForm.propTypes = {
  handleCreateNew: PropTypes.func.isRequired,
};
