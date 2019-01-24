var urlParam;
var apiBase, userId, tokenId, jsonId, projId = null;
var formId, formNo, formPage;
var loopIndex;
var cacheKey = "_data_GGTPJ_XJ";

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
//	loopIndex = $("form[id=formTower]").data("loop-id");
//	loopIndex = parseInt(loopIndex);
	
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
	}
	if(!apiBase || !userId || !tokenId || !projId) {
		myCommon.myAlert("页面传入参数错误", "提示", ["确定"]);
		return ;
	}

	if($("input[name = search]").length > 0){
		getConstructionList();					
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
		if(!nexturl)
		{
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
					console.log("data: " + JSON.stringify(data["data"]));
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
//						if(banzu_list.length > 0) {
//							$("input[name=text_banzu]").val(banzu_list[0]);
//							$("input[name=banzu]").val(banzu_list[0]);
//						}
					}
					
					// URL传入塔杆编码, 自动选中
					if(urlParam && urlParam["towerNumber"]) {
						// 获取默认数据(只有第一页有默认值，下面都没有)
						$("input[name=text_tower_number]").val(urlParam["towerNumber"]);
						$("input[name=tower_number]").val(urlParam["towerNumber"]);
						getRecordByTwoerNumber(urlParam["towerNumber"]);
					}
//					else{
//						//调取未保存表单数据
//						loadCacheData();
//					}
				},
				errorF : function() {
					myCommon.closeLoading();
					muiToast('获取“塔杆编码”信息失败');
				}
			});
			
		} 
		else {
			//调取未保存表单数据
			loadCacheData();
		}
		
   if($("input[name ='wanqu']")){
		//调取未保存表单数据
		//loadCacheData();
	   //直线塔结构倾斜
		if($("input[name='qingxies'][type = radio]").length > 0 ) {
			var qingxie_list = [0.12,0.15,0.2,0.24];	
			$("input[name = qingxie][type = text]").data("options", JSON.stringify(qingxie_list))						
		}
		//节点间主材弯曲
		var wanqu_list = [];
		wanqu_list.push(750);
		$("input[name=text_wanqu]").data("options", JSON.stringify(wanqu_list));		
   }

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
				console.log("date: " + dateVal);
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
				console.log("time: " + timeVal);
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
				if (typeof(item) == "object")
				{
					itemLists.push({"text": item[1], "value": item[0]});
				}
				else
				{
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
				console.log("object selected, name: " + realName + ", text: "+ selectText + ", value: " + selectVal);
				self.val(selectText);
				$("input[name="+realName+"]").val(selectText);
				//塔杆编码被选择
				if(realName == "tower_number") {
					getRecordByTwoerNumber(selectVal);
				}
			});
		});
	
	$("#btnStepNext").on("tap", function() {
		var nexturl = $("form[id=formTower]").attr("action");
		if(!nexturl){
			console.warn("fail, next page url not found")
			return ;
		}		
	 	var formData = getFormData();	
	 	console.log(formData)
		var towerNumber = $("input[name= 'tower_number']").val();	
		var param = {"towerNumber":towerNumber, "userId": userId, "tokenId": tokenId, "apiBase": apiBase, "projId":projId};
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
		console.info("formdata2: ", JSON.stringify(formData));
		saveConstructionList(formData, function(){
			var nexturl = $("#cacleBtn").attr("hrefData");
			myCommon.closeLoading();
			myCommon.myAlert("发布成功", "消息", ["确定"], function(){
				var param = {"userId": userId, "tokenId": tokenId, "apiBase": apiBase, "projId":projId, "formId":[formId]};
//				if(jsonId) {
//					param["jsonId"] = jsonId;
//				}
				nexturl += "?param=" + JSON.stringify(param);
				myCommon.loading();
				window.location.href = nexturl;
			});
		});
	});
	
	$("#backBtn").on("tap", function() {				
		if(formPage == "p0") {
			transParam({"action": "close"});
		} else {			
			// 保存当前表单信息
			getFormData();		
			transParam({"action": "back"});
		}		
	});
	
	$("#cacleBtn").on("tap", function() {
		var nexturl = $(this).attr("hrefData");		
		mui.confirm('是否放弃本次铁管塔评级','提示',['取消','确认'],function (e) {
			if(e.index){
				var param = {"userId": userId, "tokenId": tokenId, "apiBase": apiBase, "projId":projId, "formId":[formId]};
//					if(jsonId) {
//						param["jsonId"] = jsonId;
//					}
				nexturl += "?param=" + JSON.stringify(param);
				myCommon.loading();
				window.location.href = nexturl;
			}
		},'div')
		
	});
	
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


