import axios from 'axios'

export class EstadoService {

    // baseURL = "http://localhost:8080/api"; 
    baseURL = process.env.REACT_APP_URL_API; 
    
 
    listarTodos() {
        return axios.get(this.baseURL + '/estado');            
    }

    alterar(objeto) {
        return axios.put(this.baseURL + '/estado', objeto)
    }

   inserir(objeto) {
    return axios.post(this.baseURL + '/estado', objeto); 
   }
}