import axios from 'axios';

var httpAgent = axios.create({
    baseURL: 'http://localhost:3031/'
});

export async function getMessages({ userName, from}: any) {
    return await httpAgent.get(`/messages?userName=${userName}&from=${from}`);
}
