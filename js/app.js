'use strict';


// Declare app level module which depends on filters, and services
var mhcApp = angular.module('ChromeModifyHeaders', [
    'xeditable',
    'ui.bootstrap',
    'dialogs.main',
    'dialogs.default-translations',
    'pascalprecht.translate',
    'toaster',
    'angularFileUpload',
    'ngAnimate',
    'ChromeModifyHeaders.constants',
    'ChromeModifyHeaders.filters',
    'ChromeModifyHeaders.services',
    'ChromeModifyHeaders.directives',
    'ChromeModifyHeaders.controllers'
]);

mhcApp.run(['$rootScope', 'editableOptions', '$interpolate', '$templateCache',
    function($rootScope, editableOptions, $interpolate, $templateCache) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
        editableOptions.icon_set = 'font-awesome';

        var startSym = $interpolate.startSymbol();
        var endSym = $interpolate.endSymbol();
        $templateCache.put('/dialogs/error.html','<div class="modal-header dialog-header-error"><button type="button" class="close" ng-click="close()">&times;</button><h4 class="modal-title text-danger"><span class="fa fa-warning-sign"></span> <span ng-bind-html="header"></span></h4></div><div class="modal-body text-danger" ng-bind-html="msg"></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="close()">'+startSym+'"DIALOGS_CLOSE" | translate'+endSym+'</button></div>');
    	$templateCache.put('/dialogs/wait.html','<div class="modal-header dialog-header-wait"><h4 class="modal-title"><span class="fa fa-time"></span> '+startSym+'header'+endSym+'</h4></div><div class="modal-body"><p ng-bind-html="msg"></p><div class="progress progress-striped active"><div class="progress-bar progress-bar-info" ng-style="getProgress()"></div><span class="sr-only">'+startSym+'progress'+endSym+''+startSym+'"DIALOGS_PERCENT_COMPLETE" | translate'+endSym+'</span></div></div>');
    	$templateCache.put('/dialogs/notify.html','<div class="modal-header dialog-header-notify"><button type="button" class="close" ng-click="close()" class="pull-right">&times;</button><h4 class="modal-title text-info"><span class="fa fa-info-sign"></span> '+startSym+'header'+endSym+'</h4></div><div class="modal-body text-info" ng-bind-html="msg"></div><div class="modal-footer"><button type="button" class="btn btn-primary" ng-click="close()">'+startSym+'"DIALOGS_OK" | translate'+endSym+'</button></div>');
    	$templateCache.put('/dialogs/confirm.html','<div class="modal-header dialog-header-confirm"><button type="button" class="close" ng-click="no()">&times;</button><h4 class="modal-title"><span class="fa fa-check"></span> '+startSym+'header'+endSym+'</h4></div><div class="modal-body" ng-bind-html="msg"></div><div class="modal-footer"><button type="button" class="btn btn-success" ng-click="yes()">'+startSym+'"DIALOGS_YES" | translate'+endSym+'</button><button type="button" class="btn btn-primary" ng-click="no()">'+startSym+'"DIALOGS_NO" | translate'+endSym+'</button></div>');
	
        $rootScope.alert = function(text) {
            console.log('alert: ' + text);
        };

        console.log('app:LOADED');
    }
]);

//Array.prototype.move = function (old_index, new_index) {
//    while (old_index < 0) {
//        old_index += this.length;
//    }
//    while (new_index < 0) {
//        new_index += this.length;
//    }
//    if (new_index >= this.length) {
//        var k = new_index - this.length;
//        while ((k--) + 1) {
//            this.push(undefined);
//        }
//    }
//    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
//    return this; // for testing purposes
//};

