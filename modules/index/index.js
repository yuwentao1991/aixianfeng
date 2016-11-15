define(['text!./index.html','css!./index.css'],function(html){
	function render(){
		$(".container").html(html);
	}
	function size(){
		$(".code").click(function(){
				wx.scanQRCode({
    			needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
   			 	scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
    			success: function (res) {
    			var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
			}
		});
		})
		
	}

	return {
		render:render,
		size:size
	}
})