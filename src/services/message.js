import axios from 'axios';

var httpAgent = axios.create({
    baseURL: 'http://localhost:3031/',
});

export async function getMessages(userName, from) {
    const { data } = await httpAgent.get(`/messages?from=${from}&to=${userName}`);
    return data;
}

export async function sendMessage(from, to, message) {
    const { data } = await httpAgent.post(
        `/messages/send?from=${from}&to=${to}`, {
            message,
        }
    );

    return data;
}