var urlParam;
var apiBase, userId, tokenId, jsonId ,projId= null;
var formId, formNo, formPage;
var loopIndex;
var cacheKey = "_data_jsjl";
var sgjlData = [
		{"formId": "JCJL_GUZJ", "id": "1", "name": "灌注桩评级"},
		{"formId": "JCJL_YBCTLL", "id": "2", "name": "承台/连梁签证"},
		{"formId": "JCJL_YBCM", "id": "3", "name": "基础拆模"},
		{"formId": "JCJL_YBJZ", "id": "4", "name": "基础浇制"},
		{"formId": "JCJL_JQZM", "id": "5", "name": "基础支模"},
		{"formId": "JCJL_XJ", "id": "6", "name": "灌注桩3-1"},
		{"formId": "JCJL_FKKW", "id": "7", "name": "普通基础分坑"},
		{"formId": "JCJL_YBGZZQ", "id": "8", "name": "灌注桩签证"}];

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
	
	formId = $("form[id=formTower]").data("code");
	formNo = $("form[id=formTower]").data("id");
	formPage = $("form[id=formTower]").data("page");
	loopIndex = $("form[id=formTower]").data("loop-id");
	loopIndex = parseInt(loopIndex);
	
	urlParam = myCommon.getParam();
	if (urlParam) {
		apiBase = urlParam["apiBase"];
		userId = urlParam["userId"];
		tokenId = urlParam["tokenId"];
		projId = urlParam["projId"];
		
		if(urlParam["jsonId"]) {
			// 获取已存储数据
			jsonId = urlParam["jsonId"];
			getConstructionListDetail(urlParam["jsonId"]);
		}
	}
