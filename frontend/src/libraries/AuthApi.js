import * as axios from 'axios';

export class AuthApi {
    static async login(username, password){
        try {
            const response = await axios.post('http://localhost:3030/auth/login', {username, password});
            return response.data;
        } catch (e) {
            return {status: 'error', errorMessage: 'Error with connection to auth endpoint'};
        }
    }
}
