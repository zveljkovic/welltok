import * as axios from 'axios';

export class BookApi {
    static async fetchAllBooks(){
        try {
            const response = await axios.get('http://localhost:3030/book');
            return {status: 'ok', data: response.data};
        } catch (e) {
            return {status: 'error', errorMessage: 'Failed getting list of books'};
        }
    }

    static async getById(id){
        try {
            const response = await axios.get(`http://localhost:3030/book/${id}`);
            return {status: 'ok', data: response.data};
        } catch (e) {
            return {status: 'error', errorMessage: 'Failed getting book by id'};
        }
    }

    static async update(id, data){
        try {
            const response = await axios.patch(`http://localhost:3030/book/${id}`, data);
            return {status: 'ok', data: response.data};
        } catch (e) {
            return {status: 'error', errorMessage: 'Failed updating book'};
        }
    }

    static async create(data){
        try {
            const response = await axios.post(`http://localhost:3030/book`, data);
            return {status: 'ok', data: response.data};
        } catch (e) {
            return {status: 'error', errorMessage: 'Failed updating book'};
        }
    }

    static async delete(id){
        try {
            const response = await axios.delete(`http://localhost:3030/book/${id}`);
            return {status: 'ok', data: response.data};
        } catch (e) {
            return {status: 'error', errorMessage: 'Failed deleting book'};
        }
    }
}
