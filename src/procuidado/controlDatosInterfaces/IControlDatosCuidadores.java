package procuidado.controlDatosInterfaces;

import procuidado.model.Cuidador;

public interface IControlDatosCuidadores {
	public Cuidador obtener(int id);
	public Cuidador obtenerPrimerCuidador();
}
