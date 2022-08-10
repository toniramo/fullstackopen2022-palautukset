import axios from 'axios'

const baseUrl = 'http://localhost:3001';

const getAll = () => {
    return axios.get(`${baseUrl}/persons`)
};

const add = (person) => {
    return axios.post(`${baseUrl}/persons`, person);
}

const personsService = { getAll, add }

export default personsService;