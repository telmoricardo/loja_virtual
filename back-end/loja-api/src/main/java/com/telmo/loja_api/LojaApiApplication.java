package com.telmo.loja_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
public class LojaApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(LojaApiApplication.class, args);
	}

}
