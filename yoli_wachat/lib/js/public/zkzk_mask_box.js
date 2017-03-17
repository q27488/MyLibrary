/*
 *	create by cyj 2017/3/10
 *	功能： 在移动端弹窗提示
 *	使用：jQuery.createMaskDom(ops)
 *	参数：如下
 */
jQuery.extend({
	createMaskDom : function(options){
		var ops = {
			text:"text",			//显示文字
			showLoading:"false",	//是否显示菊花
			textAlign:"left",		//文字排列
			fadeTime:"300"			//渐进显示时间
		}
		ops = $.extend(true, {}, ops, options);
		if(document.getElementsByClassName("mask-wrapper").length){
			$(".mask-wrapper").fadeIn(ops.fadeTime);
			//console.log("1");
		} else {
			// var img = __uri('../../img/loading.gif')
			var img = 'img/loading.gif';
			var dom = '<div class="mask-wrapper" style="position: fixed;top: 0;left: 0;height: 100%;width: 100%;z-index: 100;background: rgba(0,0,0,0.5);">'+
					    '<div class="mask-content" style="margin:50% 10%;padding: 0 10%;border-radius:5px;height:56px;line-height:56px;background:#d9e6d5;text-align: '+ops.textAlign+';">'+
					        '<img class="loadingImg" src="' +img+'" alt="loadingImg" style="display: inline-block;width: 28px;height: 28px;line-height:56px;vertical-align: middle;margin-right:10px;">'+
					        '<p class="text" style="display: inline-block;color:#666;">' + ops.text + '</p>'+
					    '</div>'+
					'</div>';
			$("body").append(dom);
			if(!ops.showLoading){
				$(".loadingImg").hide();
			}
		}
	},
	closeMask : function(fadeTime){
		$(".mask-wrapper").fadeOut(fadeTime);
	}
})
