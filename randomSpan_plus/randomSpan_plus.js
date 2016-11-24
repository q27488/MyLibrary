
/*******************************
*   范围内随机大小颜色标签文字
*   cyj 2016/11/23
*
*******************************/
    $.fn.randomSpan = function(options){
        var self = this;

        this.my_params={
        minFontSize:"12",                   //最大字体
        maxFontSize:"100",                   //最小字体
        colorArr:["#aee","#ccc","#000"],    //颜色数组
        marginLR:"20",                       //左右margin,固定值
        postionBT:"10",                      //上下postion随机位移
        postionLR:"100",                   //左右postion随机位移
        Unit:"px",                         //单位，margin与字体均使用它，默认px，可选em,rem
        newlineNum:'0',                     //换行条件
        };

        $.extend(this.my_params,options||{});

        var colorLengend = this.my_params.colorArr.length;
        var fontSizeLengend = (this.my_params.maxFontSize - this.my_params.minFontSize);


        //历遍span标签
        $(this).find('span').each(function(index,el){
            var colorRandNum = parseInt(Math.random()*colorLengend);
            var fontSizeRandNum = parseFloat(self.my_params.minFontSize) + parseFloat(Math.random())*fontSizeLengend + self.my_params.Unit;
            console.log(fontSizeRandNum);

            var marginLR =  self.my_params.marginLR+self.my_params.Unit;
            var postionBT =  parseFloat(Math.random() *  self.my_params.postionBT )+ self.my_params.Unit;
            var postionLR =  parseFloat(Math.random() *  self.my_params.postionLR )+ self.my_params.Unit;
            // console.log(marginLR);
            // console.log(postionBT);
            // console.log(postionLR);

            if(index != 0 && index%self.my_params.newlineNum &&self.my_params.newlineNum !=0 ){
                $(this).after("<br>");
            }
            $(el).css({"color":self.my_params.colorArr[colorRandNum],
                        "fontSize":fontSizeRandNum,
                        "marginLeft":marginLR,
                        "marginRight":marginLR,
                        "position":"relative",
                    })

            /*随机位移*/
            if(Math.pow(-1,parseInt(Math.random()*100))){
                 $(el).css({"right":postionLR})
            }else{
                $(el).css({"left":postionLR})
            }

            if(Math.pow(-1,parseInt(Math.random()*100))){
                $(el).css({"top":postionBT})
            }else{
                 $(el).css({"bottom":postionBT})
            }

        });
    }
