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
var boxLayer = new Konva.Layer();
var anchorLayer = new Konva.Layer();

// Layer重ね処理
stage.add(curveLayer);
stage.add(boxLayer);
stage.add(anchorLayer);


// その他グローバル変数
var nodeArray = [];
var linkArray = [];




/////////////link///////////////////
/*
$('#add-anchor').on('click', function () {
  buildLink(380, 250, 400, 30);
});
*/
///////////////////////////////////////





//////////////box//////////////////////
/*
buildNode('Tomcat', 200, 150);//200 150
*/
//////////////////////////////////////




//////////event////////////////////////
// ---- box ---- //
$(function () {

  $('#rename').on('click', function () {
    text.text('changed');
    boxLayer.draw();
  });

  $('#delete-node').on('click', function () {
    boxGroup.remove();
    boxLayer.draw();
  });

  $('#add-node').on('click', function () {
    var title, width, height;
    title = $('#node-name').val();
    width = Number($('#node-width').val());
    height = Number($('#node-height').val());
    buildNode(title, width, height);
  });


// ---- link ---- //
//380, 250   400, 30
  $('#add-anchor').on('click', function () {
    var startX, startY, endX, endY;
    startX = Number($('#start-x').val());
    startY = Number($('#start-y').val());
    endX = Number($('#end-x').val());
    endY = Number($('#end-y').val());
    buildLink(startX, startY, endX, endY);
  });


  // ---- scale ---- //
  $('#zoom').on('click', function () {
    changeScale(true);
  });

  $('#out').on('click', function () {
    changeScale(false);
  });

});
///////////////////////////////////




