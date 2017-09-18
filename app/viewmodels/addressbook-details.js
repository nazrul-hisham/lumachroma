﻿define(['knockout', 'schemas', 'durandal/system', 'durandal/app', 'plugins/router', 'services/datacontext'],
    function (ko, schemas, system, app, router, context) {
        var url = "https://lumachroma.azurewebsites.net";
        var isBusy = ko.observable(false),
            id = ko.observable(),
            showEditForm = ko.observable(false),
            entity = ko.observable(new schemas.AddressBook(system.guid())),
            activate = function (entityId) {
                id(entityId);
                if (!entityId || entityId === "0") {
                    entity(new schemas.AddressBook(system.guid()));
                    showEditForm(true);
                } else {
                    isBusy(true);
                    context.get(`${url}/api/address-books/${id()}`, true, {})
                        .done(function (result) {
                            console.log(result);
                            entity(new schemas.AddressBook(result._result));
                            //console.log(ko.toJSON(entity));
                            isBusy(false);
                        }).fail(function (e) {
                            console.log(e.status);
                            console.log(e.statusText);
                            isBusy(false);
                        });
                }
            },
            defultOperationEndpoint = function (json, endpoint, verb, successMessage) {
                context.send(json, `${url}/${endpoint}`, verb)
                    .done(function (result) {
                        console.log(result);
                        isBusy(false);
                        app.showMessage(successMessage, "MVC Durandal", ["OK"])
                            .done(function (result) {
                                if (result == "OK") {
                                    router.navigate("addressbooks-all");
                                }
                            });
                    }).fail(function (e) {
                        console.log(e.status);
                        console.log(e.statusText);
                        isBusy(false);
                    });
            },
            editEntity = function () {
                var data = ko.toJSON(entity);
                var endpoint = `api/address-books/${id()}`;
                var msg = "Successfully edited.";
                //console.log(data);
                defultOperationEndpoint(data, endpoint, "PUT", msg);
            },
            addEntity = function () {
                var data = ko.toJSON(entity);
                var endpoint = "api/address-books";
                var msg = "Successfully added.";
                //console.log(data);
                defultOperationEndpoint(data, endpoint, "POST", msg);
            },
            deleteEntity = function () {
                var data = ko.toJSON(entity);
                var endpoint = `api/address-books/${id()}`;
                var msg = "Successfully deleted.";
                //console.log(data);
                app.showMessage("Are you sure you want to delete?", "MVC Durandal", ["Yes", "No"])
                    .done(function (result) {
                        if (result === "No") {
                            return
                        }
                        defultOperationEndpoint(data, endpoint, "DELETE", msg);
                    });
            },
            toggleShowEditForm = function () {
                showEditForm(!showEditForm());
            },
            backToEntityList = function () {
                router.navigate("addressbooks-all");
            },
            attached = function () {

            },
            compositionComplete = function () {

            },
            deactivate = function () {
                id(null);
                showEditForm(false);
            };

        return {
            id: id,
            entity: entity,
            editEntity: editEntity,
            addEntity: addEntity,
            deleteEntity: deleteEntity,
            showEditForm: showEditForm,
            toggleShowEditForm: toggleShowEditForm,
            backToEntityList: backToEntityList,
            isBusy: isBusy,
            activate: activate,
            attached: attached,
            compositionComplete: compositionComplete,
            deactivate: deactivate
        };
    });
