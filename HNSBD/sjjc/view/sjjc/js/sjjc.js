var urlParam;
var apiBase, userId, tokenId, jsonId ,projId, apptempjsonId= null;
var formId, formNo, formPage;
var loopIndex;
var readonly = false;
var cacheKey = "_data_sjjc";
var sgjlData = [
		{"formId": "DLFJ_SJSC", "id": "1", "name": "地螺式复检表"},
		{"formId": "DLZJ_SJSC", "id": "2", "name": "地螺式自检表"},
		{"formId": "JCZJ_SJSC", "id": "3", "name": "基础专检记录"},
		{"formId": "ZLJDZJ_SJSC", "id": "4", "name": "组立接地专检表"},
		{"formId": "ZLJDZZJ_SJSC", "id": "5", "name": "组立接地自检表"},
		{"formId": "ZLJDFJ_SJSC", "id": "6", "name": "组立接地复检表"},
		{"formId": "JXZJ_SJSC", "id": "7", "name": "架线自检记录"},
		{"formId": "JXFJ_SJSC", "id": "8", "name": "架线复检记录"},
		{"formId": "JXZHJ_SJSC", "id": "9", "name": "架线专检记录"}];
var formIdArr = ["DLFJ_SJSC","DLZJ_SJSC","JCZJ_SJSC","ZLJDZJ_SJSC","ZLJDZZJ_SJSC","ZLJDFJ_SJSC","JXZJ_SJSC","JXFJ_SJSC","JXZHJ_SJSC"];
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
			//readonly = true;
			getConstructionListDetail(urlParam["jsonId"]);
			//makeFormReadonly();
     	}
//	    else if(urlParam["apptempjsonId"]) {
//			// 获取已存储数据
//			apptempjsonId = urlParam["apptempjsonId"];
//			var resdata = null;
//			getTempjsonList(formIdArr,function(data){
//				$.each(data, function(index,item) {
//					if(apptempjsonId == item["apptempjsonId"]){
//						resdata = item;
//					}
//				});
//				resdata = JSON.parse(resdata["dataJson"]);
//				setFormData(resdata);
//			});
//		}		
	} 
