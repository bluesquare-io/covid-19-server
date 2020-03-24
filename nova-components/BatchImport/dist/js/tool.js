/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

Nova.booting(function (Vue, router, store) {
    router.addRoutes([{
        name: 'BatchImport',
        path: '/batch-import',
        component: __webpack_require__(3)
    }, {
        name: 'batch-import-preview',
        path: '/batch-import/preview/:file',
        component: __webpack_require__(6),
        props: function props(route) {
            return {
                file: route.params.file
            };
        }
    }, {
        name: 'batch-import-review',
        path: '/batch-import/review/:file',
        component: __webpack_require__(9),
        props: function props(route) {
            return {
                file: route.params.file
            };
        }
    }]);
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(4)
/* template */
var __vue_template__ = __webpack_require__(5)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Tool.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68ff5483", Component.options)
  } else {
    hotAPI.reload("data-v-68ff5483", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            file: ''
        };
    },

    methods: {
        handleFile: function handleFile(e) {
            this.file = this.$refs.file.files[0];
        },
        upload: function upload(e) {
            var formData = new FormData();
            var self = this;
            formData.append('file', this.file);

            Nova.request().post('/nova/batch-import/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function (response) {
                self.$router.push({ name: 'batch-import-preview', params: { file: response.data.file } });
            }).catch(function (e) {
                self.$toasted.show(e.response.data.message, { type: "error" });
            });
        }
    }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("heading", { staticClass: "mb-6" }, [_vm._v("Import CSV")]),
      _vm._v(" "),
      _c(
        "card",
        {
          staticClass: "flex flex-col items-center justify-center",
          staticStyle: { "min-height": "250px" }
        },
        [
          _c("input", {
            ref: "file",
            attrs: { type: "file", name: "file" },
            on: { change: _vm.handleFile }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "italic mt-2" }, [
            _vm._v("Maximum 10 000 lignes par fichier")
          ]),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "btn btn-default btn-primary mt-4",
              attrs: { type: "submit" },
              on: { click: _vm.upload }
            },
            [_vm._v("Importer")]
          )
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-68ff5483", module.exports)
  }
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(7)
/* template */
var __vue_template__ = __webpack_require__(8)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Preview.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-eaf22da6", Component.options)
  } else {
    hotAPI.reload("data-v-eaf22da6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    mounted: function mounted() {
        var self = this;
        self.loading = true;

        Nova.request().get('/nova/batch-import/preview/' + this.file).then(function (response) {
            self.headings = response.data.headings;
            self.rows = response.data.sample;
            self.resources = response.data.resources;
            self.total_rows = response.data.total_rows;
            self.fields = response.data.fields;

            self.headings.forEach(function (heading) {
                self.$set(self.mappings, heading, "");
            });

            self.loading = false;
        });
    },
    data: function data() {
        return {
            loading: false,
            headings: [],
            rows: [],
            resources: [],
            fields: [],
            resource: '',
            mappings: {}
        };
    },

    props: ['file'],
    watch: {
        resource: function resource(_resource) {
            var self = this;

            // Reset all of the headings to blanks
            this.headings.forEach(function (heading) {
                self.$set(self.mappings, heading, "");
            });

            if (_resource === "") {
                return;
            }

            // For each field of the resource, try to find a matching heading and pre-assign
            this.fields[_resource].forEach(function (field_config) {
                var field = field_config.attribute,
                    heading_index = self.headings.indexOf(field);

                if (heading_index < 0) {
                    return;
                }

                var heading = self.headings[heading_index];

                if (heading === field) {
                    self.$set(self.mappings, heading, field);
                }
            });
        }
    },
    methods: {
        runImport: function runImport() {
            var _this = this;

            var self = this;

            if (!this.hasValidConfiguration()) {
                return;
            }

            var button = document.getElementById('run-import');
            button.innerHTML = 'En cours d\'import...';
            button.setAttribute("disabled", "disabled");

            var data = {
                resource: this.resource,
                mappings: this.mappings
            };

            Nova.request().post(this.url('import/' + this.file), data).then(function (response) {
                if (response.data.result === 'success') {
                    self.$toasted.show('Toutes les données ont été importées !', { type: "success" });
                    _this.$router.push({ name: 'batch-import-review', params: { file: self.file, resource: self.resource } });
                } else {
                    button.innerHTML = 'Importer &rightarrow;';
                    button.removeAttribute("disabled");
                    self.$toasted.show('Des problèmes sont survenus lors de l\'importation de certaines de vos données', { type: "error" });
                }
            });
        },
        hasValidConfiguration: function hasValidConfiguration() {
            var mappedColumns = [],
                mappings = this.mappings;

            Object.keys(mappings).forEach(function (key) {
                if (mappings[key] !== "") {
                    mappedColumns.push(key);
                }
            });

            return this.resource !== '' && mappedColumns.length > 0;
        },
        url: function url(path) {
            return '/nova/batch-import/' + path;
        }
    },
    computed: {
        disabledImport: function disabledImport() {
            return !this.hasValidConfiguration();
        }
    }
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("heading", { staticClass: "mb-6" }, [_vm._v("Import CSV")]),
      _vm._v(" "),
      _vm.loading
        ? _c(
            "card",
            {
              staticClass: "flex flex-col",
              staticStyle: { "min-height": "300px" }
            },
            [
              _c("div", { staticClass: "p-8" }, [
                _c("h2", { staticClass: "pb-4" }, [_vm._v("Preview")]),
                _vm._v(" "),
                _c("p", { staticClass: "pb-4" }, [
                  _vm._v("En cours de traitement...")
                ])
              ])
            ]
          )
        : _c(
            "card",
            {
              staticClass: "flex flex-col",
              staticStyle: { "min-height": "300px" }
            },
            [
              _c("div", { staticClass: "p-8" }, [
                _c("h2", { staticClass: "pb-4" }, [_vm._v("Preview")]),
                _vm._v(" "),
                _c("p", { staticClass: "pb-4" }, [
                  _c("b", [_vm._v(_vm._s(_vm.headings.length))]),
                  _vm._v(" colonne(s) et "),
                  _c("b", [_vm._v(_vm._s(_vm.total_rows))]),
                  _vm._v(
                    "\n                ligne(s) ont été découvertes dans le fichier importé.\n            "
                  )
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "pb-4" }, [
                  _vm._v(
                    "\n                Sélectionnez une ressource dans laquelle les importer et faites correspondre les en-têtes du CSV aux champs appropriés de la ressource.\n            "
                  )
                ]),
                _vm._v(" "),
                _c("h2", { staticClass: "py-4" }, [_vm._v("Ressource")]),
                _vm._v(" "),
                _c("p", { staticClass: "pb-4" }, [
                  _vm._v(
                    "Sélectionnez une ressource dans laquelle importer vos données :"
                  )
                ]),
                _vm._v(" "),
                _c("div", [
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.resource,
                          expression: "resource"
                        }
                      ],
                      staticClass: "block form-control form-select",
                      attrs: { name: "resource" },
                      on: {
                        change: function($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function(o) {
                              return o.selected
                            })
                            .map(function(o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.resource = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        }
                      }
                    },
                    [
                      _c("option", { attrs: { value: "" } }, [
                        _vm._v("- Sélectionnez une ressource -")
                      ]),
                      _vm._v(" "),
                      _vm._l(_vm.resources, function(label, index) {
                        return _c("option", { domProps: { value: index } }, [
                          _vm._v(_vm._s(label))
                        ])
                      })
                    ],
                    2
                  )
                ])
              ]),
              _vm._v(" "),
              _c("table", { staticClass: "table w-full" }, [
                _c("thead", [
                  _c(
                    "tr",
                    _vm._l(_vm.headings, function(heading) {
                      return _c("th", [_vm._v(_vm._s(heading))])
                    }),
                    0
                  )
                ]),
                _vm._v(" "),
                _c(
                  "tbody",
                  [
                    _c(
                      "tr",
                      _vm._l(_vm.headings, function(heading) {
                        return _c("td", { staticClass: "text-center" }, [
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.mappings[heading],
                                  expression: "mappings[heading]"
                                }
                              ],
                              staticClass: "w-full form-control form-select",
                              on: {
                                change: function($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function(o) {
                                      return o.selected
                                    })
                                    .map(function(o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.mappings,
                                    heading,
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                }
                              }
                            },
                            [
                              _c("option", { attrs: { value: "" } }, [
                                _vm._v("- Ignorer cette colonne -")
                              ]),
                              _vm._v(" "),
                              _vm._l(_vm.fields[_vm.resource], function(field) {
                                return _c(
                                  "option",
                                  { domProps: { value: field.attribute } },
                                  [_vm._v(_vm._s(field.name))]
                                )
                              })
                            ],
                            2
                          )
                        ])
                      }),
                      0
                    ),
                    _vm._v(" "),
                    _vm._l(_vm.rows, function(row) {
                      return _c(
                        "tr",
                        _vm._l(row, function(col) {
                          return _c("td", [_vm._v(_vm._s(col))])
                        }),
                        0
                      )
                    })
                  ],
                  2
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "bg-30 flex px-8 py-4" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-default btn-primary",
                    attrs: { disabled: _vm.disabledImport, id: "run-import" },
                    on: { click: _vm.runImport }
                  },
                  [_vm._v("Importer → ")]
                )
              ])
            ]
          )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-eaf22da6", module.exports)
  }
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = null
/* template */
var __vue_template__ = __webpack_require__(10)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Review.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-097b3983", Component.options)
  } else {
    hotAPI.reload("data-v-097b3983", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("heading", { staticClass: "mb-6" }, [_vm._v("Import CSV")]),
      _vm._v(" "),
      _c(
        "card",
        {
          staticClass: "flex flex-col items-center justify-center",
          staticStyle: { "min-height": "300px" }
        },
        [
          _c("h1", { staticClass: "pb-4" }, [_vm._v("Import terminé !")]),
          _vm._v(" "),
          _c("p", { staticClass: "pb-4" }, [
            _vm._v("Toutes vos données ont été importées avec succès.")
          ]),
          _vm._v(" "),
          _c("a", { attrs: { href: "/nova/batch-import/" } }, [
            _c("button", { staticClass: "btn btn-default btn-primary mt-4" }, [
              _vm._v("Télécharger un nouveau fichier")
            ])
          ])
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-097b3983", module.exports)
  }
}

/***/ })
/******/ ]);