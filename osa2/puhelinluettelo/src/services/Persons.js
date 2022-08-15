import axios from 'axios'

const baseUrl = 'http://localhost:3001';

const getAll = () => {
    return axios.get(`${baseUrl}/persons`);
};

const add = (person) => {
    return axios.post(`${baseUrl}/persons`, person);
}

const del = (id) => {
    return axios.delete(`${baseUrl}/persons/${id}`);
}

const update = (person) => {
    return axios.put(`${baseUrl}/persons/${person.id}`, person);
}

const personsService = { getAll, add, del, update }

export default personsService;