var width = window.innerWidth;
var height = window.innerHeight;

// stage作成
var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height,
  draggable: true
});

// Layerの準備
var curveLayer = new Konva.Layer();
var nodeLayer = new Konva.Layer();

// Layer重ね処理
stage.add(curveLayer);
stage.add(nodeLayer);


// その他グローバル変数
var nodeArray = [];
var linkArray = [];
var tmp = null;




//////////event////////////////////////
$(function () {
// ---- box ---- //
  $('#add-node').on('click', function () {
    var name, width, height;
    name = $('#node-name').val();
    width = Number($('#node-width').val());
    height = Number($('#node-height').val());

    buildNode(name, width, height);
    nodeLayer.draw();
  });

  $('#add-anchor').on('click', function () {
    var nodeName, anchorName, rl;
    nodeName = $('#node-name-for-anchor').val();
    anchorName = $('#anchor-name').val();
    rl = ($('#rl').val() == 'true') ? true : false;

    buildAnchor(nodeName, anchorName, rl);
    nodeLayer.draw();
  });


// ---- link ---- //
  stage.on('mousedown', function(e) {
    tmp = e.target;
    if(tmp.type == 'anchor'){
      tmp.node.group.draggable(false);
      stage.draggable(false);
    }
  });

  stage.on('mouseup', function(e) {
    if(tmp.type == 'anchor'){
      tmp.node.group.draggable(true);
      stage.draggable(true);
      if(e.target.type == 'anchor'){
        buildLink(tmp, e.target);
        curveLayer.draw();
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
///////////////////////////////////




