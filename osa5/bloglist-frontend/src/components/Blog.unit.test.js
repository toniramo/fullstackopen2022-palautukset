import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

// Props for Blog: blog, handleLike, user, handleRemoveBlog

const testUser = {
  username: 'testuser',
  name: 'Test käyttäjä',
};

const testBlog = {
  title: 'Testiblogi',
  author: 'Testi Kirjoittaja',
  url: 'testi.blogi.foo',
  likes: 0,
  user: testUser,
};

describe('<Blog />', () => {
  test('renders title and author only by default', async () => {
    render(<Blog blog={testBlog} user={testUser} />);

    const header = screen.getByTestId('blog-header-only');
    expect(header.innerHTML).toContain(`<b>${testBlog.title}</b> by ${testBlog.author}`);

    expect(screen.queryByText(testBlog.url)).toBeNull();
    expect(screen.queryByText(`likes: ${testBlog.likes}`)).toBeNull();
    expect(screen.queryByText(testBlog.user.name)).toBeNull();

  });
});