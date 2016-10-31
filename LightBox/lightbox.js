;(function($){

	var LightBox = function(settings){
		var self= this;

		this.settings= {
			speed:500
		}
		$.extend(this.settings,settings||{});

		//创建遮罩和弹窗
		this.popupMask = $('<div id="G-lightbox-mask">')
		this.popupWin  = $('<div id="G-lightbox-popup">')

		//保存body
		this.bodyNode = $(document.body);

		//渲染剩余的DOM，并且插入到BODY
		this.renderDom();

		this.picViewArea = this.popupWin.find("div.lightbox-pic-view");//图片预览区域
		this.popupPic =    this.popupWin.find("img.lightbox-images");	//图片
		this.picCaptionArea = this.popupWin.find("div.lightbox-pic-caption");	//图片描述区域
		this.nextBtn 		=	this.popupWin.find("span.light-next-btn");
		this.prevBtn 		=	this.popupWin.find("span.light-prev-btn");

		this.captionText	=	this.popupWin.find("p.lightbox-pic-desc");
		this.currentIndex 	= 	this.popupWin.find("span.lightbox-of-index");
		this.closeBtn  		=	this.popupWin.find("span.lightbox-close-btn");


		//准备开发事件委托，获取组数据
		this.groupName = null;
		this.groupData = [];//放置同一组数据
		this.bodyNode.delegate(".js-lightbox,*[data-role=lightbox]","click",function(e){
			//阻止事件冒泡
			e.stopPropagation();


			var currentGroupName = $(this).attr('data-group');

			if(currentGroupName != self.groupName){

				self.groupName = currentGroupName;
				//根据当前组名获取同一组数据
				self.getGroup();
			}

			//初始化弹出
			self.initPopup($(this));
		})

		//关闭弹出
		this.popupMask.click(function(){
			$(this).fadeOut();
			self.popupWin.fadeOut();
			self.clear = false;
		})
		this.closeBtn.click(function(){
			self.popupWin.fadeOut();
			self.popupMask.fadeOut();
			self.clear = false;
		})

		//绑定上下切换按钮事件
		this.flag = true;
		this.nextBtn.hover(function(){
			if(!$(this).hasClass("disable")&&self.groupData.length>1){
				$(this).addClass("lightbox-next-btn-show");
				};
			},function(){
				if(!$(this).hasClass("disable")&&self.groupData.length>1){
				$(this).removeClass("lightbox-next-btn-show");
				};
			}).click(function(){
				if(!$(this).hasClass("disable")&&self.flag){
					self.flag = false;
					self.goto("next");
					self.flag = true;
				}
			});
		this.prevBtn.hover(function(){
			if(!$(this).hasClass("disable")&&self.groupData.length>1){
				$(this).addClass("lightbox-prev-btn-show");
				};
			},function(){
				if(!$(this).hasClass("disable")&&self.groupData.length>1){
				$(this).removeClass("lightbox-prev-btn-show");
				};
			}).click(function(){
				if(!$(this).hasClass("disable")&&self.flag){
					self.flag = false;
					self.goto("prev");
					self.flag = true;
				}
			});

		//窗口调整匹配
		var timer = null;
		this.clear = false;
		$(window).resize(function(){
			if(self.clear){
				window.clearTimeout(timer);
				timer = window.setTimeout(function(){
				self.loadPicSize(self.groupData[self.index-1].src)
				},
				300);
			}
		})
	};


	LightBox.prototype={
		goto:function(dir){
			if(dir === "next"){
				this.index++;
				if(this.index >= this.groupData.length){
					this.index=this.groupData.length;
					this.nextBtn.addClass("disable").removeClass("lightbox-next-btn-show");
					};
				if(this.index != 1){
					this.prevBtn.addClass("lightbox-prev-btn-show").removeClass("disable");
					};
				var src = this.groupData[this.index-1].src;
				this.loadPicSize(src);
			}else if(dir ==="prev"){
				this.index--;
				if(this.index <= 1){
					this.prevBtn.addClass("disable").removeClass("lightbox-prev-btn-show");
					};
				if(this.index != this.groupData.length){
					this.nextBtn.addClass("lightbox-next-btn-show").removeClass("disable");
					};
				var src = this.groupData[this.index-1].src;
				this.loadPicSize(src);
			}
		},
		loadPicSize:function(sourceSrc){
			var self =this;
			self.popupPic.css({
				width:"auto",
				height:"auto"
			}).hide();
			this.picCaptionArea.hide();

			this.preLoadImg(sourceSrc,function(){
				self.popupPic.attr("src",sourceSrc);
				var picWidth =self.popupPic.width();
				var picHeight=self.popupPic.height();
				self.changePic(picWidth,picHeight);
			});
		},
		preLoadImg:function(src,callback){
			 var img=new Image();
            if(!!window.ActiveXObject){
                img.onreadystatechange=function(){
                    if (this.readyState=="complete") {
                        callback();
                    };
                };
            }else {
                img.onload=function(){
                    callback();
                };
            };
            img.src=src;
		},
		changePic:function(width,height){
			var self = this;
			winWidth=$(window).width();
			winHeight=$(window).height();

			//如果图片宽高大于浏览器视口宽高
			var scale = Math.min(winWidth/(width+10),winHeight/(height+10),1);

			width = width*scale;
			height= height*scale;

			this.picViewArea.animate({
				width:width-10,
				height:height-10,
			}),

			this.popupWin.animate({
				width:width,
				height:height,
				marginLeft:-(width/2),
				top:(winHeight-height)/2
			},function(){
				self.popupPic.css({
					width:width-10,
					height:height-10,
				}).fadeIn();
				self.picCaptionArea.fadeIn();
			})

			//设置描述文字和当前索引
			this.captionText.text(this.groupData[this.index-1].caption);
			this.currentIndex.text("当前索引："+(this.index)+"of"+this.groupData.length);
		},
		showMaskAndPopup:function(sourceSrc,currentId){
			// console.log(sourceSrc);
			// console.log(currentId);
			var self = this;

			this.popupPic.hide();
			this.picCaptionArea.hide();

			this.popupMask.fadeIn();

			var winWidth=$(window).width();
			var winHeight=$(window).height();

			this.picViewArea.css({
				width:winWidth/2,
				height:winHeight/2,
			});
			this.popupWin.fadeIn();

			var viewHeight = winHeight/2+10;
			this.popupWin.css({
				width:winWidth/2+10,
				height:winHeight/2+10,
				marginLeft:-(winWidth/2+10)/2,
				top:-viewHeight
			}).animate({
				top:(winHeight-viewHeight)/2,
				},function(){
					//加载图片
					self.loadPicSize(sourceSrc);
					self.clear = true;
				});


			//根据当前点击的元素ID获取在当前组别里面的索引
			this.index = this.getIndexOf(currentId);
			console.log(this.index);
			var groupDataLength = this.groupData.length;
			if(groupDataLength > 1){
				if(this.index === 1){
					this.prevBtn.addClass("disable");
					this.nextBtn.removeClass("disable");
				}else if(this.index=== groupDataLength){
					this.prevBtn.removeClass("disable");
					this.nextBtn.addClass("disable");

				}else{
					this.prevBtn.removeClass("disable");
					this.nextBtn.removeClass("disable");
				}
			}
		},
		getIndexOf:function(currentId){
			var index = 0;

			$(this.groupData).each(function(i){

				index++;
				if(this.id === currentId){
					return false;
				}
			})

			return index;

		},
		initPopup:function(currentObj){
			var self =this;
			sourceSrc = currentObj.attr("data-source");
			currentId =	currentObj.attr("data-id");

			this.showMaskAndPopup(sourceSrc,currentId);
		},
		getGroup:function(){
			var self = this;

			//根据当前的组别获取页面中所有相同组别的对象
			var groupList = this.bodyNode.find("*[data-group="+this.groupName+"]")

			//清空数组
			self.groupData.length = 0;
			groupList.each(function(){
				self.groupData.push({
					src:$(this).attr("data-source"),
					id:$(this).attr("data-id"),
					caption:$(this).attr("data-caption"),
				});
			})
		},

		renderDom:function(){
			var strDom = '<div class="lightbox-pic-view">'+
							'<span class="light-btn light-prev-btn"></span>'+
							'<img  class="lightbox-images" src="./images/1-2.jpg" alt="">'+
							'<span class="light-btn light-next-btn"></span>'+
						'</div>'+
						'<div class="lightbox-pic-caption">'+
							'<div class="lightbox-caption-area">'+
								'<p class="lightbox-pic-desc"></p>'+
								'<span class="lightbox-of-index">当前索引：0 of 0</span>'+
							'</div>'+
							'<span class="lightbox-close-btn"></span>'+
						'</div>';
			//插入到popupWin
			this.popupWin.html(strDom);
			//把遮罩和弹出窗插入到body
			this.bodyNode.append(this.popupMask);
			this.bodyNode.append(this.popupWin);
		}
	};
	window['LightBox']=LightBox;
}(jQuery));
