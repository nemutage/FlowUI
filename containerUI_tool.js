// リンク点の設定
function buildAnchor(node) {
  var anchor = new Konva.Circle({
    x: 10,
    y: 80,
    radius: 8,
    stroke: '#666',
    fill: '#eee',
    strokeWidth: 2,
    draggable: true
  });
  node.nodeGroup.add(anchor);
  node.nodeGroup.cache();
  node.anchor.push(anchor);
  //return anchor;
}

/*
function buildAnchorSet(startX, startY, endX, endY) {
  var startAnchor = buildAnchor(startX, startY);
  var endAnchor = buildAnchor(endX, endY);

  var anchorSet = {
    start: startAnchor,
    end: endAnchor
  };

  return anchorSet;
}
*/

/*
// ベジェ曲線のポイント設定
function setCurvePoint(curveLine, anchorSet) {
  var startX, startY, control1X, control1Y, control2X, control2Y, endX, endY;

  // 始点、終点の設定
  startX = anchorSet.start.attrs.x;
  startY = anchorSet.start.attrs.y;
  endX = anchorSet.end.attrs.x;
  endY = anchorSet.end.attrs.y;

  // 制御点の設定
  var len = Math.floor(Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)));
  control1X = startX + Math.floor(len / 2);
  control1Y = startY;
  control2X = endX - Math.floor(len / 2);
  control2Y = endY;

  curveLine.points([startX, startY, control1X, control1Y, control2X, control2Y, endX, endY]);
}
*/

/*
function buildCurveLine(anchorSet) {
  var curveLine = new Konva.Line({
    stroke: '#ccc',
    strokeWidth: 2,
    bezier: true,
  });

  setCurvePoint(curveLine, anchorSet);
  curveLayer.add(curveLine);
  curveLayer.draw();

  anchorSet.start.on('dragmove', function () {
    setCurvePoint(curveLine, anchorSet);
    curveLayer.draw();
  });
  anchorSet.end.on('dragmove', function () {
    setCurvePoint(curveLine, anchorSet);
    curveLayer.draw();
  });

  return curveLine;
}
*/

/*
function buildLink(startX, startY, endX, endY) {
  var anchorSet = buildAnchorSet(startX, startY, endX, endY);
  var curveLine = buildCurveLine(anchorSet);

  var link = {
    start: anchorSet.start,
    end: anchorSet.end,
    line: curveLine
  }

  linkArray.push(link);
}
*/


// ズームアウト
function changeScale(flag) {
  var scaleBy = 1.1;
  var oldScale = stage.scaleX();

  var pointTo = {
    x: (stage.x() - (width / 2)) / oldScale,
    y: (stage.y() - (height / 2)) / oldScale
  };

  var newScale = flag === true ? oldScale * scaleBy : oldScale / scaleBy;
  stage.scale({ x: newScale, y: newScale });

  var newPos = {
    x: pointTo.x * newScale + (width / 2),
    y: pointTo.y * newScale + (height / 2)
  };

  stage.position(newPos);
  stage.batchDraw();
}


// Boxの作成
function buildNode(title, argWidth, argHeight) {

  var nodeGroup = new Konva.Group({
    x: 0,
    y: 0,
    draggable: true,
    opacity: 0.9
  });


  var box1 = new Konva.Rect({
    x: 0,
    y: 0,
    width: argWidth,
    height: argHeight,
    fill: 'rgb(30, 30, 30)',
    stroke: 'rgb(10, 10, 10)',
    strokeWidth: 1,
    shadowBlur: 10,
    shadowColor: 'black',
    shadowOffset: { x: 5, y: 5 },
    shadowOpacity: 0.5,
    cornerRadius: 10
  });
  nodeGroup.add(box1);


  var box2 = new Konva.Rect({
    x: 0,
    y: 0,
    width: argWidth,
    height: 35,
    stroke: 'rgb(10, 10, 10)',
    strokeWidth: 1,
    cornerRadius: [10, 10, 0, 0],
    fillLinearGradientStartPoint: { x: 0, y: 0 },
    fillLinearGradientEndPoint: { x: 200, y: 180 },
    fillLinearGradientColorStops: [0, 'rgb(132, 169, 191)', 1, 'black']
  });
  nodeGroup.add(box2);


  var text = new Konva.Text({
    x: 10,
    y: 10,
    text: title,
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'white'
  });
  nodeGroup.add(text);


  nodeGroup.cache();
  nodeLayer.add(nodeGroup);


  var node = {
    nodeGroup: nodeGroup,
    box1: box1,
    box2: box2,
    text: text,
    anchor: [],

    //id:
    //title:
  }

  nodeArray.push(node);

  return node;
}
