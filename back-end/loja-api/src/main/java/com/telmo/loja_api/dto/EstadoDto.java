package com.telmo.loja_api.dto;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EstadoDto {

    private String id;
    private String nome;
    private String sigla;
    private String regiao;
    private String capital;
}
