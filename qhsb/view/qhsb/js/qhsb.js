var urlParam;
var apiBase, userId, tokenId, jsonId ,projId= null;
var formId, formNo, formPage;
var readonly = false;
var isPushed = false;
var cacheKey = "_data_qhsb";
$(document).ready(function() {
	// MUI框架初始化
	mui.init();
	// MUI按钮点击显示加载中
	mui(document.body).on('tap', '.mui-btn', function(e) {
		mui(this).button('loading');
		setTimeout(function() {
			mui(this).button('reset');
		}.bind(this), 3000);
	});
	
	formId = $("form[id=qhsb]").data("code");
	formNo = $("form[id=qhsb]").data("id");
	formPage = $("form[id=qhsb]").data("page");
	
	urlParam = myCommon.getParam();
	if (urlParam) {
		apiBase = urlParam["apiBase"];
		userId = urlParam["userId"];
		tokenId = urlParam["tokenId"];
		projId = urlParam["projId"];
	} 
	if(!apiBase || !userId || !tokenId) {
		myCommon.myAlert("页面传入参数错误", "提示", ["确定"]);
		return ;
	}	
	//选择的塔杆编号及塔型
	var localData = localStorage.getItem(cacheKey);
	console.info(`缓存的数据:${localData}`)
	if(localData){
		//塔杆编号
		$(".listTitleFirst span[name = towerNo]").html(JSON.parse(localData)["1"]["towerNo"]);
		//塔型
		$(".listTitleFirst span[name = towerType]").html(JSON.parse(localData)["1"]["towerType"]);
	}
	//提出时间
	var Time = new Date(),
		Year = Time.getFullYear(),
		Month = Time.getMonth()+1,
		Day = Time.getDate();				
	$(".listTitleSecond input[name = tcsj]").val(`${Year}-${Month}-${Day}`)
	//页面数据获取
    if(readonly == false) {
		var param = {"userId":userId, "tokenId":tokenId, "projId":projId};
		myCommon.loading();
		myCommon.ajaxGet({
			urlV : apiBase + "/goodsoutReportView?param="+JSON.stringify(param),
			successF : function(data) {
				myCommon.closeLoading();
				if(data["code"] != "200") {
					muiToast('获取“缺货上报”信息失败');
					return ;
				}
//				console.log("data: " + JSON.stringify(data["data"]));				
				//塔杆编码
				if($("input[name='text_towerNo']").length > 0 && typeof(data["data"]["towerList"]) == "object") {
					var tower_number_list = [];
					$.each(data["data"]["towerList"], function(index, item) {
						tower_number_list.push([item["tower_number"],item["tower_type"],item["tower_company"]]);
					});
					$("input[name=text_towerNo]").data("options", JSON.stringify(tower_number_list));
				}
				//分部工程
				if($("input[name=text_fbgc]").length > 0 && typeof(data["data"]["fbgc"]) == "object") {	
					var fbgc_list = [];
					$.each(data["data"]["fbgc"], function(index, item) {
						fbgc_list.push(item);
					});
					$("input[name=text_fbgc]").data("options", JSON.stringify(fbgc_list));
				}
				//物质类型
				if($("input[name=text_wzlx]").length > 0 && localData) {	
					var fbgc = JSON.parse(localData)["1"]["fbgc"];
					var wzlx = (fbgc === "基础" ? "jcwzlx" : (fbgc === "架线" ? "jxwzlx" : "ztwzlx" ));
					var wzlx_list = [];
					$.each(data["data"][wzlx], function(index, item) {
						if(wzlx !== "ztwzlx"){
							wzlx_list.push(item["enumvalue"]);
							return ;
						}
						wzlx_list.push(item);
					});
					$("input[name=text_wzlx]").data("options", JSON.stringify(wzlx_list));
				}
				//提出班组
				$(".listTitleSecond input[name = tcbz]").val(data["data"]["tcbz"]["team_name"])
			},
			errorF : function() {
				myCommon.closeLoading();
				muiToast('获取“塔杆编码”信息失败');
			}
		});
    }
	
	if(readonly == false){
		//日期选择
		var datePicker = null, timePicker = null; 
		$(".mui-input-group input[type=text][format=date]").off("tap").on("tap", function() {
			datePicker = datePicker || new mui.DtPicker({"type":"date","beginYear":2000} ); 
			var self = $(this);
			datePicker.show(function (selectItems) {
				var dateVal = selectItems.y.value + "-" + selectItems.m.value + "-" + selectItems.d.value;
//				console.log("date: " + dateVal);
				self.val(dateVal);
			});
		});
		//时间选择
		$(".mui-input-group input[type=text][format=time]").off("tap").on("tap", function() {
			timePicker = timePicker || new mui.DtPicker({"type":"time"} );
			var self = $(this);
			timePicker.show(function (selectItems) {
				var timeVal = selectItems.h.value + ":" + selectItems.i.value + ":00";
//				console.log("time: " + timeVal);
				self.val(timeVal);
			});
		});
		// 选择列表
		$(".form-select > input[type=text][format=options]").off("tap").on("tap", function() {
			var self = $(this);
			var options = self.data("options");
			if(!options){
				console.warn("options null")
				return ;
			}
			if(typeof(options) == "string") {
				options = JSON.parse(options);
			}
			if(options.length < 1) {
				console.warn("options empty")
				return ;
			}
			var itemLists = [];
			$.each(options, function(index, item) {
				if (typeof(item) == "object"){
					itemLists.push({"text": item[0], "value": item[1],"tower_company":item[2]});
				}else{
					itemLists.push({"text": item, "value": item});
				}
			});
			var picker = new mui.PopPicker();
			picker.setData(itemLists);
			picker.show(function(selectedItem) {
				var realName = self.attr("name").substr(5);
				var selectVal = selectedItem[0]['value'];
				var selectText = selectedItem[0]['text'];
				var select_towerCompany = selectedItem[0]['tower_company'];
//				console.log("object selected, name: " + realName + ", text: "+ selectText + ", value: " + selectVal);
				self.val(selectText);
				$("input[name="+realName+"]").val(selectText);
				if(realName === "towerNo"){
					$("input[name = towerType]").val(selectVal);
					$("input[name = tower_company]").val(select_towerCompany);
				}
				if(realName === "wzlx"){
					makeFormReadonlyFalse();
					isPushed = false;
				}
				
			});
		});
	}
	$("#btnStepNext").on("tap", function() {
		var nexturl = $("form[id=qhsb]").attr("action");
		if(!nexturl){
			console.warn("fail, next page url not found")
			return ;
		}
		
		if(readonly == false) {
			// 验证表单
			var formData = getFormData();
			if(!formData) {
				return ;
			}
		}
		var param = {"userId": userId, "tokenId": tokenId, "apiBase": apiBase,"projId":projId};
		nexturl += "?param=" + JSON.stringify(param);
		myCommon.loading();
		window.location.href = nexturl;
	});
	
	$("#btnStepPublish").on("tap", function() {	
		var formData = getFormData(true);
		if(!formData) {
			return ;
		}
		formData["userId"] = userId;
		formData["projId"] = projId;
		formData["tokenId"] = tokenId;
		console.info("formdata: ", JSON.stringify(formData));
		goodsoutReport(formData, function(){
			myCommon.closeLoading();
			myCommon.myAlert("发布成功", "消息", ["确定"], function(){
				isPushed = true;
				makeFormReadonly();
			});
		});					
		return false;
	});
	
	$("#backBtn").on("tap", function() {				
		if(formPage == "1") {
			localStorage.removeItem(cacheKey);
			transParam({"action": "close"});
		} else {
			//getFormData(false);
			transParam({"action": "back"});
		}		
	});
	
	$("#cacleBtn").on("tap", function() {
		var mes = "";
		if(!isPushed){
			mes = "确定放弃本次缺货上报？"
		}else{
			mes = "确定返回工作台？"
		}		
		mui.confirm(mes,'提示',['取消','确认'],function (e) {
			if(e.index){
				myCommon.loading();
				localStorage.removeItem(cacheKey);
				transParam({"action": "close"});
			}
		},'div')
	});
});

