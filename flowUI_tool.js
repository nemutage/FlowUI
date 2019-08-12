function findNodeByName(name) {
  for(var i = 0; i < nodeArray.length; i++){
    if(nodeArray[i].name == name)return nodeArray[i];
  }
  return null;
}


// ベジェ曲線のポイント設定
function setLinkLinePoint(linkLine, startAnchor, endAnchor) {
  var startX, startY, control1X, control1Y, control2X, control2Y, endX, endY;

  // 始点、終点の設定
  startX = startAnchor.attrs.x + startAnchor.node.group.attrs.x;
  startY = startAnchor.attrs.y + startAnchor.node.group.attrs.y;
  endX = endAnchor.attrs.x + endAnchor.node.group.attrs.x;
  endY = endAnchor.attrs.y + endAnchor.node.group.attrs.y;

  // 制御点の設定
  var len = Math.floor(Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)));
  control1X = startX + Math.floor(len / 2);
  control1Y = startY;
  control2X = endX - Math.floor(len / 2);
  control2Y = endY;

  linkLine.points([startX, startY, control1X, control1Y, control2X, control2Y, endX, endY]);
}


function buildLink(startAnchor, endAnchor) {
  var linkLine = new Konva.Line({
    stroke: '#ccc',
    strokeWidth: 2,
    bezier: true,
  });

  setLinkLinePoint(linkLine, startAnchor, endAnchor);
  linkLayer.add(linkLine);

  var link = {
    linkLine: linkLine,
    start: startAnchor,
    end: endAnchor
  }
  linkArray.push(link);

  startAnchor.node.group.on('dragmove', function () {
    setLinkLinePoint(linkLine, startAnchor, endAnchor);
    linkLayer.draw();
  });
  endAnchor.node.group.on('dragmove', function () {
    setLinkLinePoint(linkLine, startAnchor, endAnchor);
    linkLayer.draw();
  });
}


// リンク点の設定
function buildAnchor(nodeName, anchorName, rlFlag) { //rlFlag right: true, left: false
  var node = findNodeByName(nodeName);
  if(node === null)return;

  var anchor = new Konva.Circle({
    x: rlFlag ? node.getWidth() - 10 : 10,
    y: node.getNextHeight(),
    name: anchorName,
    radius: 8,
    stroke: '#666',
    fill: '#eee',
    strokeWidth: 2,
  });
  anchor.node = node;
  anchor.type = 'anchor';

  node.addParts(anchor);
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
}


// Boxの作成
function buildNode(name) {
  var group = new Konva.Group({
    x: 0,
    y: 0,
    draggable: true,
    opacity: 0.9
  });

  var box1 = new Konva.Rect({
    x: 0,
    y: 0,
    width: 200,
    height: 130,
    fill: 'rgb(30, 30, 30)',
    stroke: 'rgb(10, 10, 10)',
    strokeWidth: 1,
    shadowBlur: 10,
    shadowColor: 'black',
    shadowOffset: { x: 5, y: 5 },
    shadowOpacity: 0.5,
    cornerRadius: 10
  });
  group.add(box1);

  var box2 = new Konva.Rect({
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
  group.add(box2);

  var text = new Konva.Text({
    x: 10,
    y: 10,
    text: name,
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'white'
  });
  group.add(text);

  group.cache();
  nodeLayer.add(group);


  var node = {
    //field
    group: group,
    box1: box1,
    box2: box2,
    text: text,
    partsArray: [],
    name: name,
    //method
    getWidth: function() {
      return this.box1.width();
    },
    getNextHeight: function() {
      return 60 + this.partsArray.length * 35;
    },
    addParts: function(parts) {
      this.group.add(parts);
      this.partsArray.push(parts);
      if(this.partsArray.length >= 3){
        var height = this.box1.height();
        this.box1.height(height + 35);
      }
      this.group.cache();
    }
  }
  nodeArray.push(node);
}
