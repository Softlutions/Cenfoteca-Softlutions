package com.cenfotec.cenfoteca.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.cenfotec.cenfoteca.ejb.TipoAlquiler;
import com.cenfotec.cenfoteca.ejb.TipoUsuario;

public interface TipoUsuarioRepository extends CrudRepository<TipoUsuario,Integer> {
	List<TipoUsuario> findAll();
//	void delete(int id);
}
