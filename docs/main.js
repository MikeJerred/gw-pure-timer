(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\dev\projects\pure-timer\src\main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "GPpe":
/*!*******************************!*\
  !*** ./src/app/timer.pipe.ts ***!
  \*******************************/
/*! exports provided: TimerPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimerPipe", function() { return TimerPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class TimerPipe {
    transform(value) {
        if (value === null)
            return '-';
        const seconds = Math.floor((value / 1000) % 60);
        const minutes = Math.floor(value / 60000);
        return `${minutes}:${seconds.toPrecision()}`;
    }
}
TimerPipe.ɵfac = function TimerPipe_Factory(t) { return new (t || TimerPipe)(); };
TimerPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "timer", type: TimerPipe, pure: true });


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _timer_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./timer.pipe */ "GPpe");




class AppComponent {
    constructor() {
        this.alcoholTimer = null;
        this.eggTimer = null;
        this.allTimer = null;
        this.buffer = 5000;
        this.tickLength = 100;
        this.alcoholRefreshTime = 2 * 60 * 1000;
        this.eggRefreshTime = 5 * 60 * 1000;
        this.allRefreshTime = 10 * 60 * 1000;
        this.stopAlcohol$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.stopEgg$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.stopAll$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    }
    isDanger(time) {
        return time !== null && time <= this.buffer + 1000;
    }
    startAlcohol() {
        this.stopAlcohol$.next();
        this.alcoholTimer = this.alcoholRefreshTime;
        this.createTimer(this.stopAlcohol$, this.alcoholRefreshTime, 'alkahol').subscribe(timeLeft => {
            this.alcoholTimer = timeLeft;
            if (timeLeft <= 0) {
                this.startAlcohol();
            }
        });
    }
    stopAlcohol() {
        this.stopAlcohol$.next();
        this.alcoholTimer = null;
    }
    startEgg() {
        this.stopEgg$.next();
        this.eggTimer = this.eggRefreshTime;
        this.createTimer(this.stopEgg$, this.eggRefreshTime, 'Egg').subscribe(timeLeft => {
            this.eggTimer = timeLeft;
            if (timeLeft <= 0) {
                this.startEgg();
            }
        });
    }
    stopEgg() {
        this.stopEgg$.next();
        this.eggTimer = null;
    }
    startAll() {
        this.stopAll$.next();
        this.allTimer = this.allRefreshTime;
        this.createTimer(this.stopAll$, this.allRefreshTime, 'Corn').subscribe(timeLeft => {
            this.allTimer = timeLeft;
            if (timeLeft <= 0) {
                this.startAll();
            }
        });
    }
    stopAll() {
        this.stopAll$.next();
        this.allTimer = null;
    }
    createTimer(stop$, refreshTime, text) {
        let state = 100;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["interval"])(this.tickLength).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(ticks => refreshTime - ticks * this.tickLength), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(timeLeft => {
            if (timeLeft < this.buffer + 1000) {
                const currentState = Math.floor(timeLeft / 1000);
                if (state > currentState) {
                    const speechText = state === 100 ? text
                        : currentState > 0 ? `${currentState}`
                            : 'pop ' + text;
                    state = currentState;
                    const utterance = new SpeechSynthesisUtterance(speechText);
                    utterance.rate = 2;
                    window.speechSynthesis.cancel();
                    window.speechSynthesis.speak(utterance);
                }
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(stop$));
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 21, vars: 15, consts: [[1, "box"], [1, "timer", 3, "click"], ["src", "https://wiki.guildwars.com/images/4/47/Dwarven_Ale.png"], [1, "buttons", 3, "click"], ["src", "https://wiki.guildwars.com/images/9/97/Golden_Egg.png"], ["src", "https://wiki.guildwars.com/images/e/ee/Candy_Corn.png"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_div_click_1_listener() { return ctx.startAlcohol(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](4, "timer");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_div_click_5_listener() { return ctx.stopAlcohol(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Stop");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_div_click_8_listener() { return ctx.startEgg(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](9, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](11, "timer");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_div_click_12_listener() { return ctx.stopEgg(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "Stop");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_div_click_15_listener() { return ctx.startAll(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](16, "img", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](18, "timer");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_div_click_19_listener() { return ctx.stopAll(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "Stop");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("danger", ctx.isDanger(ctx.alcoholTimer));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](4, 9, ctx.alcoholTimer), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("danger", ctx.isDanger(ctx.eggTimer));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](11, 11, ctx.eggTimer), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("danger", ctx.isDanger(ctx.allTimer));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](18, 13, ctx.allTimer), " ");
    } }, pipes: [_timer_pipe__WEBPACK_IMPORTED_MODULE_3__["TimerPipe"]], styles: [".box[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  justify-content: center;\n  height: 33.333vh;\n  border-bottom: 1px solid white;\n  color: white;\n  font-size: 36px;\n  box-sizing: border-box;\n}\n.box[_ngcontent-%COMP%]   .timer[_ngcontent-%COMP%] {\n  flex: 3 0 0;\n  background: #1e1e1e;\n  text-align: center;\n  line-height: 33.333vh;\n  cursor: pointer;\n  transition: all 0.3s ease-in-out;\n}\n.box[_ngcontent-%COMP%]   .timer.danger[_ngcontent-%COMP%] {\n  background: #881111;\n}\n.box[_ngcontent-%COMP%]   .timer[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display: inline-block;\n  vertical-align: middle;\n}\n.box[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%] {\n  flex: 1 0 0;\n  background: #2d2d2d;\n  text-align: center;\n  line-height: 33.333vh;\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQkFBQTtFQUNBLDhCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxzQkFBQTtBQUNGO0FBQ0U7RUFDRSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0EsZUFBQTtFQUNBLGdDQUFBO0FBQ0o7QUFDSTtFQUNFLG1CQUFBO0FBQ047QUFFSTtFQUNFLHFCQUFBO0VBQ0Esc0JBQUE7QUFBTjtBQUlFO0VBQ0UsV0FBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLGVBQUE7QUFGSiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYm94IHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBoZWlnaHQ6IDMzLjMzM3ZoO1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB3aGl0ZTtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgZm9udC1zaXplOiAzNnB4O1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcblxyXG4gIC50aW1lciB7XHJcbiAgICBmbGV4OiAzIDAgMDtcclxuICAgIGJhY2tncm91bmQ6ICMxZTFlMWU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBsaW5lLWhlaWdodDogMzMuMzMzdmg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcclxuXHJcbiAgICAmLmRhbmdlciB7XHJcbiAgICAgIGJhY2tncm91bmQ6ICM4ODExMTE7XHJcbiAgICB9XHJcblxyXG4gICAgaW1nIHtcclxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmJ1dHRvbnMge1xyXG4gICAgZmxleDogMSAwIDA7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMmQyZDJkO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbGluZS1oZWlnaHQ6IDMzLjMzM3ZoO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "omvX");
/* harmony import */ var _timer_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./timer.pipe */ "GPpe");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");





class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"],
        _timer_pipe__WEBPACK_IMPORTED_MODULE_3__["TimerPipe"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"]] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map