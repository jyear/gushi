/**
 * Created by Administrator on 2015/4/17.
 */

function imgList(opts){
    this.name=opts.name;
    this.dom=opts.dom;
    this.ListDom=opts.ListDom;
    this.largeDom=opts.largeDom;
    this.largeImgs=this.largeDom.getElementsByTagName("ul")[0];
    this.imgUrl=opts.url;
    this.totle=opts.totle;
    this.returnDom=opts.rtDon;
    this.lWidth=window.screen.availWidth;
    this.lHeight=window.screen.availHeight;
    this.idx=0;//初始化索引
    this.tpl='';//初始化小图片列表
    this.tpm='';//初始化大图片列表
    //生成图片列表
    this.init();//初始化启动生成图片列表拍
    this.listItem();//小图片列表点击事件
    this.bindDOm();//大图片事件绑定
}
imgList.prototype.init=function(){
    for(var i=1;i<=this.totle;i++){
        this.tpl+='<li class="bg-white pd5" data-num="'+i+'"><img src="'+this.imgUrl+i+'.jpg" alt=""/><p class="text-c co-black">'+this.name+'</p></li>';
        this.tpm+='<li class="container-fluid img-item cont-center" data-rol="'+i+'" style="transform:translate3d('+(i-1)*this.lWidth+'px,0,0);transition:.3s ease"><img src="'+this.imgUrl+i+'.jpg" alt=""/></li>';
        this.dom.innerHTML=this.tpl;
        this.largeImgs.innerHTML=this.tpm;
    }
};
imgList.prototype.listItem=function(){
    var self = this;
    var listDom=this.ListDom;
    var largeDom=this.largeDom;
    var lHeight=this.lHeight;
    var lWidth=this.lWidth;
    var idx=this.idx;
    var list=this.dom.getElementsByTagName("li");

    for(var j=0;j<list.length;j++){
        list[j].onclick=function(){
            listDom.style.display="none";
            largeDom.style.display="block";
            largeDom.style.height=lHeight+"px";
            largeDom.style.width=lWidth+"px";
            largeDom.style.backgroundColor="rgb(0,0,0)";
            idx=this.getAttribute("data-num");
            self.goIndex(idx-1);
        }
    }
};
imgList.prototype.goIndex=function(n){
    var width=this.lWidth;
    var largeImages=this.largeImgs;
    var listItem=largeImages.getElementsByTagName("li");
    var cidx;
    if(typeof n == 'number'){
        cidx=n;
    }
    for(var i=0;i<cidx;i++){
        listItem[i].style.transform="translate3d(-"+width+"px,0,0)";
    }
    listItem[cidx].style.transform="translate3d(0,0,0)";
    for(var j=cidx+1;j<listItem.length;j++){
        listItem[j].style.transform="translate3d("+width+"px,0,0)";
    }

};
//大图片列表事件绑定
imgList.prototype.bindDOm=function() {
    var self = this.largeImgs;
    var width = this.lWidth;
    var list=self.getElementsByTagName("li");
    var listDom=this.ListDom ;
    var largeDom=this.largeDom;
    var returnDom=this.returnDom;
    //手指按下事件
    var startHandler=function(event){
        self.startX = event.touches[0].pageX;
        self.offsetX = 0;
        var target=event.target;
        while(target.nodeName != 'LI' && target.nodeName != 'BODY'){
            target = target.parentNode;
        }
        self.target=target;
        self.idx=self.target.getAttribute("data-rol")
    };
    //手指移动事件
    var moveHandler=function(event){
        event.preventDefault();
        self.offsetX = event.targetTouches[0].pageX - self.startX;//计算移动距离
        var _idx=self.idx-1;
        var i=_idx-1;
        //当索引右超出
        if(i > list.length-3){
           return i = list.length-4;
            //当索引左超出
        }else if(i < 0){
            i = 1;
        }
        var m=i+3;
        for(i;i<m;i++){
            list[i].style.transform="translate3d("+((i-_idx)*width+self.offsetX)+"px,0,0)";
        }
    };
    //手指抬起事件
    var endHandler=function(event){
        event.preventDefault();
        var k=self.idx-1;
        var boundary = width/8;//便捷翻页
        if(Math.abs(self.offsetX)>boundary&&self.offsetX<0){
            if(k>list.length-2){
                 k=list.length-2;
            }
            list[k].style.transform="translate3d(-"+width+"px,0,0)";
            list[k+1].style.transform="translate3d(0,0,0)";
        }else if(Math.abs(self.offsetX)>boundary&&self.offsetX>0){
            if(k=="0"){
                k=1;
            }
            list[k-1].style.transform="translate3d(0,0,0)";
            list[k].style.transform="translate3d("+width+"px,0,0)";

        }
    };
    //绑定事件
    self.addEventListener("touchstart",startHandler);
    self.addEventListener("touchmove",moveHandler);
    self.addEventListener("touchend",endHandler);
    returnDom.addEventListener("click",function(){
        listDom.style.display="block";
        largeDom.style.display="none";
    })
};





