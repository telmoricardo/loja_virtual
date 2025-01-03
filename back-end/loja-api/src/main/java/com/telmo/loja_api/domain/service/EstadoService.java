package com.telmo.loja_api.domain.service;

import com.telmo.loja_api.domain.entity.Estado;
import com.telmo.loja_api.domain.repository.EstadoRepository;
import com.telmo.loja_api.dto.EstadoDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstadoService {

    @Autowired
    EstadoRepository repository;

    @Autowired
    ModelMapper mapper;


    public Estado salvar(EstadoDto obj) {
        if (repository.findByNomeAndSigla(obj.getNome(), obj.getSigla()).isPresent()) {
            throw new RuntimeException("Já existe um estado com o nome " + obj.getNome() + " e sigla " + obj.getSigla());
        }
        return repository.save(mapper.map(obj, Estado.class));
    }


    public Estado buscarPorSigla(String sigla) {
       return repository.findBySigla(sigla)
                .orElseThrow(() -> new RuntimeException("Estado não encontrado"));
    }

    public List<Estado> findAll() {
        return repository.findAll();
    }

    public Estado editar(EstadoDto obj) {
        if (repository.findById(obj.getId()).isPresent()) {
            return repository.save(mapper.map(obj, Estado.class));
        }
        throw new RuntimeException("Náo existe estado com o nome " + obj.getNome() + " e sigla " + obj.getSigla());
    }
}
