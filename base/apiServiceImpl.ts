import { ApiServiceInterface } from "../services/apiService";
import { TOKEN } from "../src/eviroment/Enviroment";

const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': TOKEN,
    'Accept': 'application/json',
});


export class ApiServiceImpl implements ApiServiceInterface {
    
    async apiGet(url: string) {
        return await fetch(url, {
            method: 'GET',
            headers: myHeaders
        })
        .then(response => {
            return response.json();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    async apiPost(url: string, data: any) {
        return await fetch(url, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
        }).then(response => {
            return response.json();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    async apiDelete(url: string, param: any) {
            return await fetch(url + param, {
            method: 'DELETE',
            headers: myHeaders
        })
        .then(response => {
            return response.json();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    async apiGetWithParam(url: string, param: any) {
        return await fetch(url + param, {
            method: 'GET',
            headers: myHeaders
        })
        .then(response => {
            return response.json();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}