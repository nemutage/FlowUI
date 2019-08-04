var width = window.innerWidth;
var height = window.innerHeight;

// stage作成
var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height,
  draggable: true
});


var anchorLayer = new Konva.Layer();
var curveLayer = new Konva.Layer();


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

stage.add(curveLayer);
///////////////////////////////////////





//////////////box//////////////////////
var boxLayer = new Konva.Layer();

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
stage.add(boxLayer);

document.getElementById('rename').addEventListener(
    'click',
    function(){
        text.text('changed');
        boxLayer.draw();
    },
    false
);

document.getElementById('delete-node').addEventListener(
    'click',
    function(){
        boxGroup.remove();
        boxLayer.draw();
    },
    false
);
//////////////////////////////////////



stage.add(anchorLayer);

drawCurves();
