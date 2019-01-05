function scroll(host) {
  var eventHost = host;
  var scrollHost = host;

  if (!host || host === document.body || host === window) {
    eventHost = window;
    scrollHost = document.body;
  }

  return function(factory) {
    var tick = factory({
      current: 'scrollLeft',
      total: 'scrollWidth',
      window: 'clientWidth',
    });

    eventHost.addEventListener('scroll', function() {
      tick(scrollHost);
    });

    tick(scrollHost);
  }
}

module.exports = scroll;
