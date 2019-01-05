module.exports = {
  client: {
    x: function(factory) {
      var tick = factory();
      window.addEventListener('mousemove', function(event) {
        tick({
          current: event.clientX,
          total: document.body.clientWidth
        });
      });
    },

    y: function(factory) {
      var tick = factory();
      window.addEventListener('mousemove', function(event) {
        tick({
          current: event.clientY,
          total: document.body.clientHeight
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
          window: document.body.clientWidth,
          total: document.body.scrollWidth,
        });
      });
    },

    y: function(factory) {
      var tick = factory();

      window.addEventListener('mousemove', function(event) {
        tick({
          current: event.pageY,
          window: document.body.clientHeight,
          total: document.body.scrollHeight,
        });
      });
    },
  },
}
