<?php
require_once "jssdk.php";
// appId  和 秘钥
$jssdk = new JSSDK("wx6a53808c16c3eed1", "63f7d5cee917f3d9d9a35613cfee91fd");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<style>
*{margin: 0;padding: 0}
html,body,ul{width: 100%;height:100%}
body{overflow-x: hidden}
ul{margin: 0;padding: 0}
ul li{
  width: 100%;height: 50px;
  margin: 4px;
  background-color: #2e2;
  border-radius: 3px;
  text-align: center;
  line-height: 50px;
  /*padding: 5px;*/
}
</style>
</head>
<body>

<ul>
  <li onclick="getLocation()">获取地理位置</li>
  <li onclick="getPosition()">地图查看位置</li>
  <li onclick="saoyisao()">扫一扫</li>
  <li onclick="hidemenu()">隐藏右上角菜单接口</li>
  <li onclick="showmenu()">显示右上角菜单接口</li>
  <li onclick="getNetworkType()">获取网络状态接口</li>
</ul>


<script>

  var latitude = 0;
  var longitude = 0;
  function getPosition(){
    wx.openLocation({
      latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
      longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
      name: '', // 位置名
      address: '', // 地址详情说明
      scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
      infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
  });
  }

  function getLocation(){
    wx.getLocation({
      success: function (res) {
          latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          var speed = res.speed; // 速度，以米/每秒计
          var accuracy = res.accuracy; // 位置精度
      },
      cancel: function (res) {
          alert('用户拒绝授权获取地理位置');
      }
  });
  }

  function saoyisao(){
    wx.scanQRCode({
        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            alert(result)
        }
    });
  }

  function hidemenu(){
    wx.hideOptionMenu();
  }

  function showmenu(){
    wx.showOptionMenu();
  }

  function getNetworkType(){
    wx.getNetworkType({
        success: function (res) {
            var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
            alert(networkType)
        }
    });
  }


  wx.config({
    debug: true,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
     jsApiList: [
        'checkJsApi',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'onVoicePlayEnd',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
      ]
  });
  // wx.ready(function () {
  //   // 在这里调用 API
  //
  //
  //
  //
  // });
</script>
</body>
</html>
