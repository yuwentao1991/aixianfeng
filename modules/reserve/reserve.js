define(['text!./reserve.html','css!./reserve.css'],function(html){
	function render(){
		$(".container").html(html);
	}
	return {
		render:render
	}
})