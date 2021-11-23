import axios from 'axios';

var httpAgent = axios.create({
    baseURL: 'http://localhost:3031/'
});

export async function getMessages(userName, from) {
    const { data } = await httpAgent.get(`/messages?from=${from}&to=${userName}`)
    return data;
}