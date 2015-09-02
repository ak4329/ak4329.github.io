;(function() {

  var IL = IL || {};

  IL = {
    fn: {},
    ui: {},
    api: {},
    utils: {}
  };

/**
 *  スムーススクロール (2015/02)
 *    must要件　クリックしたらページの上部へ遷移
 *    want要件　スクロールしたら出す
 */

  IL.ui.pageScroll = function() {
    var speed = 500;
    var href = $(this).attr('href');
    var target = $(href === '#' || href === '' ? 'html' : href);
    var position = target.offset().top;
    $('html, body').animate({scrollTop: position}, speed, 'swing');
    return false;  // urlに#がつかなくなるよ！！！！！
  };

  IL.ui.showScrollBtn = function(el) {
    var trigger = 200;
    var $el = $(el);
    var windowPos = $(window).scrollTop();

    if(windowPos > trigger){
      $el.fadeIn(300);
    } else {
      $el.fadeOut(300);
    }
  };

  $('a[href^=#]').on('click', IL.ui.pageScroll);
  $(window).on('scroll', function(){
    IL.ui.showScrollBtn('#jsi-btn-goTop');
  });


/**
 *  アコーディオン (2015/02, 2015/09)
 *    must要件　クリックしたら表示される。もう一度クリックしたら消える
 *    want要件　開くスピードを調整してみる。
 */

  IL.ui.accordion = function() {
    var $this = $(this);
    var $accordion = $this.next('.accordion-inner');
    $accordion.slideToggle('fast', function(){
      // 開閉状態でプラスマイナスを切り替える
      var $targetSpan = $this.find('span');
      var $openStatus = $accordion.css('display');
      if($openStatus === 'none'){
        $targetSpan.removeClass();
        $targetSpan.addClass('plus');
        $targetSpan.text('+');
      } else{
        $targetSpan.removeClass();
        $targetSpan.addClass('minus');
        $targetSpan.text('-');
      }
    });
  };

  $('.jsc-accordion').on('click', IL.ui.accordion);


/**
 *  タブ切り替え (2015/09)
 *    must要件　タブ①を押すとコンテンツ①が表示され、タブ②を押すとコンテンツ②が表示される
 *    want要件　切り替え時のアニメーションをつけてみる。
 */

  IL.ui.ChangeTabs = (function() {
    // コンストラクタ
    var constructor = function () {
      this.$el = {};
      this.$tab = {};
      this.$defaultTab = {};
      this.$tabContent = {};
      this.anchorKW = {};
      this.activeCls = {};

      return this;
    };

    var proto = constructor.prototype;
    proto.init = function(el, anchorKW) {
      this.$el = $(el);
      this.anchorKW = anchorKW;
      this.$tab = this.$el.find('a[href^="#' + this.anchorKW + '"]');
      this.$defaultTab = this.$el.find('a[href^="#' + this.anchorKW + '"]:eq(0)');
      this.$tabContent = this.$el.find('.tab-content-inner');
      this.activeCls = 'is-active';

      this.setEvents();

      return this;
    };

    proto.toggleContent = function(hash) {
      this.$tabContent.hide();
      this.$el.find(hash).fadeIn('slow');

      return this;
    };

    proto.setEvents = function() {
      var that = this;

      that.$tab.off().on('click', function(e){
        e.preventDefault();

        // スムーススクロール殺し
        $('html,body').animate().stop();

        // タブコンテンツ表示
        var hash = $(this).context.hash;
        that.toggleContent(hash);

        // activeClass一旦外し
        that.$tab.removeClass(that.activeCls);
        // acthiveClassつける
        $(this).addClass(that.activeCls);

      });

      // default
      that.$defaultTab.trigger('click');

      return this;
    };

    return constructor;

  })();

  var changeTabs = new IL.ui.ChangeTabs();
  changeTabs.init('#jsi-tabs', 'tab');

})();
