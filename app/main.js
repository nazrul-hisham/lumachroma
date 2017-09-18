requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.4.0',
        'jquery': '../lib/jquery/jquery-3.1.1',
        'schemas': 'entitydefinition/schemas'
        //TODO: Add moment.js
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator'],  function (system, app, viewLocator) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Lumachroma Durandal';

    app.configurePlugins({
        router: true,
        dialog: true
    });

    app.start().then(function () {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');
    });
});

define('services/datacontext', [], function () {
    
        function send(json, url, verb) {
            var tcs = new $.Deferred();
            $.ajax({
                type: verb,
                data: json,
                url: url,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                error: tcs.reject,
                success: tcs.resolve
            });
            return tcs.promise();
        }
    
        function get(url, cache, headers) {
            var tcs = new $.Deferred();
            $.ajax({
                type: "GET",
                cache: cache,
                headers: headers,
                url: url,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                error: tcs.reject,
                success: tcs.resolve
            });
            return tcs.promise();
        }
    
        function post(json, url, headers) {
            var tcs = new $.Deferred();
            $.ajax({
                type: "POST",
                data: json,
                headers: headers,
                url: url,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                error: tcs.reject,
                success: tcs.resolve
            });
            return tcs.promise();
        }
    
        function put(json, url, headers) {
            var tcs = new $.Deferred();
            $.ajax({
                type: "PUT",
                data: json,
                headers: headers,
                url: url,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                error: tcs.reject,
                success: tcs.resolve
            });
            return tcs.promise();
        }
    
        function patch(json, url, headers) {
            var tcs = new $.Deferred();
            $.ajax({
                type: "PATCH",
                data: json,
                headers: headers,
                url: url,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                error: tcs.reject,
                success: tcs.resolve
            });
            return tcs.promise();
        }
    
        function sendDelete(url) {
            var tcs = new $.Deferred();
            $.ajax({
                type: "DELETE",
                data: "{}",
                url: url,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                error: tcs.reject,
                success: tcs.resolve
            });
            return tcs.promise();
        }
    
        return {
            send: send,
            get: get,
            post: post,
            put: put,
            patch: patch,
            sendDelete: sendDelete
        };
    });
    