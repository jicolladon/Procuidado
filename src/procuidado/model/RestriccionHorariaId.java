package procuidado.model;

import java.io.Serializable;

@SuppressWarnings("serial")
public class RestriccionHorariaId implements Serializable {
	private String horaInici;
	private String diaSemana;
	private int identificadorCuidador;
	private String horaFin;
	
	public RestriccionHorariaId()
	{
	}

	public RestriccionHorariaId(String horaInici, String diaSemana, int identificadorCuidador, String horaFin)
	{
		this.horaInici = horaInici;
		this.diaSemana = diaSemana;
		this.identificadorCuidador = identificadorCuidador;
		this.horaFin = horaFin;
	}
	
	public String getHoraInici()
	{
		return this.horaInici;
	}
	
	public void setHoraInici(String horaInici)
	{
		this.horaInici = horaInici;
	}
	
	public String getDiaSemana()
	{
		return this.diaSemana;
	}
	
	public void setDiaSemana(String diaSemana)
	{
		this.diaSemana = diaSemana;
	}
	
	public int getIdentificadorCuidador()
	{
		return this.identificadorCuidador;
	}
	
	public void setIdentificadorCuidador(int identificadorCuidador)
	{
		this.identificadorCuidador = identificadorCuidador;
	}
	
	public String getHoraFin()
	{
		return this.horaFin;
	}
	
	public void setHoraFin(String horaFin)
	{
		this.horaFin = horaFin;
	}
	
	@Override
	public boolean equals(Object obj)
	{
		RestriccionHorariaId id2 = (RestriccionHorariaId) obj;
		return (this.horaInici.equals(id2.horaInici) && this.diaSemana.equals(id2.diaSemana) &&
		(this.identificadorCuidador == id2.identificadorCuidador) && this.horaFin.equals(id2.horaFin));		
	}
	
	@Override
	public int hashCode(){
		return this.identificadorCuidador*Integer.getInteger(this.horaInici)*Integer.getInteger(this.diaSemana);
	}
}
