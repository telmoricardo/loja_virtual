package com.telmo.loja_api.dto;

import lombok.*;

import java.util.UUID;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EstadoDto {

    private UUID id;
    private String nome;
    private String sigla;
    private String regiao;
    private String capital;
}
