package procuidado.cuidadores;

import java.util.HashMap;
import java.util.Map;

public class ControladorCuidadores {
	private static ControladorCuidadores instance = null;
	private ControladorCuidadores(){};
	
	public static ControladorCuidadores getInstance() {
		if (instance != null) {
			instance = new ControladorCuidadores();
		}
		return instance;
	}
	/**
	 * Retorna los datos de un cuidador
	 * @param idCuidador identifica al cuidador
	 * @return Datos del cuidador
	 */
	public Map<String, Object> obtenerCuidador(int idCuidador) {
		return new HashMap<String, Object>();
	}
	/**
	 * Sustituye los datos por los parametros de la función siempre que se indique  
	 * @param hashMapCuidador nuevos datos del cuidador
	 */
	public void editarCuidador(Map<String, Object> hashMapDatosCuidador) {
		
	}
	/**
	 * Elimina el cuidador con el idCuidador indicado
	 * @param idCuidador
	 */
	public void borrarCuidador(int idCuidador) {
		
	}
	/**
	 * Se crea un cuidador nuevo con los datos pasados como parametroç
	 * @param hasMapDatosCuidador datos del cuidador nuevo
	 * @return 
	 */
	public Map<String, Object> nuevoCuidador (Map<String, Object> hasMapDatosCuidador) {
		return new HashMap<String, Object>();
	}
}
