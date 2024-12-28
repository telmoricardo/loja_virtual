package com.telmo.loja_api.controller;

import com.telmo.loja_api.domain.entity.Estado;
import com.telmo.loja_api.domain.service.EstadoService;
import com.telmo.loja_api.dto.EstadoDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/estado")
public class EstadoController {

    @Autowired
    EstadoService service;

    @Autowired
    ModelMapper mapper;


    @PostMapping
    public ResponseEntity<Estado> criar(@RequestBody EstadoDto obj) {
        Estado newObj = service.salvar(obj);
        return ResponseEntity.status(HttpStatus.CREATED).body(newObj);
    }

    @GetMapping("/{sigla}")
    public ResponseEntity<EstadoDto> buscarPorSigla(@PathVariable String sigla) {
        return ResponseEntity.ok().body(mapper.map(service.buscarPorSigla(sigla), EstadoDto.class));
    }

    @GetMapping
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<List<EstadoDto>> findAll() {
        return ResponseEntity.ok().body(
                service.findAll().stream().map(x -> mapper.map(x, EstadoDto.class)).collect(Collectors.toList()));
    }
}