function getFormData(isPublish){
	if(typeof(isPublish) == "undefined"){ isPublish = false; }
	var fdata = {};
	$(".mui-input-row input, .mui-row input").each(function(index, item) {
		var self = $(item);
		var name = self.attr("name");
		var type = self.attr("type");
		if(name) {
			if(type == "radio") {
				fdata[name] = $("input[type='radio'][name='"+name+"']:checked").val();
			}else{
				fdata[name] = self.val();
			}
//			//清除这个空值
//			if(fdata[name] == "") {
//				delete fdata[name];
//			}
		}
	});	
//	console.log(JSON.stringify(fdata));
	
	var chk_data = getCacheDate();
	if(isPublish){
		//console.log("cookie data: " + JSON.stringify(chk_data));			
		// 混合当前表单和COOKIE数据
		$.each(chk_data, function(page, item) {
			$.each(item, function(key, value) {
				if(value != "") {
					fdata[key] = value;
				}
			});
		});
		return fdata;			
	} else {
		// 判断操作，下一步保存数据
		chk_data[formPage] = fdata; 
		chk_data["1"]["formId"] = formId;
		window.localStorage.setItem(cacheKey, JSON.stringify(chk_data));
		return true;
	}
}

function getCacheDate(){
	var chk_data = {};
	var chk_content = window.localStorage.getItem(cacheKey);
	if(chk_content != null && chk_content != "") {
		try {
			chk_data = JSON.parse(chk_content);
		}catch(error){
			chk_data = {};
		}
	}
	if(chk_data["1"] && chk_data["1"]["formId"] == formId) {
		//PASS
	} else {
		chk_data = {};
	}
	return chk_data;
}

