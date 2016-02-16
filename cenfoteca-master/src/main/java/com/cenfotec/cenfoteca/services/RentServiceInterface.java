package com.cenfotec.cenfoteca.services;

import java.util.List;

import com.cenfotec.cenfoteca.contracts.UserRentRequest;
import com.cenfotec.cenfoteca.ejb.Alquiler;
import com.cenfotec.cenfoteca.pojo.AlquilerPOJO;



public interface RentServiceInterface {
	List<AlquilerPOJO> getAll();
	List<AlquilerPOJO> getIsNotRent();
	Boolean saveRent(Alquiler alquiler);
	List<AlquilerPOJO> getByUser(int id);
	UserRentRequest saveItemAlquilado(int idUsuario, int idAlquiler);
}