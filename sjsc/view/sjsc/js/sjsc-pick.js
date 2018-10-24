var apiBase, userId, tokenId, jsonId ,projId,xqDate= null,
	listUrl = "sjsc-2.html",
	recordUrl = "sjsc-3.html",
	detailUrl = "sjsc-4.html",
	format = $("form").attr("format"),
	data = [];
var oDate = new Date();
var timemark = new Date(oDate.getFullYear(),oDate.getMonth(),oDate.getDate()).getTime();
var time_start = null;
$(document).ready(function() {
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
	
	var urlParam = myCommon.getParam();
	if (urlParam) {
		apiBase = urlParam["apiBase"];
		userId = urlParam["userId"];
		tokenId = urlParam["tokenId"];
		projId = urlParam["projId"];
		if(urlParam["date"]){
			xqDate = urlParam["date"];
		}
	}
	if(format == "srData"){
		//获取当前日期
		$(".T-today").html(`${new Date().getFullYear()}年${new Date().getMonth()+1}月${new Date().getDate()}日`);
		$(".T-today").attr("value",`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`)
	}
	
	//下一步按钮功能实现
	$("#btnStepNext").off("tap").on("tap",function(){
		var isComplete = true;
		//保存当前数据
		var dataList = getFormData(false);
		console.log(JSON.stringify(dataList))
		//判断是否有未填项
		$.each(dataList,function(index,item){
			$.each(item,function(key,value){
				if($.trim(value) == ""){
					isComplete = false;
					muiToast("当前表单未填写完整，请检查！")
					return ;
				}
			})
			return ;
		})
		//页面跳转
		if(isComplete){
			var nextUrl = listUrl; 
			var param = {"tokenId":tokenId,"userId":userId, "projId":projId, "apiBase": apiBase}
			nextUrl += "?param=" + JSON.stringify(param);
			window.location.href = nextUrl;
		}	
	})
		
	//获取页面数据
	function getFormData(isPublish){
		var dataList = [];
			$(".textarea").each(function(index,item){
				var fdata = {};
				var self = $(item);
				var name = self.attr("name");
				fdata[name] = self.text();
				dataList.push(fdata)
			})
			dataList[0]["rq"] = $(".T-today").attr("value");
		
		if(!isPublish){		
			//离线存储数据
			localStorage.setItem("sjsc_content",JSON.stringify(dataList));
		}
		return dataList;
	}
	
	if(format == "listData"){
		/*获取列表*/
		var param = {"tokenId":tokenId, "userId":userId, "projId":projId};
		myCommon.loading();
		myCommon.ajaxGet({
			urlV : apiBase + "/getPayCheckBanzuList?param="+JSON.stringify(param),
			successF : function(data) {
				myCommon.closeLoading();
				if(data["code"] != "200") {
					muiToast('获取“班组列表”信息失败');
					return ;
				}
				console.log("data: " + JSON.stringify(data));   
				var oDate = new Date();
				var date = oDate.getFullYear()+"-"+(oDate.getMonth()+1)+"-"+oDate.getDate();
				$.each(data["data"], function(index, item) {               		
					$("<div class='mui-input-row mui-checkbox mui-left'><label>"+item["teamName"]+"</label><input teamid = '"+item["teamId"]+"'name='teamName' type='checkbox'  class = 'listgroup' index = "+index+"></div>").appendTo("#bzList .bzListCon")
				});	
			},
			errorF : function() {
				myCommon.closeLoading();
				muiToast('获取“班组列表”信息失败');
			}
		})
		
		/*全选功能实现*/
		$(".pickall-right input").off("tap").on("tap",function(){
			var listGroup = $(".listgroup");
			if(this.checked == true){
				listGroup.each(function(index,item){
					item.checked = true;
				})
			}else{
				listGroup.each(function(index,item){
					item.checked = false;
					console.log(this.checked)
				})	
			}
			console.log(this.checked)
		})
	}
	
	if(format == "xqData" && xqDate){
		var theTime = xqDate.split("-");
		$(".T-time").html(`${theTime[0]}年${theTime[1]}月${theTime[2]}日`)
		
		getCheckDetail(xqDate,function(data){
			setData(data)
		})
	}
	function setData(data){
		console.log(data)
	}
	$("#backBtn").off("tap").on("tap", function() {
		transParam({"action": "close"});
		//transParam({"action": "back"});
	});	
	
	/*数据提交*/
		$("#btn-sub").on("tap",function(){
		/*数据处理*/
		var pushData = [];		
		$(".bzListCon input[name ='teamName']:checked").each(function(index,item){			
			self = $(item);
			var fdata = {};
				if(!localStorage.key(index) || JSON.parse(localStorage.getItem(localStorage.key(index))) !== timemark){	
					fdata["teamId"] = self.attr("teamid");	
					pushData.push(fdata);				
				}			
		})
		var dataList = localStorage.getItem("sjsc_content");
		console.log(JSON.stringify(pushData))
		console.log(JSON.stringify(dataList))
		getPayCheckPush(pushData,dataList,function(){
			myCommon.closeLoading();
			mui.confirm('今日三交三查已推送',"",['返回','查看'],function (e) {
				if(e.index === 1){	
					var nextUrl = detailUrl; 
					var oDate = new Date();
					var date = oDate.getFullYear()+"-"+(oDate.getMonth()+1)+"-"+oDate.getDate();
					var param = {"tokenId":tokenId, "userId":userId, "projId":projId, "date":date,"apiBase": apiBase}
					nextUrl += "?param=" + JSON.stringify(param);
					window.location.href = nextUrl;
				}	
			},'div')
		})	
	})
	/*记录按钮跳转*/
	$("#record").on("tap",function(){
		var nextUrl = recordUrl; 
		var oDate = new Date();
		var date = oDate.getFullYear()+"-"+(oDate.getMonth()+1)+"-"+oDate.getDate();
		var param = {"userId":userId, "tokenId":tokenId, "apiBase":apiBase, "projId":projId, "date":date}
		nextUrl += "?param=" + JSON.stringify(param);
		window.location.href = nextUrl;
	})	
})
   
