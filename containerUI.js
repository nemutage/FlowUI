var width = window.innerWidth;
var height = window.innerHeight;

// stage作成
var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height,
  draggable: true
});


var curveLayer = new Konva.Layer();
var boxLayer = new Konva.Layer();
var anchorLayer = new Konva.Layer();

stage.add(curveLayer);
stage.add(boxLayer);
stage.add(anchorLayer);


/////////////bezier///////////////////
var bezier = {
  start: buildAnchor(380, 250),
  end: buildAnchor(400, 30)
};

var curveLine = new Konva.Line({
  stroke: '#ccc',
  strokeWidth: 2,
  bezier: true,
});
curveLayer.add(curveLine);

anchorLayer.on('beforeDraw', function () {
  drawCurves();
});

drawCurves();

///////////////////////////////////////





//////////////box//////////////////////
var boxGroup = new Konva.Group({
  x: 10,
  y: 10,
  draggable: true
});


var rect1 = new Konva.Rect({
  x: 0,
  y: 0,
  width: 200,
  height: 150,
  fill: 'rgb(30, 30, 30)',
  stroke: 'rgb(10, 10, 10)',
  strokeWidth: 1,
  shadowBlur: 10,
  shadowColor: 'black',
  shadowOffset: { x: 5, y: 5 },
  shadowOpacity: 0.5,
  cornerRadius: 10,
  opacity: 0.8
});
boxGroup.add(rect1);


var rect2 = new Konva.Rect({
  x: 0,
  y: 0,
  width: 200,
  height: 35,
  stroke: 'rgb(10, 10, 10)',
  strokeWidth: 1,
  cornerRadius: [10, 10, 0, 0],
  fillLinearGradientStartPoint: { x: 0, y: 0 },
  fillLinearGradientEndPoint: { x: 200, y: 180 },
  fillLinearGradientColorStops: [0, 'rgb(132, 169, 191)', 1, 'black']
});
boxGroup.add(rect2);


var text = new Konva.Text({
  x: 10,
  y: 10,
  text: 'Tomcat',
  fontSize: 20,
  fontFamily: 'Calibri',
  fill: 'white'
});
boxGroup.add(text);

boxLayer.add(boxGroup);
boxLayer.draw();

document.getElementById('rename').addEventListener(
  'click',
  function () {
    text.text('changed');
    boxLayer.draw();
  },
  false
);

document.getElementById('delete-node').addEventListener(
  'click',
  function () {
    boxGroup.remove();
    boxLayer.draw();
  },
  false
);
//////////////////////////////////////


///////scale///////////////////////
document.getElementById('zoom').addEventListener(
  'click',
  function () {
    changeScale(true);
  },
  false
);
document.getElementById('out').addEventListener(
  'click',
  function () {
    changeScale(false);
  },
  false
);

///////////////////////////////////




