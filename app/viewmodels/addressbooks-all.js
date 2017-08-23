define(['knockout'], function (ko) {
    var list = ko.observableArray([]),
    activate = function () {
        var url = "http://lumachroma.azurewebsites.net";
        $.ajax({
            url: `${url}/api/address-books`,
            method: "GET"
        }).done(function (result) {
            console.log(result);
            list(result._results);
        });
    },
    attached = function () {

    };

    return {
        list: list,
        activate: activate,
        attached: attached
    };
});

