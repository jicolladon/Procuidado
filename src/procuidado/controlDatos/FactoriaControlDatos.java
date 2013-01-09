package procuidado.controlDatos;
import procuidado.controlDatosInterfaces.IControlDatosCasas;
import procuidado.controlDatosInterfaces.IControlDatosCuidadores;
import procuidado.controlDatosInterfaces.IControlDatosResidentes;


public class FactoriaControlDatos
{
	private static FactoriaControlDatos instance = null;
	private FactoriaControlDatos(){};
	private ControlDatosCuidadores controladorDatosCuidadores = null;
	private ControlDatosResidentes controladorDatosResidentes = null;
	private ControlDatosCasas controladorDatosCasas = null;
	
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
	
	public IControlDatosResidentes obtenerControladorDatosResidentes()
	{
		if (controladorDatosResidentes == null)
		{
			controladorDatosResidentes = new ControlDatosResidentes();
		}
		return controladorDatosResidentes;
	}
	
	public IControlDatosCasas obtenerControladorDatosCasas()
	{
		if (controladorDatosCasas == null)
		{
			controladorDatosCasas = new ControlDatosCasas();
		}
		return controladorDatosCasas;
	}
}
