package procuidado.controlDatos;

import org.hibernate.Session;

import procuidado.controlDatosInterfaces.IControlDatosCasas;
import procuidado.model.Casa;
import procuidado.model.HibernateUtil;

public class ControlDatosCasas implements IControlDatosCasas{

	@Override
	public Casa obtener(int id) {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();
		Casa res = (Casa) session.get(Casa.class, id);
	    session.getTransaction().commit();
		return res;
	}

}
