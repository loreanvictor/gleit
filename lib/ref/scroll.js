function scroll(host) {
  var eventHost = host;
  var scrollHost = host;

  if (!host || host === document || host === document.documentElement || host === document.body || host === window) {
    eventHost = window;
    scrollHost = document.documentElement || document.body;
  }

  return function(factory) {
    var tick = factory({
      current: 'scrollTop',
      total: 'scrollHeight',
      window: 'clientHeight',
    });

    eventHost.addEventListener('scroll', function() {
      tick(scrollHost);
    });

    tick(scrollHost);
  }
}

module.exports = scroll;
