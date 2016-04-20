package com.cenfotec.cenfoteca.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.cenfotec.cenfoteca.contracts.TipoUsuarioResponse;
import com.cenfotec.cenfoteca.ejb.TipoUsuario;
import com.cenfotec.cenfoteca.services.TipoUsuarioServiceInterface;

@RestController
@RequestMapping(value = "rest/protected/tipoUsuario")
public class TipoUsuarioController {

	@Autowired
	private TipoUsuarioServiceInterface tipoUsuarioService;

	// get all
	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	public TipoUsuarioResponse getAll() {

		TipoUsuarioResponse response = new TipoUsuarioResponse();
		response.setCode(200);
		response.setCodeMessage("users fetch success");
		response.setTipoUsuarioList(tipoUsuarioService.getAll());
		return response;
	}

	@RequestMapping(value = "/getAllById", method = RequestMethod.GET)
	public TipoUsuarioResponse getAllById(@PathParam("pidTipoUsuario") int pidTipoUsuario) {

		TipoUsuarioResponse response = new TipoUsuarioResponse();
		response.setCode(200);
		response.setCodeMessage("users fetch success");
		response.setTipoUsuario(tipoUsuarioService.getTipoUsuarioById(pidTipoUsuario));
		return response;
	}

	// create type user
	@RequestMapping(value = "/createTypeUser", method = RequestMethod.POST)
	public TipoUsuarioResponse createTypeUser(@RequestBody TipoUsuario ptipoUsuario) {

		TipoUsuarioResponse response = new TipoUsuarioResponse();

		TipoUsuario tipoUsuario = new TipoUsuario();

		tipoUsuario.setTipo(ptipoUsuario.getTipo());

		Boolean state = tipoUsuarioService.saveTypeUser(tipoUsuario);

		if (state) {
			response.setCode(200);
			response.setCodeMessage("type user created succesfully");
		} else {
			// create a common webservice error codes enum or statics
			response.setCode(409);
			response.setErrorMessage("create/edit conflict");
		}

		return response;
	}

	@RequestMapping(value = "/updateTypeUser", method = RequestMethod.PUT)
	public TipoUsuarioResponse updateTypeUser(@RequestBody TipoUsuario ptipoUsuario) {

		TipoUsuarioResponse response = new TipoUsuarioResponse();

		TipoUsuario tipoUsuario = new TipoUsuario();
		tipoUsuario.setIdTipoUsuario(ptipoUsuario.getIdTipoUsuario());
		tipoUsuario.setTipo(ptipoUsuario.getTipo());

		Boolean state = tipoUsuarioService.saveTypeUser(tipoUsuario);

		if (state) {
			response.setCode(200);
			response.setCodeMessage("type user update succesfully");
		} else {
			// create a common webservice error codes enum or statics
			response.setCode(409);
			response.setErrorMessage("create/edit conflict");
		}

		return response;
	}

	@RequestMapping(value = "/deleteTypeUser", method = RequestMethod.DELETE)
	public TipoUsuarioResponse deleteTypeUser(@RequestBody TipoUsuario ptipoUsuario) {
		TipoUsuarioResponse response = new TipoUsuarioResponse();
		try {
			tipoUsuarioService.delete(ptipoUsuario);
			response.setCode(200);
			response.setCodeMessage("Type user have been deleted succesfully");
		} catch (Exception e) {
			response.setCode(400);
			response.setCodeMessage("This user has another data asociated");
		}
		return response;
	}
}
