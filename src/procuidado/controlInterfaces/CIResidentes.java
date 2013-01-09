package procuidado.controlInterfaces;
 
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import procuidado.cuidadores.ControladorCuidadores;
import procuidado.residentes.ControladorResidentes;
 
@Controller
public class CIResidentes {

	@RequestMapping("/residentes/consultaCuidadores/{idResidente}")
	public @ResponseBody List<Map<String, Object> > consultaCuidadores(@PathVariable(value="idResidente") int idResidente) {
	    	List<Map<String, Object> > resultado= new ArrayList<Map<String, Object> >();
	    	/*Map<String, Object> cuidador = new HashMap<String, Object>();
	    	cuidador.put("id", 1);
	        cuidador.put("nombre", "Cristina Ami Garcia");
	        cuidador.put("pathImg", "/resources/imagenes/cuidadores/000001.jpg");
	        res.add(cuidador);*/
	        resultado = ControladorResidentes.getInstance().obtenerCuidadoresResidente(idResidente);
	        return resultado;
	}
	
	@RequestMapping("/residentes/{idResidente}")
	public @ResponseBody Map<String, Object> obtenerResidente(@PathVariable(value="idResidente") int idResidente) {
		//return ControladorResidentes.getInstance().obtenerResidente(idResidente);
		Map <String, Object> residente = new HashMap<String, Object>();
		residente.put("id", 2);
		residente.put("pathImg","/resources/imagenes/residentes/000001.jpg");
		residente.put("nombreYApellido","Otro Residente");
		return residente;
	}
}