function scroll(host) {
  var eventHost = host;
  var scrollHost = host;

  if (!host || host === document || host === document.documentElement || host === document.body || host === window) {
    eventHost = window;
    scrollHost = undefined;
  }

  return function(factory) {
    var tick = factory({
      current: 'scrollTop',
      total: 'scrollHeight',
      window: 'clientHeight',
    });

    var dochost = {
      scrollTop: document.body.scrollTop || document.documentElement.scrollTop,
      clientHeight: window.innerHeight,
      scrollHeight: document.body.scrollHeight,
    };

    eventHost.addEventListener('scroll', function() {
      var dochost = {
        scrollTop: document.body.scrollTop || document.documentElement.scrollTop,
        clientHeight: window.innerHeight,
        scrollHeight: document.body.scrollHeight,
      };

      tick(scrollHost || dochost);
    });

    tick(scrollHost || dochost);
  }
}

module.exports = scroll;
