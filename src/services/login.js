import axios from 'axios';
var httpAgent = axios.create({
    baseURL: 'http://localhost:3031/'
});

export async function singup({ userName, password }) {
    const _key = await httpAgent.get(`/singup?userName=${userName}&password=${password}`);

    localStorage.setItem(`${userName}_info`, { key: _key });
}

export async function singin({ username }) {
    try {
        await httpAgent.get(`/signin?userName=${username}`);
    } catch (error) {
        console.log('[Error] - signin: ', error)
        return false;
    }

    return true;
}