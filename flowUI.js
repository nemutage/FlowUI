$.getScript("flowUI_tool.js");

var width = window.innerWidth;
var height = window.innerHeight;

// 描画用変数
var stage;
var linkLayer
var nodeLayer

// その他グローバル変数
var nodeArray = [];
var linkArray = [];
var tmp = null;


$(function () {
  // stage作成
  stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
    draggable: true
  });

  // Layerの準備
  linkLayer = new Konva.Layer();
  nodeLayer = new Konva.Layer();
  stage.add(linkLayer);
  stage.add(nodeLayer);


  // event
  // ---- box ---- //
  $('#add-node').on('click', function () {
    var name;
    name = $('#node-name').val();

    makeNode(name);
    nodeLayer.draw();
  });

  $('#add-parts').on('click', function () {
    var nodeName, partsName, rl, index;
    nodeName = $('#node-name2').val();
    partsName = $('#parts-name').val();
    rl = $('#rl').val();
    index = Number($('#index').val());

    makeParts(nodeName, rl, index, partsName);
    nodeLayer.draw();
    linkLayer.draw();
  });

  $('#delete-parts').on('click', function () {
    var nodeName, rl, index;
    nodeName = $('#node-name3').val();
    rl = $('#rl2').val();
    index = Number($('#index2').val());
    
  });


  // ---- link ---- //
  stage.on('mousedown', function (e) {
    tmp = e.target;
    if (tmp.type == 'anchor') {
      tmp.node.group.draggable(false);
      stage.draggable(false);
    }
  });

  stage.on('mouseup', function (e) {
    if (tmp.type == 'anchor') {
      tmp.node.group.draggable(true);
      stage.draggable(true);
      if (e.target.type == 'anchor') {
        makeLink(tmp, e.target);
        linkLayer.draw();
      }
    }
  });

  // ---- scale ---- //
  $('#zoom').on('click', function () {
    changeScale(true);
    stage.batchDraw();
  });

  $('#out').on('click', function () {
    changeScale(false);
    stage.batchDraw();
  });

});





