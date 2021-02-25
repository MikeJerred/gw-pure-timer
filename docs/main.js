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
        if (value < 0) {
            const seconds = Math.floor((value / 1000) % 60);
            return `${seconds}`;
        }
        const seconds = Math.floor((value / 1000) % 60);
        const minutes = Math.floor(value / 60000);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _timer_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./timer.pipe */ "GPpe");





var PConType;
(function (PConType) {
    PConType[PConType["Alcohol"] = 0] = "Alcohol";
    PConType[PConType["Egg"] = 1] = "Egg";
    PConType[PConType["Corn"] = 2] = "Corn";
})(PConType || (PConType = {}));
class AppComponent {
    constructor(router) {
        this.router = router;
        this.alcoholTimer = null;
        this.eggTimer = null;
        this.allTimer = null;
        this.instanceTimer = null;
        this.dangerBuffer = 5000;
        this.warningBuffer = 30000;
        this.tickLength = 100;
        this.alcoholRefreshTime = 2 * 60 * 1000;
        this.eggRefreshTime = 5 * 60 * 1000;
        this.allRefreshTime = 10 * 60 * 1000;
        this.useBeeps = false;
        this.silent = false;
        this.stopAlcohol$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.stopEgg$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.stopAll$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.stopInstance$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.alcoholAudio = new Audio(`assets/timer_beep_1.wav`);
        this.eggAudio = new Audio(`assets/timer_beep_2.wav`);
        this.cornAudio = new Audio(`assets/timer_beep_3.wav`);
        this.router.queryParams.subscribe(queryParams => {
            this.useBeeps = !!queryParams.beeps;
            this.silent = !!queryParams.silent;
        });
        try {
            navigator.wakeLock.request('screen');
        }
        catch (error) {
            console.log('could not request wake lock');
        }
    }
    isDanger(time) {
        return time !== null && time <= this.dangerBuffer + 1000;
    }
    isWarning(time) {
        return time !== null && time <= this.warningBuffer + 1000;
    }
    startAlcohol() {
        this.stopAlcohol$.next();
        this.alcoholTimer = this.alcoholRefreshTime;
        this.createTimer(this.stopAlcohol$, this.alcoholRefreshTime, PConType.Alcohol).subscribe(timeLeft => {
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
        this.createTimer(this.stopEgg$, this.eggRefreshTime, PConType.Egg).subscribe(timeLeft => {
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
        this.createTimer(this.stopAll$, this.allRefreshTime, PConType.Corn).subscribe(timeLeft => {
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
    startInstance() {
        if (this.instanceTimer === null) {
            const startTime = new Date().getTime();
            this.instanceTimer = -3000;
            Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["interval"])(this.tickLength)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(() => new Date().getTime() - startTime), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(this.stopInstance$)).subscribe(elapsedMilliseconds => {
                this.instanceTimer = elapsedMilliseconds - 3000;
            });
            this.startEgg();
            this.startAll();
        }
    }
    stopInstance() {
        this.stopInstance$.next();
        this.instanceTimer = null;
    }
    createTimer(stop$, refreshTime, pconType) {
        const startTime = new Date().getTime();
        let state = 100;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["interval"])(this.tickLength).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(() => new Date().getTime() - startTime), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(elapsedMilliseconds => refreshTime - elapsedMilliseconds), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(timeLeft => {
            if (timeLeft < this.dangerBuffer + 1000) {
                const currentState = Math.floor(timeLeft / 1000);
                if (state > currentState) {
                    if (this.useBeeps) {
                        const audio = pconType === PConType.Alcohol ? this.alcoholAudio
                            : pconType === PConType.Egg ? this.eggAudio
                                : pconType === PConType.Corn ? this.cornAudio
                                    : null;
                        if (audio && state === 100 && !(this.silent && pconType === PConType.Corn)) {
                            audio.play();
                            state = 0;
                        }
                    }
                    else {
                        const text = pconType === PConType.Alcohol ? 'Alkahol'
                            : pconType === PConType.Egg ? 'Egg'
                                : pconType === PConType.Corn ? 'Corn'
                                    : '';
                        const speechText = state === 100 ? text
                            : currentState > 0 ? `${currentState}`
                                : 'pop ' + text;
                        state = currentState;
                        if (!this.silent || pconType === PConType.Alcohol) {
                            const utterance = new SpeechSynthesisUtterance(speechText);
                            utterance.rate = 2;
                            utterance.lang = 'en-US';
                            window.speechSynthesis.cancel();
                            window.speechSynthesis.speak(utterance);
                        }
                    }
                }
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(stop$));
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 29, vars: 24, consts: [[1, "box"], [1, "timer", 3, "click"], [1, "buttons", 3, "click"], ["src", "https://wiki.guildwars.com/images/9/97/Golden_Egg.png"], [1, "both-button", 3, "click"], ["src", "https://wiki.guildwars.com/images/e/ee/Candy_Corn.png"], ["src", "https://wiki.guildwars.com/images/4/47/Dwarven_Ale.png"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_div_click_1_listener() { return ctx.startInstance(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "timer");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_div_click_4_listener() { return ctx.stopInstance(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Stop");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_div_click_7_listener() { return ctx.startEgg(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](10, "timer");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_div_click_11_listener() { return ctx.stopEgg(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Stop");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_div_click_13_listener() { ctx.startEgg(); return ctx.startAll(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Both");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_div_click_16_listener() { return ctx.startAll(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](17, "img", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](19, "timer");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_div_click_20_listener() { return ctx.stopAll(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "Stop");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_div_click_23_listener() { return ctx.startAlcohol(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](24, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](26, "timer");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_div_click_27_listener() { return ctx.stopAlcohol(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, "Stop");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](3, 16, ctx.instanceTimer));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("warning", ctx.isWarning(ctx.eggTimer))("danger", ctx.isDanger(ctx.eggTimer));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](10, 18, ctx.eggTimer), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("warning", ctx.isWarning(ctx.allTimer))("danger", ctx.isDanger(ctx.allTimer));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](19, 20, ctx.allTimer), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("warning", ctx.isWarning(ctx.alcoholTimer))("danger", ctx.isDanger(ctx.alcoholTimer));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](26, 22, ctx.alcoholTimer), " ");
    } }, pipes: [_timer_pipe__WEBPACK_IMPORTED_MODULE_4__["TimerPipe"]], styles: [".box[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  justify-content: center;\n  height: 25vh;\n  border-bottom: 1px solid white;\n  color: white;\n  font-size: 36px;\n  box-sizing: border-box;\n}\n.box[_ngcontent-%COMP%]   .timer[_ngcontent-%COMP%] {\n  flex: 3 0 0;\n  background: #1e1e1e;\n  text-align: center;\n  line-height: 25vh;\n  cursor: pointer;\n  transition: all 0.3s ease-in-out;\n}\n.box[_ngcontent-%COMP%]   .timer.danger[_ngcontent-%COMP%] {\n  background: #881111;\n}\n.box[_ngcontent-%COMP%]   .timer.warning[_ngcontent-%COMP%] {\n  background: #bb6622;\n}\n.box[_ngcontent-%COMP%]   .timer[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display: inline-block;\n  vertical-align: middle;\n}\n.box[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%] {\n  flex: 1 0 0;\n  background: #2d2d2d;\n  text-align: center;\n  line-height: 25vh;\n  cursor: pointer;\n}\n.both-button[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(25vh - 25px);\n  left: 37.5vw;\n  width: 150px;\n  height: 50px;\n  line-height: 50px;\n  text-align: center;\n  border: 1px solid white;\n  background: #2d2d2d;\n  cursor: pointer;\n  z-index: 100;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsOEJBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLHNCQUFBO0FBQ0Y7QUFDRTtFQUNFLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0NBQUE7QUFDSjtBQUNJO0VBQ0UsbUJBQUE7QUFDTjtBQUVJO0VBQ0UsbUJBQUE7QUFBTjtBQUdJO0VBQ0UscUJBQUE7RUFDQSxzQkFBQTtBQUROO0FBS0U7RUFDRSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtBQUhKO0FBT0E7RUFDRSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtBQUpGIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ib3gge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGhlaWdodDogMjV2aDtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgd2hpdGU7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGZvbnQtc2l6ZTogMzZweDtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG5cclxuICAudGltZXIge1xyXG4gICAgZmxleDogMyAwIDA7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMWUxZTFlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbGluZS1oZWlnaHQ6IDI1dmg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcclxuXHJcbiAgICAmLmRhbmdlciB7XHJcbiAgICAgIGJhY2tncm91bmQ6ICM4ODExMTE7XHJcbiAgICB9XHJcblxyXG4gICAgJi53YXJuaW5nIHtcclxuICAgICAgYmFja2dyb3VuZDogI2JiNjYyMjtcclxuICAgIH1cclxuXHJcbiAgICBpbWcge1xyXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuYnV0dG9ucyB7XHJcbiAgICBmbGV4OiAxIDAgMDtcclxuICAgIGJhY2tncm91bmQ6ICMyZDJkMmQ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBsaW5lLWhlaWdodDogMjV2aDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICB9XHJcbn1cclxuXHJcbi5ib3RoLWJ1dHRvbiB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogY2FsYygyNXZoIC0gMjVweCk7XHJcbiAgbGVmdDogMTAwdncgKiAzIC8gODtcclxuICB3aWR0aDogMTUwcHg7XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIGxpbmUtaGVpZ2h0OiA1MHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcclxuICBiYWNrZ3JvdW5kOiAjMmQyZDJkO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB6LWluZGV4OiAxMDA7XHJcbn1cclxuIl19 */"] });


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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "omvX");
/* harmony import */ var _timer_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./timer.pipe */ "GPpe");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");







class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot([])
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
        _timer_pipe__WEBPACK_IMPORTED_MODULE_4__["TimerPipe"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();


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