package com.telmo.loja_api.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table
public class Estado{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Gera o UUID automaticamente
    private UUID id;

    @Column(nullable = false, length = 100) // Define restrições e tamanho da coluna
    private String nome;

    @Column(nullable = false, length = 2, unique = true) // Restringe a sigla como única
    private String sigla;

    @Column(nullable = false, length = 50)
    private String regiao;

    @Column(nullable = false, length = 100)
    private String capital;
}
