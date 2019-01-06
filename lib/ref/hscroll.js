function scroll(host) {
  var eventHost = host;
  var scrollHost = host;

  if (!host || host === document || host === document.documentElement || host === document.body || host === window) {
    eventHost = window;
    scrollHost = undefined;
  }

  return function(factory) {
    var tick = factory({
      current: 'scrollLeft',
      total: 'scrollWidth',
      window: 'clientWidth',
    });

    var dochost = {
      scrollLeft: document.body.scrollLeft || document.documentElement.scrollLeft,
      clientWidth: window.innerWidth,
      scrollWidth: document.body.scrollWidth,
    };

    eventHost.addEventListener('scroll', function() {
      var dochost = {
        scrollLeft: document.body.scrollLeft || document.documentElement.scrollLeft,
        clientWidth: window.innerWidth,
        scrollWidth: document.body.scrollWidth,
      };

      tick(scrollHost || dochost);
    });

    tick(scrollHost || dochost);
  }
}

module.exports = scroll;