//	if(!apiBase || !userId || !tokenId) {
//		myCommon.myAlert("页面传入参数错误", "提示", ["确定"]);
//		return ;
//	}
	
	//塔杆编码获取
    if($("input[name=tower_number]").length > 0) {
		var param = {"userId":userId, "tokenId":tokenId, "projId":projId};
		myCommon.loading();
		myCommon.ajaxGet({
			urlV : apiBase + "/getTowerNumber?param="+JSON.stringify(param),
			successF : function(data) {
				myCommon.closeLoading();
				if(data["code"] != "200") {
					muiToast('获取“塔杆编码”信息失败');
					return ;
				}
//				console.log("data: " + JSON.stringify(data["data"]));
				// 独立数组转换
				if(typeof(data["data"]) == "object" && (data["data"] instanceof Array) && data["data"].length > 0) {
					data["data"] = data["data"][0];
				}
				
				//塔杆编码
				if($("input[name='text_tower_number']").length > 0 && typeof(data["data"]["tower_number"]) == "object") {
					var tower_number_list = [];
					$.each(data["data"]["tower_number"], function(index, item) {
						tower_number_list.push(item);
					});
					$("input[name=text_tower_number]").data("options", JSON.stringify(tower_number_list));
				}
				//施工班组
				if($("input[name=text_banzu]").length > 0 && typeof(data["data"]["banzu"]) == "object") {	
					var banzu_list = [];
					$.each(data["data"]["banzu"], function(index, item) {
						banzu_list.push(item);
					});
					$("input[name=text_banzu]").data("options", JSON.stringify(banzu_list));
					if(banzu_list.length > 0) {
						$("input[name=text_banzu]").val(banzu_list[0]);
						$("input[name=banzu]").val(banzu_list[0]);
					}
				}
				
				// URL传入塔杆编码, 自动选中
				if(urlParam && urlParam["towerNumber"]) {
					// 获取默认数据(只有第一页有默认值，下面都没有)
					$("input[name=text_tower_number]").val(urlParam["towerNumber"]);
					$("input[name=tower_number]").val(urlParam["towerNumber"]);
					getRecordByTwoerNumber(urlParam["towerNumber"]);
				} 
//				else{
//					//调取未保存表单数据
//					loadCacheData();
//				}
			},
			errorF : function() {
				myCommon.closeLoading();
				muiToast('获取“塔杆编码”信息失败');
			}
		});
		
	} else {
		//调取未保存表单数据
		loadCacheData();
	}

	//施工列表获取
    if($("input[name=sgjl]").length > 0){
		var sgjl_list = [];
		$.each(sgjlData, function(index, item) {
			sgjl_list.push(item["name"]);
		});
		$("input[name=text_sgjl]").data("options", JSON.stringify(sgjl_list));
    }
	
	//if(readonly == false){
		$("form input[type='text']").off("tap").on("input propertychange", function() {
			var self = $(this);
			//self.val() != "" && setEmptyInputRed(self, "remove");
		});
		
		// 限制文本输入框内容
		$("form input[type='decimal']").off("tap").on("input propertychange", function() {
			var self = $(this);
			//self.val() != "" && setEmptyInputRed(self, "remove");
			self.val(inputFilter(self.val(), /^(\-)?(\d{1,16}(\.\d{0,2})?)?$/));
		});
		
		$("form input[type='uint']").off("tap").on("input propertychange", function() {
			var self = $(this);
			//self.val() != "" && setEmptyInputRed(self, "remove");
			self.val(inputFilter(self.val(), /^\d{1,10}$/));
		});
		
		$("form input[type='int']").off("tap").on("input propertychange", function() {
			var self = $(this);
			//self.val() != "" && setEmptyInputRed(self, "remove");
			self.val(inputFilter(self.val(), /^\-?\d{0,10}$/));
		});
		
		//日期选择
		var datePicker = null, timePicker = null; 
		$(".mui-input-group input[type=text][format=date]").off("tap").on("tap", function() {
			datePicker = datePicker || new mui.DtPicker({"type":"date","beginYear":2000} ); 
			var self = $(this);
			datePicker.show(function (selectItems) {
				//setEmptyInputRed(self, "remove");
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
				//setEmptyInputRed(self, "remove");
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
					itemLists.push({"text": item[1], "value": item[0]});
				}else{
					itemLists.push({"text": item, "value": item});
				}
			});
			var picker = new mui.PopPicker();
			picker.setData(itemLists);
			picker.show(function(selectedItem) {
				//setEmptyInputRed(self, "remove");
				var realName = self.attr("name").substr(5);
				var selectVal = selectedItem[0]['value'];
				var selectText = selectedItem[0]['text'];
//				console.log("object selected, name: " + realName + ", text: "+ selectText + ", value: " + selectVal);
				self.val(selectText);
				$("input[name="+realName+"]").val(selectVal);
				//塔杆编码被选择
				if(realName == "tower_number") {
					getRecordByTwoerNumber(selectVal);
				}else if(realName == "sgjl") {
					// 根据表单类型，页面跳转
					pageDumpByFormType(selectVal);
				}
			});
		});
	//}
	
	$("#btnStepNext").on("tap", function() {
		var nexturl = $("form[id=formTower]").attr("action");
		if(!nexturl){
			console.warn("fail, next page url not found")
			return ;
		}
		
		//if(readonly == false) {
			// 验证表单
			var formData = getFormData();
			if(!formData) {
				return ;
			}
		//}
		var param = {"userId": userId, "tokenId": tokenId, "apiBase": apiBase,"projId":projId};
		if(jsonId) {
			param["jsonId"] = jsonId;
		}
		nexturl += "?param=" + JSON.stringify(param);
		myCommon.loading();
		window.location.href = nexturl;
	});
	
	$("#btnStepPublish").on("tap", function() {
		var formData = getFormData(true);
		if(!formData) {
			return ;
		}
		//console.info("formdata: ", JSON.stringify(formData));
		saveConstructionList(formData, function(){
			myCommon.closeLoading();
			myCommon.myAlert("发布成功", "消息", ["确定"], function(){
				transParam({"action": "refresh"});
			});
		});
		return false;
	});
	
	$("#backBtn").on("tap", function() {
		// 保存当前表单信息
		getFormData();
		//window.history.back();
		if(formPage == "1") {
			window.localStorage.removeItem(cacheKey);
			transParam({"action": "close"});
		} else {
			transParam({"action": "back"});
		}
	});
	$("#cacleBtn").on("tap", function() {
		mui.confirm('是否放弃本次编辑？','提示',['取消','确认'],function (e) {
			if(e.index){
				window.localStorage.removeItem(cacheKey);
				transParam({"action": "close"});
			}
		},'div')
	});
	// 自动选中施工记录
	$.each(sgjlData, function(index, item) {
		if(item["id"] == formNo) {
			$("input[name=text_sgjl]").val(item["name"]);
			$("input[name=sgjl]").val(item["name"]);
		}
	})
});

