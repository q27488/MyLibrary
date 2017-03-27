/*
 *	canvas 相关函数
 *	create by cyj 2017/3/8
 */

/*
 *  绘制带圆心和文字的 百分比调
 *  create by cyj 2017/3/8
 *  参数见 default_options
 */
function draw_Arc(options) {
    var default_options = {
        c_Id: "canvas", //cavas ID
        c_width: "0", //canvas宽度
        c_height: "0", // canvas高度
        position_x: "100", //圆的圆点x座标
        position_y: "100", //圆的圆点y座标

        circle_radius: "60", //实心圆半径
        circle_bakClr: "#2aa151", //实心圆背景色

        text_font: "bold 28pt PingFang-SC-Medium", //文字字体
        text_color: "#fff", //文字颜色
        text_textAlign: "center", //左右居中  start、end、right、center
        text_textBaseline: "middle", //上下居中   top、hanging、middle、alphabetic、ideographic、bottom
        text_tip: "睡眠质量", //提示文字

        arc_color: "#2aa151", //弧的颜色
        arc_bckColor: "rgba(42,161,81,0.2)", //弧的未激活颜色
        arc_lineWidth: "4.0", //弧的宽度
        arc_radius: "40", //弧的半径

        arc_Endcolor: "#2ddd64", //圆弧终点圆点 -颜色
        arc_EndlineWidth: "8", //圆弧终点宽度 -颜色

        present: "50", //数值
    }
    var ops = $.extend(true, {}, default_options, options);

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    var _this = $(canvas);

    //context.globalCompositeOperation = 'source-atop'; //消除锯齿
    //针对retain屏消除锯齿
    if (window.devicePixelRatio) {
        canvas.style.width = ops.c_width + "px";
        canvas.style.height = ops.c_height + "px";
        canvas.height = ops.c_height * window.devicePixelRatio;
        canvas.width = ops.c_width * window.devicePixelRatio;
        context.scale(window.devicePixelRatio, window.devicePixelRatio);
        console.log("retain");
    } else {
        canvas.style.width = ops.c_width + "px";
        canvas.style.height = ops.c_height + "px";
        canvas.width = ops.c_width;
        canvas.height = ops.c_height;
    }

    // console.log("ops.c_width / 2", ops.c_width / 2);
    // console.log("ops.c_height / 2", ops.c_height / 2);
    ops.position_x = ops.c_width;
    ops.position_y = ops.c_height / 2 + 40;


    //清空canvas块
    context.clearRect(0, 0, ops.c_width, ops.c_height);

    //设置高亮圆块
    ops.arc_EndlineWidth = ops.arc_lineWidth * 1.2;

    //绘制发散线
    drawLine();

    //最外层圆环
    context.beginPath();
    context.strokeStyle = ops.arc_bckColor;
    context.lineWidth = ops.arc_lineWidth / 2;
    context.arc(ops.position_x / 2, ops.position_y / 2, ops.arc_radius + (ops.arc_radius - ops.circle_radius), 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();


    //内圆属性配置
    context.beginPath();
    context.lineCap = 'square';
    context.closePath();
    context.fill();
    context.lineWidth = ops.arc_lineWidth; //绘制内圆的线宽度
    context.closePath();

    //进度条灰色圆环
    context.beginPath();
    context.strokeStyle = ops.arc_bckColor;
    context.arc(ops.position_x / 2, ops.position_y / 2, ops.arc_radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();


    //确定5条线段的坐标点
    function setPoint() {
        //alert(window.devicePixelRatio)
        /*功能：移动端适配-额外半径*/
        var add_cirR = 0;
        /*功能：移动端适配-终点圆弧*/
        var add_arcR = 0;
        /*功能：移动端适配-P6点位移*/
        P4_disp = 0;
        /*功能：移动端适配-P6点位移*/
        P6_disp = -1;

        if(ops.c_width >= 359 && ops.c_width <= 410){	//荣耀8，小米适配
        	add_cirR = 4;
        	add_arcR = 6;
        	P6_disp = -1;
        }else if(ops.c_width >= 410){	//ip6p ip7适配
        	add_cirR = 6;
        	add_arcR = 6;
        }else if (ops.c_width < 359){	//ip5 ip5s适配
        	add_cirR = 3;
        	add_arcR = 4;
        	P4_disp = 5;
        }

        var P1 = [
            { x: 0, y: 0 }, //start
            { x: 0, y: 0 }, //middle
            { x: 0, y: 0 }, //end
        ];
        //P1的中点坐标
        P1[1].y = 2;
        P1[1].x = ops.position_x / 2 + ops.arc_radius + (ops.arc_radius - ops.circle_radius);
        //P1的开始位置
        P1[0].y = 2;
        P1[0].x = ops.position_x / 2 + ops.arc_radius + (ops.arc_radius - ops.circle_radius) + ops.arc_radius / 2;
        //P1的结束位置，在圆弧上
    	var tempP = getArcPoint(ops.position_x / 2, ops.position_y / 2, ops.arc_radius + (ops.arc_radius - ops.circle_radius) + add_cirR + add_arcR, 30 * Math.PI * 2 / 36);
        P1[2].x = tempP.x;
        P1[2].y = tempP.y ;



        var P2 = [
            { x: 0, y: 0 }, //start
            { x: 0, y: 0 }, //middle
            { x: 0, y: 0 }, //end
        ];
        //P2的结束位置，在圆弧上
        var tempP = getArcPoint(ops.position_x / 2, ops.position_y / 2, ops.arc_radius + (ops.arc_radius - ops.circle_radius) + add_cirR, 3 * Math.PI * 2 / 36);
        P2[2].x = tempP.x;
        P2[2].y = tempP.y;
        //P2的中点坐标
        P2[1].y = P2[2].y + (ops.arc_radius - ops.circle_radius);
        P2[1].x = P2[2].x + (ops.arc_radius - ops.circle_radius);
        //P2的开始坐标
        P2[0].y = P2[2].y + (ops.arc_radius - ops.circle_radius);
        P2[0].x = P2[2].x + (ops.arc_radius - ops.circle_radius) + (ops.arc_radius - ops.circle_radius);


        var P3 = [
            { x: 0, y: 0 }, //start
            { x: 0, y: 0 }, //middle
            { x: 0, y: 0 }, //end
        ];
        //P3的结束位置，在圆弧上
        var tempP = getArcPoint(ops.position_x / 2, ops.position_y / 2, ops.arc_radius + (ops.arc_radius - ops.circle_radius) + add_cirR, 8 * Math.PI * 2 / 36);
        P3[2].x = tempP.x;
        P3[2].y = tempP.y;
        //P3的中点坐标
        P3[1].y = P3[2].y + (ops.arc_radius - ops.circle_radius);
        P3[1].x = P3[2].x + (ops.arc_radius - ops.circle_radius);
        //P3的开始坐标
        P3[0].y = P3[2].y + (ops.arc_radius - ops.circle_radius);
        P3[0].x = P3[2].x + (ops.arc_radius - ops.circle_radius) + (ops.arc_radius - ops.circle_radius);


        var P4 = [
            { x: 0, y: 0 }, //start
            { x: 0, y: 0 }, //middle
            { x: 0, y: 0 }, //end
        ];
        //P4的结束位置，在圆弧上
        var tempP = getArcPoint(ops.position_x / 2, ops.position_y / 2, ops.arc_radius + (ops.arc_radius - ops.circle_radius) /2 + P4_disp, 10 * Math.PI * 2 / 36);
        P4[2].x = tempP.x;
        P4[2].y = tempP.y;
        //P4的中点坐标
        P4[1].y = P4[2].y + ops.circle_radius;
        P4[1].x = P4[2].x - (ops.arc_radius - ops.circle_radius) * 2;
        //P4的开始坐标
        P4[0].y = P4[2].y + ops.circle_radius;
        P4[0].x = P4[2].x - (ops.arc_radius - ops.circle_radius) * 4;


        var P5 = [
            { x: 0, y: 0 }, //start
            { x: 0, y: 0 }, //middle
            { x: 0, y: 0 }, //end
        ];
        //P5的结束位置，在圆弧上
        var tempP = getArcPoint(ops.position_x / 2, ops.position_y / 2, ops.arc_radius + (ops.arc_radius - ops.circle_radius) /2, 13 * Math.PI * 2 / 36);
        P5[2].x = tempP.x;
        P5[2].y = tempP.y;
        //P5的中点坐标
        P5[1].y = P5[2].y;
        P5[1].x = P5[2].x - ops.circle_radius / 2;
        //P5的开始坐标
        P5[0].y = P5[2].y;
        P5[0].x = P5[2].x - ops.circle_radius;

        var P6 = [
            { x: 0, y: 0 }, //start
            { x: 0, y: 0 }, //end
        ];
        //P6的开始位置，在圆弧90°上
        var tempP = getArcPoint(ops.position_x / 2, ops.position_y / 2, ops.arc_radius + (ops.arc_radius - ops.circle_radius), Math.PI * 2 / 4);
        P6[0].x = tempP.x;
        P6[0].y = tempP.y;
        //P6结束位置
        P6[1].x = tempP.x;
        P6[1].y = (P4[2].y + ops.circle_radius) + 30 + P6_disp;

        /*
         *	横线
         */
        var P7 = [
            { x: 0, y: 0 }, //start
            { x: 0, y: 0 }, //end
        ];
        //P7
        P7[0].x = P6[0].x;
        P7[0].y = P6[1].y ;
        //P7结束位置
        P7[1].x = ops.position_x * 2/10;
        P7[1].y = P7[0].y ;

        var P8 = [
            { x: 0, y: 0 }, //start
            { x: 0, y: 0 }, //end
        ];
        //P8
        P8[0].x = P6[0].x;
        P8[0].y = P6[1].y ;
        //P8结束位置
        P8[1].x = ops.position_x * 8/10;
        P8[1].y = P8[0].y ;

        var P9 = [
            { x: 0, y: 0 }, //start
            { x: 0, y: 0 }, //end
        ];
        //P9
        P9[0].x = ops.position_x * 2/10;
        P9[0].y = ops.c_height * 95/100;
        //P9结束位置
        P9[1].x = P6[1].x;
        P9[1].y = ops.c_height * 95/100;

        var P10 = [
            { x: 0, y: 0 }, //start
            { x: 0, y: 0 }, //end
        ];
        //P10
        P10[0].x = ops.position_x * 8/10;
        P10[0].y = ops.c_height * 95/100;
        //P10结束位置
        P10[1].x = P6[1].x;
        P10[1].y = ops.c_height * 95/100 ;

        /*最后2条竖线*/
        var P11 = [
            { x: 0, y: 0 }, //start
            { x: 0, y: 0 }, //end
        ];
        //P11
        P11[0].x = ops.position_x  * 2/3;
        P11[0].y = ops.c_height * 95/100;
        //P11结束位置
        P11[1].x = ops.position_x  * 2/3;
        P11[1].y = ops.c_height;

        var P12 = [
            { x: 0, y: 0 }, //start
            { x: 0, y: 0 }, //end
        ];
        //P12
        P12[0].x = ops.position_x  * 1/3;
        P12[0].y = ops.c_height * 95/100;
        //P12结束位置
        P12[1].x = ops.position_x * 1/3;
        P12[1].y = ops.c_height;


        /*画连接圆的线段*/
        anim_line(P1[0].x, P1[0].y, P1[1].x, P1[1].y, 50)
        anim_line(P1[1].x, P1[1].y, P1[2].x, P1[2].y, 50, 500, 'arc');


        anim_line(P2[0].x, P2[0].y, P2[1].x, P2[1].y, 50)
        anim_line(P2[1].x, P2[1].y, P2[2].x, P2[2].y, 50, 500, 'arc');

        anim_line(P3[0].x, P3[0].y, P3[1].x, P3[1].y, 50)
        anim_line(P3[1].x, P3[1].y, P3[2].x, P3[2].y, 50, 500, 'arc');

        anim_line(P4[0].x, P4[0].y, P4[1].x, P4[1].y, 50)
        anim_line(P4[1].x, P4[1].y, P4[2].x, P4[2].y, 50, 500, 'circle');


        anim_line(P5[0].x, P5[0].y, P5[1].x, P5[1].y, 50)
        anim_line(P5[1].x, P5[1].y, P5[2].x, P5[2].y, 50, 500, 'circle');

        if (window.devicePixelRatio == 3){
        	anim_line(P6[0].x, P6[0].y, P6[1].x, P6[1].y - 3.3, 50, 1000);
        }else{
        	anim_line(P6[0].x, P6[0].y, P6[1].x, P6[1].y, 50, 1000);
        }
        anim_line(P7[0].x, P7[0].y, P7[1].x, P7[1].y, 50, 1500);
        anim_line(P8[0].x, P8[0].y, P8[1].x, P8[1].y, 50, 1500);

        //anim_line(P9[0].x, P9[0].y, P9[1].x/5, P9[1].y, 50, 2000,false,4);
        anim_line(P9[0].x, P9[0].y, P9[1].x, P9[1].y, 50, 2000);

        anim_line(P10[0].x, P10[0].y, P10[1].x, P10[1].y, 50, 2000);
        //anim_line(P10[0].x, P10[0].y, P10[1].x/5, P10[1].y, 50, 2000,false,4);

        anim_line(P11[0].x, P11[0].y, P11[1].x, P11[1].y, 50, 2200);
        anim_line(P12[0].x, P12[0].y, P12[1].x, P12[1].y, 50, 2200);



        function anim_line(startX, startY, endX, endY, timing, delay, circle, lineWidth) {
            var lineWidth = lineWidth || 1;
            // var delay = delay || 0;
            var cir_r = 4;
            var cir_r2 = 4;
            var adx_addNum = (endX - startX) / 10;
            var ady_addNum = (endY - startY) / 10;
            var adx_next = startX + adx_addNum;
            var ady_next = startY + ady_addNum;
            var num = 0;
            var timeVal = 0;

            if (endY - startY > 0) {
                cir_r2 = -cir_r;
            }
            if (delay) {
                timeVal = delay;
            }

            setTimeout(function() {
                var Time = setInterval(function() {
                    if (startX == endX) {			//针对竖线
            			if(ady_next >= endY){
            				clearInterval(Time);
            			}
                    }else if ((endX - startX) < 0) {
                        if (adx_next <= endX) {
                            clearInterval(Time);
                            if (circle == "arc") {
                                context.beginPath();
                                context.strokeStyle = "#2aa151";
                                if (startY == 2) {
                                	context.arc(adx_next - cir_r + 2, ady_next - cir_r2 + 1, cir_r, 0, Math.PI * 2, false);
                                }else{
                                	context.arc(adx_next - cir_r + 1, ady_next - cir_r2 + 1, cir_r, 0, Math.PI * 2, false);
                                }
                                context.stroke();
                                context.closePath();
                            } else if (circle == "circle") {
                                context.beginPath();
                                context.arc(adx_next, ady_next, cir_r, 0, 360, false);
                                context.fillStyle = "#2aa151"; //填充颜色,默认是黑色
                                context.fill(); //画实心圆
                                context.closePath();
                            }
                        }
                    } else if ((endX - startX) >= 0) {
                        if (adx_next >= endX) {
                            clearInterval(Time);
                            if (circle == "arc") {
                                // context.beginPath();
                                // context.strokeStyle = "#2aa151";
                                // context.arc(adx_next - cir_r + 1, ady_next - cir_r2 -2, cir_r, 0, Math.PI * 2, false);
                                // context.stroke();
                                // context.closePath();
                            } else if (circle == "circle") {
                                context.beginPath();
                                context.arc(adx_next, ady_next, cir_r, 0, 360, false);
                                context.fillStyle = "#2aa151"; //填充颜色,默认是黑色
                                context.fill(); //画实心圆
                                context.closePath();
                            }

                        }
                    }
                    // if (Math.abs(adx_next) >= Math.abs(x1) || Math.abs(ady_next) >= Math.abs(y1)) { //停止循环
                    //     clearInterval(Time);
                    // }

                    context.beginPath(); // 开始绘制线条
                    context.strokeStyle = "#2aa151";
                    context.lineWidth = lineWidth;
                    context.lineCap = 'butt';
                    context.moveTo(startX, startY);
                    context.lineTo(adx_next, ady_next);
                    context.stroke();
                    adx_next = adx_next + adx_addNum;
                    ady_next = ady_next + ady_addNum;
                    //console.log("111");
                }, timing);
            }, timeVal)
        }

        /*画点坐标，测试用*/
        // context.beginPath();
        // context.arc(P1[2].x, P1[2].y, ops.arc_EndlineWidth, 0, 360, false);
        // context.fillStyle = ops.arc_Endcolor; //填充颜色,默认是黑色
        // context.fill(); //画实心圆
        // context.closePath();context.beginPath();
        // context.arc(P1[1].x, P1[1].y, ops.arc_EndlineWidth, 0, 360, false);
        // context.fillStyle = ops.arc_Endcolor; //填充颜色,默认是黑色
        // context.fill(); //画实心圆
        // context.closePath();context.beginPath();
        // context.arc(P1[0].x, P1[0].y, ops.arc_EndlineWidth, 0, 360, false);
        // context.fillStyle = ops.arc_Endcolor; //填充颜色,默认是黑色
        // context.fill(); //画实心圆
        // context.closePath();
    }
    //发散线条
    function drawLine() {
        var lineList = [];
        for (var i = 0; i <= 36; i++) {

            var P = {};
            P = getArcPoint(ops.position_x / 2, ops.position_y / 2, ops.arc_radius - 2, i * Math.PI * 2 / 36);
            lineList.push(P);
        }
        // console.log(lineList);
        context.strokeStyle = ops.arc_bckColor;
        context.fillStyle = "rgb(250,0,0)"
        for (var i = 0; i < lineList.length; i++) {
            context.beginPath();
            context.moveTo(ops.position_x / 2, ops.position_y / 2);
            context.lineTo(lineList[i].x, lineList[i].y);
            context.stroke();
            context.closePath();
        }
    }

    function draw(cur) {
        // 画内部空白
        // context.beginPath();
        // context.moveTo(24, 24);
        // context.arc(ops.position_x / 2, ops.position_y / 2, ops.position_y / 2 - 10, 0, Math.PI * 2, true);
        // context.closePath();
        // context.fillStyle = 'rgba(255,255,255,1)'; // 填充内部颜色
        // context.fill();

        context.beginPath();
        context.arc(ops.position_x / 2, ops.position_y / 2, ops.circle_radius, 0, 360, false);
        context.fillStyle = ops.arc_color; //填充颜色,默认是黑色
        context.fill(); //画实心圆
        context.closePath();

        //在中间写字
        context.font = ops.text_font; // 字体大小，样式
        context.fillStyle = ops.text_color; // 颜色
        context.textAlign = ops.text_textAlign; // 位置
        context.textBaseline = ops.text_textBaseline;
        context.moveTo(ops.position_x / 2, ops.position_y / 2); // 文字填充位置
        context.fillText(parseInt(cur), ops.position_x / 2, ops.position_y / 2 - 10);
        context.font = "normal 12pt PingFang-SC-Medium";
        context.fillText(ops.text_tip, ops.position_x / 2, ops.position_y / 2 + 20);


        // 画内圆
        context.beginPath();
        // 绘制一个中心点为（position_x/2, position_y/2），半径为position_y/2-5不与外圆重叠，
        // 起始点-(Math.PI/2)，终止点为((Math.PI*2)*cur)-Math.PI/2的 整圆cur为每一次绘制的距离
        context.lineWidth = ops.arc_lineWidth;
        context.strokeStyle = ops.arc_color;
        context.arc(ops.position_x / 2, ops.position_y / 2, ops.arc_radius, -(Math.PI / 2), ((Math.PI * 2) * (cur / 100)) - Math.PI / 2, false);
        context.stroke();

        /*圆弧终点画一高亮点*/
        if (cur == ops.present) {
            var r = ops.arc_radius;
            var angle = ((Math.PI * 2) * (cur / 100)) - Math.PI / 2;
            var x = 0,
                y = 0;
            var P = {
                x: 0,
                y: 0
            }
            x = Math.sin(angle) * r;
            y = Math.cos(angle) * r;
            P.x = x + ops.position_y / 2;
            P.y = y + ops.position_x / 2;

            context.beginPath();
            context.arc(P.y, P.x, ops.arc_EndlineWidth, 0, 360, false);
            context.fillStyle = ops.arc_Endcolor; //填充颜色,默认是黑色
            context.fill(); //画实心圆
            context.closePath();

        }
    };

    /*	获取圆弧上的点
     *	x-圆点坐标x ， y-圆点坐标y ， r-圆弧半径r ， angle-圆弧角度
     */
    function getArcPoint(x, y, r, angle) {
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
        disp_y = disp_y + y;
        disp_x = disp_x + x;
        P = {
            x: disp_x,
            y: disp_y
        }
        return P;
    }

    // 调用定时器实现动态效果
    var timer = null,
        n = 0;
    var loadCanvas = function(nowT) {
        timer = setInterval(function() {
            if (n > nowT) {
                clearInterval(timer);
            } else {
                draw(n);
                n += 1;
            }
        }, 10);
    };
    //setTimeout(function(){loadCanvas(ops.present)},0);
    loadCanvas(ops.present);
    timer = null;
    setTimeout(function(){setPoint()},1000);;
}
