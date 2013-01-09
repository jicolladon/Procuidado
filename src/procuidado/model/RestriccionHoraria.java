package procuidado.model;

public class RestriccionHoraria {
	private RestriccionHorariaId id;
	
	public RestriccionHoraria()
	{		
	}
	
	public RestriccionHoraria(RestriccionHorariaId id)
	{
		this.id = id;
	}
	
	public RestriccionHorariaId getId()
	{
		return this.id;
	}
	
	public void setId(RestriccionHorariaId id)
	{
		this.id = id;
	}
}
