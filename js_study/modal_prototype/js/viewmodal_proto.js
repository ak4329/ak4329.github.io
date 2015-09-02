/**
 * モーダルをprototypeパターンで実装してみるテスト
 * 2015/08
 */

var Modal = (function () {
  var constructor = function() {
    // コンストラクタ
    // 静的プロパティの初期値をここで設定しておく
    this.$wrapper = {};
    this.$overlay = {};
    this.$openTrigger = {};
    this.$modals = {};
    this.$targetModal = {};
    this.$closeTrigger = {};

    return this;
  };

  // method
  var proto = constructor.prototype;

  // initialize
  proto.init = function(trigger, target) {
    // setEl に出してもよい
    this.$wrapper = $('#modal-wrapper');
    this.$overlay = $('#modal-overlay');
    this.$openTrigger = $(trigger);
    this.$modals = this.$wrapper.find('.modal-outer');
    this.$targetModal = $(target);
    this.$closeTrigger = this.$targetModal.find('.jsc-modal-close');

    this.setEvents();

    return this;
  };

  // 開く
  proto.open = function() {
    this.$modals.hide();
    this.$overlay.show();
    this.$wrapper.show();
    this.$targetModal.show();

    return this;
  };

  // 閉じる
  proto.close = function() {
    this.$modals.hide();
    this.$wrapper.hide();
    this.$overlay.hide();

    return this;
  };

  // 位置調整
  proto.setPosition = function() {
    var wH = $(window).height();
    var wW = $(window).width();
    var mH = this.$targetModal.outerHeight();
    var mW = this.$targetModal.outerWidth();
    var x = (wW - mW) / 2;
    var y = (wH - mH) / 2;

    this.$targetModal.css({'left': x + 'px','top': y + 'px'});
    // ウインドウがモーダルより小さかった時の処理
    if( mH > wH ) {
      this.$targetModal.css({
        'position' : 'absolute',
        'top' : '0'
      });
    }
    if( mW > wW ) {
      this.$targetModal.css({
        'position' : 'absolute',
        'left' : '0'
      });
    }
    if( mH < wH && mW < wW ) {
      this.$targetModal.css({ 'position' : '' });
    }

    return this;
  };

  // イベント設定
  proto.setEvents = function() {
    var that = this;

    that.$openTrigger.on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      that.open(e);
      that.setPosition();
    });

    that.$closeTrigger.off('click').on('click', function(e) {
      // 閉じるボタンクリック時
      e.preventDefault();
      that.close(e);
    });

    that.$wrapper.off('click').on('click', that.$overlay, function(e) {
      // オーバーレイクリック時
      e.stopPropagation();
      that.close(e);
    });

    that.$targetModal.off('click').on('click', function(e) {
      // モーダルクリック時
      e.stopPropagation();
    });

    $(window).on('resize rotate', function() {
      if(that.$targetModal.is(':visible')) {
        that.setPosition();
      }
    });

    return this;
  };

  return constructor;

})();


/**
 * 初期設定
 *
 * つかいかた：インスタンスを作ってinitする
 * 引数にはトリガーとなるリンクのclassとターゲットのidを入れる
 */
var modal1 = new Modal();
modal1.init('.jsc-modal-trigger1', '#jsi-modal1');

var modal2 = new Modal();
modal2.init('.jsc-modal-trigger2', '#jsi-modal2');
