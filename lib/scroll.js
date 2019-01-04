function scroll(host) {
  var eventHost = host;
  var scrollHost = host;

  if (!host || host === document.body || host === window) {
    eventHost = window;
    scrollHost = document.body;
  }

  return function(handler) {
    var _handler = handler({
      current: 'scrollTop',
      total: 'scrollHeight',
      window: 'clientHeight',
    });

    eventHost.addEventListener('scroll', function() {
      _handler(scrollHost);
    });

    _handler(scrollHost);
  }
}

module.exports = scroll;
