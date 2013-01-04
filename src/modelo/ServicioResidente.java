package modelo;

// Generated 04-ene-2013 11:21:16 by Hibernate Tools 3.4.0.CR1

/**
 * ServicioResidente generated by hbm2java
 */
public class ServicioResidente implements java.io.Serializable {

	private ServicioResidenteId id;
	private Servicio servicio;
	private Residente residente;

	public ServicioResidente() {
	}

	public ServicioResidente(ServicioResidenteId id, Servicio servicio) {
		this.id = id;
		this.servicio = servicio;
	}

	public ServicioResidente(ServicioResidenteId id, Servicio servicio,
			Residente residente) {
		this.id = id;
		this.servicio = servicio;
		this.residente = residente;
	}

	public ServicioResidenteId getId() {
		return this.id;
	}

	public void setId(ServicioResidenteId id) {
		this.id = id;
	}

	public Servicio getServicio() {
		return this.servicio;
	}

	public void setServicio(Servicio servicio) {
		this.servicio = servicio;
	}

	public Residente getResidente() {
		return this.residente;
	}

	public void setResidente(Residente residente) {
		this.residente = residente;
	}

}