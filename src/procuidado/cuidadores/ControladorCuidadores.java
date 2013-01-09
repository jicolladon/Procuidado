package procuidado.cuidadores;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.hibernate.Session;

import procuidado.controlDatos.FactoriaControlDatos;
import procuidado.model.Cuidador;
import procuidado.model.HibernateUtil;
import procuidado.model.RestriccionHoraria;
import procuidado.model.RestriccionHorariaId;

public class ControladorCuidadores {
	private static int iden;
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
		Map <String, Object> cuidadorHash = new HashMap<String, Object>();
		Cuidador cuidador = FactoriaControlDatos.getInstance().obtenerControladorDatosCuidadores().obtener(19);
		
		cuidadorHash.put("id", cuidador.getIdentificador());
		cuidadorHash.put("pathImg","/resources/imagenes/cuidadores/000001.jpg");
		String nombre = cuidador.getNombre();
		String nombreApellidos[] = nombre.split(" ");
		cuidadorHash.put("nombre", nombreApellidos[0]);
		cuidadorHash.put("apellidos", nombreApellidos [1] + " " + nombreApellidos[2]);
		cuidadorHash.put("tipoDocumento", "DNI");
		cuidadorHash.put("numeroDocumento",  cuidador.getDocumentoId());
		cuidadorHash.put("cuidadorPorDefecto", cuidador.isEsCuidadorPorDefecto());
		
		List<Map <String, Object> > restricciones = new ArrayList<Map <String, Object>>();
		Map <String, Object> restriccion = new HashMap<String, Object>();
		Object[] rh = cuidador.getRestricciones().toArray();
		for(int i = 0; i < rh.length; i++){
			restriccion.put("diaSemana", ((RestriccionHoraria) rh[i]).getId().getDiaSemana());
			restriccion.put("horaInicio", ((RestriccionHoraria) rh[i]).getId().getHoraInici());
			restriccion.put("horaFin", ((RestriccionHoraria) rh[i]).getId().getHoraFin());
			restricciones.add(restriccion);
		}
		cuidadorHash.put("restricciones",restricciones);
		return cuidadorHash;
	}
	/**
	 * Sustituye los datos por los parametros de la funci�n siempre que se indique  
	 * @param hashMapCuidador nuevos datos del cuidador
	 */
	public void editarCuidador(Map<String, Object> hashMapDatosCuidador) {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();
		Cuidador p = new Cuidador();
		String id = (String) hashMapDatosCuidador.get("identificador");
		p.setDocumentoId(id);
		String nombre = (String) hashMapDatosCuidador.get("nombre");
		p.setNombre(nombre);
		String apellido = (String) hashMapDatosCuidador.get("apellido");
		p.setCognom(apellido);
		String tipoDocumento = (String) hashMapDatosCuidador.get("tipoDocumento");
		p.setTipoDeDocumento(tipoDocumento);
		String documento = (String) hashMapDatosCuidador.get("documento");
		p.setDocumento(documento);
		String telefono = (String) hashMapDatosCuidador.get("telefono");
		p.setTelefono1(telefono);
		boolean esCuidadorPorDefecto = (Boolean) hashMapDatosCuidador.get("esCuidadorPorDefecto");
		p.setEsCuidadorPorDefecto(esCuidadorPorDefecto);
		session.save(p);
		
		iden = p.getIdentificador();
		Set<RestriccionHoraria> r = new HashSet<RestriccionHoraria>();
		r.add(new RestriccionHoraria(new RestriccionHorariaId("12", "lunes", p.getIdentificador(), "13")));
		r.add(new RestriccionHoraria(new RestriccionHorariaId("14", "lunes", p.getIdentificador(), "17")));
		r.add(new RestriccionHoraria(new RestriccionHorariaId("10", "martes", p.getIdentificador(), "13")));
		p.setRestricciones(r);
		session.save(p);
		session.getTransaction().commit();
	}

	/**
	 * Elimina el cuidador con el idCuidador indicado
	 * @param idCuidador
	 */
	public void borrarCuidador(int idCuidador) {
		Cuidador c = get(idCuidador);
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();
		session.delete(c);
		session.getTransaction().commit();
		HibernateUtil.getSessionFactory().getCurrentSession().close();
	}
	private Cuidador get(int id){
		return FactoriaControlDatos.getInstance().obtenerControladorDatosCuidadores().obtener(id);
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
		residente2.put("nombreYApellido","Marc Bar�");
		
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
	
	public Map<String,Object> obtenerPrimerCuidador(){
		Cuidador cuidador = FactoriaControlDatos.getInstance().obtenerControladorDatosCuidadores().obtenerPrimerCuidador();
		Map<String,Object> cuidadorHash = new HashMap<String,Object>();
		cuidadorHash.put("id", cuidador.getIdentificador());
		cuidadorHash.put("nombre", cuidador.getNombre() + " " + cuidador.getApellidos());
		cuidadorHash.put("pathImg", cuidador.getFoto());
		return cuidadorHash;
	}
}
