package procuidado.controlInterfaces;
 
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;



import procuidado.cuidadores.ControladorCuidadores;
 
@Controller
public class CICuidadores {
    @RequestMapping("/cuidadores/{idCuidador}")
    public @ResponseBody Map<String, Object> getCuidador(@PathVariable(value="idCuidador") int idCuidador) {
    	Map<String, Object> res = new HashMap<String, Object>();
    	
    	res = ControladorCuidadores.getInstance().obtenerCuidador(idCuidador);
    	return res;
    }
    
    @RequestMapping("/cuidadores/nuevo")
    public @ResponseBody String nuevoCuidador(@ModelAttribute FormCuidador formulario) {
    	Map<String, Object> datosForm = formulario.obtenerDatos();
    	ControladorCuidadores
    			.getInstance()
    			.nuevoCuidador(
    					_normalizarDatosCuidador(datosForm)
    					);
    	
    	return "";
    }
    
    @RequestMapping("/cuidadores/editar")
    public @ResponseBody String editarCuidador(@ModelAttribute FormCuidador formulario) {
    	Map<String, Object> datosForm = formulario.obtenerDatos();
    	ControladorCuidadores
    			.getInstance()
    			.editarCuidador(
    					_normalizarDatosCuidador(datosForm)
    					);
    	return "";
    }
    
    @RequestMapping("/cuidadores/borrar/{idCuidador}")
    public @ResponseBody void borrarCuidador(@PathVariable(value="idCuidador") int idCuidador) {
    	ControladorCuidadores.getInstance().borrarCuidador(idCuidador);
    }
    
    private Map<String, Object> _normalizarDatosCuidador(Map<String, Object> datos) {
    	datos.put("restriccionesCuidador", _stringARestricciones((String) datos.get("restriccionesCuidador")));
    	if (!datos.containsKey("cuidadorPorDefecto")) {
    		datos.put("cuidadorPorDefecto", "NO");
    	}
    	return datos;
    }
    
    @RequestMapping("/cuidadores/consultaResidentes/{idCuidador}")
    public @ResponseBody List<Map<String, Object>> consultaResidentes(@PathVariable(value="idCuidador") int idCuidador) {
    	List<Map<String, Object> > resultado;
    	resultado = ControladorCuidadores.getInstance().obtenerResidentesCuidador(idCuidador);
    	return resultado;
    }
    
    @RequestMapping(value="/cuidadores/cambiarFoto", method=RequestMethod.POST)
    public ModelAndView cambiarFoto(HttpSession session, @ModelAttribute FormCuidador formCuidador, @RequestParam String jsCallback) throws Exception {
    	String pathImg = (String) grabarFicheroALocal(formCuidador);
    	ModelAndView out = new ModelAndView();
    	session.setAttribute("pathImgCuidador", pathImg);
    	out.addObject("pathImg", pathImg);
    	out.addObject("jsCallback", jsCallback);
    	return out;
    }
   
    @RequestMapping(value="/cuidadores/primero")
    public @ResponseBody Map<String, Object> obtenerPrimerCuidador() {
    	return ControladorCuidadores.getInstance().obtenerPrimerCuidador();
    }
    
    private String grabarFicheroALocal(FormCuidador form) throws Exception {
        /*CommonsMultipartFile uploaded = form.getFotoCuidador();
        File localFile = new File("");
        FileOutputStream os = null;
         
        try {
             
            os = new FileOutputStream(localFile);
            os.write(uploaded.getBytes());
             
        } finally {
            if (os != null) {
                try {
                    os.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }*/
        return "/cuidadores/000001.jpg";
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