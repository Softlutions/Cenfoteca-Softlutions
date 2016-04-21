package com.cenfotec.cenfoteca.controllers;

import javax.servlet.ServletContext;
import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cenfotec.cenfoteca.contracts.RentResponse;
import com.cenfotec.cenfoteca.contracts.UserRentRequest;
import com.cenfotec.cenfoteca.ejb.Alquiler;
import com.cenfotec.cenfoteca.services.RentServiceInterface;
import com.cenfotec.cenfoteca.services.TipoAlquilerServiceInterface;
import com.cenfotec.cenfoteca.services.UsersServiceInterface;
import com.cenfotec.cenfoteca.utils.Utils;

/**
 * Handles requests for the application home page.
 */
@RestController
@RequestMapping(value = "rest/protected/rent")
public class RentController {

	@Autowired
	private ServletContext servletContext;
	@Autowired
	private TipoAlquilerServiceInterface tipoAlquilerService;
	@Autowired
	private RentServiceInterface rentService;

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public RentResponse create(@RequestParam(value = "file", required = false) MultipartFile file,
			@RequestParam("idTipoAlquiler") int idTipoAlquiler, @RequestParam("name") String name,
			@RequestParam("description") String description, @RequestParam("idRent") int idRent) {

		RentResponse rs = new RentResponse();

		Alquiler alquiler;

		if (idRent > 0)
			alquiler = rentService.getById(idRent);
		else
			alquiler = new Alquiler();

		if (file != null) {
			String resultFileName = Utils.writeToFile(file, servletContext);
			alquiler.setImage(resultFileName);
		}

		alquiler.setName(name);
		alquiler.setDescription(description);
		alquiler.setTipoAlquiler(tipoAlquilerService.getTipoAlquilerById(idTipoAlquiler));

		Boolean state = rentService.saveRent(alquiler);

		if (state) {
			rs.setCode(200);
			rs.setCodeMessage("rent created succesfully");
		} else {
			rs.setCode(409);
			rs.setErrorMessage("create/edit conflict");
		}

		return rs;
	}

	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	public RentResponse getAll() {
		RentResponse response = new RentResponse();
		response.setCode(200);
		response.setCodeMessage("users fetch success");
		response.setAlquileres(rentService.getAll());
		response.setTipos(rentService.getAllTipo());
		return response;
	};

	@RequestMapping(value = "/getIsNotRent", method = RequestMethod.GET)
	public RentResponse getIsNotRent() {
		RentResponse response = new RentResponse();
		response.setCode(200);
		response.setCodeMessage("items fetch success");
		response.setAlquileres(rentService.getIsNotRent());
		return response;
	};

	// @RequestMapping(value = "/getByUser/{id}", method = RequestMethod.GET)
	// public RentResponse byUser(@PathVariable String id) {

	@RequestMapping(value = "/getByUser/{userId}", method = RequestMethod.GET)
	public RentResponse getByUser(@PathVariable("userId") int userId) {
		RentResponse response = new RentResponse();
		response.setAlquileres(rentService.getByUser(userId));
		response.setCode(200);
		response.setCodeMessage("user items fetch success");
		return response;
	}

	@RequestMapping(value = "/getById", method = RequestMethod.GET)
	public RentResponse getById(@PathParam("pidTipoUsuario") int pidRent) {
		RentResponse response = new RentResponse();
		response.setCode(200);
		response.setCodeMessage("users fetch success");
		response.setAlquiler(rentService.getById(pidRent));
		return response;
	};

	@RequestMapping(value = "/deleteRents", method = RequestMethod.DELETE)
	public RentResponse deleteRents(@RequestBody Alquiler alquiler) {
		RentResponse rs = new RentResponse();
		try {
			rentService.deleteRent(alquiler);
			rs.setCode(200);
			rs.setCodeMessage("Type user update succesfully");
		} catch (Exception e) {
			rs.setCode(400);
			rs.setCodeMessage("This record has asociated data");
		}
		

		return rs;
	}

	@RequestMapping(value = "/updateRent", method = RequestMethod.PUT)
	public RentResponse modify(@RequestBody Alquiler alquiler) {
		RentResponse rs = new RentResponse();

		Boolean state = rentService.saveRent(alquiler);

		if (state) {
			rs.setCode(200);
			rs.setErrorMessage("update succesfully");
		} else {
			rs.setCode(409);
			rs.setErrorMessage("update conflict");
		}

		return rs;
	}

	@RequestMapping(value = "/saveRent", method = RequestMethod.POST)
	public RentResponse saveItemAlquilado(@RequestBody UserRentRequest userRent) {

		RentResponse response = new RentResponse();
		Boolean state = rentService.saveItemAlquilado(userRent.getIdUsuario(), userRent.getIdAlquiler());

		if (state) {
			response.setCode(200);
			response.setCodeMessage("rent saved succesfully");
		} else {
			response.setCode(409);
			response.setErrorMessage("save conflict");
		}

		return response;
	}

	@RequestMapping(value = "/returnRent", method = RequestMethod.DELETE)
	public RentResponse returnRent(@RequestBody UserRentRequest userRent) {
		RentResponse rs = new RentResponse();
		rentService.returnRent(userRent.getIdUsuario(), userRent.getIdAlquiler());
		rs.setCode(200);
		rs.setCodeMessage("user rent deleted!");

		return rs;
	}
}