
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
            _oCuidadoresActuales, _sCondiciones = "Condiciones bla bla bla",
            _accionCuidadorActual, _mostrarEditarCuidador, _oDatosCuidador,
            _oTituloDatosCuidador, _oFormCuidador, _oFotoCuidador,
            _oConfirmarDatosCuidador, _confirmarDatosCuidador,
            _refrescarCuidadores, _quitarErroresFormulario;
        
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
            mod.modal.open("Condiciones bla bla bla");
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
        	utils.ajax("/cuidadores?idResidente=" + _nIdResidente, {
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
        		_oFormCuidador.idResidente.value = _nIdResidente;
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
        	mod.principal.mostrar(_oFotoCuidador);
        };
        
        /**
         * Salva los datos del formulario
         */
        _confirmarDatosCuidador = function () {
        	var sUrl;
        	_quitarErroresFormulario();
        	//validamos el formulario
        	if (utils.dom.validateForm(_oFormCuidador, {
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
        	}).valid) {
	        	if (_oFormCuidador.idCuidador === _und_ && _oFormCuidador.idCuidador.value !== "") {
	        		sUrl = "/cuidadores/editar"
	        	} else {
	        		sUrl = "/cuidadores/nuevo"
	        	}
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
        	utils.each (utils.dom.cssQuery(doc, ".errorCampo"), function () {
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
        
        
        
        return {
            init : _init
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
    	var _init;
    	
    	_init = function () {
    		
    	};
    	return {
    		init : _init
    	};
    }());
}(window, document, procuidado.modulos, procuidado.utils));