function makeFormReadonly(){
	$("#btnStepPublish").attr("disabled", true);
	$(".mui-input-row input, .mui-row input").attr("readonly", true);
}
function makeFormReadonlyFalse(){
	$("#btnStepPublish").removeAttr("disabled");
	$(".mui-input-row input, .mui-row input").removeAttr("readonly");
}
// 保存数据
function goodsoutReport(data, callback){
	myCommon.loading();
	myCommon.ajaxPost({
		urlV : apiBase + "/goodsoutReport",
		data: data,
		successF : function(data) {
			myCommon.closeLoading();
//			console.log("data: " + JSON.stringify(data));
			if(data["code"] != "200") {
				muiToast('发布信息失败');
			} else if(typeof(callback) == "function") {
				callback();
			}
		},
		errorF : function() {
			myCommon.closeLoading();
			muiToast('发布信息失败');
		}
	});
}
//function setFormData(data){
//	$.each(data, function(name, value) {
//		if(value) {
//			var obj = $("input[name='"+name+"']");
//			if(obj) {
//				var name = obj.attr("name");
//				var type = obj.attr("type");
//				if(type == "radio") {
//					$("input[type='radio'][name='"+name+"'][value='"+value+"']").attr("checked", true);
//				}else{
//					obj.val(value);
//				}
//			}
//		}
//	});
//}
//function loadCacheData() {
//	var chk_data = getCacheDate();
//	if(chk_data && chk_data[formPage]) {
//		// 塔杆编码不可覆盖
//		if($("input[name='text_tower_number']").length > 0 && $("input[name='text_tower_number']").val() != "") {
//			//清除掉塔杆编码
//			delete chk_data[formPage]["text_tower_number"];
//			delete chk_data[formPage]["tower_number"];
//		}
//		
//		if(loopIndex < 0) {
//			setFormData(chk_data[formPage]);
//		}
//		return true;
//	}
//	return false;
//}
//function inputFilter(text, regex){
//	if(text != ""){
//		while(true){
//			if(text != "" && !text.match(regex)){
//				text = text.substr(0, text.length-1);
//			}
//			else{
//				break;
//			}
//		}
//	}
//	return text;
//}
//function setEmptyInputRed(object, action) {
//	
//	var target = null;
//	if(object.parent().prev().hasClass("form-sub-title")
//		|| object.parent().prev().hasClass("form-title")) {
//		target = object.parent().prev();
//	} else if(object.parent().parent().parent().hasClass("form-grid")
//		|| object.parent().parent().parent().parent().hasClass("form-grid")) {
//		if(object.prev().is("label")) {
//			target = object.prev();
//		}else if(object.parent().parent().prev().find("label").length > 0) {
//			target = object.parent().parent().prev().find("label");
//		}else if(object.parent().parent().prev().hasClass("form-left-label")) {
//			target = object.parent().parent().prev();
//		}else if(object.parent().parent().prev().find(".form-left-label").length > 0) {
//			target = object.parent().parent().prev().find(".form-left-label");
//		}
//	}
//	if(target) {
//		if(action == "add") {
//			if(! target.hasClass("red")) {
//				target.addClass("red");
//			}
//		}else{
//			target.removeClass("red");
//		}
//	}
//}