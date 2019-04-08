//ios 和 android 端 判别
function isIos() {
    var u = navigator.userAgent;
    console.log(u);
    //android终端
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; 
	//ios终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
	if(isiOS) {
 		return true;
	} else if (isAndroid) {
 		//console.log('是否是Android：'+isAndroid);
 		return false;
	}
}
// 百分比处理函数
function percentage(total, num) {
	var per1 = num / total * 80;
	var per = (per1 == 0 || isNaN(per1)) ? 1 : per1;
	var perStyle = per + '%';
	return  perStyle;
}
// 处理日期格式 1497542400000 -> 2017-6-16
function dateChange(date) {
	var d = new Date(date);
	return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}
//调整年月日格式 num 数字, n补零后位数
function PrefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}
// 吐司提示信息
function muiToast(str) {
	mui.toast(str, {
		duration: 'short',
		type: 'div'
	});
}
// 传参给原生
function transParam(json) {
	var protocol = "protocol://android?" + JSON.stringify(json);
	// console.log('+++++++++++++++++++++++++传给安卓参数:' + protocol);
	window.location.href = protocol;
}

var myCommon = myCommon || {};
myCommon = {
	//屏幕宽度
	wWidth : window.screen.width,
	//屏幕高度
	wHeight : window.screen.height,
	// ajax获取数据
	ajaxPost : function(obj) {
		var urlV = obj.urlV, 
			data = obj.data, 
			successF = obj.successF,
			errorF = obj.errorF,
			async = obj.async || true;
		var a = new Date() * 1;
		$.ajax({
		    type : 'POST',
		    url : urlV,
		    dataType : 'JSON',
		    data : JSON.stringify(data),
		    async: async,
		    contentType : 'application/json; charset=utf-8',
		    timeout : 2000,
		    success : function(data){
		    	var b = new Date() * 1;
				// console.log(b - a + urlV);
		    	if (data == null) {
		    		console.log("接口：" + urlV + "返回数据为null");
		    	} else if (data == "") {
		    		console.log("接口：" + urlV + "返回数据为空");
		    	} else {
		    		if (typeof(data) == "string") {
						data = JSON.parse(data);
					}
		    		successF(data);
		    	}
		    },
		    error : function(XMLHttpRequest, textStatus, errorThrown){
		    	var b = new Date() * 1;
				// console.log(b - a + urlV);
				console.log("接口" + urlV + "出错;XMLHttpRequest.status：" 
					+ XMLHttpRequest.status + ";XMLHttpRequest.readyState：" 
					+ XMLHttpRequest.readyState + ";errorThrown：" 
					+ errorThrown + ";textStatus：" + textStatus);
				errorF();
		    }
		});
	},
	// ajax获取数据
	ajaxGet : function(obj) {
		var urlV = obj.urlV, 
			successF = obj.successF,
			errorF = obj.errorF,
			async = obj.async || true;
		var a = new Date() * 1;
		$.ajax({
		    type : 'GET',
		    url : urlV,
		    dataType : 'JSON',
		    async: async,
		    contentType : 'application/json; charset=utf-8',
		    timeout : 2000,
		    success : function(data){
		    	var b = new Date() * 1;
				// console.log(b - a + urlV);
		    	if (data == null) {
		    		console.log("接口：" + urlV + "返回数据为null");
		    	} else if (data == "") {
		    		console.log("接口：" + urlV + "返回数据为空");
		    	} else {
		    		if (typeof(data) == "string") {
						data = JSON.parse(data);
					}
		    		successF(data);
		    	}
		    },
		    error : function(XMLHttpRequest, textStatus, errorThrown){
		    	var b = new Date() * 1;
				// console.log(b - a + urlV);
				console.log("接口" + urlV + "出错;XMLHttpRequest.status：" 
					+ XMLHttpRequest.status + ";XMLHttpRequest.readyState：" 
					+ XMLHttpRequest.readyState + ";errorThrown：" 
					+ errorThrown + ";textStatus：" + textStatus);
				errorF();
		    }

		});
	},
    // 接收并处理url传递参数  
    getParam : function(){
		// demo.html?param={"key":"value","key":"value"}
		var href = decodeURIComponent(window.location.href);
		var aaa = href.substring(href.indexOf('?') + 1, href.length).split('=')[1];
	    var getParam = null;
	    if (aaa) {
            getParam = JSON.parse(aaa);
        } else {
            // mui.toast('没有参数传入',{ duration:'short', type:'div' });
        }
		return getParam;
    },
	getDate : function() {
		var d = new Date();
		return {
			// 年
			y : d.getFullYear(),
			// 月
			m : PrefixInteger(d.getMonth() + 1,2),
			// 日
			d : PrefixInteger(d.getDate(),2),
			// 时
			h : PrefixInteger(d.getHours() ,2),
			// 分
			min : PrefixInteger(d.getMinutes(),2),
			// 秒
			s : PrefixInteger(d.getSeconds(),2),
			// 季度
			jd : Math.floor((d.getMonth() + 3) / 3),
			// 毫秒
			ms : d.getMilliseconds()
		}; 
	},
	uploadFileFun : function(uploadUrl, formData, successFun, errorFun) {
		var a = new Date() * 1;
		$.ajax({
			url: uploadUrl, 
			type: 'POST',
			data: formData,
			async: false,
			cache: false,
			//必须false才会自动加上正确的Content-Type
			contentType: false,
			processData: false,
			success: function(data) {
				var b = new Date() * 1;
				console.log(b - a + uploadUrl);
				if (typeof(data) == "string") {
					if (data != '') {
						data = JSON.parse(data);
					}
				} 
				successFun(data);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				var b = new Date() * 1;
				console.log(b - a + uploadUrl);
				myCommon.closeMask();
				console.log("-----------------------------------------接口" 
					+ uploadUrl + "出错,XMLHttpRequest.status："
					+ XMLHttpRequest.status + "XMLHttpRequest.readyState：" 
					+ XMLHttpRequest.readyState + "errorThrown：" 
					+ errorThrown + "textStatus：" + textStatus);
				errorFun();
			}
		});
	},
	// 遮罩模式下,点击遮罩关闭遮罩
	maskClick : function(maskId) {
		$(maskId).on("tap", function() {
			setTimeout(function() {
				$(maskId).fadeOut("slow");
			}, 300);
		});
	},
	//开启遮罩
	openMask : function() {
		//console.log("openMask");
		if($("#myMask").length > 0) {
			$("#myMask").show();
			return ;
		}
		var div = document.createElement("div");
		div.id = "myMask";
		document.getElementsByTagName("body")[0].appendChild(div);
		var $mask = $("#myMask");
		$mask.css("position", "fixed");
		$mask.css("top", "0");
		$mask.css("right", "0");
		$mask.css("bottom", "0");
		$mask.css("left", "0");
		$mask.css("z-index", "1000");
		$mask.css("background-color", "rgba(0,0,0,0.3)");
		$mask.hasClass("glass");
		var $mask = $("#myMask");
		$mask.show();
		$mask.bind( "touchmove", function (e) {
			e.preventDefault();
			if(isIos()){
				window.event.returnValue = false; 
			}
		});
	},
	//关闭遮罩
	closeMask : function() {
		//console.log("closeMask");
		var $mask = $("#myMask");
		if($mask) {
			$mask.hide();
		}
	},
	//loading加载中遮罩
	loading : function() {
		//console.log("loading");
		myCommon.openMask();
		if($("#loading").length > 0) {
			return ;
		}
		var img = document.createElement("img");
		img.id = "loading";
		img.alt = "加载中";
		img.width = 48;
		img.height = 48;
		img.src = "../common/imgs/loading.gif";
		var diffW = (myCommon.wWidth - 48) / 2;
		var diffH = (myCommon.wHeight - 48) / 2;
		$("#myMask").append(img).css("z-index", "1000");
		$("#loading").css("position", "absolute").css("z-index", "1001").css("margin-top", "0").css("top", diffH).css("left", diffW);
	},
	//关闭加载中遮罩
	closeLoading : function() {
		//console.log("closeLoading");
		var $mask = $("#myMask");
		if($mask) {
			$mask.remove();
		}
	},
	//筛选模式遮罩
	screening : function() {
		//console.log("screening");
		myCommon.openMask();
		var $mask = $("#myMask");
		var maskHeight = "";
		if(isIos()){
			maskHeight = "64px";
		}else{
			maskHeight = "44px";
		} 
		$mask.css("top", maskHeight).css("z-index", 997);
	},
	//关闭筛选模式遮罩
	closeScreening : function() {
		//console.log("closeScreening");
		var $mask = $("#myMask");
		$mask.hide();
	},
	//下拉刷新,依赖dropload插件
	dropload : function(idV, downFn, upFn) {
		$(idV).dropload({
		    scrollArea : window,
		    autoLoad : false,
		    distance : 50,
		    threshold : 2,
		    domUp : {
				domClass : 'dropload-up',
				domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
				domUpdate  : '<div class="dropload-update">↑释放更新</div>',
				domLoad : '<div class="dropload-load">○加载中...</div>'
			},
			domDown : {
				domClass : 'dropload-down',
				domRefresh : '<div class="dropload-refresh"></div>',
				domLoad : '<div class="dropload-load"></div>',
				domNoData : '<div class="dropload-noData"></div>'
			},
		    loadDownFn : function(me){
		        //console.log("上拉");
                // 即使加载出错,也得重置
                me.resetload();
		    },
		    loadUpFn : function(me){
		        //console.log("下拉");
		        downFn();
		        //location = location;
                // 即使加载出错,也得重置
                me.resetload();
		    },
		});
	},
	//取消冒泡
	stopBubble : function(e){
		//一般用在鼠标或键盘事件上
	  	if(e && e.stopPropagation){
	  	//W3C取消冒泡事件
	  		e.stopPropagation();
	  	} else {
	  		//IE取消冒泡事件
	  		window.event.cancelBubble = true;
	  	}
	},
	//自定义prompt
	myPrompt : function(desV,value,titleV,btnArray,func) {
		myCommon.openMask();
		// <div id="myPrompt">
		// 	<p class="prompt-title">titleV</p>
		// 	<p class="prompt-des">desV</p>
		// 	<input type="text" class="textVa" value=""/>
		// 	<div class="pBtnWrap">
		// 		<span id="cancel">取消</span>
		// 		<span id="confirm">确定</span>
		// 	</div>
		// </div>
		var cancel = document.createElement("span");
		cancel.id = "cancel";
		
		var confirm = document.createElement("span");
		confirm.id = "confirm";
		
		var pBtnWrap = document.createElement("div");
		pBtnWrap.id = "pBtnWrap";
		pBtnWrap.appendChild(cancel);
		pBtnWrap.appendChild(confirm);
		
		var input = document.createElement("input");
		input.type = "text";
		input.id = "textValue";
		
		var title = document.createElement("p");
		title.id = "promptTitle";
		
		var des = document.createElement("p");
		des.id = "promptDes";
		
		var myPrompt = document.createElement("div");
		myPrompt.id = "myPrompt";
		
		myPrompt.appendChild(title);
		myPrompt.appendChild(des);
		myPrompt.appendChild(input);
		myPrompt.appendChild(pBtnWrap);
     	document.getElementById("myMask").appendChild(myPrompt);
		
		var $cancel = $("#cancel");
		$cancel.text(btnArray[1]);
		
		var $confirm = $("#confirm");
		$confirm.text(btnArray[0]);
		
		$pBtnWrap = $("#pBtnWrap");
		
		var $promptTitle = $("#promptTitle");
		$promptTitle.text(titleV);
		var $promptDes = $("#promptDes");
		$promptDes.text(desV);
		var $textValue = $("#textValue");
		$textValue.val(value);
		var $myPrompt = $("#myPrompt");
		$myPrompt.bind( "touchmove", function (e) {
			e.preventDefault();
			if(isIos()){
				window.event.returnValue = false; 
			}			
		});
		
		var dWidth = myCommon.wWidth;
		var dHeight = myCommon.wHeight;
		var iWidth = $myPrompt.width();
		var iHeight = $myPrompt.height();
		var diffW = (dWidth - iWidth) / 2;
		var diffH = (dHeight - iHeight) / 2 - 60;

		$myPrompt.css("top", diffH)
				 .css("left", diffW);
		$confirm.on("tap", function() {
			setTimeout(function() {
				$myPrompt.remove();
				myCommon.closeMask();
				var e = {
					index : 0,
					value : $textValue.val()
				};
				if (func) {
					func(e);
				}
			}, 400);
		});
		$cancel.on("tap", function() {
			setTimeout(function() {
				$myPrompt.remove();
				myCommon.closeMask();
		        var e = {index : 1};
				if (func) {
					func(e);
				}
			}, 400);
		});
	},
	//自定义alert
	myAlert : function(desV,titleV,btnArray,func) {
		myCommon.openMask();
		// <div id="myPrompt">
		// 	<p class="prompt-title">titleV</p>
		// 	<p class="prompt-des">desV</p>
		// 	<div class="pBtnWrap">
		// 		<span id="cancel">取消</span>
		// 		<span id="confirm">确定</span>
		// 	</div>
		// </div>
		var confirm = document.createElement("span");
		confirm.id = "alertConfirm";
		
		var pBtnWrap = document.createElement("div");
		pBtnWrap.id = "pBtnWrap";
		pBtnWrap.appendChild(confirm);
		
		var title = document.createElement("p");
		title.id = "promptTitle";
		
		var des = document.createElement("p");
		des.id = "alertDes";
		
		var myPrompt = document.createElement("div");
		myPrompt.id = "myPrompt";
		
		myPrompt.appendChild(title);
		myPrompt.appendChild(des);
		myPrompt.appendChild(pBtnWrap);
		document.getElementById("myMask").appendChild(myPrompt);
		
		var $alertConfirm = $("#alertConfirm");
		$alertConfirm.text(btnArray[0]);
		
		$pBtnWrap = $("#pBtnWrap");
		$pBtnWrap.css("margin-top", "10px");
		
		var $promptTitle = $("#promptTitle");
		$promptTitle.text(titleV);
		var alertDes = $("#alertDes");
		alertDes.text(desV);
		var $myPrompt = $("#myPrompt");
		$myPrompt.bind( "touchmove", function (e) {
			e.preventDefault();
			if(isIos()){
				window.event.returnValue = false; 
			}
		});
		
		var dWidth = myCommon.wWidth;
		var dHeight = myCommon.wHeight;
		var iWidth = $myPrompt.width();
		var iHeight = $myPrompt.height();
		var diffW = (dWidth - iWidth) / 2;
		var diffH = (dHeight - iHeight) / 2 - 30;

		$myPrompt.css("top", diffH)
				 .css("left", diffW);
		$alertConfirm.on("tap", function() {
			setTimeout(function() {
				$myPrompt.remove();
				myCommon.closeMask();
				var e = {index : 0};
				if (func) {
					func(e);
				}
			}, 400);
		});
	},
	//自定义confirm
	myConfirm : function(desV,titleV,btnArray,func) {
		myCommon.openMask();
		// <div id="myPrompt">
		// 	<p class="prompt-title">titleV</p>
		// 	<p class="prompt-des">desV</p>
		// 	<div class="pBtnWrap">
		// 		<span id="cancel">取消</span>
		// 		<span id="confirm">确定</span>
		// 	</div>
		// </div>
		var cancel = document.createElement("span");
		cancel.id = "cancel";
		
		var confirm = document.createElement("span");
		confirm.id = "confirm";
		
		var pBtnWrap = document.createElement("div");
		pBtnWrap.id = "pBtnWrap";
		pBtnWrap.appendChild(cancel);
		pBtnWrap.appendChild(confirm);
		
		var title = document.createElement("p");
		title.id = "confirmTitle";
		
		var des = document.createElement("p");
		des.id = "confirmDes";
		
		var myPrompt = document.createElement("div");
		myPrompt.id = "myPrompt";
		
		myPrompt.appendChild(title);
		myPrompt.appendChild(des);
		myPrompt.appendChild(pBtnWrap);
		document.getElementById("myMask").appendChild(myPrompt);
		
		var $cancel = $("#cancel");
		$cancel.text(btnArray[1]);
		
		var $confirm = $("#confirm");
		$confirm.text(btnArray[0]);
		
		$pBtnWrap = $("#pBtnWrap");
		$pBtnWrap.css("margin-top", "10px");
		
		var $confirmTitle = $("#confirmTitle");
		$confirmTitle.text(titleV);
		var $confirmDes = $("#confirmDes");
		$confirmDes.text(desV);
		var $myPrompt = $("#myPrompt");
		$myPrompt.bind( "touchmove", function (e) {
			e.preventDefault();
			if(isIos()){
				window.event.returnValue = false; 
			}
		});
		
		var dWidth = myCommon.wWidth;
		var dHeight = myCommon.wHeight;
		var iWidth = $myPrompt.width();
		var iHeight = $myPrompt.height();
		var diffW = (dWidth - iWidth) / 2;
		var diffH = (dHeight - iHeight) / 2 - 30;

		$myPrompt.css("top", diffH)
				 .css("left", diffW);
		$confirm.on("tap", function() {
			setTimeout(function() {
				$myPrompt.remove();
				myCommon.closeMask();
				var e = {index : 0};
				if (func) {
					func(e);
				}
			}, 400);
		});
		$cancel.on("tap", function() {
			setTimeout(function() {
				$myPrompt.remove();
				myCommon.closeMask();
		        var e = {index : 1};
				if (func) {
					func(e);
				}
			}, 400);
		});
	}
}
// 长按手势
$.fn.longPress = function(fn, fn2) {
    var timeout = undefined;
    var $this = this;
    for(var i = 0; i < $this.length; i++){
    	var start = '';
    	var end = '';
    	var noMove = true;
        $this[i].addEventListener('touchstart', function(event) {
        	//长按时间超过800ms,则执行传入的方法
        	start = new Date();
        }, false);
        $this[i].addEventListener('touchmove', function(event) {
        	//滑动
        	noMove = false;
        }, false);
        $this[i].addEventListener('touchend', function(event) {
        	//长按时间少于800ms,不会执行传入的方法
        	end = new Date();
        	var diff = end - start;
        	if (diff > 800) {
        		fn(this);
        	} else {
        		if (noMove) {
        			fn2(this);
        		}
        	}
        }, false);
    }
}