var ScrollBar = {};
(function(win,doc,$){
    function CusScrollBar(options){
        this._init(options);
    }
    $.extend(CusScrollBar.prototype,{
        _init : function (options){
            var self = this;
            self.options = {
                contSelector:"",
                barSelector:"",
                sliderSelector:"",
                wheelStep:15
            };
            $.extend(true,self.options,options||{});
            self._initDomEvent();
            self._initSliderDragEvent();
            self._bandContScroll();
            self._bandMouseWheel();
        },
        _initDomEvent:function(){
            var opts = this.options;
            this.$cont = $(opts.contSelector);
            this.addScrollDOM(this.$cont);
            this.$slider = $(opts.sliderSelector);
            this.$bar = opts.barSelector ? $(opts.barSelector) : this.$slider.parent();
            this.$doc = $(doc);
        },
        _initSliderDragEvent:function(){
            var self = this;
            var slider = self.$slider;
            var cont = self.$cont;
            var doc = self.$doc,
                dragStartMousePosition,
                dragStartContPosition,
                dragContBarRate;
            slider.on("mousedown",function(e){
                e.preventDefault();
                dragStartMousePosition = e.pageY;
                dragStartContPosition = cont[0].scrollTop;
                dragContBarRate = self.getMaxScrollPosition()/self.getMaxSliderPosition();
                doc.on("mousemove.scroll",function(e){
                    e.preventDefault();
                    mouseMoveHandler(e);
                }).on("mouseup.scroll",function(e){
                    e.preventDefault();
                    doc.off(".scroll");
                })
            });
            function mouseMoveHandler(e){
                if (dragStartMousePosition==null){
                    return;
                }
                self.scrollContTo(dragStartContPosition+(e.pageY-dragStartMousePosition)*dragContBarRate);
            }
        },
        _bandContScroll:function(){
            var self = this;
            self.$cont.on("scroll",function(e){
                e.preventDefault();
                self.$slider.css('top',self.getSliderPosition()+'px');
            })
        },
        _bandMouseWheel:function(){
            var self = this;
            self.$cont.on("mousewheel DOMMouseScroll",function(e){
                e.preventDefault();
                var oEv = e.originalEvent;
                var wheelRange = oEv.wheelDelta? -oEv.wheelDelta/120:(oEv.detail||0)/3;
                self.scrollContTo(self.$cont[0].scrollTop+wheelRange*self.options.wheelStep);
            });
        },

        scrollContTo:function(positionVal){
            var self = this;
            self.$cont.scrollTop(positionVal);
        },
        // 获取滑块位置
        getSliderPosition:function(){
            var self = this;
            return self.$cont[0].scrollTop/(self.getMaxScrollPosition()/self.getMaxSliderPosition());
        },
        // 文档可滚动最大距离
        getMaxScrollPosition:function(){
            var self = this;
            return Math.max(self.$cont[0].scrollHeight,self.$cont.height())-self.$cont.height();

        },
        // 滑块可移动最大距离
        getMaxSliderPosition:function(){
            var self = this;
            return self.$bar.height()-self.$slider.height();
        },

        addScrollDOM:function(obj){
          var self = this;
          var str ="<div class='scroll-bar'>"+
                   "<div class='scroll-slider'></div>"+
                   "</div>";
          obj.append(str);
        }
    });
    ScrollBar.CusScrollBar = CusScrollBar;
})(window,document,jQuery);

var scroll_1 = new ScrollBar.CusScrollBar({
    contSelector:".content",
    barSelector:".scroll-bar",
    sliderSelector:".scroll-slider",
});
