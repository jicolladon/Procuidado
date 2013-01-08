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
		Cuidador c = pt.get(iden);
		System.out.println("Telf: " + c.getTelefono1() + " Nombre: " + c.getNombre());
		for(int i = 0; i < c.getRestricciones().size(); i++){
			Object[] rh = c.getRestricciones().toArray();
			System.out.println("Hora de inicio: " + ((RestriccionHoraria) rh[i]).getId().getHoraInici() + " Hora Final: " + ((RestriccionHoraria) rh[i]).getId().getHoraFin()
			+ " Dia de la semana: " + ((RestriccionHoraria) rh[i]).getId().getDiaSemana());
		}
		HibernateUtil.getSessionFactory().getCurrentSession().close();
	}
	
	private void createStore(){
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();
		Cuidador p = new Cuidador();
		p.setDocumentoId("1234");
		p.setNombre("Test Testington XIV");
		p.setPassword("myPass");
		p.setTelefono1("111222333");
		session.save(p);
		iden = p.getIdentificador();
		Set<RestriccionHoraria> r = new HashSet<RestriccionHoraria>();
		r.add(new RestriccionHoraria(new RestriccionHorariaId("11", "lunes", p.getIdentificador(), "13")));
		r.add(new RestriccionHoraria(new RestriccionHorariaId("15", "lunes", p.getIdentificador(), "17")));
		r.add(new RestriccionHoraria(new RestriccionHorariaId("11", "martes", p.getIdentificador(), "13")));
		p.setRestricciones(r);
		session.save(p);
		System.out.println(iden);
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
