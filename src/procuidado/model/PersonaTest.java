package procuidado.model;

import java.util.List;

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
		HibernateUtil.getSessionFactory().getCurrentSession().close();
	}
	
	private void createStore(){
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();
		Cuidador p = new Cuidador();
		p.setDocumentoId("1234");
		p.setNombre("Test Testington IX");
		p.setPassword("myPass");
		p.setTelefono1("123456789");
		session.save(p);
		iden = p.getIdentificador();
		System.out.println(iden);
		session.getTransaction().commit();
	}
	
	@SuppressWarnings({ "rawtypes", "unused" })
	private List allInstances(){
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();
		List result = session.createQuery("from Persona").list();
	    session.getTransaction().commit();
	    return result;
	}
	
	private Cuidador get(int id){
		return FactoriaControlDatos.getInstance().obtenerControladorDatosCuidadores().obtener(id);
	}

}
