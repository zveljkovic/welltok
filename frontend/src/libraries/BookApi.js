import * as axios from 'axios';

export class BookApi {
    constructor(token) {
        this.token = token;
        this.http = axios.create({
            baseURL: 'http://localhost:3030',
            timeout: 1000,
            headers: {'Authorization': `Bearer ${token}`}
        });
    }

    async fetchAllBooks(){
        try {
            const response = await this.http.get('/book');
            return {status: 'ok', data: response.data};
        } catch (e) {
            return {status: 'error', errorMessage: 'Failed getting list of books'};
        }
    }

    async getById(id){
        try {
            const response = await this.http.get(`/book/${id}`);
            return {status: 'ok', data: response.data};
        } catch (e) {
            return {status: 'error', errorMessage: 'Failed getting book by id'};
        }
    }

    async update(id, data){
        try {
            const response = await this.http.patch(`/book/${id}`, data);
            return {status: 'ok', data: response.data};
        } catch (e) {
            return {status: 'error', errorMessage: 'Failed updating book'};
        }
    }

    async create(data){
        try {
            const response = await this.http.post(`/book`, data);
            return {status: 'ok', data: response.data};
        } catch (e) {
            return {status: 'error', errorMessage: 'Failed updating book'};
        }
    }

    async delete(id){
        try {
            const response = await this.http.delete(`/book/${id}`);
            return {status: 'ok', data: response.data};
        } catch (e) {
            return {status: 'error', errorMessage: 'Failed deleting book'};
        }
    }
}
