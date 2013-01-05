package procuidado.Casas;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ControladorCasas {
	private static ControladorCasas instance = null;
	private ControladorCasas(){};
	
	public static ControladorCasas getInstance() {
		if (instance != null) {
			instance = new ControladorCasas();
		}
		return instance;
	}
	/**
	 * Elimina del sistema la casa con el id indicado como par‡metro
	 * @param idCasa
	 */
	public void borrarCasa (int idCasa) {
		
	}
	/**
	 * Retorna los datos de la casas con el id pasado como parametro
	 * @param idCasa
	 * @return Datos de la casa
	 */
	public List< Map<String, Object> > obtenerCasas (int idCasa) {
		Map <String, Object> casa = new HashMap<String, Object>();
		List<Map <String, Object> > casas = new ArrayList<Map <String, Object>>();
		casa.put("alias", "Casa Papa");
		casa.put("id",1);
		casa.put("calle","Dos de Mayo");
		casa.put("codigoPostal","08026");
		casa.put("escalera","B");
		casa.put("informacionAdicional","Piso sin ascensor");
		casa.put("numero",274);
		casa.put("pais","Espana");
		casa.put("piso",3);
		casa.put("poblacion","Barcelona");
		casa.put("provincia","Barcelona");
		casa.put("puerta",2);
		
		Map <String, Object> casa2 = new HashMap<String, Object>();
		casa2.put("alias", "Casa Pqquito Chocolatero");
		casa2.put("id",2);
		casa2.put("calle","Padilla");
		casa2.put("codigoPostal","08059");
		casa2.put("escalera","A");
		casa2.put("informacionAdicional","Piso sin calefaccion");
		casa2.put("numero",103);
		casa2.put("pais","Espana");
		casa2.put("piso",4);
		casa2.put("poblacion","Barcelona");
		casa2.put("provincia","Barcelona");
		casa2.put("puerta",4);
		
		casas.add(casa);
		casas.add(casa2);
		
		return casas;
	}
	/**
	 * Se crea una casa nueva con los datos pasados como parametro
	 * @param hasMapDatosCasa datos de la nueva casa
	 * @return hasMap con los datos de la casa que se acaba de crear
	 */
	public Map<String, Object> nuevaCasa (Map<String, Object> hasMapDatosCasa) {
		return new HashMap<String, Object>();
	}
	/**
	 * Sustituye los datos de casa por los parametros pasados a la funci—n siempre que se indique 
	 * @param hashMapCuidador nuevos datos de la casa
	 */
	public void editarCasa(Map<String, Object> hashMapDatosCuidador) {
		
	}
}
