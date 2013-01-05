package procuidado.model;

// Generated 04-ene-2013 11:21:16 by Hibernate Tools 3.4.0.CR1

/**
 * Persona generated by hbm2java
 */
public class Persona implements java.io.Serializable
{

	private int identificador;
	private String nombre;
	private String documentoId;
	private String password;

	public Persona()
	{
	}

	public Persona(int identificador, String nombre)
	{
		this.identificador = identificador;
		this.nombre = nombre;
	}

	public Persona(int identificador, String nombre, String documentoId, String password)
	{
		this.identificador = identificador;
		this.nombre = nombre;
		this.documentoId = documentoId;
		this.password = password;
	}

	public int getIdentificador()
	{
		return this.identificador;
	}

	public void setIdentificador(int identificador)
	{
		this.identificador = identificador;
	}

	public String getNombre()
	{
		return this.nombre;
	}

	public void setNombre(String nombre)
	{
		this.nombre = nombre;
	}

	public String getDocumentoId()
	{
		return this.documentoId;
	}

	public void setDocumentoId(String documentoId)
	{
		this.documentoId = documentoId;
	}

	public String getPassword()
	{
		return this.password;
	}

	public void setPassword(String password)
	{
		this.password = password;
	}

}
