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
    	
    	res = ControladorCuidadores.getInstance().obtenerCuidador(idCuidador);
    	return res;
    }
    
    @RequestMapping("/cuidadores/nuevo")
    public @ResponseBody Map<String, Object> nuevoCuidador(@ModelAttribute FormCuidador formulario) {
    	Map<String, Object> datosForm = formulario.obtenerDatos();
    	Map<String, Object> resultado = ControladorCuidadores
    			.getInstance()
    			.nuevoCuidador(
    					_normalizarDatosCuidador(datosForm)
    					);
    	
    	return resultado;
    }
    
    @RequestMapping("/cuidadores/editar")
    public @ResponseBody void editarCuidador(@ModelAttribute FormCuidador formulario) {
    	Map<String, Object> datosForm = formulario.obtenerDatos();
    	ControladorCuidadores
    			.getInstance()
    			.editarCuidador(
    					_normalizarDatosCuidador(datosForm)
    					);
    }
    
    @RequestMapping("/cuidadores/borrar/{idCuidador}")
    public @ResponseBody void borrarCuidador(@PathVariable(value="idCuidador") int idCuidador) {
    	ControladorCuidadores.getInstance().borrarCuidador(idCuidador);
    }
    
    private Map<String, Object> _normalizarDatosCuidador(Map<String, Object> datos) {
    	datos.put("restricciones", _stringARestricciones((String) datos.get("restriccionesCuidador")));
    	return datos;
    }
    
    private List< Map<String, Object> > _stringARestricciones(String sRestricciones) {
    	List< Map<String, Object> > resultado = new ArrayList< Map<String, Object> >();
    	String[] lineas = sRestricciones.split("\n\r");
    	for (String linea : lineas) {
    		if (!linea.equals("")) {
    			Map<String, Object> restriccion = new HashMap<String, Object>();
	    		restriccion.put("dia", linea.substring(0, linea.indexOf("de")).trim());
	    		restriccion.put("horaDesde" ,linea.substring(linea.indexOf("de") + 3, linea.indexOf(" a")));
	    		restriccion.put("horaHasta" ,linea.substring(linea.indexOf(" a") + 3));
	    		resultado.add(restriccion);
    		}
    	}
    	return resultado;
    }
}