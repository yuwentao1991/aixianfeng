define(['text!./shopping_cart.html','css!./shopping_cart.css'],function(html){
	function render(){
		$(".container").html(html);
	}
	//		购物车自动算出总价的方法
		function sum_price(price){
			$.each($(".dianji"), function(i){
			if($(".dianji").eq(i).get(0).checked){
				
				var d_price=$(".dianji").eq(i).parent().siblings("div").find("p")
				.last().children(".unit_price").html();
				var sells_num=$(".dianji").eq(i).parent().siblings(".join_shop").find("i").html();
				price+=parseFloat(d_price)*parseFloat(sells_num);
				
			}
		});
		
		$(".all_price").html(price.toFixed(1));
			if($(".all_price").html()==0){
					accounts_end();
				}else{
					accounts();
				}
		}
//	结算按钮变为选好了
		function accounts(){
			$(".sub_price").css("background","#ffd600");
			$(".sub_price").html("选好了");
		}
//	当总价为0时,结算按钮为灰色
		function accounts_end(){
			$(".sub_price").css("background","grey");
					$(".sub_price").html("满￥0起送");
		}
//	全选按钮增加样式
	function all_add(){
			$("#all").prop("checked",true);
			$(".all_choice").addClass("bk");
			$(".all_choice").css("border","none");
		}
//	全选按钮移除样式
		function all_remove(){
			$("#all").prop("checked",false);
			$(".all_choice").removeClass("bk");
			$(".all_choice").css("border","1px solid grey");
		}
//	购物车红色按钮动画封装
	function shop_car_animate(){
		$(".set_shop_car").addClass("on");
				time=setTimeout(function(){
					$(".set_shop_car").removeClass("on");
				},100);
	}
	
	
	//	点加号减号改变价格
	function shop_1(){
		
		var num=0;
		var sum=0;
		var time;
		var arr=[];
		$.each($(".chioce_bg"),function(i) {
			$(".chioce_bg").eq(i).addClass("bk");
		});
//		遍历本地存储然后动态添加
		var str="";
		for (var i=0;i<sessionStorage.length;i++) {
			var key=sessionStorage.key(i);
			var value=JSON.parse(sessionStorage.getItem(key));
			str+='<li><span class="chioce_bg"><input type="checkbox" class="dianji" checked="checked"></span>'
			str+='<a href="#"><img src="'+value.aj_pic+'"></a>'
			str+='<div><p>'+value.aj_name+'</p>'
			str+='<p>￥<span class="unit_price">'+value.at_price+'</span></p></div>'
			str+='<p class="join_shop"><span class="jian_cell"><img src="images/jian_cells_03 .png"></span>'
			str+='<i>'+value.sells_num+'</i>'
			str+='<span class="add_cell"><img src="images/add_cells_03.png"></span></p></li>'
			arr.push(value.index);
		}
		
		$(".commodity_number").html(str);
		all_chioce();
		
		$(".add_cell").click(function(){
				if($(this).parent().siblings(".chioce_bg").find(".dianji").get(0).checked==false){
					console.log()
					$(this).parent().siblings(".chioce_bg").find(".dianji").prop("checked",true);
					$(this).parent().siblings(".chioce_bg").addClass("bk");
					$(this).parent().siblings(".chioce_bg").css("border","none");
				}
				var add=parseInt($(this).siblings("i").html());
				$(this).siblings("i").html(add+=1);
				shop_car_animate();
				price_add(num);
				sum_price(sum);
//				创建对象存储
               var xia=$(this).parent().parent().index();
               
				var sells_news={
					aj_pic:$(this).parent().siblings("a").find("img").attr("src"),
					aj_name:$(this).parent().siblings("div").children("p").first().html(),
					at_price:$(this).parent().siblings("div").find(".unit_price").html(),
					sells_num:$(this).siblings("i").html(),
					index:arr[xia]
				}
				
				sessionStorage.setItem(sells_news.index,JSON.stringify(sells_news));
				
			})
			
		$.each($(".jian_cell"), function(i,elem) {
			$(".jian_cell").eq(i).css("visibility","visible");
			$(elem).click(function(){
				var num=0;
				var min=parseInt($(this).siblings("i").html());
				$(this).siblings("i").html(min-=1);
				var xia=$(this).parent().parent().index();
				//	创建对象保存本地数据
				var sells_news={
					aj_pic:$(this).parent().siblings("a").find("img").attr("src"),
					aj_name:$(this).parent().siblings("div").children("p").first().html(),
					at_price:$(this).parent().siblings("div").find(".unit_price").html(),
					sells_num:$(this).siblings("i").html(),
					index:arr[xia]
					
				}
				
				sessionStorage.setItem(sells_news.index,JSON.stringify(sells_news));
				if(JSON.parse(sessionStorage.getItem(sells_news.index)).sells_num==0){
					sessionStorage.removeItem(sells_news.index);
					arr.splice(xia,1);
				}
				
				if(min==0){
					$(this).parent().parent().remove();
				}
				shop_car_animate();
				
				price_add(num);
				
				if($(".set_shop_car").html()==0){
					$(".set_shop_car").hide();
				}
				sum_price(sum);
				

//				
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
		

		sum_price(sum);
		
		if($(".commodity_number>li").length==0){
			all_remove();
		}
		
	}
	function all_chioce(){
		
		var ax=0;
		var a=0;
		$(".chioce_bg").addClass("bk");
		$(".all_choice").addClass("bk");
		$.each($(".chioce_bg"), function(i,elem) {
				
				$(elem).click(function(){
					
				if($(this).find(".dianji").get(0).checked==false){
					$(this).removeClass("bk");
					$(this).css("border","1px solid grey");
				}else{
					$(this).addClass("bk")
					$(this).css("border","none");
					$(".sub_price").css("background","#ffd600");
							
				}
//				//				实现所有按钮选中或者不选中全选按钮的状态情况
				$.each($(".dianji"),function(j) {
						
					if($(".dianji").eq(j).get(0).checked){
						a++;
					}
				});
				
				if(a!=$(".dianji").length){
						all_remove();
						a=0;
				}
				if(a==$(".dianji").length){
					all_add();
				}
				shop_car_animate();
				sum_price(ax);
		    });
		});
		
		
		$(".all_choice").on("click",function(){
			if($(this).find("#all").get(0).checked==false){
				
				$(this).removeClass("bk");
				$(this).css("border","1px solid grey");
			}else{
				$(this).addClass("bk");
				$(this).css("border","none");
			}
			
			$.each($(".dianji"), function(i) {
				$(".dianji").eq(i).get(0).checked=$("#all").get(0).checked;
				
				if($(".dianji").eq(i).get(0).checked==false){
					$(".dianji").eq(i).parent().removeClass("bk");
					$(".dianji").eq(i).parent().css("border","1px solid grey");
				}else{
					$(".dianji").eq(i).parent().addClass("bk")
					$(".dianji").eq(i).parent().css("border","none");
				}
				shop_car_animate();
				sum_price(ax);
			});
			
		})
		
		
	}
	
	
	
	return {
		render:render,
//		all_chioce:all_chioce,
		shop_1:shop_1
	}
})