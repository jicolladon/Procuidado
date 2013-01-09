
var procuidado = procuidado || {};
procuidado.modulos = procuidado.modulos || {};
(function (win, doc, mod, utils, _und_){
    "use strict";
    /**
     * Modulo principal, controla las vistas globalmente
     */
    mod.principal = (function () {
    	var _init, _initDOMVars, _switchView,
    		_oContenido, _aSecciones, _mostrar, _ocultar, _quitarPonerClase;
    	
    	/**
    	 * Inicializa las variables del DOM
    	 */
    	_initDOMVars = function () {
    		_oContenido = doc.getElementById("contenido");
    		_aSecciones = utils.dom.cssQuery(_oContenido, ".seccion");
    	};

    	/**
    	 * Inicializa el modulo
    	 */
    	_init = function () {
    		_initDOMVars();
    	};
    	
    	/**
    	 * Conmuta de una vista a otra
    	 * 
    	 * @param {Object} oView Vista a mostrar
    	 */
    	_switchView = function (oView) {
    		var nIndex = 0, nLength = _aSecciones.length, oElementoSeccion;
    		for (; nIndex < nLength; nIndex++) {
    			oElementoSeccion = _aSecciones[nIndex];
    			utils.dom.removeClass(oElementoSeccion, "on");
    			utils.dom.addClass(oElementoSeccion, "off");
    			if (oElementoSeccion === oView) {
    				utils.dom.removeClass(oElementoSeccion, "off");
    				utils.dom.addClass(oElementoSeccion, "on");
    			}
    		}
    	};
    	
    	/**
    	 * Muestra un elemento, asigna la clase on y quita la clase off
    	 * 
    	 * @param {Object} oElemento Elemento del DOM
    	 */
    	_mostrar = function (oElemento) {
    		_quitarPonerClase(oElemento, "off", "on");
    	};
    	
    	/**
    	 * Oculta un elemento asignando la clase off y quitando la clase on
    	 * 
    	 * @param {Object} oElemento Elemento del DOM
    	 */
    	_ocultar = function (oElemento) {
    		_quitarPonerClase(oElemento, "on", "off");
    	};
    	
    	
    	/**
    	 * Quita una clase y pone otra
    	 * 
    	 * @param {Object} oElemento Elemento del DOM
    	 * @param {String} sClaseAQuitar Clase que se borrara
    	 * @param {String} sClaseAPoner Clase que se insertara
    	 */
    	_quitarPonerClase = function (oElemento, sClaseAQuitar, sClaseAPoner) {
        		utils.dom.removeClass(oElemento, sClaseAQuitar);
        		utils.dom.addClass(oElemento, sClaseAPoner);
    	};
    	
    	return {
    		init : _init,
    		switchView : _switchView,
    		mostrar : _mostrar,
    		ocultar : _ocultar
    	};
    }());
    mod.cuidadores = (function (){
        var _init, _initEvents, _initDOMVars, _verCondiciones,
            _nuevaRestriccion,
            _oBtnNuevaRestriccion, _switchCuidadores,
            _oBtnEnviar, _oModal, _oVerCondiciones,
            _oMenuItem, _oView, _nIdResidente=1, _putCuidadores,
            _oCuidadoresActuales, 
            _sCondiciones, _accionCuidadorActual, _mostrarEditarCuidador, _oDatosCuidador,
            _oTituloDatosCuidador, _oFormCuidador, _oFotoCuidador,
            _oConfirmarDatosCuidador, _confirmarDatosCuidador,
            _refrescarCuidadores, _quitarErroresFormulario,
            _putRestricciones, _fotoActualizada;
        
        _sCondiciones = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet vehicula felis. Sed luctus porttitor nisi, sit amet varius nisl semper ut. Nam tempor magna turpis. Praesent ornare erat ut augue faucibus congue. Proin elementum iaculis massa, vitae aliquam nisi congue sit amet. Morbi euismod convallis consequat. Vestibulum laoreet, massa sed adipiscing condimentum, diam ligula commodo massa, vel sodales urna purus in nunc. Etiam sit amet elementum arcu. Maecenas a ipsum arcu, a rhoncus eros. In hac habitasse platea dictumst. Fusce eu dui vitae tortor volutpat tempor vel ut nulla. Nullam facilisis mauris eu velit vestibulum ac sodales justo porttitor." +
        "Aliquam odio justo, tincidunt et dictum eget, semper nec velit. Morbi fringilla lorem in mi mollis eleifend. Etiam in volutpat elit. Donec lobortis dictum massa, egestas suscipit lectus adipiscing in. Vestibulum consequat semper suscipit. Donec vulputate orci eget odio ornare aliquet. Quisque consectetur mattis neque in rhoncus. Praesent libero nibh, lobortis sit amet ultrices vel, vulputate ac lorem."
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam volutpat leo sit amet leo fringilla ornare. Aliquam adipiscing mattis lectus eget euismod. Integer hendrerit nibh enim, id scelerisque massa. Nullam pharetra, nunc et elementum hendrerit, diam metus consequat mi, at aliquet nisl eros pulvinar nisi. Sed pellentesque orci et arcu adipiscing id vestibulum quam venenatis. Ut ullamcorper tortor vel ante fermentum convallis. Proin varius nisl in magna sagittis eleifend. Ut eu quam in magna ultrices bibendum. Nam rhoncus, odio vel imperdiet mattis, massa ligula lobortis turpis, sit amet pellentesque turpis nibh eget dolor."
        "Integer pellentesque dapibus mauris nec sollicitudin. Vivamus eu luctus lacus. Aenean semper orci vel orci ullamcorper et iaculis neque vulputate. Sed id eros sit amet mauris tempus cursus. Suspendisse sed urna eu nulla fermentum consectetur. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed consequat orci a dui vestibulum adipiscing. Quisque in mi ut quam egestas aliquet nec id leo. Donec dapibus aliquam sem, vitae fermentum dui bibendum a. Maecenas pretium, risus quis aliquet malesuada, libero felis malesuada mauris, ut dignissim nisi neque vitae nulla. Donec lorem urna, elementum a sollicitudin id, pulvinar nec nibh. Praesent magna nisi, tempus et sollicitudin eget, porta ac lacus. Etiam posuere, diam sagittis dictum fermentum, enim turpis auctor arcu, non molestie leo urna sit amet leo."+
        "Quisque non tellus nec odio dapibus sodales ac vitae eros. Donec iaculis placerat fermentum. Nam ac neque orci, sed hendrerit risus. Integer dignissim imperdiet volutpat. Donec rutrum placerat vestibulum. Aenean tristique rutrum rhoncus. Proin volutpat convallis vestibulum. Quisque ac varius justo. Sed turpis justo, lacinia molestie venenatis non, pretium at massa. Maecenas condimentum ipsum id tortor fringilla sed eleifend sem iaculis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque eros leo, luctus sit amet porta et, interdum ac nisi.";
        
        /**
         * Añade una nueva restricción al textarea de restricciones
         */
        _nuevaRestriccion = function () {
            doc.getElementById("restriccionesCuidador").value += 
            doc.getElementById("diaRestriccionCuidador").value + " de " +
            doc.getElementById("horaDesdeRestriccionCuidador").value + " a " +
            doc.getElementById("horaHastaRestriccionCuidador").value + "\n";
        };

        /**
         * Visualiza las condiciones de uso para un cuidador
         */
        _verCondiciones = function (oEvt) {
            var oEvent = oEvt || window.event;
            oEvent.preventDefault();
            mod.modal.open(_sCondiciones);
        };
        
        /**
         * Muestra la seccion de cuidadores en la pantalla principal
         * 
         * @param {Object} Objeto de evento
         */
        _switchCuidadores = function (oEvent) {
        	oEvent = oEvent || window.event;
        	oEvent.preventDefault();
        	mod.principal.switchView(_oView);
        	_refrescarCuidadores();
        };
        
        /**
         * Pide los cuidadores al servidor y los actualiza
         */
        _refrescarCuidadores = function () {
        	mod.principal.ocultar(_oDatosCuidador);
        	utils.ajax("/residentes/consultaCuidadores/" + mod.residentes.idResidenteActual(), {
        		success : _putCuidadores,
        		error : function (oData) {
        			alert("Se ha producido un error");
        			console.dir(oData);
        		}
        	});
        }
        
        /**
         * Añade los cuidadores a la lista de cuidadores actuales
         * 
         * @param {Array} aData Array que contiene la lista de cuidadores
         */
        _putCuidadores = function (aData) {
        	var nLength = aData.length || 0, nIndex = 0, oCuidador, sHTML = "";
        	sHTML = '<header>';
    		sHTML += '<h1>Cuidadores actuales</h1>';
    	    sHTML += '</header>';
    	    sHTML += '<ul>';
        	for (; nIndex < nLength; nIndex++) {
        		oCuidador = aData[nIndex];
        		sHTML += '	<li id="id-'+ oCuidador.id +'">';
        		sHTML += '		<figure class="fotoItem">';
        		sHTML += '			<img src="' + oCuidador.pathImg + '" />';
        		sHTML += '			<div>';
        		sHTML += '				<a href="#" class="editarCuidador" title="Editar"><img src="resources/imagenes/ui-edit-icon.png" width="40" /></a>';
        		sHTML += '				<a href="#" class="borrarCuidador" title="Borrar"><img src="resources/imagenes/ui-delete-icon.png" width="40" /></a>';
                sHTML += '			</div>';
                sHTML += '			<figcaption>' + oCuidador.nombre + '</figcaption>';
                sHTML += '		</figure>';
                sHTML += '	</li>';

        	}
            sHTML += '	<li>';
            sHTML += '		<figure>';
            sHTML += '			<a href="#" class="crearCuidador"><img src="resources/imagenes/ui-person-add-icon.png" /></a>';
            sHTML += '			<figcaption></figcaption>';
            sHTML += '		</figure>';
            sHTML += '	</li>';
            sHTML += '</ul>';
            _oCuidadoresActuales.innerHTML = sHTML;
        };

        /**
         * Accion que se realiza al hacer click sobre un cuidador actual
         * 
         * @param {Object} oEvent Objeto de evento
         */
        _accionCuidadorActual = function (oEvent) {
        	var oTarget, oParent, idCuidador, sClassLink;
        	oEvent = oEvent || window.event;
        	oEvent.preventDefault();
        	oTarget = oEvent.target || oEvent.srcElement;
        	oParent = oTarget;
        	//Buscamos el padre <li>
        	while (oParent.nodeName !== "LI") {
        		oParent = oParent.parentNode;
        		if (oParent.nodeName === "A")
        			sClassLink = oParent.className; 
        	}
        	//obtenemos el id del cuidador
        	idCuidador = oParent.id;
        	if (idCuidador !== _und_) {
        		idCuidador = idCuidador.replace("id-", "");
        	}
        	if (sClassLink.indexOf("editarCuidador") !== -1) {
        		//Hacemos la peticion al servidor
        		utils.ajax("/cuidadores/" + idCuidador, {
        			success : _mostrarEditarCuidador,
        			error : function (oData) {
        				alert("Se ha producido un error");
        				console.dir(oData);
        			}
        		});
        	} else if (sClassLink.indexOf("crearCuidador") !== -1) {
        		_quitarErroresFormulario();
        		utils.dom.removeClass(_oDatosCuidador, "off");
        		_oFormCuidador.reset();
        		_oFormCuidador.idResidente.value = mod.residentes.idResidenteActual();
        		_oTituloDatosCuidador.innerText = "Nuevo cuidador";
        		utils.dom.removeClass(doc.getElementById("datosLoginCuidador"), "off");
        		utils.dom.addClass(doc.getElementById("datosLoginCuidador"), "on");
        		utils.dom.removeClass(_oFotoCuidador, "on");
        		utils.dom.addClass(_oFotoCuidador, "off");
        	} else if (sClassLink.indexOf("borrarCuidador") !== -1) {
        		if (confirm("¿Estas seguro de querer eliminar este cuidador?")) {
	        		utils.ajax("/cuidadores/borrar/" + idCuidador, {
	        			success : function () {
	        				mod.modal.open("<h1>Cuidador eliminado con exito</h1>");
	        				_refrescarCuidadores();
	        			},
	        			error : function (oData) {
	        				alert("Se ha producido un error al intentar eliminar el cuidador");
	        				console.dir(oData);
	        			}
	        		});
        		}
        	}
        };
        
        /**
         * Muestra el formulario del cuidador y lo rellena con sus datos
         * 
         * @param {Object} oCuidador El cuidador que se debe mostrar para editar
         */
        _mostrarEditarCuidador = function (oCuidador) {
        	var oDatosLogin = doc.getElementById("datosLoginCuidador");
        	_quitarErroresFormulario();
        	mod.principal.mostrar(_oDatosCuidador);
        	_oTituloDatosCuidador.innerText = "Editar cuidador";
        	_oFormCuidador.reset();
        	mod.principal.ocultar(oDatosLogin);
        	_oFormCuidador.nombreCuidador.value = oCuidador.nombre || "";
        	_oFormCuidador.apellidosCuidador.value = oCuidador.apellidos || "";
        	_oFormCuidador.tipoDocumentoCuidador.value = oCuidador.tipoDocumento || "";
        	_oFormCuidador.numeroDocumentoCuidador.value = oCuidador.numeroDocumento || "";
        	_oFormCuidador.numeroTelefonoCuidador.value = oCuidador.numeroTelefono || "";
        	_oFormCuidador.cuidadorPorDefecto.checked = oCuidador.cuidadorPorDefecto === "SI";
        	_oFotoCuidador.src = oCuidador.pathImg || "";
        	_oFormCuidador.idCuidador.value = oCuidador.id;
        	_putRestricciones(oCuidador.restricciones);
        	mod.principal.mostrar(_oFotoCuidador);
        };
        
        /**
         * Introduce las restricciones en el elemento del DOM correspondiente
         * 
         * @param {Array} aRestricciones Array de restricciones
         */
        _putRestricciones = function (aRestricciones) {
        	var nLength = aRestricciones.length, nIndex = 0,
        		oElemento = doc.getElementById("restriccionesCuidador"),
        		sTexto = "", oRestriccion;
        	for (; nIndex < nLength; nIndex++) {
        		oRestriccion = aRestricciones[nIndex],
        		sTexto += oRestriccion.diaSemana + " de ";
        		sTexto += oRestriccion.horaInicio + " a ";
        		sTexto += oRestriccion.horaFin;
        		sTexto += "\n";
        	}
        	oElemento.value = sTexto;
        };
        
        /**
         * Salva los datos del formulario
         */
        _confirmarDatosCuidador = function () {
        	var sUrl, oValidacion;
        	_quitarErroresFormulario();
        	//validamos el formulario
        	oValidacion = {
        		"nombreUsuario" : {
        			type : "string",
        			empty : false,
        			wrongCallback : function () {
        				var oElemento = doc.getElementById("nombreUsuarioError");
        				oElemento.innerText = "El campo no puede ser vacio";
        				mod.principal.mostrar(oElemento);
        			}
        		},
        		"contraUsuario" : {
        			type : "string",
        			empty : false,
        			wrongCallback : function () {
        				var oElemento = doc.getElementById("contraUsuarioError");
        				oElemento.innerText = "El campo no puede ser vacio";
        				mod.principal.mostrar(oElemento);
        			}
        		},
        		"nombreCuidador" : {
        			type : "string",
        			empty : false,
        			wrongCallback : function () {
        				var oElemento = doc.getElementById("nombreCuidadorError");
        				oElemento.innerText = "El campo no puede ser vacio";
        				mod.principal.mostrar(oElemento);
        			}
        		},
        		"apellidosCuidador" : {
        			type : "string",
        			empty : false,
        			wrongCallback : function () {
        				var oElemento = doc.getElementById("apellidosCuidadorError");
        				oElemento.innerText = "El campo no puede ser vacio";
        				mod.principal.mostrar(oElemento);
        			}
        		},
        		"tipoDocumentoCuidador" : {
        			type : "string",
        			empty : false,
        			wrongCallback : function () {
        				var oElemento = doc.getElementById("tipoDocumentoCuidadorError");
        				oElemento.innerText = "El campo no puede ser vacio";
        				mod.principal.mostrar(oElemento);
        			}
        		},
        		"numeroDocumentoCuidador" : {
        			type : "number",
        			empty : false,
        			wrongCallback : function () {
        				var oElemento = doc.getElementById("numeroDocumentoCuidadorError");
        				oElemento.innerText = "El campo no puede ser vacio y ha de ser un numero";
        				mod.principal.mostrar(oElemento);
        			}
        		},
        		"numeroTelefonoCuidador" : {
        			type : "number",
        			empty : false,
        			wrongCallback : function () {
        				var oElemento = doc.getElementById("numeroTelefonoCuidadorError");
        				oElemento.innerText = "El campo no puede ser vacio y ha de ser un numero";
        				mod.principal.mostrar(oElemento);
        			}
        		},
        		"pathImgCuidador" : {
        			type : "string",
        			empty : false,
        			wrongCallback : function () {
        				var oElemento = doc.getElementById("fotoCuidadorError");
        				oElemento.innerText = "El campo no puede ser vacio";
        				mod.principal.mostrar(oElemento);
        			}
        		},
        		"aceptaCondicionesCuidador" : {
        			type : "check",
        			requireTrue : true,
        			wrongCallback : function () {
        				var oElemento = doc.getElementById("aceptaCondicionesCuidadorError");
        				oElemento.innerText = "Tiene que aceptar las condiciones";
        				mod.principal.mostrar(oElemento);
        			}
        		}
        	};
	        	if (_oFormCuidador.idCuidador !== _und_ && _oFormCuidador.idCuidador.value !== "") {
	        		sUrl = "/cuidadores/editar";
	        		delete oValidacion.nombreUsuario;
	        		delete oValidacion.contraUsuario;
	        	} else {
	        		sUrl = "/cuidadores/nuevo";
	        		
	        	}
	        	
	        	if (utils.dom.validateForm(_oFormCuidador, oValidacion).valid) {
	        	utils.ajax(sUrl, {
	    			type: "POST",
	    			success : function (oData) {
	    				mod.modal.open("<h1>La operacion se ha realizado correctamente</h1>");
	    				_oFormCuidador.idCuidador = oData.id;
	    				_oTituloDatosCuidador.innerText = "Editar cuidador";
	    				_refrescarCuidadores();
	    			},
	    			error : function (oData) {
	    				alert("Se ha producido un error al crear el cuidador");
	    				console.dir(oData);
	    			},
	    			data : utils.dom.serializeForm(_oFormCuidador)
	    		});
        	}
        };
        
        /**
         * Oculta los errores en el formulario
         */
        _quitarErroresFormulario = function () {
        	utils.dom.cssQuery(doc, ".errorCampo").each(function () {
        		mod.principal.ocultar(this);
        	});
        };
        
        /**
         * Inicializa los eventos
         */
        _initEvents = function () {
            utils.events.addEvent(_oBtnNuevaRestriccion, "click", _nuevaRestriccion);
            utils.events.addEvent(_oVerCondiciones, "click", _verCondiciones);
            utils.events.addEvent(_oMenuItem, "click", _switchCuidadores);
            utils.events.addEvent(_oCuidadoresActuales, "click", _accionCuidadorActual);
            utils.events.addEvent(_oConfirmarDatosCuidador, "click", _confirmarDatosCuidador);
        };

        /**
         * Inicializa las variables del DOM
         */
        _initDOMVars = function () {
            _oBtnNuevaRestriccion = doc.getElementById("nuevaRestriccionCuidador");
            _oVerCondiciones = doc.getElementById("leerCondicionesCuidador");
            _oMenuItem = doc.getElementById("menuItemCuidadores");
            _oView = doc.getElementById("cuidadores");
            _oCuidadoresActuales = doc.getElementById("cuidadoresActuales");
            _oDatosCuidador = doc.getElementById("datosCuidador");
            _oTituloDatosCuidador = doc.getElementById("tituloDatosCuidador");
            _oFormCuidador = doc.getElementById("formCuidador");
            _oFotoCuidador = doc.getElementById("fotoCuidadorImg");
            _oConfirmarDatosCuidador = doc.getElementById("enviarDatosCuidador");
        };

        /**
         * Inicializa el modulo
         */
        _init = function () {
            _initDOMVars();
            _initEvents();
        };
        
        _fotoActualizada = function (sPathImg) {
        	mod.principal.mostrar(_oFotoCuidador);
        	_oFotoCuidador.src = sPathImg;
        	_oFormCuidador.pathImgCuidador.value = sPathImg;
        };
        
        return {
            init : _init,
            fotoActualizada : _fotoActualizada
        };
    }());

    mod.modal = {
    	/**
    	 * Abre una ventana modal con el HTML indicado
    	 * @param sHTML HTML para mostrar
    	 */
        open : function (sHTML) {
            document.getElementById("modalContent").innerHTML = sHTML;
            document.getElementById("modal").style.visibility = "visible";
        },
        /**
         * Inicializa el modulo
         */
        init : function () {
            utils.events.addEvent(document.getElementById("modalClose"), "click", function (oEvt) {
                var oEvent = oEvt || window.event;
                oEvent.preventDefault();
                document.getElementById("modal").style.visibility = "hidden";
            });
        }
    };
    
    mod.residentes = (function(){
    	var _init, _obtenerResidentes, _nIdCuidador = 1, _putResidentes, _seleccionarResidenteActual, 
    		_nIdResidenteActual, _idResidenteActual, _initDOMVars, _initEvents, _oResidentesListados,
    		_accionSeleccionarResidente, _obtenerResidenteActual,
    		_obtenerCuidadorYResidentes;
    	
    	/**
    	 * Accion que se lleva a cabo al seleccionar un residente
    	 */
    	_accionSeleccionarResidente = function (oEvent) {
    		var oTarget, oParent, nIdResidente, sClassLink;
        	oEvent = oEvent || window.event;
        	oEvent.preventDefault();
        	oTarget = oEvent.target || oEvent.srcElement;
        	oParent = oTarget;
        	//Buscamos el padre <li>
        	while (oParent.nodeName !== "LI") {
        		oParent = oParent.parentNode;
        	}
        	nIdResidente = oParent.id;
        	if (nIdResidente !== _und_) {
        		nIdResidente = nIdResidente.replace("id-", "");
        		_obtenerResidenteActual(nIdResidente);
        	}
    	};
    	
    	/**
    	 * Obtiene un residente del servidor y lo selecciona como residente actual
    	 */
    	_obtenerResidenteActual = function (nIdResidente) {
    		utils.ajax("/residentes/" + nIdResidente, {
    			success : function (oData) { 
    				_seleccionarResidenteActual(oData);
    			},
    			error : function (oData) {
    				alert("Se ha producido un error");
    				console.dir(oData);
    			}
    		});
    	};
    	
    	/**
         * Inicializa las variables del DOM
         */
        _initDOMVars = function () {
        	_oResidentesListados = doc.getElementById("residentesItems");
        };
        
        /**
         * Inicializa los eventos
         */
        _initEvents = function () {
        	utils.events.addEvent(_oResidentesListados, "click", _accionSeleccionarResidente);
        };
        
    	/**
    	 * Introduce los residentes en el DOM
    	 * 
    	 * @param {Array} aData Array con los datos de los residentes
    	 * @param {Boolean} Si es true, tambien se sustituye el residente actual
    	 */
    	_putResidentes = function (aData, bSustituirActual) {
    		var oListaResidentes = _oResidentesListados, sHTML = "",
    			nLength = aData.length, nIndex = 0, oResidente;
    		sHTML += "<ul>";
    		for (; nIndex < nLength; nIndex++) {
    			oResidente = aData[nIndex];
    			sHTML += "<li id=\"id-" + oResidente.id + "\">";
    			sHTML += "<a href=\"#\">";
    			sHTML += "<img alt=\"" + oResidente.nombreYApellido + "\" title=\"" + oResidente.nombreYApellido + "\" src=\"" + oResidente.pathImg + "\" />";
    			sHTML += "</a>";
    			sHTML += "</li>";
    		}
    		sHTML += "</ul>";
    		oListaResidentes.innerHTML = sHTML;
    		if (bSustituirActual) {
    			if (aData[0] !== _und_) {
    				_seleccionarResidenteActual(aData[0]);
    			}
    		}
    	};
    	
    	/**
    	 * Introduce en el DOM los datos del residente actual basandose en el residente pasado por parametro
    	 * 
    	 * @param {Object} oResidente El residente que sera considerado el actual
    	 */
    	_seleccionarResidenteActual = function (oResidente) {
    		var oNombreYApellidos = doc.getElementById("nombreYApellidosResidenteActual"),
				oImagenResidente = doc.getElementById("imagenResidenteActual");

    		oNombreYApellidos.innerText = oResidente.nombreYApellido;
			oImagenResidente.src = oResidente.pathImg;
			oImagenResidente.alt = oResidente.nombreYApellido;
			oImagenResidente.title = oResidente.nombreYApellido;
			_nIdResidenteActual = oResidente.id;
    	}
    	
    	/**
    	 * Obtener residentes del server
    	 */
    	_obtenerResidentes = function () {
    		utils.ajax("/cuidadores/consultaResidentes/" + _nIdCuidador, {
    			success : function (oData) { 
    				_putResidentes(oData, true); 
    			},
    			error : function (oData) {
    				alert("Se ha producido un error");
    				console.dir(oData);
    			}
    		});
    	};
    	
    	/**
    	 * Obtener primer cuidador del server y sus residentes
    	 */
    	_obtenerCuidadorYResidentes = function () {
    		utils.ajax("/cuidadores/primero", {
    			success : function (oData) {
    				_nIdCuidador = oData.id;
    				_obtenerResidentes();
    			},
    			error : function (oData) {
    				alert("Error al obtener usuario");
    				console.dir(oData);
    			}
    		});
    	}
    	
    	/**
    	 * Obtener la id del residente actual
    	 * 
    	 * @return {Number} Id del residente actual
    	 */
    	_idResidenteActual = function () {
    		return _nIdResidenteActual;
    	}
    	
    	_init = function () {
    		_initDOMVars();
    		_initEvents();
    		_obtenerCuidadorYResidentes();
    	};
    	return {
    		init : _init,
    		idResidenteActual : _idResidenteActual
    	};
    }());
}(window, document, procuidado.modulos, procuidado.utils));