function inputFilter(text, regex){
	if(text != ""){
		while(true){
			if(text != "" && !text.match(regex)){
				text = text.substr(0, text.length-1);
			}else{
				break;
			}
		}
	}
	return text;
}

function getFormData(isPublish, requiredBreak){
	if(typeof(isPublish) == "undefined"){
		isPublish = false;
	}
	if(typeof(requiredBreak) == "undefined") {
		requiredBreak = true;
	}
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
			//清除这个空值
			if(fdata[name] == "") {
				delete fdata[name];
			}
		}
	});
	
//	console.log(JSON.stringify(fdata));
	
	
	if(requiredBreak != false) {
		var chk_data = getCacheDate();
		if(isPublish){
			//console.log("cookie data: " + JSON.stringify(chk_data));
			if(loopIndex < 0){
				// 混合当前表单和COOKIE数据
				$.each(chk_data, function(page, item) {
					$.each(item, function(key, value) {
						if(value != "") {
							fdata[key] = value;
						}
					});
				});
				window.localStorage.removeItem(cacheKey);
				return fdata;
			}else{
				//多次拆管处理
				var ldata = {}
				$.each(chk_data, function(page, item) {
					$.each(item, function(key, value) {
						if(value != "") {
							ldata[key] = value;
						}
					});
				});
				if(typeof(ldata["_s_data"]) == "undefined") {
					ldata["_s_data"] = [];
				}
				ldata["_s_data"][loopIndex] = fdata;
				window.localStorage.removeItem(cacheKey);
				return ldata;
			}
			
		}else{
			// 判断操作，下一步保存数据
			if(loopIndex < 0) {
				chk_data[formPage] = fdata;
			} else {
				if(loopIndex == 0) {
					chk_data[formPage] = {"_s_data" : []};
				}
				chk_data[formPage]["_s_data"][loopIndex] = fdata;
			}
			chk_data["1"]["formId"] = formId;
			window.localStorage.setItem(cacheKey, JSON.stringify(chk_data));
			return true;
		}
	} else {
		return null;
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

function loadCacheData() {
	var chk_data = getCacheDate();
	if(chk_data && chk_data[formPage]) {
		// 塔杆编码不可覆盖
		if($("input[name='text_tower_number']").length > 0 && $("input[name='text_tower_number']").val() != "") {
			//清除掉塔杆编码
			delete chk_data[formPage]["text_tower_number"];
			delete chk_data[formPage]["tower_number"];
		}
		
		if(loopIndex < 0) {
			setFormData(chk_data[formPage]);
		}else if(chk_data[formPage]["_s_data"] && chk_data[formPage]["_s_data"][loopIndex]) {
			setFormData(chk_data[formPage]["_s_data"][loopIndex]);
		}
		return true;
	}
	return false;
}


function setFormData(data,isPushed){
	$.each(data, function(name, value) {
		if(value) {
			var obj = $("input[name='"+name+"']");
			if(obj) {
				var name = obj.attr("name");
				var type = obj.attr("type");
				if(type == "radio") {
					$("input[type='radio'][name='"+name+"'][value='"+value+"']").attr("checked", true);
				}else{
					obj.val(value);
				}
				if(isPushed){
					obj.attr("disabled",true)
				}
			}
		}
	});
}

//function makeFormReadonly(){
//	$("#btnStepPublish").attr("disabled", true);
//	$(".mui-input-row input, .mui-row input").attr("readonly", true);
//}

function pageDumpByFormType(typeName){
	var fId = null;
	$.each(sgjlData, function(index, item) {
		if(item["name"] == typeName) {
			fId = item["id"];
		}
	});
	if(fId != null && fId != formNo) {
		var param = {"userId": userId, "tokenId": tokenId, "apiBase": apiBase,"projId":projId};
		var towerNumber = $("input[name=tower_number]").val();
		if(towerNumber != "") {
			param["towerNumber"] = towerNumber;
		}
		dumpurl = "form-" + fId + "-1.html?param=" + JSON.stringify(param);
		window.location.replace(dumpurl);
	}
}

// 获取施工记录，施工班组、监理单位等信息
function getRecordByTwoerNumber(towerNumber){
	var param = {"userId":userId, "formId":formId, "towerNumber": towerNumber, "tokenId":tokenId,"projId":projId};
	myCommon.loading();
	myCommon.ajaxGet({
		urlV : apiBase + "/getRecordByTwoerNumber1?param="+JSON.stringify(param),
		successF : function(data) {
			myCommon.closeLoading();
			if(data["code"] != "200") {
				muiToast('获取“根据塔杆编码获取默认值记录”信息失败');
				return ;
			}
//			console.log("data: " + JSON.stringify(data));
			if(typeof(data["data"]["banzu"]) != "undefined") {
				delete data["data"]["banzu"];
			}
			
			// 获取监理单位	
			var total_text_jianli = $("input[name=text_jldw], input[name=text_jianli]");
			var total_jianli = $("input[name=jldw], input[name=jianli]");
			if(total_text_jianli) {	
				var jldw_list = [];
				$.each(data["data"]["JLDW"], function(index, item) {
					jldw_list.push(item["supplier_name"]);
				});
				total_text_jianli.data("options", JSON.stringify(jldw_list));
				if(jldw_list.length > 0) {
					total_text_jianli.val(jldw_list[0]);
					total_jianli.val(jldw_list[0]);
				}
			}
				
			setFormData(data["data"],true);
//			//调取未保存表单数据
//			loadCacheData();
		},
		errorF : function() {
			myCommon.closeLoading();
			muiToast('获取“根据塔杆编码获取默认值记录”信息失败');
		}
	});
}

// 保存数据
function saveConstructionList(data, callback){
	data["formId"] = formId;
	var data = {"userId":userId, "tokenId":tokenId, "data": data,"projId":projId};
	if(jsonId) {
		data["jsonId"] = jsonId;
	}
	myCommon.loading();
	myCommon.ajaxPost({
		urlV : apiBase + "/saveConstructionList",
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

function getConstructionListDetail(jsonId){
	var param = {"userId":userId, "jsonId":jsonId, "tokenId":tokenId,"projId":projId};
	myCommon.loading();
	myCommon.ajaxGet({
		urlV : apiBase + "/getConstructionListDetail?param="+JSON.stringify(param),
		successF : function(data) {
			myCommon.closeLoading();
			if(data["code"] != "200") {
				muiToast('获取信息失败');
				return ;
			}
//			console.log("data: " + JSON.stringify(data));
			if(typeof(data["data"]) == "string"){
				data["data"] = JSON.parse(data["data"]);
			}
			if(loopIndex < 0){
				setFormData(data["data"],true);
			}
			else{
				setFormData(data["data"]["_s_data"][loopIndex],true);
				//下一步是否可用
//				if(loopIndex == data["data"]["_s_data"].length - 1) {
//					$("#btnStepNext").attr("disabled", true);
//				}
			}
		},
		errorF : function() {
			myCommon.closeLoading();
			muiToast('获取信息失败');
		}
	});
}
