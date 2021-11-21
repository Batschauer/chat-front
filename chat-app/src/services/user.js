import axios from 'axios';

var httpAgent = axios.create({
    baseURL: 'http://localhost:3031/'
});

export async function getUsers(userName) {
    const { data } = await httpAgent.get(`/users?userName=${userName}`)
    return data;
}