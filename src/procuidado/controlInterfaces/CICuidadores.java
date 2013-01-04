package procuidado.controlInterfaces;
 
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
 
@Controller
public class CICuidadores {
 
    @RequestMapping("/cuidadores")
    public @ResponseBody List<Map<String, Object> > consultaCuidadores(@RequestParam int idResidente) {
    	List<Map<String, Object> > res= new ArrayList<Map<String, Object> >();
    	Map<String, Object> cuidador = new HashMap<String, Object>();
    	cuidador.put("id", 1);
        cuidador.put("nombre", "Cristina Ami Garcia");
        cuidador.put("pathImg", "/resources/imagenes/cuidadores/000001.jpg");
        res.add(cuidador);
        return res;
    }
    
    @RequestMapping("/cuidadores/{idCuidador}")
    public @ResponseBody Map<String, Object> getCuidador(@PathVariable(value="idCuidador") int idCuidador) {
    	Map<String, Object> res = new HashMap<String, Object>();
    	List<Map<String, Object> > restricciones = new ArrayList<Map<String, Object> >();
    	Map<String, Object> restriccion = new HashMap<String, Object>();
    	restriccion.put("horaInicio", 4);
    	restriccion.put("horaFin", 6);
    	restriccion.put("dia", "lunes");
    	restricciones.add(restriccion);
    	res.put("id", idCuidador);
    	res.put("nombre", "Cristina");
    	res.put("apellidos", "Ami Garcia");
    	res.put("tipoDocumento", "DNI");
    	res.put("numeroDocumento", "3421234Y");
    	res.put("numeroTelefono", "98563545");
    	res.put("restricciones", restricciones);
    	res.put("pathImg", "/resources/imagenes/cuidadores/000001.jpg");
    	return res;
    }
}