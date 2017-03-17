/**
 * Created by Administrator on 2016/11/28.
 */
window.onload = function() {
    if (document.body.scrollWidth >= 600) {

        $("body").html('<h1 style="display:block;margin:200px margin;text-align:center">请使用手机浏览器打开本页面</h1>');
        // alert("请使用手机浏览器打开本页面");
    } else {
        $(".wenz").show();
        var runPage = new FullPage({

            id: 'pageContain', // id of contain
            slideTime: 500, // time of slide
            continuous: false, // create an infinite feel with no endpoints
            effect: { // slide effect
                transform: {
                    translate: 'Y', // 'X'|'Y'|'XY'|'none'
                    scale: [1, 1], // [scalefrom, scaleto]
                    rotate: [0, 0] // [rotatefrom, rotateto]
                },
                opacity: [0, 1] // [opacityfrom, opacityto]
            },
            mode: 'wheel,touch', // mode of fullpage
            easing: 'ease', // easing('ease','ease-in','ease-in-out' or use cubic-bezier like [.33, 1.81, 1, 1];
            start: 1 // which page will display when install
                //  ,onSwipeStart : function(index, thisPage) {   // callback onTouchStart
                //    return 'stop';
                //  }
                //  ,beforeChange : function(index, thisPage) {   // callback before pageChange
                //    return 'stop';
                //  }
                //  ,callback : function(index, thisPage) {       // callback when pageChange
                //    alert(index);
                //  };
        });
        /*
         * 监测手机屏幕触摸函数
         * */

        var jinzhi = 0;

        // function _chumoe() {
        //     document.addEventListener("touchmove", function(e) {
        //         if (jinzhi == 0) {
        //             // e.preventDefault();
        //             e.stopPropagation();
        //         } else if (jinzhi >= 1) {
        //             clearInterval(setine);
        //         }
        //     }, false);
        // };
        // _chumoe();

        // var setine = setTimeout(_chumoee, 3800); //取消禁止屏幕触摸倒计时
        // function _chumoee() {
        //     jinzhi = 1
        //     document.addEventListener("touchmove", function(e) {
        //         if (jinzhi == 0) {
        //             // e.preventDefault();
        //             e.stopPropagation();
        //         } else if (jinzhi == 1) {
        //             clearInterval(setine);
        //         }
        //     }, false);
        // }

        /*
         * 昨日睡眠的数值递增
         * */
        // var csh_num = 0;
        // var clear = setInterval(_num_add, 20)

        // function _num_add() {
        //     var data_num = 86;
        //     csh_num++;
        //     if (csh_num == data_num) {
        //         clearInterval(clear)
        //     }
        //     $('.sleep_yestday>.top>.max_yuan>.yuan>.sanyuan>.num').text(csh_num);
        // }
        /*
         * 根据屏幕的大小，控制昨夜睡眠页面的质量num大小
         * */
        function _jc_window() {
            var window_width = $('body').width();
            if (window_width <= 320) {
                $('.sleep_yestday>.top>.max_yuan>.yuan>.sanyuan>.num').css({
                    'font-size': '38px',
                    'line-height': '70px'
                });
                $('.sleep_yestday>.top>.max_yuan>.yuan>.sanyuan>.wenz1').css({
                    'font-size': '13px',
                    'line-height': '30px'
                });
            } else if (window_width <= 375) {
                $('.sleep_yestday>.top>.max_yuan>.yuan>.sanyuan>.num').css({
                    'font-size': '45px',
                    'line-height': '80px'
                });
                $('.sleep_yestday>.top>.max_yuan>.yuan>.sanyuan>.wenz1').css({
                    'font-size': '15px',
                    'line-height': '30px'
                });
            } else if (window_width <= 414) {
                $('.sleep_yestday>.top>.max_yuan>.yuan>.sanyuan>.num').css({
                    'font-size': '50px',
                    'line-height': '90px'
                });
                $('.sleep_yestday>.top>.max_yuan>.yuan>.sanyuan>.wenz1').css({
                    'font-size': '18px',
                    'line-height': '30px'
                });
            }
        }
        _jc_window()

        /*
         * 自动获取高度
         * */
        function _auto_height(classnane) {
            var widt = classnane.width(); //获取该模块的高度
            classnane.height(widt);
        };
        // _auto_height($('.user_face'));
        _auto_height($('.round_xz'));
        _auto_height($('.xuanz'));
        _auto_height($('.wenz'));
        _auto_height($('.sleep_yestday>.top>.max_yuan>.yuan'));
        _auto_height($('.sleep_yestday>.top>.max_yuan>.yuan>.eryuan'));
        _auto_height($('.sleep_yestday>.top>.max_yuan>.yuan>.xiant'));
        _auto_height($('.sleep_yestday>.top>.max_yuan>.yuan>.sanyuan'));
        _auto_height($('.sleep_yestday>.top>.max_yuan'));

        /*
         *获取定位
         * */
        function _left_top(classnane) {
            var widt = classnane.width() / 2; //获取该模块的高度
            classnane.css({
                'margin-left': -widt,
                'margin-top': -widt,
                'line-height': widt * 2 + 'px'
            });
        }
        _left_top($('.wenz'));
        /*
         * 检测浮动元素的位置
         * */
        function _fudong(classnane, ceshi) {
            var widt = ceshi.width() / 2; //获取该模块的高度
            var hei = ceshi.width() / 7;
            classnane.css({
                'top': widt + hei + 20
            });
        }
        _fudong($('.sleep_yestday>.top>.fudong'), $('.sleep_yestday>.top>.max_yuan'));
        /*
         * 昨夜睡眠的奇偶数
         * */
        function _oddeven() {
            $('.sleep_yestday>.bontt_txt>.botom_top>ul>li:odd').css({
                'float': 'right',
                'text-align': 'right'
            });
        }
        _oddeven();


        /*
         * 昨夜睡眠页面的线条
         * */
        function _xiant_juli() {
            var head_heig = $('.sleep_yestday>.top>.head').height() + 10; //获取头像模块的高度
            var max_yuan_hei = head_heig - 25; //获取大圆距离顶部的距离
            var max_yuan_r = $('.sleep_yestday>.top>.max_yuan').width() / 2; //获取大圆的半径
            var min_yuan_zhi = $('.sleep_yestday>.top>.max_yuan>.yuan').width(); //获取小圆直径
            var mix_yuan_r = $('.sleep_yestday>.top>.max_yuan>.yuan').width() / 2; //获取小圆的半径
            var max_min_c = max_yuan_r - mix_yuan_r; //获取大圆和小圆之间的距离
            var min_yuan_botm = max_yuan_hei + max_min_c + min_yuan_zhi; //求总值
            var fudong_hei = max_yuan_hei + max_yuan_r * 2 + 50; //求出了浮动的睡眠div距离顶部的高度
            var doh_xian_hei = fudong_hei - min_yuan_botm;
            $('.sleep_yestday>.doh_xian').css('top', min_yuan_botm + 5); //获取线的top值
            $('.sleep_yestday>.doh_xian').css('height', doh_xian_hei + 1);
        }
        _xiant_juli()
            /*
             * 根据屏幕的height大小，变化‘睡眠报告’的height
             * */
        function _smbg_heig() {
            var body_heigt = $(window).height();
            if ($('.sleep_yestday>.bontt_txt>.botom_btm>.baogao').offset()) {
                var baogao = $('.sleep_yestday>.bontt_txt>.botom_btm>.baogao').offset().top;
                var syjuli = body_heigt - baogao;
                $('.sleep_yestday>.bontt_txt>.botom_btm>.baogao').css('min-height', syjuli);
            }
        }
        _smbg_heig();

        //var sleep_yestdayUrl = __uri("./yestreen_sleep.html");
        var sleep_yestdayUrl = "./yestreen_sleep.html";
        $(".wenz").click(function() {
            setTimeout(function() {
                window.location.href = sleep_yestdayUrl;
            }, 500);
        })

        $('.bandi_btn').hide();
        $('.band_sueess').show(0);
        jQuery.createMaskDom({
            text: "正在连接设备..."
        });
        setTimeout(function() {
            jQuery.closeMask(500);

            //$('.zhezhao').addClass('dh');
            //$('.tan_dindow').addClass('dh');
            $('.now_state>.round_xz>.xuanz').addClass('dh');

            clearr = setInterval(function() { _num_addd01(50) }, 20)
            clear = setInterval(function() { _num_addd02(20) }, 20)
        }, 1000);

    }
}


