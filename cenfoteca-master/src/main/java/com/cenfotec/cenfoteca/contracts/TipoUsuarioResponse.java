package com.cenfotec.cenfoteca.contracts;

import com.cenfotec.cenfoteca.ejb.TipoUsuario;
import com.cenfotec.cenfoteca.pojo.*;
import java.util.List;
public class TipoUsuarioResponse extends BaseResponse {

	List<TipoUsuarioPOJO> tipoUsuarioList;
	TipoUsuario tipoUsuario;
	public TipoUsuarioResponse(){
		super();
	}

	public List<TipoUsuarioPOJO> getTipoUsuarioList() {
		return tipoUsuarioList;
	}

	public void setTipoUsuarioList(List<TipoUsuarioPOJO> tipoUsuarioList) {
		this.tipoUsuarioList = tipoUsuarioList;
	}

	public TipoUsuario getTipoUsuario() {
		return tipoUsuario;
	}

	public void setTipoUsuario(TipoUsuario tipoUsuario) {
		this.tipoUsuario = tipoUsuario;
	}
	
	
	
}
