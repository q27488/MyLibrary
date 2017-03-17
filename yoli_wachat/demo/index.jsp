<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
    <meta name='apple-mobile-web-app-capable' content='yes' />
    <title>当前状态</title>
    <link rel="stylesheet" type="text/css" href="css/kh_public.css">
    <link rel="stylesheet" type="text/css" href="css/dqztcss.css">
    <script type="text/javascript" src="js/jquery-1.9.1.min.js" ></script>
    <script type="text/javascript" src="js/kh_public.js"></script>
    <script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
</head>
<body>
<div class="now_state">
    <div class="user_face" >
        <img  id="headImg" src="img/face_img01.png" alt="">
    </div>
    <div class="round_xz" >
        <div class="max_img">
            <img src="img/max_round_img.png" alt="">
        </div>
        <div class="xuanz">
            <img src="img/saomiao_img.png" alt="">
        </div>
        <div class="wenz" onclick="_onclick_lianjie()">昨夜睡眠</div>
    </div>
    <div class="bandi_btn" id="scanBtn">
        绑定设备
    </div>
    <div class="band_sueess"  hidden>
        <div class="jaince">
            <div class="left">
                <div class="huxi">呼吸正常</div>
                <div class="txt">30</div>
            </div>
            <div class="right">
                <div class="xint">心跳正常</div>
                <div class="txt">80</div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="tishi">今晚记得要早点睡呦！</div>
    </div>
</div>
<!--公共弹窗-->
<div class="zhezhao"></div>
<div class="tan_dindow">
    <div class="tishi">绑定成功</div>
    <div class="btn">确定</div>
</div>

<script type="text/javascript">
            $(function() {
                //通过config接口注入权限验证配置
                wx.config({
                    ${jssdkConfig },
                    jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
                });
                
                //通过ready接口处理成功验证
                wx.ready(function(){
                    //微信得到的是http头像url, 由于我们网站实现了https。故转换之;
                    var headImgUrl = "${sessionScope.wxUser.headimgurl }";
                    //转成https 头像url;
                    headImgUrl = 'https'+headImgUrl.substring(4, headImgUrl.length);
                    //选择头像分辨率;
                    headImgUrl = headImgUrl.substring(0, headImgUrl.length-1);
                    //有0、46、64、96、132数值可选，0代表640*640正方形头像,  46代表 46*46头像;(默认为0)
                    headImgUrl += "96";
                    $('#headImg').attr('src', headImgUrl);
                    
                    $('#scanBtn').click(function () {
                        wx.scanQRCode({
                            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                            scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                            success: function (res) {
                                //根据扫码结果跳转; res.resultStr是扫描结果;
                                window.location.replace('../data/'+res.resultStr);
                            }
                        });
                    });
                });
                
                wx.error(function(res) {
                    // $('#result').append(res+"<br/>");
                    alert(res);
                });
            });
        </script>
</body>
</html>