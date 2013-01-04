package procuidado.cuidadores;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
	
	public List<Map<String, Object> > getCuidadoresResidente(int idResidente) {
		List<Map <String, Object> > resultado = new ArrayList<Map <String, Object>>();
		return resultado;
	}
}
