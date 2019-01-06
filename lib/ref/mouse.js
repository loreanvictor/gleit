module.exports = {
  client: {
    x: function(factory) {
      var tick = factory();
      window.addEventListener('mousemove', function(event) {
        tick({
          current: event.clientX,
          total: window.innerWidth
        });
      });
    },

    y: function(factory) {
      var tick = factory();
      window.addEventListener('mousemove', function(event) {
        tick({
          current: event.clientY,
          total: window.innerHeight
        });
      });
    },
  },

  page: {
    x: function(factory) {
      var tick = factory();

      window.addEventListener('mousemove', function(event) {
        tick({
          current: event.pageX,
          window: window.innerWidth,
          total: document.body.scrollWidth,
        });
      });
    },

    y: function(factory) {
      var tick = factory();

      window.addEventListener('mousemove', function(event) {
        tick({
          current: event.pageY,
          window: window.innerHeight,
          total: document.body.scrollHeight,
        });
      });
    },
  },
}
