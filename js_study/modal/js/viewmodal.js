/**
 * モーダル(data属性を使うやつ)
 * 2014/15
 */

(function($) {

  $.fn.viewModal = function() {

    $(this).each(function(){
      var $modalOverlay = $('#modalOverlay');
      var $jscModelClose = $('.jsc-modal-close');

        // 開くモーダルのIDを取得
      var modal = '#' + $(this).attr('data-target');
      var $modal = $(modal);

      $(this).on('click', function(e){
        e.stopPropagation();
        $('body').append('<div id="modalOverlay"></div>');
        $modalOverlay = $('#modalOverlay');
        $modalOverlay.show().css({'z-index':'999'});
        $modal.show().css({'z-index':'1000'});
        // モーダルを置く位置を取得
        getModalPos();
      });

      // 閉じるボタン
      $modalOverlay.off('click');
      $(document).on('click', $modalOverlay, closeModal);
      $jscModelClose.off('click');
      $jscModelClose.on('click', closeModal);

      // リサイズしたら表示位置を再取得
      $(window).on('resize rotate', function(){
        if($modal.is(':visible')) {
          getModalPos();
        }
      });

      // モーダル閉じ
      function closeModal(e) {
        e.preventDefault();
        $modal.hide().css({'z-index':''});
        $modalOverlay.remove();
      }

      // モーダル位置取得
      function getModalPos() {
        var wH = $(window).height();
        var wW = $(window).width();
        var mH = $modal.outerHeight();
        var mW = $modal.outerWidth();
        var x = (wW - mW) / 2;
        var y = (wH - mH) / 2;

        $modal.css({'left': x + 'px','top': y + 'px'});
        // ウインドウがモーダルより小さかった時の処理
        if( mH > wH ){
          $modal.css({
            'position' : 'absolute',
            'top' : '0'
          });
        }
        if( mW > wW ){
          $modal.css({
            'position' : 'absolute',
            'left' : '0'
          });
        }
        if( mH < wH && mW < wW ){
          $modal.css({ 'position' : '' });
        }
      }
    });
  };

}(jQuery));
