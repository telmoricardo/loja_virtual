import axios from "axios";

// Log para verificar se a URL está sendo carregada corretamente
console.log("URL da API:", process.env.REACT_APP_URL_API);

export class EstadoService {

    url = 'http://localhost:8080/api';

    inserir(objeto: any) {
        return axios.post(this.url+`/estado/`, objeto);
    }

    buscar(sigla: any) {
        
    }

    estados() {
        // Verificando e imprimindo a URL antes de chamar o GET
        console.log("URL da API para estados:", this.url);
        if (!this.url) {
          console.error("Erro: A URL da API não está definida.");
          return;
        }
        return axios.get(this.url + '/estado');
      }


        
};