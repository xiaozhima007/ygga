var urlParam;
var apiBase, userId, tokenId, jsonId = null;
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
	}
	
	/*点击跳转页面*/	
	$(".progressList ul li a").on("tap",function(){
		var self = $(this);
		var nexturl = self.attr("hrefData");
		var param = {"userId": userId, "tokenId": tokenId, "apiBase": apiBase};
		if(jsonId) {
			param["jsonId"] = jsonId;
		}
		nexturl += "?param=" + JSON.stringify(param);
		myCommon.loading();
		window.location.href = nexturl;
		
	})
	
	/*获取塔杆编码数据*/
	var param = {"userId":userId, "tokenId":tokenId};
	var urlV = null;	
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
			var towerList = $(".towerList");
			$.each(data["data"], function(index,item) {					
				towerList.append('<li class="mui-table-view-cell"><a class="mui-navigate-right">杆塔编码  <span>'+item["value"]+'</span></a></li>')
			});
			
			/*搜索功能*/
			$("#search").bind("search",function(){
				var val = $("#search").val();
				$.each(data["data"]["value"],function(index,item){
					if(val == item){							
						$(".towerList").html('<li class="mui-table-view-cell"><a class="mui-navigate-right">杆塔编码  <span>'+self+'</span></a></li>')
					}else{
					    muiToast("没有找到匹配的选项");
					}
				})
			})
			
			
		},
		errorF : function() {
			myCommon.closeLoading();
			muiToast('获取“塔杆编码”信息失败');
		}
	});
	
	/*点击跳转*/
	$(".towerList li a").on("tap",function(){
		var nexturl = $(".mui-content form").attr("action");
		console.log(nexturl)
		var self = $(this);
		var towerNumber = self.find("span").text();
		var param = {"userId": userId, "tokenId": tokenId,"towerNumber": towerNumber, "apiBase": apiBase};
		if(jsonId) {
			param["jsonId"] = jsonId;
		}
		nexturl += "?param=" + JSON.stringify(param);
		myCommon.loading();
		window.location.href = nexturl;					
	})
			
	/*新建页面跳转*/	
	$(".createNew").on("tap",function(){
		var nexturl = $(this).attr("hrefData");
		console.log(nexturl)
		var param = {"userId": userId, "tokenId": tokenId, "apiBase": apiBase};
		if(jsonId) {
			param["jsonId"] = jsonId;
		}
		nexturl += "?param=" + JSON.stringify(param);
		myCommon.loading();
		window.location.href = nexturl;
	})
	/*新建页面信息获取*/
	var param2 = {"userId":userId, "tokenId":tokenId};
	myCommon.loading();
	myCommon.ajaxGet({
		urlV : apiBase + "/getTowerNumber?param="+JSON.stringify(param2),
		successF : function(data) {
			myCommon.closeLoading();
			if(data["code"] != "200") {
				muiToast('获取“塔杆编码”信息失败');
				return ;
			}
			console.log("data: " + JSON.stringify(data["data"]));
			
		},
		errorF : function() {
			myCommon.closeLoading();
			muiToast('获取“塔杆编码”信息失败');
		}
	/*发布信息*/
	$("#btn-sub").on("tap",function(){
		putEmptyRed();
		saveData();
	})
})





