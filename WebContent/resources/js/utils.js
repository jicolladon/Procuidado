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
	
	utils.each = function (aArray, fpCallback) {
		var nIndex = 0, nLength = aArray.length;
		for (; nIndex < nLength; nIndex++) {
			fpCallback.call(aArray[nIndex]);
		}
	};
	
	utils.dom = (function () {
		var _addClass, _hasClass, _removeClass, _cssQuery, _serializeForm, _installEach;
		
		/**
		 * Devuelve la expresion regular para encontrar una clase css
		 */
		_getRegExpHasClass = function (sClassName) {
			return new RegExp("^" + sClassName + "\\s|\\s" + sClassName + "$|\\s" + sClassName + "\\s|^" + sClassName + "$");
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
			var aResult;
			
			if (oElement !== _und_) {
				if (typeof doc.querySelectorAll === "function"){
					this.cssQuery = function (oElement, sQuery) {
						return _installEach(oElement.querySelectorAll(sQuery));
					};
				} else {
					this.cssQuery = function (oElement, sQuery) {
						return _installEach($(oElement).find(sQuery).makeArray());
					};
				}
				return this.cssQuery(oElement, sQuery);
			}
		};
		
		/**
		 * Añade la funcion each de utils en el elemento
		 * 
		 * @param {Object} oElement Elemento al cual se le quiere añadir la funcion
		 * @return {Object} Elemento con la funcion each añadida (La misma referencia)
		 */
		_installEach = function (oElement) {
			oElement.each = function (fpCallback) {
				utils.each(this, fpCallback);
			};
			return oElement;
		};
		
		/**
		 * Serializa el formulario
		 */
		_serializeForm = function (oForm) {
			return $(oForm).serialize();
		};
		
		/**
		 * Valida un formulario
		 * 
		 * @param {Object} oForm Formulario del DOM
		 * @param {Array} aFieldSchema Definición de los campos
		 * ej: { 
		 * 		nombre : { 
		 * 			empty : false, 
		 * 			type : "number"
		 * 			negative : false
		 * 			emptyMessage : "El campo no puede ser vacio"
		 * 			negativeMessage : "El numero ha de ser positivo"
		 * 			wrongTypeMessage : "El campo ha de ser un numero"
		 * 		}
		 * En este ejemplo se define un campo que no puede estar vacio y el tipo es numerico positivo
		 */
		_validateForm = function (oForm, oFieldSchema) {
			var nLength = oForm.length, nIndex = 0, oField,
				bValido = true, oData = {}, oValue, bTodoValido = true;
			for (; nIndex < nLength; nIndex++) {
				oField = oForm[nIndex];
				oSchema = oFieldSchema[oForm[nIndex].name];
				if (oSchema !== _und_){
					switch (oSchema.type) {
						case "string":
							if (oSchema.empty !== _und_ && oSchema.empty === false) {
								if (oField.value === "") {
									bValido = false;
									oData[oField.name] = oSchema.emptyMessage || "Empty field";
								}
							}
							break;
						case "number":
							if (isNaN(parseInt(oField.value, 10))) {
								bValido = false;
								oData[oField.name] = oSchema.wrongTypeMessage || "Wrong type";
								
							} else {
								if (oSchema.negative !== _und_ && oSchema.negative === false) {
									if (oField.value < 0) {
										bValido = false;
										oData[oField.name] = oSchema.negativeMessage || "Negative number";
									}
								}
							}
							break;
						case "check":
							if (oSchema.requireTrue !== _und_ && oField.checked !== _und_ && oField.checked === false) {
								bValido = false;
								oData[oField.name] = oSchema.requireTrueMessage || "Require true";
							}
							break;
					}
					if (!bValido) {
						if (typeof oSchema.wrongCallback === "function") oSchema.wrongCallback();
						bValido = true;
						bTodoValido = false;
					}
				}
				
			}
			
			oData.valid = bTodoValido;
			return oData;
		};
		return {
			addClass : _addClass,
			hasClass : _hasClass,
			removeClass : _removeClass,
			cssQuery : _cssQuery,
			serializeForm : _serializeForm,
			validateForm : _validateForm
		};
	}());
}(window, document, procuidado.utils, $));