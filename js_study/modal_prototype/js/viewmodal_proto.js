/**
 * モーダルをprototypeパターンで実装してみるテスト
 * 2015/08
 */

function ModalObj() {
  // コンストラクタ
  // 静的プロパティの初期値をここで設定しておく
  this.$wrapper = {};
  this.$overlay = {};
  this.$openTrigger = {};
  this.$targetModal = {};
  this.$closeTrigger = {};

  return this;
}

// method
// initialize
ModalObj.prototype.init = function(trigger, target){
  this.$wrapper = $('#modal-wrapper');
  this.$overlay = $('#modal-overlay');
  this.$openTrigger = $(trigger);
  this.$targetModal = $(target);
  this.$closeTrigger = this.$targetModal.find('.jsc-modal-close');

  this.setEvents();

  return this;
};

// 開く
ModalObj.prototype.modalOpen = function() {
  this.$overlay.show();
  this.$wrapper.show();
  this.$targetModal.show();

  return this;
};

// 閉じる
ModalObj.prototype.modalClose = function(){
  this.$targetModal.hide();
  this.$wrapper.hide();
  this.$overlay.hide();

  console.log(this.$targetModal);

  return this;
};

// 位置調整
ModalObj.prototype.setPosition = function() {
  var wH = $(window).height();
  var wW = $(window).width();
  var mH = this.$targetModal.outerHeight();
  var mW = this.$targetModal.outerWidth();
  var x = (wW - mW) / 2;
  var y = (wH - mH) / 2;

  this.$targetModal.css({'left': x + 'px','top': y + 'px'});
  // ウインドウがモーダルより小さかった時の処理
  if( mH > wH ){
    this.$targetModal.css({
      'position' : 'absolute',
      'top' : '0'
    });
  }
  if( mW > wW ){
    this.$targetModal.css({
      'position' : 'absolute',
      'left' : '0'
    });
  }
  if( mH < wH && mW < wW ){
    this.$targetModal.css({ 'position' : '' });
  }

  return this;
};

// イベント設定
ModalObj.prototype.setEvents = function() {
  var that = this;

  that.$openTrigger.on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    that.modalOpen(e);
    that.setPosition();
  });

  that.$closeTrigger.off('click').on('click', function(e){
    // 閉じるボタンクリック時
    e.preventDefault();
    e.stopPropagation();
    console.log('button');
    that.modalClose(e);
  });

  that.$wrapper.off('click').on('click', that.$overlay, function(e){
    // オーバーレイクリック時
    e.stopPropagation();
    console.log('overlay');
    that.modalClose(e);
  });

  that.$targetModal.off('click').on('click', function(e){
    // モーダルクリック時
    e.stopPropagation();
  });

  $(window).on('resize rotate', function(){
    if(that.$targetModal.is(':visible')) {
      that.setPosition();
    }
  });

  return this;
};

/**
 * 初期設定
 *
 * つかいかた：インスタンスを作ってinitする
 * 引数にはトリガーとなるリンクのclassとターゲットのidを入れる
 */
var modal1 = new ModalObj();
modal1.init('.jsc-modal-trigger1', '#jsi-modal1');

var modal2 = new ModalObj();
modal2.init('.jsc-modal-trigger2', '#jsi-modal2');
