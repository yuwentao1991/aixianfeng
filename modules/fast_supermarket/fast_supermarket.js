define(['text!./fast_supermarket.html','css!./fast_supermarket.css'],function(html){
	function render(){
		$(".container").html(html);
	}
//	选中商品添加到购物车
	function shop(){
//		保存总数量
		function shuaxin(){
					var set_shop_car=document.getElementsByClassName("set_shop_car")[0];
				var sum_num={
					sum:set_shop_car.innerHTML
				}
				var nam=set_shop_car.className;
				sessionStorage.setItem(nam,JSON.stringify(sum_num));
	
				}
		$(".join_shop>i").html(0);
		var time;
		var arr=[];
		var n=0;
//		页面一引入根据存储的数据显示商品购买情况
		for (var i=0;i<sessionStorage.length;i++) {
			var key=sessionStorage.key(i);
			var value=JSON.parse(sessionStorage.getItem(key));
			var mark=value.index;
			$(".jian_cell").eq(mark).css("visibility","visible");
			$(".jian_cell").eq(mark).siblings("i").css("visibility","visible");
			$(".jian_cell").eq(mark).siblings("i").html(value.sells_num);
		}
		if(sessionStorage.length>0){
			$(".set_shop_car").css("display","block");
			price_add(n);
		}
			$(".add_cell").click(function(){
				var num=0;
				var add=parseInt($(this).siblings("i").html());
				$(this).siblings("span").css("visibility","visible");
				$(this).siblings("i").css("visibility","visible");
				$(".set_shop_car").show();
				$(this).siblings("i").html(add+=1);
				$(".set_shop_car").html();
				$(".set_shop_car").addClass("on");
				time=setTimeout(function(){
					$(".set_shop_car").removeClass("on");
				},100);
			
				price_add(num);
//				创建对象保存商品的信息:图片路径 商品名 价格 数量
				var sells_news={
					aj_pic:$(this).parent().siblings("a").find(".aj_pic").attr("src"),
					aj_name:$(this).parent().siblings(".price").find(".aj_name").html(),
					at_price:$(this).parent().siblings(".price").find(".at_price").find("b").html(),
					sells_num:$(this).siblings(".sells_num").html(),
					index:$(this).parent().parent().index()
				}
				
				sessionStorage.setItem(sells_news.index,JSON.stringify(sells_news));

				
			})
			
		$.each($(".jian_cell"), function(i,elem) {
			$(elem).click(function(){
				var num=0;
				var min=parseInt($(this).siblings("i").html());
				$(this).siblings("i").html(min-=1);
				if(min==0){
					$(this).css("visibility","hidden");
					$(this).siblings("i").css("visibility","hidden");
				}
				$(".set_shop_car").addClass("on");
				time=setTimeout(function(){
					$(".set_shop_car").removeClass("on");
				},100);
				price_add(num);
				
				if($(".set_shop_car").html()==0){
					$(".set_shop_car").hide();
					
				}
				
				//				创建对象保存商品的信息:图片路径 商品名 价格 数量
				var sells_news={
					aj_pic:$(this).parent().siblings("a").find(".aj_pic").attr("src"),
					aj_name:$(this).parent().siblings(".price").find(".aj_name").html(),
					at_price:$(this).parent().siblings(".price").find(".at_price").html(),
					sells_num:$(this).siblings(".sells_num").html(),
					index:$(this).parent().parent().index()
				}

				sessionStorage.setItem(sells_news.index,JSON.stringify(sells_news));
				
				if(JSON.parse(sessionStorage.getItem(sells_news.index)).sells_num==0){
					sessionStorage.removeItem($(this).parent().parent().index());
				}
				
				
				
//				sessionStorage.clear();
				
			})
		});
//		总价相加的方法
		function price_add(x){
			$.each($(".join_shop>i"), function(j,elem) {
				   var a=parseInt($('.join_shop>i').eq(j).html());
				   x+=a;
				});
				$(".set_shop_car").html(x);
		}
	}
//	获取ajax数据
	function data(){
		$.ajax({
			type:"get",
			url:"http://www.vrserver.applinzi.com/aixianfeng/apicategory.php",
			data:{category:"热销榜"},
			dataType:'json',
			async:true,
			success:function(req){
				
				set_data(req);
			}
		});	
//		点击左侧导航栏,动态换取导航栏内容
		$(".aside>li").click(function(){
			$(".aside>li").css("background","none");
			$(this).css({"background":"url(images/hot_02.png) 0 center no-repeat",
			"background-size":"0.15625rem 1.09375rem"});
			$.ajax({
				type:"get",
				url:"http://www.vrserver.applinzi.com/aixianfeng/apicategory.php",
				data:{category:$(this).text()},
				dataType:'json',
				async:true,
				success:function(req){
					if(req.status!=3){
						set_data(req);
					}
				}
			});
		})
//		公共ajax获取函数方法
		function set_data(req){
					var str="";
				$.each(req.data,function(i,elem) {
					str+='<li><a href="#"><img src="'+elem.img+'"images/miulk.jpg" class="aj_pic"></a>'
					str+='<div class="price"><p><a href="#" class="aj_name">'+elem.name+'</a></p>'
					str+='<p><span>精选</span>'
					if(elem.pm_desc!=""){
						str+='<span>'+elem.pm_desc+'</span>'
					}
					str+='</p><p><span>'+elem.specifics+'</span></p>'
					str+='<p><span class="at_price">￥<b>'+elem.price+'</b></span><span>￥'+elem.market_price+'</span></p></div>'
					str+='<p class="join_shop"><span class="jian_cell"><img src="images/jian_cells_03 .png"></span><i class="sells_num"></i><span class="add_cell"><img src="images/add_cells_03.png"></span></p></li>'
					
				});
				$(".cells_message").html(str);
				shop();
				
			}
	}
	return {
		render:render,
		data:data
	}
})