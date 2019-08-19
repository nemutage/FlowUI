function findNodeByName(name) {
  for (var i = 0; i < nodeArray.length; i++) {
    if (nodeArray[i].name == name) return nodeArray[i];
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
function buildParts(nodeName, rl, index, partsName) { //rl right: true, left: false
  var node = findNodeByName(nodeName);
  if (node === null) return;
  node.addParts(rl, index, partsName);
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
    width: 260,
    height: 35,
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
    width: 260,
    height: 35,
    stroke: 'rgb(10, 10, 10)',
    strokeWidth: 1,
    cornerRadius: 10,
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
    name: name,
    group: group,
    box1: box1,
    box2: box2,
    text: text,

    baseAnchorHeight: 60,
    baseBox1Height: 85,
    interval: 35,
    anchorRadius: 8,
    partsTextSize: 18,
    anchorGap: 15,

    partsArray: {
      right: [],
      left: []
    },
    //method
    addParts: function (rl, index, partsName) {
      //rl値のチェック(right or left)
      if (rl != 'right' && rl != 'left') return false;
      //index値のチェック(0-length)
      if (index < 0 || this.partsArray[rl].length < index) return false;


      //box2の下コーナーの変更
      if (this.partsArray.right.length == 0 && this.partsArray.left.length == 0) {
        this.box2.cornerRadius([10, 10, 0, 0]);
      }


      //partsArrayの並べ替えとpartsの設定,挿入 
      for (var i = index; i < this.partsArray[rl].length; i++) {
        //partsの並べ替え
        var newY = this.partsArray[rl][i].y() + this.interval;
        this.partsArray[rl][i].y(newY);
        //parts.textの並べ替え
        newY = this.partsArray[rl][i].text.y() + this.interval;
        this.partsArray[rl][i].text.y(newY);
      }
      //partsの設定
      var parts = new Konva.Circle({
        radius: this.anchorRadius,
        stroke: '#666',
        fill: '#eee',
        strokeWidth: 2,
      });
      parts.node = node;
      parts.type = 'anchor';
      parts.x(rl == 'right' ? this.box1.width() - this.anchorGap : this.anchorGap);
      parts.y(this.baseAnchorHeight + index * this.interval);
      //parts.testの設定
      parts.text = new Konva.Text({
        text: partsName,
        fontSize: this.partsTextSize,
        fontFamily: 'Calibri',
        fill: 'white'
      });
      parts.text.x(rl == 'right' ? parts.x() - (this.anchorGap + parts.text.getTextWidth()) : parts.x() + this.anchorGap);
      parts.text.y((this.baseAnchorHeight - this.partsTextSize / 2) + index * this.interval);
      //parts,parts.textの挿入
      this.partsArray[rl].splice(index, 0, parts);


      //partsArray(.right or .left)の要素数によるbox1の高さの変更
      var maxLength = this.partsArray.right.length >= this.partsArray.left.length
        ? this.partsArray.right.length : this.partsArray.left.length;
      this.box1.height(this.baseBox1Height + (maxLength - 1) * this.interval);


      //layerの更新
      this.group.add(parts);
      this.group.add(parts.text);
      this.group.cache();


      //全linkの更新
      for (var i = 0; i < linkArray.length; i++) {
        var linkLine = linkArray[i].linkLine;
        var start = linkArray[i].start;
        var end = linkArray[i].end;
        setLinkLinePoint(linkLine, start, end);
      }
      return true;
    }
  }
  nodeArray.push(node);
}