function getFormData(isPublish){
	if(typeof(isPublish) == "undefined"){  
		isPublish = false;
	}
	//if(typeof(requiredBreak) == "undefined") { requiredBreak = true;}
	var fdata = {};
	$(".mui-input-row input, .mui-row input").each(function(index, item) {
		var self = $(item);
		var name = self.attr("name");
		var type = self.attr("type");
		if(name) {
			if(type == "radio") {
				name = $("input[type='radio']:checked").attr("name");
				fdata[name] = $("input[type='radio']:checked").attr("typeName");
			}else{
				fdata[name] = self.val();
			}
			//清除这个空值
			if(fdata[name] == "") {
				delete fdata[name];
			}
		}
	});
	
	console.log(JSON.stringify(fdata));
	//if(requiredBreak == true) {
		var chk_data = getCacheDate();
		if(isPublish){
			console.log("cookie data: " + JSON.stringify(chk_data));			
			// 混合当前表单和COOKIE数据
			$.each(chk_data, function(page, item) {
				if(page == ("p1" || "p2" )){  //排除手机内之前的缓存数据影响
					$.each(item, function(key, value) {
						if(value != "") {
							fdata[key] = value;
						}
					});
				}
				
			});
			window.localStorage.removeItem(cacheKey);
			return fdata;			
		}else{
			// 判断操作，下一步保存数据
			if(formPage === "p1" || "p2"){
				chk_data[formPage] = fdata;	
				console.log(chk_data)
				window.localStorage.setItem(cacheKey, JSON.stringify(chk_data));
			}
			return true;
		}
	//} 
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
	
//	if(chk_data["1"] && chk_data["1"]["formId"] == formId) {
//		//PASS
//	} else {
//		chk_data = {};
//	}
//	
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
		setFormData(chk_data[formPage]);	
	}
}


function setFormData(data,isPubshed){
	$.each(data, function(key, value) {
		if(value) {
			var obj = $("input[name='"+key+"']");
			if(obj) {
				var name = obj.attr("name");
				var type = obj.attr("type");
				if(type === "radio") {
					$("input[type='radio'][typeName='"+value+"']").attr("checked", true);
				}else{
					obj.val(value);
				}
				if(isPubshed){
					obj.attr("disabled",true)
				}
				
			}		
		}
	});
}
// 获取默认施工记录，施工班组等信息
function getRecordByTwoerNumber(towerNumber){
	var param = {"userId":userId, "formId":formId, "towerNumber": towerNumber, "tokenId":tokenId, "projId":projId};
	myCommon.loading();
	myCommon.ajaxGet({
		urlV : apiBase + "/getRecordByTwoerNumber1?param="+JSON.stringify(param),
		successF : function(data) {
			myCommon.closeLoading();
			if(data["code"] != "200") {
				muiToast('获取“根据塔杆编码获取默认值记录”信息失败');
				return ;
			}
			console.log("data: " + JSON.stringify(data));
			//塔型获取
			if($("input[name=text_tower_type]").length > 0) {	
				$("input[name=text_tower_type]").val(data["data"]["tower_type"]);
				$("input[name=tower_type]").val(data["data"]["tower_type"]);
			}
			

			if(typeof(data["data"]["banzu"]) != "undefined") {
				delete data["data"]["banzu"];
			}
			setFormData(data["data"]);
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
	var data = {"userId":userId, "tokenId":tokenId, "data": data, "projId":projId};
	if(jsonId) {
		data["jsonId"] = jsonId;
	}
	console.log(data)
	myCommon.loading();
	myCommon.ajaxPost({
		urlV : apiBase + "/saveConstructionList",
		data: data,
		successF : function(data) {
			myCommon.closeLoading();
			console.log("data: " + JSON.stringify(data));
			if(data["code"] != "200") {
				muiToast('信息发布失败');
			} else if(typeof(callback) == "function") {
				callback();
			}
		},
		errorF : function() {
			myCommon.closeLoading();
			muiToast('信息发布失败');
		}
	});
}

function getConstructionListDetail(jsonId){
	var param = {"userId":userId, "jsonId":jsonId, "tokenId":tokenId, "projId":projId};
	myCommon.loading();
	myCommon.ajaxGet({
		urlV : apiBase + "/getConstructionListDetail?param="+JSON.stringify(param),
		successF : function(data) {
			myCommon.closeLoading();
			if(data["code"] != "200") {
				muiToast('获取信息失败');
				return ;
			}
			//console.log("data: " + JSON.stringify(data));
			console.log(data)
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
//铁塔组立施工列表获取
function getConstructionList(){
	var param = {"userId":userId, "tokenId":tokenId, "projId":projId, "formId":[formId]};
		myCommon.loading();
		myCommon.ajaxGet({
			urlV : apiBase + "/getConstructionList?param="+JSON.stringify(param),
			successF : function(data) {
				myCommon.closeLoading();
				if(data["code"] != "200") {
					muiToast('获取列表信息失败');
					return ;
				}
				console.log("data: " + JSON.stringify(data["data"]));
				if(data["data"]){
					var listData = "";
					$.each(data["data"], function(index,item) {
						listData +='<li class="mui-table-view-cell towerli"><a jsonId = '
										+item["jsonId"]
										+' class="mui-navigate-right"><div class = "tower_number">杆塔编码　<span>'
										+item["gtbm"]+'</span></div><div class = "tower_pj">钢管塔评级</div><div class = "sgbz">施工班组　<span>'
										+item["sgbz"]+'</span></div><div class = "sgrq">施工日期　<span>'
										+item["sgrq"]+'</span></div></a></li>';
					});
					$("#towerComplete").html(listData)				
					//跳转到详情
					$("#towerComplete .towerli a").on("tap",function(){
						window.localStorage.removeItem(cacheKey);
						var nexturl = $("#formTower").attr("action");
						var jsonId = $(this).attr("jsonId");		
						var param = {"userId": userId, "tokenId": tokenId, "apiBase": apiBase, "projId":projId};
						if(jsonId) {
							param["jsonId"] = jsonId;
						}
						nexturl += "?param=" + JSON.stringify(param);
						myCommon.loading();
						window.location.href = nexturl;							
					})
					//搜索功能实现 (暂不开发)						
				}
			},
			errorF : function() {
				myCommon.closeLoading();
				muiToast('获取“塔杆编码”信息失败');
			}
		})
}