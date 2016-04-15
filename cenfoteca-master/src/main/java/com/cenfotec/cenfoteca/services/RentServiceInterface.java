package com.cenfotec.cenfoteca.services;

import java.util.List;

import com.cenfotec.cenfoteca.ejb.Alquiler;
import com.cenfotec.cenfoteca.pojo.AlquilerPOJO;
import com.cenfotec.cenfoteca.pojo.TipoAlquilerPOJO;



public interface RentServiceInterface {
	List<AlquilerPOJO> getAll();
	Boolean saveRent(Alquiler alquiler);
	
	Alquiler getById(int alquiler);
	
	void deleteRent(Alquiler alquieler);
	List<TipoAlquilerPOJO> getAllTipo();
}
