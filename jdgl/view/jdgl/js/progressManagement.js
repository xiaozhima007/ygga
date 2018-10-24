var urlParam; 
var formtype ="";
var apiBase, userId, tokenId, jsonId, projId, progressType, task_type, task_name = null;
var towerNumber = "";
$(document).ready(function(){
	/*MUI初始化*/
	mui.init();
	mui('.mui-scroll-wrapper').scroll({
		scrollY: true, //是否竖向滚动
		 scrollX: false, //是否横向滚动
		 startX: 0, //初始化时滚动至x
		 startY: 0, //初始化时滚动至y
		 indicators: false, //是否显示滚动条
		 deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
		 bounce: true //是否启用回弹
	});
	
	/*mui时间插件实现*/
	$(".mui-input-group input[type=text][format=date]").off("tap").on("tap",function(){	
		alert(2)
		var self = $(this);
		var dtpicker = new mui.DtPicker({
		    type: "date",//设置日历年月日视图模式 
		    beginDate: new Date(2018,00),//设置开始日期 
		    //endDate: new Date(2016, 04, 25),//设置结束日期 
		    labels: ['年', '月', '日'],//设置默认标签区域提示语 
		}) 
		dtpicker.show(function(items) {
		    //console.log(items["text"]);
		    self.val(items["value"]);
		}) 
	})
	
	urlParam = myCommon.getParam();
	if (urlParam) {
		apiBase = urlParam["apiBase"];
		userId = urlParam["userId"];
		tokenId = urlParam["tokenId"];
		projId = urlParam["projId"];
		progressType = urlParam["progressType"];
	}
	formtype = $("form").attr("formtype");
	/*进度列表点击跳转页面*/	
	$(".progressList ul li a").on("tap",function(){
		var self = $(this);
		progressType = self.attr("progressType");
		var nexturl = self.attr("hrefData");
		var param = {"userId": userId, "tokenId": tokenId, "projId":projId, "progressType":progressType, "apiBase": apiBase, "towerNumber":towerNumber};
		if(jsonId) {
			param["jsonId"] = jsonId;
		}
		nexturl += "?param=" + JSON.stringify(param);
		myCommon.loading();
		window.location.href = nexturl;
		
	})
	
	/*生成塔杆编码列表*/
	if(formtype == "progress"){		
		var param = {"userId":userId, "tokenId":tokenId, "projId":projId ,"progressType":progressType, "towerNumber":""};
		getFeedbackProgress(param,function(data){
			var towerList = $(".towerList");
			var str = "";
			$.each(data["dataList"], function(index,item) {	
				str += '<li class="mui-table-view-cell"><a class="mui-navigate-right">杆塔编码  <span>'+item["towernumber"]+'</span></a></li>';
			});
			towerList.html(str)		
			
			/*点击塔杆编码跳转*/
			$(".towerList li a").on("tap",function(){
				var nexturl = $(".mui-content form").attr("action");
				var self = $(this);
			    towerNumber = self.find("span").text();
				var param = {"userId": userId, "tokenId": tokenId, "projId":projId, "towerNumber": towerNumber, "apiBase": apiBase, "progressType":progressType};
				if(jsonId) {
					param["jsonId"] = jsonId;
				}
				console.log(param)
				nexturl += "?param=" + JSON.stringify(param);
				myCommon.loading();
				window.location.href = nexturl;					
			})
		});
		//下拉刷新
		var idv = $("#downrefresh");
		myCommon.dropload(idv,function(){			
			getFeedbackProgress(param,function(data){
				var towerList = $(".towerList");
				var str = "";
				$.each(data["dataList"], function(index,item) {	
					str += '<li class="mui-table-view-cell"><a class="mui-navigate-right">杆塔编码  <span>'+item["towernumber"]+'</span></a></li>';
				});
				towerList.html(str)	
			})
		})	
		/*搜索功能*/
		$("#search").on("keypress",function(event){
			if(event.keyCode == "13") {
		        document.activeElement.blur();//收起虚拟键盘
	//	        toSearch();//TODO 完成搜索事件
				var val = $("#search").val();
				var param = {"userId":userId, "tokenId":tokenId, "projId":projId ,"progressType":progressType, "towerNumber":val};
				getFeedbackProgress(param,function(data){
					var towerList = $(".towerList");
					var str = "";
					$.each(data["dataList"], function(index,item) {	
						str += '<li class="mui-table-view-cell"><a class="mui-navigate-right">杆塔编码  <span>'+item["towernumber"]+'</span></a></li>';
					});					
					towerList.html(str)
					
					/*点击塔杆编码跳转*/
					$(".towerList li a").on("tap",function(){
						var nexturl = $(".mui-content form").attr("action");
						var self = $(this);
					    towerNumber = self.find("span").text();
						var param = {"userId": userId, "tokenId": tokenId, "projId":projId, "towerNumber": towerNumber, "apiBase": apiBase, "progressType":progressType};
						if(jsonId) {
							param["jsonId"] = jsonId;
						}
						console.log(param)
						nexturl += "?param=" + JSON.stringify(param);
						myCommon.loading();
						window.location.href = nexturl;
					})
				})
				event.preventDefault(); // 阻止默认事件---阻止页面刷新
			}
		})
	}
				
			
	/*新建页面跳转*/	
	$(".createNew").on("tap",function(){
		var nexturl = $(this).attr("hrefData");
		console.log(nexturl)
		var param = {"userId": userId, "tokenId": tokenId, "projId":projId, "apiBase": apiBase, "progressType":progressType};
		if(jsonId) {
			param["jsonId"] = jsonId;
		}
		nexturl += "?param=" + JSON.stringify(param);
		myCommon.loading();
		window.location.href = nexturl;
	})
	 
	/*新建页面信息获取*/
	if(formtype == "createnew"){
		var param = {"userId":userId, "tokenId":tokenId, "projId":projId,"towerNumber":"", "progressType":progressType};
		getUnFeedbackTowerInfo(param,function(data){
			//塔杆编码			
			if($("input[name='text_tower_number']").length > 0 && typeof(data["dataList"]) == "object") {
				var tower_number_list = [];
				$.each(data["dataList"], function(index, item) {
					tower_number_list.push([item["id"],item["towernumber"]]);
				});
				$("input[name='text_tower_number']").data("options", JSON.stringify(tower_number_list));
				console.log(tower_number_list)
			}			
			$(".form-select > input[type=text][format=options]").off("tap").on("tap", function() {
				var self = $(this);
				var options = self.data("options");
				if(!options)
				{
					//console.warn("options null")
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
		//			setEmptyInputRed(self, "remove");
		
					var realName = self.attr("name").substr(5);
					var selectVal = selectedItem[0]['value'];
					var selectText = selectedItem[0]['text'];
					console.log("object selected, name: " + realName + ", text: "+ selectText + ", value: " + selectVal);
					self.val(selectText);
					$("input[name="+realName+"]").val(selectText);
					$("input[name="+realName+"]").attr("fid",selectVal);
					towerNumber = selectText;
					if(realName == "tower_number"){
						var param2 = {"userId":userId, "tokenId":tokenId, "projId":projId, "progressType":progressType, "towerNumber":selectText};
						console.log(param2)
						getTowerTaskInfo(param2,function(data){						
							/*生成列表*/
							$.each(data["dataList"], function(index, item) {
								var str = '<div class="mui-row form-title">'
											+item["displayname"]
											+'</div><div class="mui-input-row form-select"><input type="text" format="date" readonly="readonly" required="true" name="act_end_date" value="" fId = ' 
											+item["id"] +' task_type ='+item["task_type"]+' parent_id='+item["parent_id"] +' task_name='+item["task_name"] +'><span class="mui-navigate-right"></span></div>';
								$(str).appendTo(".listContent .mui-scroll");
							});
//							$("input").each(function(index,item){
//								var self = $(item);
//								if(self.attr("task_type") === "WBS"){
//									self.attr("disabled","disabled")
//								}
//							})
							setFormData(data);
							/*mui时间插件实现*/
							$(".mui-input-group input[type=text][format=date]").off("tap").on("tap",function(){	
								var self = $(this);
								var dtpicker = new mui.DtPicker({
								    type: "date",//设置日历年月日视图模式 
								    beginDate: new Date(2018,00),//设置开始日期 
								    //endDate: new Date(2016, 04, 25),//设置结束日期 
								    labels: ['年', '月', '日'],//设置默认标签区域提示语 
								}) 
								dtpicker.show(function(items) {
								    //console.log(items["text"]);
								    self.val(items["value"]);
								}) 
							})
						});
					}
				})
			
			})		
			
		})
	}
	
	/*详情页数据获取*/
	if(formtype == "detail"){
		if(urlParam && urlParam["towerNumber"]) {
			towerNumber = urlParam["towerNumber"];
		}
		var param = {"userId":userId, "tokenId":tokenId, "projId":projId, "progressType":progressType,"towerNumber":towerNumber};
		getTowerTaskInfo(param,function(data){	
			$(".detail-title span:nth-child(1)").html(towerNumber);
//			$(".detail-title span:nth-child(2)").html(data["dataList"]["task_name"]);
			$.each(data["dataList"], function(index, item) {
				var str = "";
				if(item["act_end_date"]){
					str = '<div>'+item["displayname"]
					+'</div><input type="text" name = "act_end_date_s" readonly="readonly" value = '
					+item["act_end_date"]+ '>'
					$(str).appendTo(".autoFill");
				}else{
					var str = '<div class="mui-row form-title">'
							+item["displayname"]
							+'</div><div class="mui-input-row form-select"><input type="text" format="date" readonly="readonly" required="true" name="act_end_date" value="" fId = ' 
							+item["id"] +' task_type ='+item["task_type"]+' parent_id='+item["parent_id"] +' task_name='+item["task_name"] +'><span class="mui-navigate-right"></span></div>';
					$(".nofill").append(str);
					
					/*mui时间插件实现*/
					$(".mui-input-group input[type=text][format=date]").off("tap").on("tap",function(){	
						var self = $(this);
						var dtpicker = new mui.DtPicker({
						    type: "date",//设置日历年月日视图模式 
						    beginDate: new Date(2018,00),//设置开始日期 
						    //endDate: new Date(2016, 04, 25),//设置结束日期 
						    labels: ['年', '月', '日'],//设置默认标签区域提示语 
						}) 
						dtpicker.show(function(items) {
						    //console.log(items["text"]);
						    self.val(items["value"]);
						}) 
					})
				}
				
			});
		});
		
	}
	
		/*发布信息*/
		$("#btn-sub").on("tap",function(){
			var formData = getFormData();
			var This = $(this);
			if(!formData.length) {
				return ;
			}
			console.log("formdata: ", JSON.stringify(formData));
			saveFeedbackInfo(formData,function(){
				myCommon.closeLoading();
				myCommon.myAlert("发布成功", "消息", ["确定"], function(){
					var nexturl = This.attr("hrefData") || $("form").attr("action");
					console.log(nexturl)
					var param = {"userId": userId, "tokenId": tokenId, "projId":projId, "progressType":progressType, "apiBase": apiBase, "towerNumber":""};
					if(jsonId) {
						param["jsonId"] = jsonId;
					}
					nexturl += "?param=" + JSON.stringify(param);
					myCommon.loading();
					window.location.href = nexturl;
				});
			});
			return false;
		})
	
	/*列表页返回*/
	$("#btn-back").off("tap").on("tap",function(){
		transParam({"action": "close"});		
	})
	/*新建页面返回*/
	$(".createNew-back").on("tap",function(){
		mui.confirm('是否放弃本次新建？','提示',['取消','确认'],function (e) {
			if(e.index===1){
				transParam({"action": "back"})
			}
//			
		},'div')
	})
	/*页面详情页返回*/
	$(".detail-back").on("tap",function(){
		//判断用户输入是否为空
		var formData = getFormData();
		if(formData){
			//if(false){return false;}else{跳转到列表页}
			mui.confirm('是否放弃本次新建？','提示',['取消','确认'],function (e) {
				if(e.index===1){
					transParam({"action": "back"})
				}			
			},'div')
		}else{	
			transParam({"action": "back"});
		}
	})
})

