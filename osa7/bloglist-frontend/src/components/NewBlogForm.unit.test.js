import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewBlogForm from './NewBlogForm';

let user;
const createNewMock = jest.fn();

const newBlog = {
  title: 'Testi',
  author: 'Tero Taavetti',
  url: 'new.blog.foo',
};

beforeEach(() => {
  render(<NewBlogForm handleCreateNew={createNewMock} />);
  user = userEvent.setup();
});

describe('<NewBlogForm />', () => {
  test('calls handleCreateNew with correct info when Create is clicked', async () => {
    const title = screen.getByLabelText('title:');
    const author = screen.getByLabelText('author:');
    const url = screen.getByLabelText('url:');

    await user.type(title, newBlog.title);
    await user.type(author, newBlog.author);
    await user.type(url, newBlog.url);

    const create = screen.getByText('Create');
    await user.click(create);

    expect(createNewMock.mock.calls[0][0]).toEqual(newBlog);
  });
});
