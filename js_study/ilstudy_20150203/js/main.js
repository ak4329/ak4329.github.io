/**
 *  ①ページ上部へ
 *    must要件　クリックしたらページの上部へ遷移  
 *    want要件　スクロールしたら出す
 *  ②アコーディオンの機能
 *    must要件　クリックしたら表示される。もう一度クリックしたら消える  
 *    want要件　開くスピードを調整してみる。
 */

$(function(){
  $('a[href^=#]').on('click', pageScroll);
  $('.jsc-accordion').on('click', accordion);


/**
 *  TOPへ戻るボタン表示切り替え（①want要件）
 */
  $(window).on('scroll', function(){
    var windowPos = $(this).scrollTop();
    var $goTopBtn = $('#jsi-btn-goTop');
    // 上から200pxを境に表示を切り替える
    if(windowPos > 200){
      $goTopBtn.show();
    } else {
      $goTopBtn.hide();
    }
  });


/**
 *  スクロール処理（①must要件）
 */
  function pageScroll(){
    var href = $(this).attr('href');
    var target = $(href === '#' ? 'html' : href);
    var position = target.offset().top;
    $('html, body').animate({scrollTop: position}, 500, 'swing');
    return false;  // urlに#がつかなくなるよ！！！！！
  }


/**
 *  アコーディオン処理（②）
 */
  function accordion(){
    var $this = $(this);
    var $accordion = $this.next('ul');
    $accordion.slideToggle('fast', function(){
      // 開閉状態でプラスマイナスを切り替える
      var $targetSpan = $this.find('span');
      var $openStatus = $accordion.css('display');
      if($openStatus === 'none'){
        $targetSpan.text('+');
      } else{
        $targetSpan.text('-');
      }
    });
  }

});