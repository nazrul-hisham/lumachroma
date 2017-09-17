define(['knockout', 'schemas', 'durandal/system', 'durandal/app', 'plugins/router'], function (ko, schemas, system, app, router) {
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
                $.ajax({
                    url: `${url}/api/address-books/${id()}`,
                    method: "GET"
                }).done(function (result) {
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
        editEntity = function () {
            var data = ko.toJSON(entity);
            //console.log(data);
            $.ajax({
                url: `${url}/api/address-books/${id()}`,
                type: "PUT",
                data: data,
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            }).done(function (result) {
                console.log(result);
                isBusy(false);
                app.showMessage("Successfully edited Address Book.", "MVC Durandal", ["OK"])
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
        addEntity = function () {
            var data = ko.toJSON(entity);
            //console.log(data);
            $.ajax({
                url: `${url}/api/address-books`,
                type: "POST",
                data: data,
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            }).done(function (result) {
                console.log(result);
                isBusy(false);
                app.showMessage("Successfully added Address Book.", "MVC Durandal", ["OK"])
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
