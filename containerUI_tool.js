// リンク点の設定
function buildAnchor(x, y) {
  var anchor = new Konva.Circle({
    x: x,
    y: y,
    radius: 8,
    stroke: '#666',
    fill: '#eee',
    strokeWidth: 2,
    draggable: true
  });
  anchorLayer.add(anchor);
  anchorLayer.draw();
  return anchor;
}


// ベジェ曲線の描画
function drawCurves() {
  var startX, startY, control1X, control1Y, control2X, control2Y, endX, endY;

  // 始点、終点の設定
  startX = bezier.start.attrs.x;
  startY = bezier.start.attrs.y;
  endX = bezier.end.attrs.x;
  endY = bezier.end.attrs.y;

  // 制御点の設定
  var len = Math.floor(Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)));
  control1X = startX + Math.floor(len / 2);
  control1Y = startY;
  control2X = endX - Math.floor(len / 2);
  control2Y = endY;
  curveLine.points([startX, startY, control1X, control1Y, control2X, control2Y, endX, endY]);
  curveLayer.draw();
}


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
//opasityは一旦グループにあてる
function buildNode(title, argWidth, argHeight) {

  var boxGroup = new Konva.Group({
    x: 10,
    y: 10,
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
  boxGroup.add(box1);


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
  boxGroup.add(box2);


  var text = new Konva.Text({
    x: 10,
    y: 10,
    text: title,
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'white'
  });
  boxGroup.add(text);


  boxGroup.cache(); //パフォーマンス
  boxLayer.add(boxGroup);
  boxLayer.draw();

  nodeArray.push(boxGroup);
  return boxGroup;
}
