import { React, useState } from 'react';
import PropTypes from 'prop-types';
import InputField from './InputField';
import { Button } from './StyledComponents';

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
      <InputField
        label="title"
        type="text"
        value={title}
        name="title"
        onChange={setTitle}
      />
      <InputField
        label="author"
        type="text"
        value={author}
        name="author"
        onChange={setAuthor}
      />
      <InputField label="url" type="text" value={url} name="url" onChange={setUrl} />
      <Button type="submit" id="create-button">
        Create
      </Button>
    </form>
  );
};

export default NewBlogForm;

NewBlogForm.propTypes = {
  handleCreateNew: PropTypes.func.isRequired,
};
