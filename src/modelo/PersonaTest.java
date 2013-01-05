package modelo;

import java.util.List;

import org.hibernate.Session;

import org.hibernate.*;

public class PersonaTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		PersonaTest pt = new PersonaTest();
		pt.createStore();
		 List personas = pt.allInstances();
         for (int i = 0; i < personas.size(); i++) {
             Persona p = (Persona) personas.get(i);
             System.out.println(
                     "Nombre: " + p.getNombre() + " DNI: " + p.getDocumentoId()
             );
         }
		HibernateUtil.getSessionFactory().close();
	}
	
	private void createStore(){
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();
		Persona p = new Persona();
		p.setDocumentoId("1234");
		p.setIdentificador(1);
		p.setNombre("Test Testington Jr.");
		p.setPassword("myPass");
		session.save(p);
		
		session.getTransaction().commit();
	}
	
	private List allInstances(){
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();
		List result = session.createQuery("from Persona").list();
	    session.getTransaction().commit();
	    return result;
	}

}
