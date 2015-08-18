/**
 * モーダルをprototypeパターンで実装してみるテスト
 * 2015/08
 */

function ModalObj() {
  // これがコンストラクタ？ クラス？
  // 静的プロパティの初期値をここで設定しておく
  this.overlay = {};
  this.triggerCls = {};
  this.openTrigger = {};
  this.targetModal = {};
  this.closeTrigger = {};

  return this;
}


// method
// initialize
ModalObj.prototype.init = function(triggerCls){
  this.overlay = $('#modalOverlay');
  this.triggerCls = $(triggerCls);
  this.openTrigger = this.triggerCls.attr('href');
  this.targetModal = $(this.openTrigger);
  this.closeTrigger = this.targetModal.find('.jsc-modal-close');

  this.closeTrigger.off('click');
  this.overlay.off('click');

  this.setEvents();

  return this;
};


// 開く
ModalObj.prototype.modalOpen = function(e) {
  // console.log(this.targetModal);
  e.preventDefault();
  e.stopPropagation();
  $('body').append('<div id="modalOverlay"></div>');
  this.overlay = $('#modalOverlay');
  this.overlay.show().css({'z-index':'999'});
  this.targetModal.show().css({'z-index':'1000'});

  return this;
};

// 閉じる
ModalObj.prototype.modalClose = function(e){
  // 閉じる動作は一応するのだが
  // このメソッドだけconsole.log(this.targetModal)すると
  // なぜか2～3回呼ばれて意味不明…_(:3」∠)＿
  // ※正しい対象モーダルを呼んだ後1から順に呼び直してるっぽい
  console.log(this.targetModal);
  e.preventDefault();
  this.targetModal.hide().css({'z-index':''});
  this.overlay.remove();

  return this;
};

// 位置調整
ModalObj.prototype.setPosition = function() {
  // console.log(this.targetModal);
  var wH = $(window).height();
  var wW = $(window).width();
  var mH = this.targetModal.outerHeight();
  var mW = this.targetModal.outerWidth();
  var x = (wW - mW) / 2;
  var y = (wH - mH) / 2;

  this.targetModal.css({'left': x + 'px','top': y + 'px'});
  // ウインドウがモーダルより小さかった時の処理
  if( mH > wH ){
    this.targetModal.css({
      'position' : 'absolute',
      'top' : '0'
    });
  }
  if( mW > wW ){
    this.targetModal.css({
      'position' : 'absolute',
      'left' : '0'
    });
  }
  if( mH < wH && mW < wW ){
    this.targetModal.css({ 'position' : '' });
  }

  return this;
};

// イベント設定
ModalObj.prototype.setEvents = function() {
  var that = this;

  this.triggerCls.on('click', function(e){
    that.modalOpen(e);
    that.setPosition();
  });

  that.closeTrigger.on('click', function(e){
    that.modalClose(e);
  });

  $(window).on('click', that.overlay, function(e){
    that.modalClose(e);
  });

  $(window).on('resize rotate', function(){
    if(that.targetModal.is(':visible')) {
      that.setPosition();
    }
  });

  return this;
};

/**
 * 初期設定
 *
 * つかいかた：インスタンスを作ってinitする
 * 引数にはトリガーとなるリンクのclassを入れる
 * 対応するモーダルはアンカーで指定（例：#modal1）
 */
var modal1 = new ModalObj();
modal1.init('.jsc-modal-trigger1');

var modal2 = new ModalObj();
modal2.init('.jsc-modal-trigger2');
