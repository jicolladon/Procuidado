package procuidado.controlInterfaces;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

public class FormCuidador {
	private Map<String, Object> datos = new HashMap<String, Object>();
	private CommonsMultipartFile fotoCuidador;
	
	public void setNombreUsuario(String nombreUsuario) {
		datos.put("nombreUsuario", nombreUsuario);
	}
	
	public String getNombreUsuario() {
		return (String) datos.get("nombreUsuario");
	}
	
	public void setContraUsuario(String contraUsuario) {
		datos.put("contraUsuario", contraUsuario);
	}
	
	public String getContraUsuario() {
		return (String) datos.get("contraUsuario");
	}
	
	public String getNumeroTelefonoCuidador() {
		return (String) datos.get("numeroTelefonoCuidador");
	}
	
	public void setNumeroTelefonoCuidador(String numeroTelefonoCuidador) {
		datos.put("numeroTelefonoCuidador", numeroTelefonoCuidador);
	}
	
	public void setNombreCuidador(String nombreCuidador) {
		datos.put("nombreCuidador", nombreCuidador);
	}
	
	public String getNombreCuidador() {
		return (String) datos.get("nombreCuidador");
	}
	
	public void setApellidosCuidador(String apellidosCuidador) {
		datos.put("apellidosCuidador", apellidosCuidador);
	}
	
	public String getApellidosCuidador() {
		return (String) datos.get("apellidosCuidador");
	}
	
	public void setTipoDocumentoCuidador(String tipoDocumentoCuidador) {
		datos.put("tipoDocumentoCuidador", tipoDocumentoCuidador);
	}
	
	public String getTipoDocumentoCuidador() {
		return (String) datos.get("tipoDocumentoCuidador");
	}
	
	public void setNumeroDocumentoCuidador(String numeroDocumentoCuidador) {
		datos.put("numeroDocumentoCuidador", numeroDocumentoCuidador);
	}
	
	public String getNumeroDocumentoCuidador() {
		return (String) datos.get("numeroDocumentoCuidador");
	}
	
	public void setRestriccionesCuidador(String restriccionesCuidador) {
		datos.put("restriccionesCuidador", restriccionesCuidador);
	}
	
	public String getRestriccionesCuidador() {
		return (String)datos.get("restriccionesCuidador");
	}
	
	public void setAceptaCondicionesCuidador(String aceptaCondicionesCuidador) {
		datos.put("aceptaCondicionesCuidador", aceptaCondicionesCuidador);
	}
	
	public String getAceptaCondicionesCuidador () {
		return (String) datos.get("aceptaCondicionesCuidador");
	}
	
	public void setCuidadorPorDefecto(String cuidadorPorDefecto) {
		datos.put("cuidadorPorDefecto", cuidadorPorDefecto);
	}
	
	public String getcuidadorPorDefecto () {
		return (String) datos.get("cuidadorPorDefecto");
	}
	
	public Integer getIdCuidador() {
		return (Integer) datos.get("idCuidador");
	}
	
	public void setIdCuidador(Integer identificador) {
		datos.put("idCuidador", identificador);
	}
	
	public Integer getIdResidente() {
		return (Integer) datos.get("idResidente");
	}
	
	public void setIdResidente(Integer identificador) {
		datos.put("idResidente", identificador);
	}
	
	public Map<String, Object> obtenerDatos() {
		return datos;
	}

	public CommonsMultipartFile getFotoCuidador() {
		return fotoCuidador;
	}

	public void setFotoCuidador(CommonsMultipartFile fotoCuidador) {
		this.fotoCuidador = fotoCuidador;
	}
}
