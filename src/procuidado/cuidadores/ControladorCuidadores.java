package procuidado.cuidadores;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ControladorCuidadores {
	private static ControladorCuidadores instance = null;
	private ControladorCuidadores(){};
	
	public static ControladorCuidadores getInstance() {
		if (instance == null) {
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
		Map <String, Object> cuidador = new HashMap<String, Object>();
		cuidador.put("id", 1);
		cuidador.put("pathImg","/resources/imagenes/cuidadores/000001.jpg");
		cuidador.put("nombre","Joan isaak");
		cuidador.put("apellidos", "Collado");
		cuidador.put("tipoDocumento","DNI");
		cuidador.put("numeroDocumento", "98563545");
		cuidador.put("cuidadorPorDefecto","SI");
		cuidador.put("nombre", "Collado");
		
		List<Map <String, Object> > restricciones = new ArrayList<Map <String, Object>>();
		Map <String, Object> restriccion = new HashMap<String, Object>();
		restriccion.put("diaSemana", "Lunes");
		restriccion.put("horaInicio", 1);
		restriccion.put("horaFin", 3);
		restricciones.add(restriccion);
		
		return cuidador;
	}
	/**
	 * Sustituye los datos por los parametros de la funci—n siempre que se indique  
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
	 * Se crea un cuidador nuevo con los datos pasados como parametro
	 * @param hasMapDatosCuidador datos del cuidador nuevo
	 * @return hasMap con los datos del cuidador que se acaba de crear
	 */
	public Map<String, Object> nuevoCuidador (Map<String, Object> hasMapDatosCuidador) {
		return new HashMap<String, Object>();
	}
	/**
	 * Obtiene los residentes asociados al cuidador
	 * @param idCuidador
	 * @return Devuelve una lista de residentes asignados a un cuidador
	 */
	public List< Map<String, Object> > obtenerResidentesCuidador(int idCuidador) {
		Map <String, Object> residente = new HashMap<String, Object>();
		List<Map <String, Object> > residentes = new ArrayList<Map <String, Object>>();
		residente.put("id", 1);
		residente.put("pathImg","/resources/imagenes/residentes/000001.jpg");
		residente.put("nombreYApellido","Joan isaak Collado");
		
		Map <String, Object> residente2 = new HashMap<String, Object>();
		residente2.put("id", 1);
		residente2.put("pathImg","/resources/imagenes/residentes/000001.jpg");
		residente2.put("nombreYApellido","Marc Bar—");
		
		residentes.add(residente);
		residentes.add(residente2);
		
		return residentes;
	}
	/**
	 * Obtiene la casa asociadas al cuidador indicado 
	 * @param idCuidador
	 * @return Devuelve una lista de las casas asignadas a un cuidador
	 */
	public List< Map<String, Object> > obtenerCasasCuidador(int idCuidador) {
		Map <String, Object> residente = new HashMap<String, Object>();
		List<Map <String, Object> > residentes = new ArrayList<Map <String, Object>>();
		residente.put("id", 1);
		residente.put("pathImg","/resources/imagenes/residentes/000001.jpg");
		residente.put("Alias","Casa del padawan");
		
		Map <String, Object> residente2 = new HashMap<String, Object>();
		residente2.put("id", 1);
		residente2.put("pathImg","/resources/imagenes/residentes/000001.jpg");
		residente2.put("alias","casa de Doraemon");
		
		residentes.add(residente);
		residentes.add(residente2);
		
		return residentes;
		
	}
	/**
	 * Asigna un cuidador a la casa de la que se responsabiliza
	 * @param idCuidador
	 */
	public void asignarCasaCuidador(int idCuidador) {
		
	}
}
