import axios from 'axios';
var httpAgent = axios.create({
    baseURL: 'http://localhost:3031/'
});

export async function singup({ userName, password }) {
    const _key = await httpAgent.get(`/singup?userName=${userName}&password=${password}`);
    console.log('Retorno WS: ', _key);

    localStorage.setItem(`${userName}_info`, { key: _key });
}