//--------------- Constants

var CLIENT_AUTH_KEY = '<copy-and-paste-the-client-auth-key-from-push.littlepostman.com-here>';
var DEVICE_ENVIRONMENT = 'DEV';



//--------------- Implementation

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        $('#push-configure').click(function() {
            cordova.plugins.LittlePostman.configure (CLIENT_AUTH_KEY, DEVICE_ENVIRONMENT, function(msg, inForeground) {
                if (inForeground) {
                    alert('Message received in foreground: ' + JSON.stringify(msg));
                } else {
                    alert('Message received in background and user clicked to open: ' + JSON.stringify(msg));
                }
            }, function(result) {
                alert("Configure successful for " + result);
            }, function() {
                alert("configure failed");
            });
        });

        $('#push-isregistered').click(function() {
            cordova.plugins.LittlePostman.isRegistered (function(result) {
                if (result) {
                    alert("Device is registered");
                } else {
                    alert("Device is not registered");
                }
            }, function() {
                alert("isRegistered failed");
            });
        });

        $('#push-register').click(function() {
            cordova.plugins.LittlePostman.register (function(didRegisterSuccessfully) {
                if (didRegisterSuccessfully) {
                    alert("Registered successfully");
                } else {
                    alert("Registration failed");
                }
            }, function() {
                alert("register failed");
            });
        });

        $('#push-unregister').click(function() {
            cordova.plugins.LittlePostman.unregister (function(didUnregisterSuccessfully) {
                if (didUnregisterSuccessfully) {
                    alert("Unregistered successfully");
                } else {
                    alert("Unregistration failed");
                }
            }, function() {
                alert("unregister failed");
            });
        });

        $('#push-setdata').click(function() {
            var data = {
                userNameFirst : 'cordova'
            };

            cordova.plugins.LittlePostman.setData (data, function() {
                alert("Set Data successful");
            }, function() {
                alert("setData failed");
            });
        });

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