//	if(!apiBase || !userId || !tokenId) {
//		myCommon.myAlert("页面传入参数错误", "提示", ["确定"]);
//		return ;
//	}

	if(readonly ==false && $("input[name = search]").length > 0){
		getConstructionList();
//		getTempjsonList(formIdArr,function(data){
//			createNewList(data)
//		});
		//下拉刷新
		var idv = $("#downrefresh");
		myCommon.dropload(idv,function(){			
			getConstructionList()
		})							
	}
	//跳转到新建页面
	$(".createNew").on("tap", function() {
		window.localStorage.removeItem(cacheKey);
		var nexturl = $(this).attr("hrefData");
		if(!nexturl){
			console.warn("fail, next page url not found")
			return ;
		}				
		var param = {"userId": userId, "tokenId": tokenId, "apiBase": apiBase, "projId":projId};
		if(jsonId) {
			param["jsonId"] = jsonId;
		}
		nexturl += "?param=" + JSON.stringify(param);
		myCommon.loading();
		window.location.href = nexturl;
	});
	
	//塔杆编码获取
    if(readonly == false) {
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
//					console.log("data: " + JSON.stringify(data["data"]));
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
				},
				errorF : function() {
					myCommon.closeLoading();
					muiToast('获取“塔杆编码”信息失败');
				}
			});
			
		}else{
			loadCacheData();
		}
    }
	
	//施工列表获取
    if(readonly == false && $("input[name=sgjl]").length > 0 && !apptempjsonId){
		var sgjl_list = [];
		$.each(sgjlData, function(index, item) {
			sgjl_list.push(item["name"]);
		});
		$("input[name=text_sgjl]").data("options", JSON.stringify(sgjl_list));		
    }
	
	// 获取监理单位
    if(readonly == false && $("input[name=jldw]").length > 0){
		var param = {"userId":userId, "tokenId":tokenId, "projId":projId};
		myCommon.loading();
        myCommon.ajaxGet({
            urlV : apiBase + "/getSpSuppmtList?param="+JSON.stringify(param),
            successF : function(data) {
				myCommon.closeLoading();
                if(data["code"] != "200") {
                    muiToast('获取“监理单位”信息失败');
                    return ;
                }
 //               console.log("data: " + JSON.stringify(data));
                var jldw_list = [];
                $.each(data["data"], function(index, item) {
                    jldw_list.push(item["supplierName"]);
                });
                $("input[name=text_jldw]").data("options", JSON.stringify(jldw_list));
            },
            errorF : function() {
				myCommon.closeLoading();
                muiToast('获取“监理单位”信息失败');
            }
        });
	}
    
	if(readonly == false){
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
		//生成“不符合”原因填写框
		if(formId === "JXZJ_SJSC" || formId === "JXFJ_SJSC"){			
			$(".form-input.mui-row").each(function(index, item){	
				var name = $(item).find("input[type = radio]").prop("name")+"_reason";
				var str = '<div class="noMatch mui-input-row top-line hidden"><textarea name = "'+name+'" rows="4" autofocus="autofocus" placeholder="请输入不符合原因" ></textarea></div>';
				$(item).after(str)						
			})
			$("input[type = radio]").on("click",function(){
				if($(this).val() === "2"){
					$(this).parents(".form-input").next(".noMatch").removeClass("hidden");
				}else{
					$(this).parents(".form-input").next(".noMatch").addClass("hidden");
				}
			})
		}
		
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
	}
	
	$("#btnStepNext").on("tap", function() {
		var nexturl = $("form[id=formTower]").attr("action");
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
		if(jsonId) {
			param["jsonId"] = jsonId;
		}
//		if(apptempjsonId) {
//			param["apptempjsonId"] = apptempjsonId;
//		}
		nexturl += "?param=" + JSON.stringify(param);
		myCommon.loading();
		window.location.href = nexturl;
	});
	
	$("#btnStepPublish").on("tap", function() {
		var formData = getFormData(true);
		if(!formData) {
			return ;
		}
		console.info("formdata: ", JSON.stringify(formData));
		saveConstructionList(formData, function(){		
			myCommon.closeLoading();
			myCommon.myAlert("发布成功", "消息", ["确定"], function(){
				window.localStorage.removeItem(cacheKey);
				var nexturl = "sjjc-towerList.html";				
				var param = {"userId": userId, "tokenId": tokenId, "apiBase": apiBase,"projId":projId};
				nexturl += "?param=" + JSON.stringify(param);		
				window.location.href = nexturl;
			});
		});
	});
	
