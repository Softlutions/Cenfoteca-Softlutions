package com.cenfotec.cenfoteca.contracts;

import com.cenfotec.cenfoteca.pojo.AlquilerPOJO;

public class RentRequest {
	
	private String name;
	private String descripcion;
	
	private AlquilerPOJO alquiler;
	
	public RentRequest(String name) {
		super();
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public AlquilerPOJO getAlquiler() {
		return alquiler;
	}

	public void setAlquiler(AlquilerPOJO alquiler) {
		this.alquiler = alquiler;
	}
	
	
}
