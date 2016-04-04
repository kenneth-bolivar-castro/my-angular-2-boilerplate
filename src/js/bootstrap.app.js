System.register(['angular2/platform/browser', './main.app'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, main_app_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (main_app_1_1) {
                main_app_1 = main_app_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(main_app_1.AppMain);
        }
    }
});

//# sourceMappingURL=bootstrap.app.js.map
