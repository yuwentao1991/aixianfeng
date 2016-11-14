define(['text!./index.html','css!./index.css'],function(html){
	function render(){
		$(".container").html(html);
	}
	function size(){
//		$.ajax({
//			type:"get",
//			url:"http://www.vrserver.applinzi.com/aixianfeng/apihome.php",
//			async:true,
//			success:function(req){
//				
//			}
//		});
		
	}

	return {
		render:render,
		size:size
	}
})