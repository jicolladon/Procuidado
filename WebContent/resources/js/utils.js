var procuidado = procuidado || {};
procuidado.utils = procuidado.utils || {};
(function (win, doc, utils, $, _und_){
	utils.events = (function(){
		return {
			/**
			 * Añade un evento a un nodo (crossbrowser)
			 * @param {Object} oElement Elemento del DOM
			 * @param {String} sName Nombre del evento
			 * @param {Function} Funcion que se ejecutará al producirse el evento
			 */
			addEvent : function (oElement, sName, fpCallback) {
				if (typeof oElement.addEventListener === "function") {
					this.addEvent = function (oElement, sName, fpCallback) {
						oElement.addEventListener(sName, fpCallback, false);
					};
				} else if (typeof oElement.attachEvent === "function") {
					this.addEvent = function (oElement, sName, fpCallback) {
						oElement.attachEvent("on" + sName, fpCallback);
					};
				} else {
					this.addEvent = function (oElement, sName, fpCallback) {
						oElement["on" + sName] = fpCallback;
					};
				}
				this.addEvent(oElement, sName, fpCallback);
			}
		};
	}());
	
	utils.ajax = function (sUrl, oOptions) {
		$.ajax(sUrl, oOptions);
	};
	
	utils.dom = (function () {
		var _addClass, _hasClass, _removeClass;
		
		/**
		 * Devuelve la expresion regular para encontrar una clase css
		 */
		_getRegExpHasClass = function (sClassName) {
			return new RegExp('^' + sClassName + '\s|\s' + sClassName + '$|\s' + sClassName + '\s|^' + sClassName + '$');
		};
		/**
		 * Comprueva si el elemento tiene una clase css
		 * 
		 * @param {Object} oElement Elemento del DOM
		 * @param {String} sClassName Nombre de la clase css
		 * @return {Boolean} True si el elemento tiene la clase css, false en caso contrario.
		 */
		_hasClass = function (oElement, sClassName) {
			return _getRegExpHasClass(sClassName).test(oElement.className);
		};
		
		/**
		 * Añade una clase css al elemento
		 * @param {Object} oElement Elemento del dom
		 * @param {String} sClassName Nombre de la clase
		 */
		_addClass = function (oElement, sClassName) {
			if (!_hasClass(oElement, sClassName)) {
				oElement.className += oElement.className.length === 0 ? "" : " ";
				oElement.className += sClassName;
			}
		};
		
		/**
		 * Borra una clase css al elemento
		 * @param {Object} oElement Elemento del dom
		 * @param {String} sClassName Nombre de la clase
		 */
		_removeClass = function (oElement, sClassName){
			if (_hasClass(oElement, sClassName)) {
				oElement.className = oElement.className.replace(_getRegExpHasClass(sClassName), "");
			}
		};
		
		/**
		 * Selecciona un elemento o array de elementos mediante una consulta css
		 * 
		 * @param {Object} oElement Elemento sobre el cual buscar
		 * @param {String} sQuery Consulta css
		 */
		_cssQuery = function (oElement, sQuery) {
			if (oElement !== _und_) {
				if (typeof doc.querySelectorAll === "function"){
					this.cssQuery = function (oElement, sQuery) {
						return oElement.querySelectorAll(sQuery);
					};
				} else {
					this.cssQuery = function (oElement, sQuery) {
						return $(oElement).find(sQuery).makeArray();
					};
				}
				return this.cssQuery(oElement, sQuery);
			}
		};
		
		return {
			addClass : _addClass,
			hasClass : _hasClass,
			removeClass : _removeClass,
			cssQuery : _cssQuery
		};
	}());
}(window, document, procuidado.utils, $));