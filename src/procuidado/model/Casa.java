package procuidado.model;

import java.util.HashSet;
import java.util.Set;

import modelo.Estancia;

public class Casa {

	private int identificador;
	private Cuidador cuidador;
	private String calle;
	private String alias;
	private String codigoPostal;
	private String escalera;
	private String numero;
	private String informacionAdicional;
	private String foto;
	private String pais;
	private String piso;
	private String poblacion;
	private String provincia;
	private String puerta;
	private boolean activa;
	private Set<Residente> residentes = new HashSet<Residente>(0);
	private Set<Estancia> estancias = new HashSet<Estancia>(0);

	public Casa() {
	}

	public Casa(int identificador, Cuidador cuidador, String calle,
		String alias, String codigoPostal, String numero, String pais,
		String poblacion, boolean activa) {
		this.identificador = identificador;
		this.cuidador = cuidador;
		this.calle = calle;
		this.alias = alias;
		this.codigoPostal = codigoPostal;
		this.numero = numero;
		this.pais = pais;
		this.poblacion = poblacion;
		this.activa = activa;
	}
	public Casa(int identificador, Cuidador cuidador, String calle,
			String alias, String codigoPostal, String escalera, String numero,
			String informacionAdicional, String foto, String pais, String piso,
			String poblacion, String provincia, String puerta, boolean activa,
			Set<Residente> residentes, Set<Estancia> estancias) {
		this.identificador = identificador;
		this.cuidador = cuidador;
		this.calle = calle;
		this.alias = alias;
		this.codigoPostal = codigoPostal;
		this.escalera = escalera;
		this.numero = numero;
		this.informacionAdicional = informacionAdicional;
		this.foto = foto;
		this.pais = pais;
		this.piso = piso;
		this.poblacion = poblacion;
		this.provincia = provincia;
		this.puerta = puerta;
		this.activa = activa;
		this.residentes = residentes;
		this.estancias = estancias;
	}

	public int getIdentificador() {
		return this.identificador;
	}

	public void setIdentificador(int identificador) {
		this.identificador = identificador;
	}

	public Cuidador getCuidador() {
		return this.cuidador;
	}

	public void setCuidador(Cuidador cuidador) {
		this.cuidador = cuidador;
	}

	public String getCalle() {
		return this.calle;
	}

	public void setCalle(String calle) {
		this.calle = calle;
	}

	public String getAlias() {
		return this.alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getCodigoPostal() {
		return this.codigoPostal;
	}

	public void setCodigoPostal(String codigoPostal) {
		this.codigoPostal = codigoPostal;
	}

	public String getEscalera() {
		return this.escalera;
	}

	public void setEscalera(String escalera) {
		this.escalera = escalera;
	}

	public String getNumero() {
		return this.numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getInformacionAdicional() {
		return this.informacionAdicional;
	}

	public void setInformacionAdicional(String informacionAdicional) {
		this.informacionAdicional = informacionAdicional;
	}

	public String getFoto() {
		return this.foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public String getPais() {
		return this.pais;
	}

	public void setPais(String pais) {
		this.pais = pais;
	}

	public String getPiso() {
		return this.piso;
	}

	public void setPiso(String piso) {
		this.piso = piso;
	}

	public String getPoblacion() {
		return this.poblacion;
	}

	public void setPoblacion(String poblacion) {
		this.poblacion = poblacion;
	}

	public String getProvincia() {
		return this.provincia;
	}

	public void setProvincia(String provincia) {
		this.provincia = provincia;
	}

	public String getPuerta() {
		return this.puerta;
	}

	public void setPuerta(String puerta) {
		this.puerta = puerta;
	}

	public boolean isActiva() {
		return this.activa;
	}

	public void setActiva(boolean activa) {
		this.activa = activa;
	}

	public Set<?> getResidentes() {
		return this.residentes;
	}

	public void setResidentes(Set<Residente> residentes) {
		this.residentes = residentes;
	}

	public Set<Estancia> getEstancias() {
		return this.estancias;
	}

	public void setEstancias(Set<Estancia> estancias) {
		this.estancias = estancias;
	}

}
