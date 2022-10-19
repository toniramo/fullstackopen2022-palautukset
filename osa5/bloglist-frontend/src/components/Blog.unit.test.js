import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

let container;
let user;

const testUser = {
  username: 'testuser',
  name: 'Test käyttäjä',
};

// Props for Blog: blog, handleLike, user, handleRemoveBlog
const testBlog = {
  title: 'Testiblogi',
  author: 'Testi Kirjoittaja',
  url: 'testi.blogi.foo',
  likes: 23,
  user: testUser,
};

const likeMock = jest.fn();

beforeEach(() => {
  container = render(<Blog blog={testBlog} user={testUser} handleLike={likeMock}/>);
  user = userEvent.setup();
});

describe('<Blog />', () => {
  test('renders title and author only by default', () => {
    const header = screen.getByTestId('blog-header-only');

    expect(header.innerHTML).toContain(`<b>${testBlog.title}</b> by ${testBlog.author}`);

    expect(screen.queryByText(testBlog.url)).toBeNull();
    expect(screen.queryByText(`likes: ${testBlog.likes}`)).toBeNull();
    expect(screen.queryByText(testBlog.user.name)).toBeNull();

  });

  test('renders all info when view button is clicked', async () => {
    const button = screen.getByText('View');
    await user.click(button);

    const info = container.getByTestId('blog-all-info').innerHTML;

    expect(info).toContain(`<b>${testBlog.title}</b> by ${testBlog.author}`);
    expect(info).toContain(testBlog.url);
    expect(info).toContain(`likes: ${testBlog.likes}`);
    expect(info).toContain(testBlog.user.name);
  });

  test('calls handleLike twice if two likes are made', async () => {
    const view = screen.getByText('View');
    await user.click(view);

    expect(likeMock.mock.calls).toHaveLength(0);

    const like = screen.getByText('Like');

    await user.click(like);
    expect(likeMock.mock.calls).toHaveLength(1);

    await user.click(like);
    expect(likeMock.mock.calls).toHaveLength(2);
  });
});