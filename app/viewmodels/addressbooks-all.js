define(['knockout'], function (ko) {
    var url = "https://lumachroma.azurewebsites.net";
    var url = "http://localhost:50521";
    var isBusy = ko.observable(false),
        list = ko.observableArray([]),
        pagerSelf = ko.observable(null),
        pagerNext = ko.observable(null),
        pagerPrev = ko.observable(null),
        pagerPage = ko.observable(1),
        pagerSize = ko.observable(20),
        pagerAvailSize = ko.observableArray([10, 20, 30, 50]),
    activate = function () {
        pagerPage(1);
        loadPage(`${url}/api/address-books?size=${pagerSize()}`);
    },
    attached = function () {
        $('#page-pager-size').change(function () {
            activate();
        });
    },
    loadPage = function (url) {
        pagerSelf(null);
        pagerNext(null);
        pagerPrev(null);
        isBusy(true);
        $.ajax({
            url: url,
            method: "GET"
        }).done(function (result) {
            console.log(result);
            list(result._results);
            $.each(result._links, function (index, item) {
                if (item.rel == "self") pagerSelf(item);
                if (item.rel == "next") pagerNext(item);
                if (item.rel == "prev") pagerPrev(item);
            });
            isBusy(false);
        }).fail(function (e) {
            console.log(e.status);
            console.log(e.responseJSON.status);
            isBusy(false);
        });
    },
    pagerNextPage = function () {
        console.log(pagerNext());
        if (pagerNext()) {
            pagerPage(pagerPage() + 1);
            loadPage(pagerNext().href);
        }
    },
    pagerPrevPage = function () {
        console.log(pagerPrev());
        if (pagerPrev()) {
            pagerPage(pagerPage() - 1);
            loadPage(pagerPrev().href);
        }
    },
    pagerSelfPage = function () {
        console.log(pagerSelf());
        if (pagerSelf()) {
            pagerPage(1);
            loadPage(pagerSelf().href);
        }
    };

    return {
        isBusy: isBusy,
        list: list,
        pagerNextPage: pagerNextPage,
        pagerPrevPage: pagerPrevPage,
        pagerSelfPage: pagerSelfPage,
        pagerNext: pagerNext,
        pagerPrev: pagerPrev,
        pagerSelf: pagerSelf,
        pagerSize: pagerSize,
        pagerPage: pagerPage,
        pagerAvailSize: pagerAvailSize,
        activate: activate,
        attached: attached
    };
});
