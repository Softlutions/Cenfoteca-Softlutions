package com.cenfotec.cenfoteca.contracts;

import java.util.List;

import com.cenfotec.cenfoteca.pojo.AlquilerPOJO;
import com.cenfotec.cenfoteca.pojo.UsuarioPOJO;

public class RentResponse extends BaseResponse{

	private List<AlquilerPOJO> alquileres;
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
}
