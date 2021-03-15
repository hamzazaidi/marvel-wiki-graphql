(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./apps/api/src/app/helper/url.ts":
/*!****************************************!*\
  !*** ./apps/api/src/app/helper/url.ts ***!
  \****************************************/
/*! exports provided: getUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUrl", function() { return getUrl; });
const baseUrl = 'https://gateway.marvel.com:443/v1/public';
const publicKey = '811b2529a0130c92ab5c1a36e00c61e5';
const privateKey = '426771ca28a1e77bfa361d0c09731bdadf0b63e3';
const md5 = __webpack_require__(/*! md5 */ "md5");
const getUrl = (urlPart) => {
    const ts = String(Date.now());
    const hash = md5(ts + privateKey + publicKey);
    const url = `${baseUrl}/${urlPart}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    return url;
};


/***/ }),

/***/ "./apps/api/src/app/schema/character/index.ts":
/*!****************************************************!*\
  !*** ./apps/api/src/app/schema/character/index.ts ***!
  \****************************************************/
/*! exports provided: Character */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Character", function() { return Character; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql */ "graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helper_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../helper/url */ "./apps/api/src/app/helper/url.ts");
/* harmony import */ var _comic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../comic */ "./apps/api/src/app/schema/comic/index.ts");
/* harmony import */ var _series__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../series */ "./apps/api/src/app/schema/series/index.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared */ "./apps/api/src/app/schema/shared/index.ts");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../event */ "./apps/api/src/app/schema/event/index.ts");
/* harmony import */ var _story__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../story */ "./apps/api/src/app/schema/story/index.ts");









const Character = new graphql__WEBPACK_IMPORTED_MODULE_2__["GraphQLObjectType"]({
    name: "Character",
    fields: () => ({
        id: { type: graphql__WEBPACK_IMPORTED_MODULE_2__["GraphQLID"] },
        name: { type: graphql__WEBPACK_IMPORTED_MODULE_2__["GraphQLString"] },
        description: { type: graphql__WEBPACK_IMPORTED_MODULE_2__["GraphQLString"] },
        modified: { type: graphql__WEBPACK_IMPORTED_MODULE_2__["GraphQLString"] },
        thumbnail: { type: _shared__WEBPACK_IMPORTED_MODULE_6__["Avatar"] },
        resourceURI: { type: graphql__WEBPACK_IMPORTED_MODULE_2__["GraphQLString"] },
        comics: {
            type: new graphql__WEBPACK_IMPORTED_MODULE_2__["GraphQLList"](_comic__WEBPACK_IMPORTED_MODULE_4__["Comic"]),
            resolve(parent, args) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    try {
                        const url = Object(_helper_url__WEBPACK_IMPORTED_MODULE_3__["getUrl"])(`characters/${parent.id}/comics`);
                        const result = yield axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url);
                        return result.data.data.results;
                    }
                    catch (error) {
                        console.log("🚀 ~ file: index.ts ~ line 39 ~ resolve ~ error", error);
                    }
                });
            },
        },
        events: {
            type: new graphql__WEBPACK_IMPORTED_MODULE_2__["GraphQLList"](_series__WEBPACK_IMPORTED_MODULE_5__["Series"]),
            resolve(parent, args) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    try {
                        const url = Object(_helper_url__WEBPACK_IMPORTED_MODULE_3__["getUrl"])(`characters/${parent.id}/series`);
                        const result = yield axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url);
                        return result.data.data.results;
                    }
                    catch (error) {
                        console.log("🚀 ~ file: index.ts ~ line 39 ~ resolve ~ error", error);
                    }
                });
            },
        },
        series: {
            type: new graphql__WEBPACK_IMPORTED_MODULE_2__["GraphQLList"](_event__WEBPACK_IMPORTED_MODULE_7__["Event"]),
            resolve(parent, args) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    try {
                        const url = Object(_helper_url__WEBPACK_IMPORTED_MODULE_3__["getUrl"])(`characters/${parent.id}/events`);
                        const result = yield axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url);
                        return result.data.data.results;
                    }
                    catch (error) {
                        console.log("🚀 ~ file: index.ts ~ line 39 ~ resolve ~ error", error);
                    }
                });
            },
        },
        stories: {
            type: new graphql__WEBPACK_IMPORTED_MODULE_2__["GraphQLList"](_story__WEBPACK_IMPORTED_MODULE_8__["Story"]),
            resolve(parent, args) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    try {
                        const url = Object(_helper_url__WEBPACK_IMPORTED_MODULE_3__["getUrl"])(`characters/${parent.id}/stories`);
                        const result = yield axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url);
                        return result.data.data.results;
                    }
                    catch (error) {
                        console.log("🚀 ~ file: index.ts ~ line 39 ~ resolve ~ error", error);
                    }
                });
            },
        },
    }),
});


/***/ }),

/***/ "./apps/api/src/app/schema/comic/index.ts":
/*!************************************************!*\
  !*** ./apps/api/src/app/schema/comic/index.ts ***!
  \************************************************/
/*! exports provided: ComicSummary, ComicPrice, Comic */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComicSummary", function() { return ComicSummary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComicPrice", function() { return ComicPrice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Comic", function() { return Comic; });
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql */ "graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared */ "./apps/api/src/app/schema/shared/index.ts");


const ComicSummary = new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLObjectType"]({
    name: "ComicSummary",
    fields: () => ({
        resourceURI: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        name: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
    }),
});
const ComicPrice = new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLObjectType"]({
    name: "ComicPrice",
    fields: () => ({
        type: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        price: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
    }),
});
const Comic = new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLObjectType"]({
    name: "Comic",
    fields: () => ({
        id: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLID"] },
        digitalId: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLInt"] },
        title: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        variantDescription: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        description: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        modified: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        isbn: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        upc: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        diamondCode: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        ean: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        issn: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        format: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        pageCount: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        textObjects: { type: new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLList"](_shared__WEBPACK_IMPORTED_MODULE_1__["TextObject"]) },
        resourceURI: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        urls: { type: new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLList"](_shared__WEBPACK_IMPORTED_MODULE_1__["Url"]) },
        variants: { type: new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLList"](ComicSummary) },
        collections: { type: new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLList"](ComicSummary) },
        collectedIssues: { type: new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLList"](ComicSummary) },
        prices: { type: new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLList"](ComicPrice) },
        thumbnail: { type: _shared__WEBPACK_IMPORTED_MODULE_1__["Avatar"] },
        images: { type: new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLList"](_shared__WEBPACK_IMPORTED_MODULE_1__["Avatar"]) },
    }),
});


/***/ }),

/***/ "./apps/api/src/app/schema/event/index.ts":
/*!************************************************!*\
  !*** ./apps/api/src/app/schema/event/index.ts ***!
  \************************************************/
/*! exports provided: EventSummary, Event */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventSummary", function() { return EventSummary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return Event; });
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql */ "graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared */ "./apps/api/src/app/schema/shared/index.ts");


const EventSummary = new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLObjectType"]({
    name: "EventSummary",
    fields: () => ({
        resourceURI: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        name: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
    }),
});
const Event = new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLObjectType"]({
    name: "Event",
    fields: () => ({
        id: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLID"] },
        title: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        description: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        resourceURI: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        urls: { type: new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLList"](_shared__WEBPACK_IMPORTED_MODULE_1__["Url"]) },
        modified: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        start: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        end: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        thumbnail: { type: _shared__WEBPACK_IMPORTED_MODULE_1__["Avatar"] },
        next: { type: EventSummary },
        previous: { type: EventSummary },
    }),
});


/***/ }),

/***/ "./apps/api/src/app/schema/index.ts":
/*!******************************************!*\
  !*** ./apps/api/src/app/schema/index.ts ***!
  \******************************************/
/*! exports provided: schema */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "schema", function() { return schema; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql */ "graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helper_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/url */ "./apps/api/src/app/helper/url.ts");
/* harmony import */ var _character__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./character */ "./apps/api/src/app/schema/character/index.ts");





const RootQuery = new graphql__WEBPACK_IMPORTED_MODULE_1__["GraphQLObjectType"]({
    name: "RootQueryType",
    fields: {
        character: {
            type: _character__WEBPACK_IMPORTED_MODULE_4__["Character"],
            args: {
                id: { type: graphql__WEBPACK_IMPORTED_MODULE_1__["GraphQLID"] },
            },
            resolve(parent, args) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    try {
                        const url = Object(_helper_url__WEBPACK_IMPORTED_MODULE_3__["getUrl"])(`characters/${args.id}`);
                        const result = yield axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(url);
                        return result.data.data.results[0];
                    }
                    catch (error) {
                        console.log("🚀 ~ file: index.ts ~ line 39 ~ resolve ~ error", error);
                    }
                });
            },
        },
        characters: {
            type: new graphql__WEBPACK_IMPORTED_MODULE_1__["GraphQLList"](_character__WEBPACK_IMPORTED_MODULE_4__["Character"]),
            resolve(parent, args) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    try {
                        const url = Object(_helper_url__WEBPACK_IMPORTED_MODULE_3__["getUrl"])("characters");
                        const result = yield axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(url);
                        console.log("🚀 ~ file: index.ts ~ line 39 ~ resolve ~ result", result);
                        return result.data.data.results;
                    }
                    catch (error) {
                        console.log("🚀 ~ file: index.ts ~ line 37 ~ resolve ~ error", error);
                    }
                });
            },
        },
    },
});
const schema = new graphql__WEBPACK_IMPORTED_MODULE_1__["GraphQLSchema"]({
    query: RootQuery,
});


/***/ }),

/***/ "./apps/api/src/app/schema/series/index.ts":
/*!*************************************************!*\
  !*** ./apps/api/src/app/schema/series/index.ts ***!
  \*************************************************/
/*! exports provided: SeriesSummary, Series */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SeriesSummary", function() { return SeriesSummary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Series", function() { return Series; });
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql */ "graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared */ "./apps/api/src/app/schema/shared/index.ts");


const SeriesSummary = new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLObjectType"]({
    name: "SeriesSummary",
    fields: () => ({
        resourceURI: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        name: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
    }),
});
const Series = new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLObjectType"]({
    name: "Series",
    fields: () => ({
        id: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLID"] },
        title: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        description: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        resourceURI: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        urls: { type: new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLList"](_shared__WEBPACK_IMPORTED_MODULE_1__["Url"]) },
        startYear: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLInt"] },
        endYear: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLInt"] },
        rating: { type: new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLList"](_shared__WEBPACK_IMPORTED_MODULE_1__["Url"]) },
        modified: { type: new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLList"](_shared__WEBPACK_IMPORTED_MODULE_1__["Url"]) },
        thumbnail: { type: _shared__WEBPACK_IMPORTED_MODULE_1__["Avatar"] },
        next: { type: SeriesSummary },
        previous: { type: SeriesSummary },
    }),
});


/***/ }),

/***/ "./apps/api/src/app/schema/shared/index.ts":
/*!*************************************************!*\
  !*** ./apps/api/src/app/schema/shared/index.ts ***!
  \*************************************************/
/*! exports provided: TextObject, Url, Avatar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextObject", function() { return TextObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Url", function() { return Url; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Avatar", function() { return Avatar; });
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql */ "graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_0__);

const TextObject = new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLObjectType"]({
    name: "TextObject",
    fields: () => ({
        type: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        language: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        text: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
    }),
});
const Url = new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLObjectType"]({
    name: "Url",
    fields: () => ({
        type: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        url: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
    }),
});
const Avatar = new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLObjectType"]({
    name: "Avatar",
    fields: () => ({
        path: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        extension: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
    }),
});


/***/ }),

/***/ "./apps/api/src/app/schema/story/index.ts":
/*!************************************************!*\
  !*** ./apps/api/src/app/schema/story/index.ts ***!
  \************************************************/
/*! exports provided: Story */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Story", function() { return Story; });
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql */ "graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _comic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../comic */ "./apps/api/src/app/schema/comic/index.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared */ "./apps/api/src/app/schema/shared/index.ts");



const Story = new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLObjectType"]({
    name: 'Story',
    fields: () => ({
        id: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLID"] },
        title: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        description: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        resourceURI: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        type: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        modified: { type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"] },
        thumbnail: { type: _shared__WEBPACK_IMPORTED_MODULE_2__["Avatar"] },
        originalissue: { type: _comic__WEBPACK_IMPORTED_MODULE_1__["ComicSummary"] }
    })
});


/***/ }),

/***/ "./apps/api/src/main.ts":
/*!******************************!*\
  !*** ./apps/api/src/main.ts ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express-graphql */ "express-graphql");
/* harmony import */ var express_graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express_graphql__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _app_schema__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/schema */ "./apps/api/src/app/schema/index.ts");





const app = express__WEBPACK_IMPORTED_MODULE_0__();
app.use(cors__WEBPACK_IMPORTED_MODULE_3___default()());
app.use('/graphql', Object(express_graphql__WEBPACK_IMPORTED_MODULE_2__["graphqlHTTP"])({
    schema: _app_schema__WEBPACK_IMPORTED_MODULE_4__["schema"],
    graphiql: true
}));
app.use(express__WEBPACK_IMPORTED_MODULE_0__["static"](path__WEBPACK_IMPORTED_MODULE_1__["join"](__dirname, '..', '/marvel-wiki')));
app.get('/*', function (req, res) {
    res.sendFile(path__WEBPACK_IMPORTED_MODULE_1__["join"](__dirname, '..', '/marvel-wiki/index.html'));
});
const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/graphql');
});
server.on('error', console.error);


/***/ }),

/***/ 0:
/*!************************************!*\
  !*** multi ./apps/api/src/main.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/hamzazaidi/Documents/marvel-wiki-graphql/apps/api/src/main.ts */"./apps/api/src/main.ts");


/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-graphql":
/*!**********************************!*\
  !*** external "express-graphql" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),

/***/ "md5":
/*!**********************!*\
  !*** external "md5" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("md5");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ })

/******/ })));
//# sourceMappingURL=main.js.map