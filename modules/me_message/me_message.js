define(['text!./me_message.html','css!./me_message.css'],function(html){
	function render(){
		$(".container").html(html);
	}
	return {
		render:render
	}
})