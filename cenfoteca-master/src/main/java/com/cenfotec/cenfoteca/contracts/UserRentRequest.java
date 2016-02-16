package com.cenfotec.cenfoteca.contracts;

public class UserRentRequest {
	private int idUsuario;
	private int idAlquiler;
	
	public UserRentRequest(){
	}
	
	public UserRentRequest(int _idUsuario, int _idAlquiler){
		setIdUsuario(_idUsuario);
		setIdAlquiler(_idAlquiler);
	}
	
	public int getIdUsuario(){
		return idUsuario;
	}
	
	public void setIdUsuario(int _idUsuario){
		idUsuario = _idUsuario;
	}
	
	public int getIdAlquiler(){
		return idAlquiler;
	}
	
	public void setIdAlquiler(int _idAlquiler){
		idAlquiler = _idAlquiler;
	}
}
