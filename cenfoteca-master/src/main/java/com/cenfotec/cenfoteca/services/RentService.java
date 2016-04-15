package com.cenfotec.cenfoteca.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cenfotec.cenfoteca.ejb.Alquiler;
import com.cenfotec.cenfoteca.ejb.TipoAlquiler;
import com.cenfotec.cenfoteca.pojo.AlquilerPOJO;
import com.cenfotec.cenfoteca.pojo.TipoAlquilerPOJO;
import com.cenfotec.cenfoteca.repositories.RentRepository;
import com.cenfotec.cenfoteca.repositories.TipoAlquilerRepository;


@Service
public class RentService implements RentServiceInterface{

	@Autowired private RentRepository rentRepository;
	@Autowired private TipoAlquilerRepository tipo;
	
	@Override
	@Transactional
	public List<AlquilerPOJO> getAll() {
		List<Alquiler> tipos = rentRepository.findAll();
		List<AlquilerPOJO> dtos = new ArrayList<AlquilerPOJO>();
		tipos.stream().forEach(ta ->{
			AlquilerPOJO dto = new AlquilerPOJO();
			BeanUtils.copyProperties(ta, dto);
			if(ta.getTipoAlquiler()!= null){
				TipoAlquilerPOJO tipo = new TipoAlquilerPOJO();
				BeanUtils.copyProperties(ta.getTipoAlquiler(), tipo);
				dto.setTipoAlquiler(tipo);
			}
			dtos.add(dto);
			
		});
		return dtos;
	}
	
	@Override
	@Transactional
	public List<TipoAlquilerPOJO> getAllTipo() {
		List<TipoAlquiler> tipos = tipo.findAll();
		List<TipoAlquilerPOJO> dtos = new ArrayList<TipoAlquilerPOJO>();
		tipos.stream().forEach(ta ->{
			TipoAlquilerPOJO dto = new TipoAlquilerPOJO();
			BeanUtils.copyProperties(ta, dto);
			
			dtos.add(dto);
			
		});
		return dtos;
	}
	
	@Override
	@Transactional
	public Alquiler getById(int alquiler){
		Alquiler alquiler2 = rentRepository.findOne(alquiler);
		return alquiler2;
	}
	
	@Override
	public Boolean saveRent(Alquiler alquiler) {
		Alquiler nalquiler = rentRepository.save(alquiler);
		return (nalquiler == null) ? false : true;
	}
	
	@Override
	public void deleteRent(Alquiler alquiler){
		rentRepository.delete(alquiler);
	}
}