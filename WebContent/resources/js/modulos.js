
var procuidado = procuidado || {};
procuidado.modulos = procuidado.modulos || {};
(function (win, doc, mod, utils, _und_){
    "use strict";
    mod.principal = (function () {
    	var _init, _initDOMVars, _switchView,
    		_oContenido, _aSecciones;
    	
    	_initDOMVars = function () {
    		_oContenido = doc.getElementById("contenido");
    		_aSecciones = utils.dom.cssQuery(_oContenido, ".seccion");
    	};

    	_init = function () {
    		_initDOMVars();
    	};
    	
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
    	
    	return {
    		init : _init,
    		switchView : _switchView
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
            _oTituloDatosCuidador, _oFormCuidador, _oFotoCuidador;
        
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
        	utils.ajax("/cuidadores?idResidente=" + _nIdResidente, {
        		success : _putCuidadores,
        		error : function (oData) {
        			alert("Se ha producido un error");
        			console.dir(oData);
        		}
        	});
        };
        
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
            sHTML += '			<img src="resources/imagenes/ui-person-add-icon.png" />';
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
        	if (idCuidador !== _und_ && sClassLink.indexOf("editarCuidador") !== -1) {
        		idCuidador = idCuidador.replace("id-", "");
        		//Hacemos la peticion al servidor
        		utils.ajax("/cuidadores/" + idCuidador, {
        			success : _mostrarEditarCuidador,
        			error : function (oData) {
        				alert("Se ha producido un error");
        				console.dir(oData);
        			}
        		});
        	}
        };
        
        /**
         * Muestra el formulario del cuidador y lo rellena con sus datos
         * 
         * @param {Object} oCuidador El cuidador que se debe mostrar para editar
         */
        _mostrarEditarCuidador = function (oCuidador) {
        	utils.dom.removeClass(_oDatosCuidador, "off");
        	_oTituloDatosCuidador.innerText = "Editar cuidador";
        	_oFormCuidador.reset();
        	utils.dom.addClass(doc.getElementById("datosLoginCuidador"), "off");
        	_oFormCuidador.nombreCuidador.value = oCuidador.nombre;
        	_oFormCuidador.apellidosCuidador.value = oCuidador.apellidos;
        	_oFormCuidador.tipoDocumentoCuidador.value = oCuidador.tipoDocumento;
        	_oFormCuidador.numeroDocumentoCuidador.value = oCuidador.numeroDocumento;
        	_oFormCuidador.numeroTelefonoCuidador.value = oCuidador.numeroTelefono;
        	_oFotoCuidador.src = oCuidador.pathImg;
        	utils.dom.removeClass(_oFotoCuidador, "off");
        };
        
        /**
         * Inicializa los eventos
         */
        _initEvents = function () {
            utils.events.addEvent(_oBtnNuevaRestriccion, "click", _nuevaRestriccion);
            utils.events.addEvent(_oVerCondiciones, "click", _verCondiciones);
            utils.events.addEvent(_oMenuItem, "click", _switchCuidadores);
            utils.events.addEvent(_oCuidadoresActuales, "click", _accionCuidadorActual);
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
            _oFotoCuidador = doc.getElementById("fotoCuidador");
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
}(window, document, procuidado.modulos, procuidado.utils));