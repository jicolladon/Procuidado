package modelo;

// Generated 04-ene-2013 11:21:16 by Hibernate Tools 3.4.0.CR1

/**
 * ServicioConstantes generated by hbm2java
 */
public class ServicioConstantes implements java.io.Serializable {

	private int identificador;
	private Servicio servicio;

	public ServicioConstantes() {
	}

	public ServicioConstantes(Servicio servicio) {
		this.servicio = servicio;
	}

	public int getIdentificador() {
		return this.identificador;
	}

	public void setIdentificador(int identificador) {
		this.identificador = identificador;
	}

	public Servicio getServicio() {
		return this.servicio;
	}

	public void setServicio(Servicio servicio) {
		this.servicio = servicio;
	}

}