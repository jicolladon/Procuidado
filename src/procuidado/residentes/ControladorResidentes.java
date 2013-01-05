package procuidado.residentes;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ControladorResidentes {
		private static ControladorResidentes instance = null;
		private ControladorResidentes(){};
		
		public static ControladorResidentes getInstance() {
			if (instance != null) {
				instance = new ControladorResidentes();
			}
			return instance;
		}
		/**
		 * Dado el residente devuelve los datos de sus cuidadores
		 * @param idResidente identifica al residente  
		 * @return Lista con los datos de los cuidadores(clave, valor)
		 */
		/*public void nuevoResidente(id) {
			
		}*/
		public List<Map<String, Object> > obtenerCuidadoresResidente(int idResidente) {
			List<Map <String, Object> > resultado = new ArrayList<Map <String, Object>>();
			return resultado;
		}
}

