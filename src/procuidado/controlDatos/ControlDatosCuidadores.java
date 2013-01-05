package procuidado.controlDatos;

import java.util.List;

import org.hibernate.Session;

import procuidado.controlDatosInterfaces.IControlDatosCuidadores;
import procuidado.model.Cuidador;
import procuidado.model.HibernateUtil;

public class ControlDatosCuidadores implements IControlDatosCuidadores{

	@Override
	public Cuidador obtener(int id) {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();
		Cuidador cuidador = (Cuidador) session.get(Cuidador.class, id);
	    session.getTransaction().commit();
		return cuidador;
	}

}
