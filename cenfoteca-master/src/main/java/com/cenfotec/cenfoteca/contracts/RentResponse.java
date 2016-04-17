package com.cenfotec.cenfoteca.contracts;

import java.util.List;

import com.cenfotec.cenfoteca.ejb.Alquiler;
import com.cenfotec.cenfoteca.pojo.AlquilerPOJO;
import com.cenfotec.cenfoteca.pojo.TipoAlquilerPOJO;
import com.cenfotec.cenfoteca.pojo.UsuarioPOJO;

public class RentResponse extends BaseResponse{

	private List<AlquilerPOJO> alquileres;
	private List<TipoAlquilerPOJO> tipos;
	private Alquiler alquiler;
	public RentResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	public List<AlquilerPOJO> getAlquileres() {
		return alquileres;
	}

	public void setAlquileres(List<AlquilerPOJO> palquileres) {
		this.alquileres = palquileres;
	}
	public Alquiler getAlquiler() {
		return alquiler;
	}
	public void setAlquiler(Alquiler alquiler) {
		this.alquiler = alquiler;
	}
	public List<TipoAlquilerPOJO> getTipos() {
		return tipos;
	}
	public void setTipos(List<TipoAlquilerPOJO> tipos) {
		this.tipos = tipos;
	}
	
	
}
