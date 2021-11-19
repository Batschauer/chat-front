import axios from 'axios';
httpAgent = axios.create({
    baseURL: 'http://localhost:3031/'
});

export async function singup({ userName, password }) {
    const _key = await httpAgent.post('/signup/', { userName, password });

    localStorage.setItem(`${userName}_info`, { key: _key });
}