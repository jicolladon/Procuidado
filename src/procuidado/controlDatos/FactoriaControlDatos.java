package procuidado.controlDatos;
import procuidado.controlDatosInterfaces.IControlDatosCuidadores;


public class FactoriaControlDatos
{
	private static FactoriaControlDatos instance = null;
	private FactoriaControlDatos(){};
	private ControlDatosCuidadores controladorDatosCuidadores = null;
	
	public static FactoriaControlDatos getInstance()
	{
		if (instance == null)
		{
			instance = new FactoriaControlDatos();
		}
		return instance;
	}
	
	public IControlDatosCuidadores obtenerControladorDatosCuidadores()
	{
		if (controladorDatosCuidadores == null)
		{
			controladorDatosCuidadores = new ControlDatosCuidadores();
		}
		return controladorDatosCuidadores;
	}
}
