package com.telmo.loja_api.domain.repository;

import com.telmo.loja_api.domain.entity.Estado;
import com.telmo.loja_api.dto.EstadoDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface EstadoRepository extends JpaRepository<Estado, UUID> {
    Optional<Estado> findByNomeAndSigla(String nome, String sigla);

    Optional<Estado> findBySigla(String sigla);
}
