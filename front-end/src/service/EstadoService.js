import axios from 'axios'

export class EstadoService {

    // baseURL = "http://localhost:8080/api"; 
    baseURL = process.env.REACT_APP_URL_API; 
    
 
    listarTodos() {
        console.log(this.baseURL);
        
        return axios.get(this.baseURL + '/estado');            
    }
}