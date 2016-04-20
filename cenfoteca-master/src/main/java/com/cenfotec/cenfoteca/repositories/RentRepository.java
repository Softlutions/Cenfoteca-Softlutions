package com.cenfotec.cenfoteca.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.cenfotec.cenfoteca.ejb.Alquiler;

public interface RentRepository extends CrudRepository<Alquiler, Integer> {
	List<Alquiler> findAll();
	
	@Query(value = "SELECT * FROM Alquiler AS a  WHERE a.idAlquiler NOT IN (SELECT Alquiler_idAlquiler" +
			" FROM UsuarioHasAlquiler AS us WHERE us.Usuario_idUsuario = ?1)", nativeQuery = true)
	List<Alquiler> findAllNotRentUser(int idUsuario); 
	
//	@Query("INSERT INTO UsuarioHasAlquiler VALUES(?1, ?2)")
//	UserRentRequest saveItemAlquilado(int idUsuario, int idAlquiler);
	
	List<Alquiler> findAllByUsuariosIdUsuario(int id);
}