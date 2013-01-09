package procuidado.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.Session;

import procuidado.controlDatos.FactoriaControlDatos;

public class PersonaTest {
	private static int iden;
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		PersonaTest pt = new PersonaTest();
		pt.createStore();
		/*Cuidador c = pt.get(iden);
		System.out.println("Telf: " + c.getTelefono1() + " Nombre: " + c.getNombre());
		for(int i = 0; i < c.getRestricciones().size(); i++){
			Object[] rh = c.getRestricciones().toArray();
			System.out.println("Hora de inicio: " + ((RestriccionHoraria) rh[i]).getId().getHoraInici() + " Hora Final: " + ((RestriccionHoraria) rh[i]).getId().getHoraFin()
			+ " Dia de la semana: " + ((RestriccionHoraria) rh[i]).getId().getDiaSemana());
		}
		//pt.borrar(iden);*/
		
		HibernateUtil.getSessionFactory().getCurrentSession().close();
	}
	
	private void borrar(int id)
	{
		Cuidador c = get(id);
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();
		session.delete(c);
		session.getTransaction().commit();
	}
	
	private void createStore(){
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();
		Casa casa = new Casa();
		Residente residente1 = new Residente();
		Residente residente2 = new Residente();
		Cuidador cuidador1 = new Cuidador();
		Cuidador cuidador2 = new Cuidador();
		cuidador1.setDocumentoId("1234");
		cuidador1.setNombre("Son");
		cuidador1.setApellidos("Goku");
		cuidador1.setPassword("myPass");
		cuidador1.setTelefono1("111222333");
		session.save(cuidador1);
		residente1.setNombre("Maestro");
		residente1.setApellidos("Roshi");
		residente1.setDocumentoId("12345678");
		HashSet<Cuidador> hc1 = new HashSet<Cuidador>();
		hc1.add(cuidador1);		
		residente1.setCuidadors(hc1);
		session.save(residente1);
		casa.setActiva(true);
		casa.setAlias("Kame house");
		casa.setCalle("Isla de Roshi");
		casa.setCodigoPostal("00000");
		casa.setCuidador(cuidador1);
		casa.setPais("Japan");
		casa.setNumero("1");
		casa.setPoblacion("A saber");
		session.save(casa);
		residente1.setCasa(casa);
		session.save(residente1);
		
		cuidador2.setDocumentoId("5678");
		cuidador2.setNombre("Vegeta");
		cuidador2.setApellidos("Vegeta");
		cuidador2.setPassword("myPass");
		cuidador2.setTelefono1("111222333");
		session.save(cuidador2);
		residente2.setCasa(casa);
		residente2.setNombre("Yamcha");
		residente2.setApellidos("Yamcha");
		residente2.setDocumentoId("12345678");
		HashSet<Cuidador> hc2 = new HashSet<Cuidador>();
		hc2.add(cuidador2);
		residente2.setCuidadors(hc2);
		session.save(residente2);
		
		iden = cuidador1.getIdentificador();
		Set<RestriccionHoraria> r = new HashSet<RestriccionHoraria>();
		r.add(new RestriccionHoraria(new RestriccionHorariaId("12", "lunes", cuidador1.getIdentificador(), "13")));
		r.add(new RestriccionHoraria(new RestriccionHorariaId("14", "lunes", cuidador1.getIdentificador(), "17")));
		r.add(new RestriccionHoraria(new RestriccionHorariaId("10", "martes", cuidador1.getIdentificador(), "13")));
		cuidador1.setRestricciones(r);
		session.save(cuidador1);
		
		iden = cuidador2.getIdentificador();
		Set<RestriccionHoraria> r2 = new HashSet<RestriccionHoraria>();
		r2.add(new RestriccionHoraria(new RestriccionHorariaId("9", "miercoles", cuidador2.getIdentificador(), "19")));
		r2.add(new RestriccionHoraria(new RestriccionHorariaId("19", "sabado", cuidador2.getIdentificador(), "22")));
		r2.add(new RestriccionHoraria(new RestriccionHorariaId("17", "viernes", cuidador2.getIdentificador(), "21")));
		cuidador2.setRestricciones(r2);
		session.save(cuidador2);
		
		session.getTransaction().commit();
	}
	
	@SuppressWarnings({ "rawtypes", "unused" })
	private List allInstances(){
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();
		List result = session.createQuery("from Cuidador").list();
	    session.getTransaction().commit();
	    return result;
	}
	
	private Cuidador get(int id){
		return FactoriaControlDatos.getInstance().obtenerControladorDatosCuidadores().obtener(id);
	}

}
