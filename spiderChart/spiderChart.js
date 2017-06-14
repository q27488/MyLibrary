/**
A jQuery plugin for search hints

Author: YijunChen

Create:2017/6/13

Detail:多边形蜘蛛图

question:目前只适用五边形，因为存在 放射性线旋转问题为解决（目前采用手动设置旋转值，见第168行：- Math.PI * 2 / 360 *18 ）
*/
(function($) {
    $.fn.spiderChart = function(params) {
        //get DOM param
        var self = this;
        var domHeight = $(self).height();
        var domWidth = $(self).width();
        console.log(domHeight)
        console.log(domWidth)

        //Default parameters
        var params = $.extend({
            id: "", //绑定的DOM - ID
            level: ["不及格", "略差", "良好", "优质"], //蜘蛛图框 级数,由第0个为最中心
            levelColor: ["#236639", "#2aa151", "#65cd87", "#9ecaac"], //蜘蛛图框 颜色,默认为 #ddd
            labelSize: "14", 	//label块的大小
            labelColor:"#333",	//label块的字体文字颜色，
            dataLineColor:"#f0730d",//数据线的颜色
            dataLineWidth:"3",//数据线的宽度
            series: [{
                name: "这是第1个label",
                level: 0,
            }, {
                name: "这是第2个label",
                level: 1,
            }, {
                name: "这是第3个label",
                level: 2,
            }, {
                name: "这是第4个label",
                level: 3,
            }, {
                name: "这是第5个label",
                level: 4,
            }, ]
        }, params);

        this.each(function() {
            //设置最外层Div的css
            $(self).css({
                "boxSizing": "border-box",
                "paddingTop": "3%",
                "textAlign": "center",
            });

            //新建并设置label
            params.level.forEach(function(val, index) {
                var labelSpan = $('<span></span>').css({
                    "display": "inline-block",
                    "width": params.labelSize + "px",
                    "height": params.labelSize + "px",
                    "verticalAlign": "top",
                    "marginRight": "8px",
                    "backgroundColor": params.levelColor[index] ? params.levelColor[index] : "#ddd",
                });
                var labelText = params.level[index];

                var labelDiv = $('<div></div>').css({
                    "display": "inline-block",
                    "margin": "3% 10px",
                    "height": params.labelSize + "px",
                    "lineHeight": params.labelSize + "px",
                    "fontSize": "12px",
                    "color": params.labelColor,
                    "verticalAlign": "middle",
                }).append(labelSpan).append(labelText);

                $(self).append(labelDiv);
            });

            /*
             * 绘制canvas蜘蛛图
             */
            //确定canvas参数
            var canvasId = $(self).attr("id") + "Chart"; //canvasId
            var canvasHeight = domHeight * 0.8;
            var canvasWidth = domWidth;
            var originPoint = { x: canvasWidth / 2, y: canvasHeight / 2 }; //圆点
            var radius = canvasWidth / 3; 									//半径
            // !确定多边形蜘蛛图 的点
            var polygonSize = params.series.length;		//多少边形
            var polygonLevel = params.level.length;		//多少层
            var polygonLineArr = [];					//多边形线 数组
            var polygonTextArr = [];					//label文字 所在位置数组
            var dataLineArr = [];						//用于绘制数据的位置数据
            // var polygonArr = [];

            var canvasDom = $('<canvas>浏览器版本过低，请您更新最新浏览器</canvas>').attr("id", canvasId);
            $(self).append(canvasDom);

            drawCavas();

            //绘制canvas
            function drawCavas() {
                var canvas = document.getElementById(canvasId);
                var context = canvas.getContext('2d');
                var _this = $(canvas);

                //针对retain屏消除锯齿
                if (window.devicePixelRatio) {
                    canvas.style.width = canvasWidth + "px";
                    canvas.style.height = canvasHeight + "px";
                    canvas.height = canvasHeight * window.devicePixelRatio;
                    canvas.width = canvasWidth * window.devicePixelRatio;
                    context.scale(window.devicePixelRatio, window.devicePixelRatio);
                    console.log("retain");
                } else {
                    canvas.style.width = canvasWidth + "px";
                    canvas.style.height = canvasHeight + "px";
                    canvas.width = canvasWidth;
                    canvas.height = canvasHeight;
                }
                //清空canvas块
                context.clearRect(0, 0, canvasWidth, canvasHeight);


                //绘制多层多边形
                for (var i = 0; i < polygonLevel; i++) {
                	var index = (polygonLevel - i)/(polygonLevel);
                	drawPolygon(originPoint,polygonSize,radius * index,params.levelColor[i]);
                }
                //制多边形放射性直线
                drawPolygonData();

                //绘制多边形放射性直线
                //label提示文字
                //绘制数据的线
                function drawPolygonData(){


            		/*  获取圆弧上的点
				     *  point - 圆点坐标 point{x:0,y:0}， r-圆弧半径r ， angle-圆弧角度
				     */
                	var getArcPoint = function(point, r, angle) {
				        // var r = ops.arc_radius - 2;
				        // var angle = i * Math.PI * 2 / 36; //将360° 分成36分
				        // var x = 0,
				        //     y = 0;
				        // x = Math.sin(angle) * r;
				        // y = Math.cos(angle) * r;
				        // x = x + ops.position_y / 2;
				        // y = y + ops.position_x / 2;
				        var disp_x = 0,
				            disp_y = 0;
				        var P = {};
				        disp_y = Math.sin(angle) * r;
				        disp_x = Math.cos(angle) * r;
				        disp_y = disp_y + point.y;
				        disp_x = disp_x + point.x;
				        P = {
				            x: disp_x,
				            y: disp_y
				        }
				        return P;
				    }
				    //计算多边形层级框 及 提示文字 位置
				    for (var i = 0; i < polygonSize; i++) {
				    	var angle =    i * Math.PI * 2 / polygonSize  -  Math.PI * 2 / 360 *18;
				    	var P = getArcPoint(originPoint,radius,angle);
				    	polygonLineArr.push(P);
				    	P = getArcPoint(originPoint,radius + 20,angle);
				    	polygonTextArr.push(P);
				    }

				    //计算数据线的位置点
				    for (var i = 0; i < polygonSize; i++) {
				    	var dataLevel = params.series[i].level;
				    	var angle =    i * Math.PI * 2 / polygonSize  -  Math.PI * 2 / 360 *18;
				    	var P = getArcPoint(originPoint,radius * (dataLevel / polygonLevel),angle);
				    	dataLineArr.push(P);
				    }
				    console.log(dataLineArr)
				    //绘制
				    for (var i = 0; i < polygonLineArr.length; i++) {
				    		drawLine(originPoint,polygonLineArr[i],"green");
				    		drawText(polygonTextArr[i],params.series[i].name);
				    }
				    //绘制数据的线
				    for (var i = 0; i < polygonLineArr.length; i++) {
				    	if(dataLineArr[i+1]){
			    			drawDataLine(dataLineArr[i],dataLineArr[i+1],params.dataLineColor,params.dataLineWidth);
				    	}else{
				    		drawDataLine(dataLineArr[i],dataLineArr[0],params.dataLineColor,params.dataLineWidth);
				    	}
				    }
                }
                //绘制多边形
                function drawPolygon(originPoint, n, r,color) {
                    var i, ang;
                    ang = Math.PI * 2 / n;
                    context.save();
                    // ctx.fillStyle = 'rgba(255,0,0,.3)';
                    // context.strokeStyle = 'hsl(120,50%,50%)';
                    context.strokeStyle = color;
                    context.lineWidth = 1;
                    context.translate(originPoint.x, originPoint.y);
                    context.moveTo(0, -r);
                    context.beginPath();
                    for (i = 0; i < n; i++) {
                        context.rotate(ang);
                        context.lineTo(0, -r);
                    }
                    context.closePath();
                    // context.fill();
                    context.stroke();
                    context.restore();
                }
                //画线函数
                function drawLine(startP, endP, lineColor,lineWidth) {

                    // context.translate(startP.x, startP.y);	//将绘图原点移到画布中点
                	context.save();
                    context.strokeStyle = lineColor;
                    context.lineWidth = lineWidth || 1;
                    context.beginPath();
                    context.moveTo(startP.x, startP.y);
                    context.lineTo(endP.x, endP.y);
                    context.closePath();
                    context.stroke();
                    context.restore();
                    // context.lineCap = 'square';
                }
                //绘制文字
                function drawText(point,text){
                	context.font = "14px"; // 字体大小，样式
			        context.fillStyle = params.labelColor; // 颜色
			        context.textAlign = "center"; // 位置
			        context.textBaseline = "middle";
			        context.moveTo(point.x , point.y); // 文字填充位置
			        context.fillText(text, point.x, point.y);
                }
                //绘制数据线
                function drawDataLine(startP, endP, lineColor,lineWidth){
                	//先画点
                	context.beginPath();
		            context.arc(startP.x, startP.y, lineWidth * 3/2, 0, 360, false);
		            context.fillStyle = lineColor; //填充颜色,默认是黑色
		            context.fill(); //画实心圆
		            context.closePath();
                	//再画线
                	context.save();
                    context.strokeStyle = lineColor;
                    context.lineWidth = lineWidth || 1;
                    context.beginPath();
                    context.moveTo(startP.x, startP.y);
                    context.lineTo(endP.x, endP.y);
                    context.closePath();
                    context.stroke();
                    context.restore();
                }

            }
        })
    };
})(jQuery);