/*
 * 点击解绑定设备按钮
 */
function _onclik() {
    $(".maskCan-wrapper").fadeIn();
}
function confirmBtn() {

}
function cancelBtn(){
    $(".maskCan-wrapper").fadeOut();
}

/*  呼吸
 *  toofast: > 40
 *  normal : 20 <  x <= 40
 *  toolow: <= 20
 */
var csh_num01 = 0;

function _num_addd01(stopNum) {
    csh_num01++;
    if (csh_num01 == 40) {
        $(".left .txt").addClass("tooHeight");
        $(".huxi").text("呼吸过快");
    }
    if (csh_num01 == stopNum) {
        clearInterval(clearr);
        if (stopNum <= 20) {
            $(".left .txt").addClass("tooLow");
            $(".huxi").text("呼吸过慢");
        }
    }
    $('.band_sueess>.jiance>.left>.txt').text(csh_num01);
}

/*  心跳
 *  toofast: > 75
 *  normal : 40 <  x <= 75
 *  toolow: <= 40
 */
var csh_num02 = 0;

function _num_addd02(stopNum) {
    csh_num02++;
    if (csh_num02 == 75) {
        $(".right .txt").addClass("tooHeight");
        $(".xint").text("心跳过快");
    }
    if (csh_num02 == stopNum) {
        clearInterval(clear);
        if (csh_num02 <= 40) {
            $(".right .txt").addClass("tooLow");
            $(".xint").text("心跳过慢");
        }
    }
    $('.band_sueess>.jiance>.right>.txt').text(csh_num02);
}
