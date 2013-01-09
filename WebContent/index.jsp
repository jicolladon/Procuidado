<!DOCTYPE html>
<html>
<head>
  <title>ProCuidado</title>
  <link href='http://fonts.googleapis.com/css?family=Sail' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" type="text/css" href="resources/css/normalize.css">
  <link rel="stylesheet" type="text/css" href="resources/css/main.css">
  <meta charset="utf-8" />
   <script type="text/javascript" src="resources/js/jquery.js"></script>
  <script type="text/javascript" src="resources/js/utils.js"></script>
  <script type="text/javascript" src="resources/js/modulos.js"></script>
  <script type="text/javascript" src="resources/js/main.js"></script>
  <script type="text/javascript" src="resources/js/polyfills/webforms/webforms2.js"></script>
</head>
<body>
    <div id="modal">
        <div>
          <a href="#" id="modalClose">Cerrar</a>
          <div id="modalContent"></div>
        </div>
    </div>
  <div id="wrapper">
        <header id="cabeceraProcuidado">
            <img src="resources/imagenes/logoFiberis.png" height="100" />
            <hgroup>
                <h1>Procuidado</h1>
                <h2>El cuidado que te mereces</h2>
            </hgroup>
        </header>
        <div style="clear: both"></div>
    	    <nav>
                <ul id="mainMenu">
                    <li>
                         <a href="#">Inicio</a>
                    </li>
                    <li class="seleccionada" id="menuItemCuidadores">
                        <a href="#">Gestión Cuidadores</a>
                    </li>
                    <li>
                         <a href="#">Gestión Casas</a>
                    </li>
                    <li>
                         <a href="#">Horario</a>
                    </li>
                    <li>
                         <a href="#">Detalle incidencias</a>
                    </li>
                    <li>
                         <a href="#">Agenda</a>
                    </li>
                    <li>
                         <a href="#">Historial</a>
                    </li>
                    <li>
                         <a href="#">Gestión Personal</a>
                    </li>
                    <li class="last">
                         <a href="#">Constantes Vitales</a>
                    </li>
                </ul>
            </nav>
            <div id="contenido">
            <article id="residente">
                <img id="imagenResidenteActual" src="" />
                <h1 id="nombreYApellidosResidenteActual" ></h1>
            </article>
            <article id="cuidadores" class="seccion off">
                <header>
                    <!--<h1>Cuidadores</h1>-->
                </header>
                <section id="cuidadoresActuales" class="subseccion">
                    
                </section>
                <section id="datosCuidador" class="subseccion off">
                    <header>
                        <h1 id="tituloDatosCuidador">Nuevo Cuidador</h1>
                    </header>
                    <form id="formCuidador" name="formCuidador">
                    	<div id="datosLoginCuidador">
                        <label for="nombreUsuario">Nombre de usuario (*):</label>
                        <p id="nombreUsuarioError" class="errorCampo off"></p>
                        <input type="text" name="nombreUsuario" id="nombreUsuario" class="fillinput" />
                        <label for="contraUsuario">Contraseña (*):</label>
                        <p id="contraUsuarioError" class="errorCampo off"></p>
                        <input type="password" name="contraUsuario" id="contraUsuario" class="fillinput" />
                        </div>
                        <label for="nombreCuidador">Nombre(*):</label>
                        <p id="nombreCuidadorError" class="errorCampo off"></p>
                        <input type="text" name="nombreCuidador" id="nombreCuidador" class="fillinput" />
                        <label for="apellidosCuidador">Apellidos (*):</label>
                        <p id="apellidosCuidadorError" class="errorCampo off"></p>
                        <input type="text" name="apellidosCuidador" id="apellidosCuidador" class="fillinput" />
                        <label for="tipoDocumentoCuidador">Tipo documento (*): </label>
                        <p id="tipoDocumentoCuidadorError" class="errorCampo off"></p>
                        <select id="tipoDocumentoCuidador" name="tipoDocumentoCuidador">
                            <option value="DNI">DNI</option>
                        </select>
                        <p id="numeroDocumentoCuidadorError" class="errorCampo off"></p>
                        <input type="text" name="numeroDocumentoCuidador" id="numeroDocumentoCuidador" />
                        <label for="numeroTelefonoCuidador">Numero de telefono (*): </label>
                        <p id="numeroTelefonoCuidadorError" class="errorCampo off"></p>
                        <input type="text" name="numeroTelefonoCuidador" id="numeroTelefonoCuidador" class="fillinput" />
                        <label for="restriccionesCuidador">Restricciones: </label>
                        <p id="restriccionesCuidadorError" class="errorCampo off"></p>
                        <select id="diaRestriccionCuidador" name="diaRestriccionCuidador" >
                            <option value="lunes">Lunes</option>
                            <option value="martes">Martes</option>
                            <option value="miercoles">Miercoles</option>
                            <option value="jueves">Jueves</option>
                            <option value="viernes">Viernes</option>
                            <option value="sabado">Sabado</option>
                            <option value="domingo">Domingo</option>
                        </select>
                        de: 
                        <select id="horaDesdeRestriccionCuidador" name="horaDesdeRestriccionCuidador">
                            <option value="00:00">00:00</option>
                            <option value="01:00">01:00</option>
                            <option value="02:00">02:00</option>
                            <option value="03:00">03:00</option>
                            <option value="04:00">04:00</option>
                            <option value="05:00">05:00</option>
                            <option value="06:00">06:00</option>
                            <option value="07:00">07:00</option>
                            <option value="08:00">08:00</option>
                            <option value="09:00">09:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="16:00">16:00</option>
                            <option value="17:00">17:00</option>
                            <option value="18:00">18:00</option>
                            <option value="19:00">19:00</option>
                            <option value="20:00">20:00</option>
                            <option value="21:00">21:00</option>
                            <option value="22:00">22:00</option>
                            <option value="23:00">23:00</option>
                        </select>
                        hasta: 
                        <select id="horaHastaRestriccionCuidador" name="horaHastaRestriccionCuidador">
                            <option value="00:00">00:00</option>
                            <option value="01:00">01:00</option>
                            <option value="02:00">02:00</option>
                            <option value="03:00">03:00</option>
                            <option value="04:00">04:00</option>
                            <option value="05:00">05:00</option>
                            <option value="06:00">06:00</option>
                            <option value="07:00">07:00</option>
                            <option value="08:00">08:00</option>
                            <option value="09:00">09:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="16:00">16:00</option>
                            <option value="17:00">17:00</option>
                            <option value="18:00">18:00</option>
                            <option value="19:00">19:00</option>
                            <option value="20:00">20:00</option>
                            <option value="21:00">21:00</option>
                            <option value="22:00">22:00</option>
                            <option value="23:00">23:00</option>
                        </select>
                        <button type="button" name="nuevaRestriccionCuidador" id="nuevaRestriccionCuidador">Añadir</button>
                        <textarea name="restriccionesCuidador" id="restriccionesCuidador" readonly rows="5" class="fillinput"></textarea>
                        <label for="fotoCuidador">Foto: </label>
                        <input type="hidden" value="/resources/imagenes/cuidadores/000001.jpg" name="pathImgCuidador" id="pathImgCuidador" />
                        <p id="fotoCuidadorError" class="errorCampo off"></p>
	                    <img src="" id="fotoCuidadorImg" width="100" height="100" />
	                    <input type="file" name="fotoCuidador" id="fotoCuidador" class="on" />
	                    <button formmethod="post" formenctype="multipart/form-data" formtarget="enviaFotoCuidador" formaction="/cuidadores/cambiarFoto" type="submit" name="sbmEnviaFotoCuidador" id="sbmEnviaFotoCuidador">Subir foto</button>
                        <iframe id="enviaFotoCuidador" name="enviaFotoCuidador" class="off"></iframe>
                        <label for="cuidadorPorDefecto"> ¿Es cuidador por defecto?</label>
                        <input type="checkbox" name="cuidadorPorDefecto" id="cuidadorPorDefecto" value="SI" />
                        <label for="aceptaCondicionesCuidador">Acepto condiciones de uso</label>
                        <p id="aceptaCondicionesCuidadorError" class="errorCampo off"></p>
                        <input type="checkbox" name="aceptaCondicionesCuidador" id="aceptaCondicionesCuidador" value="si" />
                        <a href="#" id="leerCondicionesCuidador">Visualizar terminos y condiciones de uso</a>
                        <!--  Campos ocultos -->
                        <input id="idCuidador" name="idCuidador" type="hidden" />
                        <input id="idResidente" name="idResidente" type="hidden" />
                        <!-- Fin de Campos ocultos -->
                        <button type="button" name="enviarDatosCuidador" id="enviarDatosCuidador">Confirmar</button>
                        <button type="button" name="cancelarDatosCuidador" id="cancelarDatosCuidador">Cancelar</button>
                    </form>
                </section>
            </article>
            <article id="casas" class="seccion off">
            </article>
        </div>
        <aside id="residentesItems">
        	<ul>
        		<li>
        			<a href="#">
        				<img alt="Jose Maria Perez Burrull" title="Jose Maria Perez Burrull" src="resources/imagenes/residentes/000001.jpg" />
        			</a>
        		</li>
        		<li>
        			<a href="#">
        				<img alt="Maria Parabanicos" title="Maria Parabanicos" src="resources/imagenes/residentes/000001.jpg" />
        			</a>
        		</li>
        	</ul>
        </aside>
  </div>
</body>
</html>