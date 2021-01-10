'use strict';

/* Directives */


angular.module('ChromeModifyHeaders.directives', []).
    directive('appVersion', ['version', function(version) {
            return function(scope, elm, attrs) {
                elm.text(version);
            };
        }]);
//    directive('getStatus', function() {
//
//        return {
//            restrict: 'C',
//            replace: true,
//            transclude: true,
//            scope: {
//                rowStatus: '@rowStatus'
//            },
//            template: 
//                    '<div style="padding:4px 0 0 10px;" ng-switch on="rowStatus">' +
//                    '<span ng-switch-when="ENABLED" class="glyphicon glyphicon-off green"></span>' +
//                    '<span ng-switch-when="DISABLED" class="glyphicon glyphicon-off red"></span>' +
//                    '</div>'
//        };
//    }).
//    directive('iconExpand', function(){
//        return {
//            restrict: 'E',
//            replace: true,
//            scope: {
//                iconClick: '&iconClick'//,
//                //rowStatus: '@rowStatus'
//            },
//            template: 
//                    '<span class="spacer-5" ng-switch on="rowStatus">' +
//                    '<a href="" ng-click="expandRow()">' +
//                    '<span class="glyphicon glyphicon-globe blue expandUrl"></span>' +
//                    '</a></span>'
//        };
//    }).
//    directive('iconAction', function(){
//        return {
//            restrict: 'E',
//            replace: true,
//            scope: {
//                iconClick: '&iconClick',
//                rowStatus: '@rowStatus'
//            },
//            template: 
//                    '<span ng-switch on="rowStatus">' +
//                    '<a href="" ng-click="iconClick()">' +
//                    '<span ng-switch-when="ENABLED" class="glyphicon glyphicon-off green"></span>' +
//                    '<span ng-switch-when="DISABLED" class="glyphicon glyphicon-off red"></span>' +
//                    '</a></span>'
//        };
//    });
//    directive('headerGrid', function() {
//        return function(scope, element, attrs) {
//
//            // apply DataTable options, use defaults if none specified by user
//            var options = {};
//            if (attrs.headerGrid.length > 0) {
//                options = scope.$eval(attrs.headerGrid);
//            } else {
//                options = {
//                    "bJQueryUI" : true,
//                    "bPaginate" : false,
//                    "bFilter" : false,
//                    "bInfo" : false,
//                    "bProcessing" : false,
//                    "bDeferRender" : true,
//                    "bSort": false,
//                    "bAutoWidth": false,
//                    "aaSorting": [[1, 'asc']],
//                    "aoColumnDefs": [{ "bSortable": false, "aTargets": [5] }]
//                };
//            }
//            //console.log(options);
//
//            // Tell the dataTables plugin what columns to use
//            // We can either derive them from the dom, or use setup from the controller           
//            var explicitColumns = [];
//            element.find('th').each(function(index, elem) {
//                explicitColumns.push($(elem).text());
//            });
////            if (explicitColumns.length > 0) {
////                options["aoColumns"] = explicitColumns;
////            } else if (attrs.aoColumns) {
////                options["aoColumns"] = scope.$eval(attrs.aoColumns);
////            }
////
////            // aoColumnDefs is dataTables way of providing fine control over column config
////            if (attrs.aoColumnDefs) {
////                options["aoColumnDefs"] = scope.$eval(attrs.aoColumnDefs);
////            }
////            
////            if (attrs.fnRowCallback) {
////                options["fnRowCallback"] = scope.$eval(attrs.fnRowCallback);
////            }
//            
//            // apply the plugin
//            scope.dataTable = element.dataTable(options);
////            scope.dataTable.rowReordering();
//
//            // all this code just to select a row
//            // need to find a better way
//            if (attrs.id) {
//                scope[attrs.id] = attrs.id;
//                $("#"+attrs.id+" tbody").click(function(event) {
//                    var toAdd = true;
//                    var parentNode = $(event.target.parentNode);
//                    if (parentNode.hasClass('row_selected')) {
//                        parentNode.removeClass('row_selected');
//                        toAdd = false;
//                    } 
//                    $(scope.dataTable.fnSettings().aoData).each(function() {
//                        $(this.nTr).removeClass('row_selected');
//                    });
//                    if (toAdd) {
//                        parentNode.addClass('row_selected');
//                    }
//                });
//            }
//            
//            Event(element.selector);
//            function Event(selector) {
//                var expandSelector = selector + " tbody tr td span.expandUrl";
//                $(document).on('click', expandSelector, function(event) {
//                    var nTr = $(this).parents('tr')[0];
//                    console.log(nTr);
//                    if (element.fnIsOpen(nTr)) {
//                        /* This row is already open - close it */
//                        element.fnClose(nTr);
//                        $(this).addClass("ui-icon-plus");
//                        $(this).removeClass("ui-icon-minus");
//                    }
//                    else {
//                        /* Open this row */
//                        element.fnOpen(nTr, fnFormatDetails(element, nTr), 'details');
//                        $(this).addClass("ui-icon-minus");
//                        $(this).removeClass("ui-icon-plus");
//                    }
//                });
//            }
//            /* Formating function for row details */
//            function fnFormatDetails(oLocalTable, nTr) {
//                var aData = oLocalTable.fnGetData(nTr);
//                var tblStyle = " style='padding:0px;background-color: #FFCC99;border: 1px solid black;width:100%'";
//                var style = " style='font-weight:bold;color: blue;width:125px;'";
//                var sOut = '<table cellpadding="5" cellspacing="0" border="0"' + tblStyle + '>';
//                var pattern = aData[4];
//                if (!pattern) pattern = "^(http|https)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*$";
//                if (aData[4] !== "") {
//                    sOut += 
//                        '<tr><td width="75%">'+
//                        '<div class="form-group">'+
//                            '<input type="text" class="form-control" value="'+pattern+'"'+
//                                'id="cmh_hdr_url" ng-model="cmh_hdr_url" placeholder="URL pattern (RegEx, defaults to all URLs)">'+
//                        '</div></td><td>' + 
//                        '</td></tr>';
//                }
////                if (aData[5] !== "") {
////                    sOut += '<tr valign="top"><td' + style + '>Description:</td><td width="10px">&nbsp;</td><td>' + aData[5] + '</td></tr>';
////                }
//                sOut += '</table>';
//
//                return sOut;
//            }
//            
//           scope.expandRow = function(index) {
//                console.log(index);
//                var oLocalTable = scope.dataTable;
//                var nTr;
//                if ($(this).hasClass("ui-icon-plus")) {
//                    $(this).addClass("ui-icon-minus");
//                    $(this).removeClass("ui-icon-plus");
//
//                    /* Open rows */
//                    oLocalTable.$("tr").each(function() {
//                        oLocalTable.fnOpen(this, fnFormatDetails($(selector).dataTable(), this), 'details');
//                        var expand = $(this).find("span.expandSarsSearch");
//                        $(expand).addClass("ui-icon-minus");
//                        $(expand).removeClass("ui-icon-plus");
//                    });
//                } else {
//                    $(this).addClass("ui-icon-plus");
//                    $(this).removeClass("ui-icon-minus");
//
//                    /* Close rows */
//                    oLocalTable.$("tr").each(function() {
//                        oLocalTable.fnClose(this);
//                        var expand = $(this).find("span.expandSarsSearch");
//                        $(expand).addClass("ui-icon-plus");
//                        $(expand).removeClass("ui-icon-minus");
//                    });
//                }
//            };
//            
//            
//            // watch for any changes to our data, rebuild the DataTable
//            scope.$watch(attrs.aaData, function(value) {
//                var val = value || null;
//                if (val) {
//                    scope.dataTable.fnClearTable();
//                    scope.dataTable.fnAddData(scope.$eval(attrs.aaData));
//                }
//            });
//        };
//    });
