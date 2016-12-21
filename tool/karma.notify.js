(function () {
  var icon = {
    // When using normal url, it may not work, so use data URI here
    pass: require('./pass.png'),
    fail: require('./fail.png')
  };

  function notify(title, body, icon) {
    var options = {
      body: body,
      icon: icon
    };
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification.");
      return;
    }

    if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      new Notification(title, options);
    } else if (Notification.permission !== 'denied') {
      // Have to use window.parent cause this run at context iframe,
      // otherwise request permission popup will not show.
      window.parent.Notification.requestPermission((permission) => {
        // If the user accepts, let's create a notification
        // Will produce TypeError: Notification is not a constructor
        // if (permission === "granted") {
        //   var notify = new Notification(title, options);
        // }
      });
    }
  }

  // store all my test results
  var __karmaResults = [];
  __karmaResults.success = true;
  __karmaResults.log = [];

  // Wrap the karma result function
  var resultFunc = window.__karma__.result;
  window.__karma__.result = function (result) {
    // run the original function
    resultFunc(result);
    // push each result on my storage array
    __karmaResults.push(result);

    __karmaResults.forEach(function (r) {
      if(!r.success) {
        __karmaResults.success = false;
        var log = r.suite.join('#') + ': ' + r.description;
        if(!__karmaResults.log.includes(log)) {
          __karmaResults.log.push(log);
          console.log(JSON.stringify(r));
        }
      }
    });
  };

// wrap the karma complete function
  var completeFunc = window.__karma__.complete;
  window.__karma__.complete = function (result) {
    // run the original function
    completeFunc(result);
    var now = new Date();
    var currentTime = '' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + '.' + now.getMilliseconds();
    if (__karmaResults.success) {
      notify(
        'SUCCESS ' + currentTime,
        'All ' + __karmaResults.length + ' tests PASSED!',
        icon.pass
      );
      console.log('All ' + __karmaResults.length + ' tests PASSED!');
    } else {
      notify(
        __karmaResults.log.length + ' test FAILED ' + currentTime,
        __karmaResults.log.join('\n'),
        icon.fail
      );
    }

    // reset the result function
    window.__karma__.result = resultFunc;
    // reset the complete function
    window.__karma__.complete = completeFunc;
  };
})();