/*获得已反馈的进度列表*/
function getFeedbackProgress(param,callback){
//	var param = {"userId":userId, "tokenId":tokenId};	
	myCommon.loading();
	myCommon.ajaxGet({
		urlV : apiBase + "/getFeedbackProgress?param=" +JSON.stringify(param),
		successF : function(data) {
			myCommon.closeLoading();
			if(data["resultCode"] != "200") {
				muiToast('获取“塔杆编码”信息失败');
				return ;
			}
			console.log("data: " + JSON.stringify(data));
			if(typeof(callback) == "function"){
				callback(data);
			}
		},
		errorF : function() {
			myCommon.closeLoading();
			muiToast('获取“塔杆编码”信息失败');
		}
	})
}

/*塔杆编码获取*/
function getUnFeedbackTowerInfo(param,callback){
	myCommon.loading();
	myCommon.ajaxGet({
		urlV : apiBase + "/getUnFeedbackTowerInfo?param=" +JSON.stringify(param),
		successF : function(data) {
			myCommon.closeLoading();
			if(data["resultCode"] != "200"){
				muiToast('获取“塔杆编码”信息失败');
				return ;
			}
			console.log("data: " + JSON.stringify(data));
			if(typeof(callback) == "function"){
				callback(data);
			}
		},
		errorF : function() {
			myCommon.closeLoading();
			muiToast('获取“塔杆编码”信息失败');
		}
	})
}
/*获取当前塔杆下任务信息*/
function getTowerTaskInfo(param,callback){
	myCommon.loading();
	myCommon.ajaxGet({
		urlV : apiBase + "/getTowerTaskInfo?param=" +JSON.stringify(param),
		successF : function(data) {
			myCommon.closeLoading();
			if(data["resultCode"] != "200") {
				muiToast('获取“塔杆编码”信息失败');
				return ;
			}
			console.log("data: " + JSON.stringify(data));
			if(typeof(callback) == "function"){
				callback(data);
			}
		},
		errorF : function() {
			myCommon.closeLoading();
			muiToast('获取“塔杆编码”信息失败');
		}
	})
}
/*保存信息到服务器*/
function saveFeedbackInfo(data,callback){
	var data = {"userId":userId, "tokenId":tokenId, "projId":projId, "progressType":progressType, "dataList": data, "towerNumber":towerNumber};
	console.log(data)
	myCommon.loading();
	myCommon.ajaxPost({
		urlV : apiBase + "/saveFeedbackInfo",
		data: data,
		successF : function(data) {
			myCommon.closeLoading();
			console.log("data: " + JSON.stringify(data));
			if(data["resultCode"] == "205") {
				muiToast('发布信息失败');
			} else if(data["resultCode"] == "206"){
				muiToast(data["message"]);
			}else if(typeof(callback) == "function") {
				callback();
			}
		},
		errorF : function() {
			myCommon.closeLoading();
			muiToast('发布信息失败');
		}
	});
}
function getFormData(){		
	var fdataarr = [];
	$(".mui-input-row input[name = 'act_end_date']").each(function(index, item) {
		var self = $(item);
		var fdata = {};		
		fdata["id"] = self.attr("fId");
		fdata["parent_id"] = self.attr("parent_id");
		fdata["act_end_date"] = self.val();
		fdata["task_type"] = self.attr("task_type");
		fdata["task_name"] = self.attr("task_name");
		fdataarr.push(fdata)		
	});

	console.log(fdataarr)
	return fdataarr;
}
function setFormData(data){
	$.each(data["dataList"], function(name, value) {
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
			}
		}
	});
}

