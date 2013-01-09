package procuidado.controlDatos;

import org.hibernate.Session;

import procuidado.controlDatosInterfaces.IControlDatosResidentes;
import procuidado.model.Residente;
import procuidado.model.HibernateUtil;

public class ControlDatosResidentes implements IControlDatosResidentes{

	@Override
	public Residente obtener(int id) {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();
		Residente res = (Residente) session.get(Residente.class, id);
	    session.getTransaction().commit();
		return res;
	}

}