//	$("#backBtn").on("tap", function() {				
//		if(formPage == "0") {
//			transParam({"action": "close"});
//		} else {
//			if(readonly == false){
//				// 保存当前表单信息
//				getFormData();
//				var chk_data = getCacheDate();
//				var fdata = {};
//				$.each(chk_data, function(page, item) {
//					$.each(item, function(key, value) {
//						if(value != "") {
//							fdata[key] = value;
//						}
//					});
//				});					
//				//saveTempjson(formId ,fdata);		
//			}
//			transParam({"action": "back"});
//		}		
//	});
$("#backBtn").on("tap", function() {				
		if(formPage == "0") {
			transParam({"action": "close"});
		} else {
			if(readonly == false){
				// 保存当前表单信息
				getFormData();
			}
			transParam({"action": "back"});
		}		
	});
	
	$("#cacleBtn").on("tap", function() {
		var nexturl = "sjjc-towerList.html";				
		var param = {"userId": userId, "tokenId": tokenId, "apiBase": apiBase,"projId":projId};
		nexturl += "?param=" + JSON.stringify(param);
		if(readonly == false){
			mui.confirm('确定放弃本次编辑？','提示',['取消','确认'],function (e) {
				if(e.index){
					myCommon.loading();
					window.location.href = nexturl;
				}
			},'div')
		}else{
			window.location.href = nexturl;
		}
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
	if(text != "")
	{
		while(true)
		{
			if(text != "" && !text.match(regex))
			{
				text = text.substr(0, text.length-1);
			}
			else
			{
				break;
			}
		}
	}
	return text;
}

function getFormData(isPublish, requiredBreak){
	if(typeof(isPublish) == "undefined"){ isPublish = false; }
	var fdata = {};
	$(".mui-input-row input, .mui-row input, .mui-input-row textarea").each(function(index, item) {
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

function setFormData(data,isPushed){
	$.each(data, function(name, value) {
		if(value) {
			var obj = $("input[name='"+name+"'], textarea[name = '"+name+"']");
			if(obj) {
				var name = obj.attr("name");
				var type = obj.attr("type");
				if(type == "radio") {
					$("input[type='radio'][name='"+name+"'][value='"+value+"']").attr("checked", true);
				}else{
					obj.parent().removeClass("hidden");
					obj.val(value);
				}
				if(isPushed)
				obj.attr("disabled",true)
			}
		}
	});
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
		setFormData(chk_data[formPage]);		
	}
}
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
		dumpurl = "sjjc-" + fId + "-1.html?param=" + JSON.stringify(param);
		window.location.replace(dumpurl);
	}
}

// 获取施工记录，施工班组等信息
function getRecordByTwoerNumber(towerNumber){
	var param = {"userId":userId, "formId":formId, "towerNumber": towerNumber, "tokenId":tokenId,"projId":projId};
//	console.log(param)
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
			setFormData(data["data"]);
			//调取未保存表单数据
			//loadCacheData();
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
	if(jsonId){
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
//施工列表获取
function getConstructionList(){
	var param = {"userId":userId, "tokenId":tokenId, "projId":projId, "formId":formIdArr};
	myCommon.loading();
	myCommon.ajaxGet({
		urlV : apiBase + "/getConstructionList?param="+JSON.stringify(param),
		successF : function(data) {
			myCommon.closeLoading();
			if(data["code"] != "200") {
				muiToast('获取列表信息失败');
				return ;
			}
//			console.log("data: " + JSON.stringify(data["data"]));
			if(data["data"]){
				var listData = "";
				$.each(data["data"], function(index,item) {
					listData +='<li class="mui-table-view-cell towerli"><a jsonId = '
									+item["jsonId"]+' formId = '+item["formId"]
									+' class="mui-navigate-right"><div class = "tower_number">杆塔编码　<span>'
									+item["gtbm"]+'</span></div><div class = "sgjl">'
									+item["bgmc"]+'</div><div class = "jcr">检查者　<span>'
									+item["jcr"]+'</span></div><div class = "jcrq">检查日期　<span>'
									+item["checkDate"]+'</span></div></a></li>';					
				});
				$("#towerComplete").html(listData);				
				//跳转到详情
				$("#towerComplete .towerli a").on("tap",function(){
					window.localStorage.removeItem(cacheKey);
					var fId = null;
					var formId = $(this).attr("formId");
					$.each(sgjlData, function(index, item) {
						if(item["formId"] == formId ) {
							fId = item["id"];
						}
					});
					var jsonId = $(this).attr("jsonId");		
					var param = {"userId": userId, "tokenId": tokenId, "apiBase": apiBase, "projId":projId};
					if(jsonId) {
						param["jsonId"] = jsonId;
					}
					var dumpurl = "sjjc-" + fId + "-1.html?param=" + JSON.stringify(param);
					myCommon.loading();
					window.location.href = dumpurl;							
				})
				//搜索功能没有接口，暂不开发 。(可参考jdgl)						
			}
		},
		errorF : function() {
			myCommon.closeLoading();
			muiToast('获取“塔杆编码”信息失败');
		}
	})
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
			
			setFormData(data["data"],true);
			
		},
		errorF : function() {
			myCommon.closeLoading();
			muiToast('获取信息失败');
		}
	});
}
