import axios from 'axios';

var httpAgent = axios.create({
    baseURL: 'http://localhost:3031/',
});

export async function getMessages(userName, from) {
    const data = [{
            id: 1,
            destination: 'from_daniel_to_batschauer',
            data: 'eaw mano',
        },
        {
            id: 2,
            destination: 'from_daniel_to_batschauer',
            data: 'eaw mano',
        },
        {
            id: 3,
            destination: 'from_daniel_to_batschauer',
            data: 'eaw mano',
        },
        {
            id: 4,
            destination: 'from_daniel_to_batschauer',
            data: 'eaw mano',
        },
        {
            id: 5,
            destination: 'from_daniel_to_batschauer',
            data: 'eaw mano',
        },
        {
            id: 6,
            destination: 'from_batschauer_to_daniel',
            data: 'tudo certo',
        },
    ];
    /*await httpAgent.get(
           `/messages?from=${from}&to=${userName}`
       );*/

    return data;
}

export async function sendMessage(from, to, data) {
    await httpAgent.post(
        `/messages/send?from=${from}&to=${to}`, {
            message: data,
        }, { headers: { 'Access-Control-Allow-Origin': '' } }
    );
}