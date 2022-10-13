import { React, useState } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

function NewBlogForm({ handleCreateNew }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  return (
    <form
      onSubmit={(event) => {
        handleCreateNew(event, title, author, url);
        setTitle('');
        setAuthor('');
        setUrl('');
      }}
    >
      <Input label="title" type="text" value={title} onChange={setTitle} />
      <Input label="author" type="text" value={author} onChange={setAuthor} />
      <Input label="url" type="text" value={url} onChange={setUrl} />
      <button type="submit">Create</button>
    </form>
  );
}

export default NewBlogForm;

NewBlogForm.propTypes = {
  handleCreateNew: PropTypes.func.isRequired,
};
