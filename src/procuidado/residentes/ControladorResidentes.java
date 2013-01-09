package procuidado.residentes;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import procuidado.controlDatos.FactoriaControlDatos;
import procuidado.model.Cuidador;
import procuidado.model.Residente;

public class ControladorResidentes {
		private static ControladorResidentes instance = null;
		private ControladorResidentes(){};
		
		public static ControladorResidentes getInstance() {
			if (instance == null) {
				instance = new ControladorResidentes();
			}
			return instance;
		}
		
		/**
		 * Dado el residente devuelve los datos de sus cuidadores
		 * @param idResidente identifica al residente  
		 * @return Lista con los datos de los cuidadores(clave, valor)
		 */
		public List< Map<String, Object> > obtenerCuidadoresResidente(int idResidente) {
			List<Map <String, Object> > resultado = new ArrayList<Map <String, Object>>();
			Residente residente = FactoriaControlDatos.getInstance().obtenerControladorDatosResidentes().obtener(idResidente);
			Set<Cuidador> cuidadores = residente.getCuidadors();
			for (Cuidador cuidador : cuidadores) {
				Map <String, Object> cuidadorHash = new HashMap<String,Object>();
				cuidadorHash.put("id", cuidador.getIdentificador());
				cuidadorHash.put("nombre", cuidador.getNombre() + " " + cuidador.getApellidos());
				cuidadorHash.put("pathImg", cuidador.getFoto());
				resultado.add(cuidadorHash);
			}
			return resultado;
		}
		/**
		 * Obtiene el id y la ruta de la imagen de perfil del residente con el id indicado
		 * @param idResidente
		 * @return Lista con el nombre y la foto del residente
		 */
		public Map<String, Object> obtenerResidente(int idResidente) {
			Map <String, Object> residenteHash = new HashMap<String, Object>();
			Residente  residente = FactoriaControlDatos.getInstance().obtenerControladorDatosResidentes().obtener(idResidente);
			
			residenteHash.put("id", residente.getIdentificador());
			residenteHash.put("pathImg",residente.getFoto());
			String nombre = residente.getNombre() + " " + residente.getApellidos();
			residenteHash.put("nombreYApellido", nombre);
			return residenteHash;
		}
		/**
		 * Asigna un residente a la casa en la que esta viviendo
		 * @param idResidente
		 */
		public void asignarCasaAResidente(int idResidente) {
			
		}
}

