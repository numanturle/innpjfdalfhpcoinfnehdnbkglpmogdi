'use strict';
angular.module('ChromeModifyHeaders.controllers', []).
        controller("OptionsCtrl",
                function($scope, $filter, dialogs, toaster, cmhControlService, cmhHeaderListService, constants) {

                    $scope.headers = cmhHeaderListService.loadHeaders();
                    $scope.isStarted = function() {
                        return cmhControlService.getStatus() === 'STARTED';
                    };
                    $scope.isStopped = function() {
                        return cmhControlService.getStatus() === 'STOPPED';
                    };
                    $scope.start = function() {
                        cmhControlService.setStatus('STARTED');
                        cmhHeaderListService.saveHeaders($scope.headers.slice());
                    };
                    $scope.stop = function() {
                        cmhControlService.setStatus('STOPPED');
                        cmhHeaderListService.saveHeaders($scope.headers.slice());
                    };
                    $scope.save = function(rowform, header) {
                        var data = rowform.$data;
                        if ($scope.validate(data)) {
                            header.action = data.action;
                            header.name = data.name;
                            header.value = data.value;
                            header.description = data.description;
                            var existing = $scope.headers.slice();
                            existing.splice(header.index - 1, 1, header);
                            cmhHeaderListService.saveHeaders(existing);
                            $scope.headers = existing;
                            rowform.$cancel();
                        }
                    };
                    $scope.validate = function(row) {
                        if (!row)
                            return false;
                        if (row.action === 'Add' || (row.action === 'Modify')) {
                            return (row.name && row.value);
                        } else if (row.action === 'Filter') {
                            return (row.name);
                        } else
                            return false;
                    };
                    $scope.clearForm = function() {
                        $scope.cmh_index = -1;
                        $scope.cmh_action = '';
                        $scope.cmh_hdr_name = '';
                        $scope.cmh_hdr_value = '';
                        $scope.cmh_hdr_description = '';
                        $scope.cmh_hdr_url = '';
                    };
                    $scope.toggle = function(index) {
                        var existing = $scope.headers.slice();
                        var header = existing[index];
                        if (header) {
                            cmhHeaderListService.toggleState(header);
                        }
                        cmhHeaderListService.saveHeaders(existing);
                        $scope.headers = existing;
                    };
                    $scope.delete = function() {
                        var selIndex = $scope.fnGetSelectedIndex();
                        if (selIndex >= 0) {
                            var existing = $scope.headers.slice();
                            existing.splice(selIndex, 1);
                            $scope.resetOrder(existing);
                            $scope.headers = existing;
                            $scope.clearForm();
                            cmhHeaderListService.saveHeaders(existing);
                        }
                    };
                    $scope.moveTop = function() {
                        var selIndex = $scope.fnGetSelectedIndex();
                        if (selIndex >= 0) {
                            var existing = $scope.headers.slice();
                            existing.move(selIndex, 0);
                            $scope.resetOrder(existing);
                            $scope.headers = existing;
                            cmhHeaderListService.saveHeaders(existing);
                        }
                    };
                    $scope.moveBottom = function() {
                        var selIndex = $scope.fnGetSelectedIndex();
                        if (selIndex >= 0) {

                            var existing = $scope.headers.slice();
                            existing.move(selIndex, existing.length - 1);
                            $scope.resetOrder(existing);
                            $scope.headers = existing;
                            cmhHeaderListService.saveHeaders(existing);
                        }
                    };
                    $scope.enableAll = function() {
                        var dlg = dialogs.confirm(
                                'Confirm',
                                'Are you sure you want to enable ALL headers?',
                                {
                                    'keyboard': true,
                                    'backdrop': 'static',
                                    'size': 'sm'
                                });
                        dlg.result.then(function() {
                            var existing = $scope.headers.slice();
                            for (var i = 0; i < existing.length; i++) {
                                var header = existing[i];
                                if (header) {
                                    header.state = 'ENABLED';
                                }
                            }
                            cmhHeaderListService.saveHeaders(existing);
                            $scope.headers = existing;
                        });
                    };
                    $scope.disableAll = function() {
                        var dlg = dialogs.confirm(
                                'Confirm',
                                'Are you sure you want to disable ALL headers?',
                                {
                                    'keyboard': true,
                                    'backdrop': 'static',
                                    'size': 'sm'
                                });
                        dlg.result.then(function() {
                            var existing = $scope.headers.slice();
                            for (var i = 0; i < existing.length; i++) {
                                var header = existing[i];
                                if (header) {
                                    header.state = 'DISABLED';
                                }
                            }
                            cmhHeaderListService.saveHeaders(existing);
                            $scope.headers = existing;
                        });
                    };
                    $scope.resetOrder = function(existing) {
                        for (var i = 0; i < existing.length; i++) {
                            var header = existing[i];
                            if (header) {
                                header.index = i + 1;
                            }
                        }
                    };
                    $scope.actions = [
                        {value: 'Add', text: 'Add'},
                        {value: 'Modify', text: 'Modify'},
                        {value: 'Filter', text: 'Filter'}
                    ];
                    $scope.commonHeaders = constants.commonHeaders;
                    $scope.showAction = function(header) {
                        var selected = [];
                        if (header.action) {
                            selected = $filter('filter')($scope.actions, {value: header.action});
                        }
                        return selected.length ? selected[0].text : 'Not set';
                    };
                    $scope.cancelAdvice = function(rowform, index) {
                        var header = $scope.headers[index];
                        if (!$scope.validate(header)) {
                            $scope.removeHeader(index);
                        }
                        rowform.$cancel();
                    };
                    $scope.removeHeader = function(index) {
                        var dlg = dialogs.confirm(
                                'Confirm',
                                'Are you sure you want to remove this header?',
                                {
                                    'keyboard': true,
                                    'backdrop': 'static',
                                    'size': 'sm'
                                });
                        dlg.result.then(function() {
                            $scope.headers.splice(index, 1);
                            var existing = $scope.headers.slice();
                            $scope.resetOrder(existing);
                            cmhHeaderListService.saveHeaders(existing);
                            $scope.headers = existing;
                        });
                    };
                    $scope.removeAll = function(index) {
                        var dlg = dialogs.confirm(
                                'Confirm',
                                'Are you sure you want to remove ALL headers?',
                                {
                                    'keyboard': true,
                                    'backdrop': 'static',
                                    'size': 'sm'
                                });
                        dlg.result.then(function() {
                            var existing = [];
                            cmhHeaderListService.saveHeaders(existing);
                            $scope.headers = existing;
                        });
                    };
                    $scope.addHeader = function() {
                        $scope.inserted = {
                            index: $scope.headers.length + 1,
                            action: null,
                            name: '',
                            value: '',
                            description: '',
                            url: '',
                            state: "DISABLED"
                        };
                        $scope.headers.push($scope.inserted);
                    };
                    $scope.editHeader = function(rowform, header) {
                        rowform.$show();
                        $scope.changeAction(header, header.action);
                    };
                    $scope.changeAction = function(header, action) {
                        // UGH
                        var valInput = $('#cmh_value_' + header.index).siblings('span').children('div').children('input');
                        if (action === 'Add' || action === 'Modify') {
                            valInput.removeAttr('disabled');
                        } else if (action === 'Filter') {
                            valInput.attr('disabled', 'disabled');
                        }
                    };

                    $scope.upload = function() {
                        var opts = {
                            size: 'sm',
                            key: false, 
                            back: 'static'
                        };
                        var dlg = dialogs.create(
                                '/partials/upload.html', 
                                'uploadCtrl', 
                                {}, opts);
                        dlg.result.then(function(content) {
                            try {
                                var headerArr = JSON.parse(content);
                                _.each(headerArr, function(header) {
                                    var newHeader = {
                                        index: $scope.headers.length + 1,
                                        action: header.action,
                                        name: header.name,
                                        value: header.value,
                                        description: header.comment,
                                        url: '',
                                        state: "DISABLED"
                                    };
                                    if ($scope.validate(newHeader)) {
                                        $scope.headers.push(newHeader);
                                    } else {
                                        toaster.pop('error', "Import", 'Invalid row: '+ header.name+':'+header.value);
                                    }
                                });
                            } catch (e) {
                                console.error(e);
                                toaster.pop('error', "Import", 'Failed with error '+ e);
                            }
                            toaster.pop('success', "Import", 'Success!');
                        });
                    };

                    $scope.download = function() {
                        chrome.tabs.query({
                            active: true,
                            currentWindow: true
                        }, function(tab) {
                            var fs = null;
                            window.webkitRequestFileSystem(window.TEMPRORAY, 1024 * 1024, function(fs) {
                                var fileEntry = fs.root.getFile("test", {create: true, exclusive: false}, function(fileEntry) {
                                    fileEntry.createWriter(function(fileWriter) {
                                        fileWriter.seek(fileWriter.length);
                                        var data = getHeadersJSON();
                                        //downloadResource(data, tab);
                                        var now = moment().format('MM-DD-YYYY');
                                        var filename = 'modifyheaders-' + now + '.json';
                                        var contentType = 'application/json';
                                        var blob = new Blob([data], {type: contentType});
                                        saveToDisk(blob, filename);
                                        fileWriter.write(blob);
                                    }, errorHandler);
                                }, errorHandler);
                            }, errorHandler);
                        });
                    };
                    function errorHandler(e) {
                        var msg = '';
                        switch (e.code) {
                            case FileError.QUOTA_EXCEEDED_ERR:
                                msg = 'QUOTA_EXCEEDED_ERR';
                                break;
                            case FileError.NOT_FOUND_ERR:
                                msg = 'NOT_FOUND_ERR';
                                break;
                            case FileError.SECURITY_ERR:
                                msg = 'SECURITY_ERR';
                                break;
                            case FileError.INVALID_MODIFICATION_ERR:
                                msg = 'INVALID_MODIFICATION_ERR';
                                break;
                            case FileError.INVALID_STATE_ERR:
                                msg = 'INVALID_STATE_ERR';
                                break;
                            default:
                                msg = 'Unknown Error';
                                break;
                        }
                        console.error('Error: ' + msg);
                    }

                    function getHeadersJSON() {
                        var headers = $scope.headers.slice();
                        var modHeadersJSON = [];
                        _.each(headers, function(header) {
                            var modHeader = {
                                'action': header.action,
                                'name': header.name,
                                'value': header.value,
                                'comment': header.description,
                                'enabled': header.state === 'ENABLED'
                            };
                            modHeadersJSON.push(modHeader);
                        });
                        return JSON.stringify(modHeadersJSON);
                    }

                    function saveToDisk(blob, filename) {
                        var reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onload = function(event) {
                            var url = window.URL.createObjectURL(blob);
                            var save = document.createElement('a');
                            //save.href = event.target.result;
                            save.href = url;
                            save.target = '_blank';
                            save.download = filename || 'unknown';
                            save.click();
//                            var event = document.createEvent('Event');
//                            event.initEvent('click', true, true);
//                            save.dispatchEvent(event);
                            (window.URL || window.webkitURL).revokeObjectURL(save.href);
                        };
                    }

                    cmhHeaderListService.updateHeaderList($scope.headers);
                    cmhControlService.setExtensionStatus();
                }
        ).
        controller("uploadCtrl", function($scope, $modalInstance) {

            $scope.uploadFile = function($files) {
                var file = $files[0];
                var reader = new FileReader();
                if (file) {
                    reader.readAsText(file);
                }
                reader.onloadend = function() {
                    $modalInstance.close(reader.result);
                };
            };
            $scope.hitEnter = function(evt) {
                if (angular.equals(evt.keyCode, 13) && !(angular.equals($scope.name, null) || angular.equals($scope.name, '')))
                    $scope.save();
            }; // end hitEnter
        });
