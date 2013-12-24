// Generated by CoffeeScript 1.6.1
var a, aaux, animate, cobweb, container, mapa, running, set_default, toggle;

container = document.getElementById('container');

running = false;

a = parseFloat(document.getElementById('amin').value);

aaux = a;

mapa = function(a, x) {
  return a * x * (1 - x);
};

toggle = function() {
  a = aaux;
  if (running === true) {
    running = false;
    return document.getElementById('pause').innerHTML = 'Play';
  } else {
    running = true;
    document.getElementById('pause').innerHTML = 'Pause';
    return animate();
  }
};

set_default = function() {
  a = parseFloat(document.getElementById('amin').value);
  aaux = a;
  running = false;
  document.getElementById('pause').innerHTML = 'Play';
  return Flotr.draw(container, [[0, 0], [0, 0]], {
    yaxis: {
      max: 1,
      min: 0
    },
    xaxis: {
      max: 1,
      min: 0
    },
    legend: {
      position: 'se'
    },
    HtmlText: false
  });
};

cobweb = function(a) {
  var abcissa, bissetriz, cob, data, graph, i, it, parabola, x, x0, _fn, _fn1, _i, _j, _len;
  it = 100;
  abcissa = (function() {
    var _i, _results;
    _results = [];
    for (i = _i = 0; _i < 100; i = ++_i) {
      _results.push(i / 100);
    }
    return _results;
  })();
  x0 = parseFloat(document.getElementById('x0').value);
  bissetriz = [[0, 0], [1, 1]];
  parabola = [];
  cob = [];
  _fn = function(i) {
    return parabola.push([i, mapa(a, i)]);
  };
  for (_i = 0, _len = abcissa.length; _i < _len; _i++) {
    i = abcissa[_i];
    _fn(i);
  }
  x = x0;
  cob.push([x0, 0]);
  _fn1 = function(i) {
    cob.push([x, mapa(a, x)]);
    x = mapa(a, x);
    return cob.push([x, x]);
  };
  for (i = _j = 0; 0 <= it ? _j < it : _j > it; i = 0 <= it ? ++_j : --_j) {
    _fn1(i);
  }
  data = [
    {
      data: bissetriz
    }, {
      data: parabola
    }, {
      data: cob
    }, {
      data: [[x0, 0]],
      label: 'x0',
      points: {
        show: true
      }
    }
  ];
  return graph = Flotr.draw(container, data, {
    yaxis: {
      max: 1,
      min: 0
    },
    xaxis: {
      max: 1,
      min: 0
    },
    legend: {
      position: 'se'
    },
    HtmlText: false
  });
};

animate = function() {
  cobweb(a);
  if (a >= parseFloat(document.getElementById('amax').value)) {
    set_default();
  }
  a += parseFloat(document.getElementById("apasso").value);
  aaux = a;
  return setTimeout(function() {
    if (running === true) {
      return animate();
    }
  }, parseInt(document.getElementById("tempo").value));
};

Flotr.draw(container, [[0, 0], [0, 0]], {
  yaxis: {
    max: 1,
    min: 0
  },
  xaxis: {
    max: 1,
    min: 0
  },
  legend: {
    position: 'se'
  },
  HtmlText: false
});
