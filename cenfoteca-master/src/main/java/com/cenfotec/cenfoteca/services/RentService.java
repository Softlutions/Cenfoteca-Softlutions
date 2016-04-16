package com.cenfotec.cenfoteca.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cenfotec.cenfoteca.contracts.UserRentRequest;
import com.cenfotec.cenfoteca.ejb.Alquiler;
import com.cenfotec.cenfoteca.ejb.TipoAlquiler;
import com.cenfotec.cenfoteca.pojo.AlquilerPOJO;
import com.cenfotec.cenfoteca.pojo.TipoAlquilerPOJO;
import com.cenfotec.cenfoteca.repositories.RentRepository;

@Service
public class RentService implements RentServiceInterface{

	@Autowired private RentRepository rentRepository;
	
	@Override
	@Transactional
	public List<AlquilerPOJO> getAll() {
		List<Alquiler> tipos = rentRepository.findAll();
		List<AlquilerPOJO> dtos = new ArrayList<AlquilerPOJO>();
		tipos.stream().forEach(ta ->{
			AlquilerPOJO dto = new AlquilerPOJO();
			BeanUtils.copyProperties(ta, dto);
			dtos.add(dto);
		});
		return dtos;
	}
	
	@Override
	@Transactional
	public List<AlquilerPOJO> getIsNotRent() {
		List<Alquiler> tipos = rentRepository.findAllNotRentUser(3); 
		List<AlquilerPOJO> dtos = new ArrayList<AlquilerPOJO>();
		tipos.stream().forEach(ta ->{
			AlquilerPOJO dto = new AlquilerPOJO();
			BeanUtils.copyProperties(ta, dto);
			dtos.add(dto);
		});
		return dtos;
	}
	
	@Override
	@Transactional
	public List<AlquilerPOJO> getByUser(int id){		
		List<Alquiler> tipos = rentRepository.findAllByUsuariosIdUsuario(id);
		List<AlquilerPOJO> dtos = new ArrayList<AlquilerPOJO>();
		tipos.stream().forEach(ta ->{
			AlquilerPOJO dto = new AlquilerPOJO();
			BeanUtils.copyProperties(ta, dto);
			dtos.add(dto);
		});
		return dtos;
	}
	
	@Override
	public Boolean saveRent(Alquiler alquiler) {
		Alquiler nalquiler = rentRepository.save(alquiler);
		return (nalquiler == null) ? false : true;
	}

	@Override
	public UserRentRequest saveItemAlquilado(int idUsuario, int idAlquiler) {
		return rentRepository.saveItemAlquilado(idUsuario, idAlquiler);
	}
}