// 保存数据到服务器
function getPayCheckPush(data,dataList,callback){
	var data = {"tokenId":tokenId, "userId":userId, "projId":projId, "data": data};
	data["dataDetail"] = {"dataList":dataList};
	console.log("发送数据："+JSON.stringify(data))
	myCommon.loading();
	myCommon.ajaxPost({
		urlV : apiBase + "/getPayCheckPush",
		data: data,
		successF : function(data) {
			myCommon.closeLoading();
			console.log("data: " + JSON.stringify(data));
			if(data["code"] != "200") {
				muiToast('发布信息失败');
			} else if(typeof(callback) == "function") {
				localStorage.setItem(JSON.stringify(data["teamId"]),JSON.stringify(timemark));//本地存储id及时间戳
				callback();
			}
		},
		errorF : function() {
			myCommon.closeLoading();
			muiToast('发布信息失败');
		}
	});
}

//获取详情
function getCheckDetail (date,callback) {
	var param = {"tokenId":tokenId, "userId":userId, "projId":projId, "date":date};
	myCommon.loading();
	myCommon.ajaxGet({
		urlV : apiBase + "/getCheckDetail?param="+JSON.stringify(param),
		successF : function(data) {
			myCommon.closeLoading();
			if(data["code"] != "200") {
				muiToast('获取“详情”信息失败');
				return ;
			}
			console.log("详情data: " + JSON.stringify(data));   
			if(callback && typeof callback == "function"){
				callback(data["dataList"]);
			}
		},
		errorF : function() {
			myCommon.closeLoading();
			muiToast('获取“详情”信息失败');
		},
	})
}

		