import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getConfig = () => {
  return {
    headers: {
      Authorization: token
    },
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (blog) => {
  const response = await axios.post(baseUrl, blog, getConfig());
  return response.data;
};

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, getConfig());
  return response.data;
};

const remove = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, getConfig());
  return response.data;
};

const blogService = {
  setToken,
  getAll,
  createNew,
  update,
  remove,
};

export default blogService;
