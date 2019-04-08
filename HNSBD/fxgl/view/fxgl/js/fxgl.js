var urlParam;
var apiBase, tokenId, jsonId,riskId, projId = null;
var formId, formNo, formPage;
$(document).ready(function() {
	// MUI框架初始化
	mui.init();
	formId = $("form[id=formTower]").data("code");
	formNo = $("form[id=formTower]").data("id");
	formPage = $("form[id=formTower]").data("page");	
	urlParam = myCommon.getParam();
	if (urlParam) {
		apiBase = urlParam["apiBase"];
		tokenId = urlParam["tokenId"];
		projId = urlParam["projId"];
		if(urlParam["riskId"]){
			riskId = urlParam["riskId"];
		}		
	}
	if($("input[name = search]").length > 0){
		/*搜索功能*/
		$("#search").on("keypress",function(event){
			if(event.keyCode == "13") {
		        document.activeElement.blur();//收起虚拟键盘
				var val = $("#search").val();
				getRiskList(val);			
				event.preventDefault(); // 阻止默认事件---阻止页面刷新
			}
		})							
	}else{
		if(riskId){
			getRiskDetail (riskId)
		}else{
			muiToast("获取riskId参数失败")
		}
		
	}

	$("#backBtn").on("tap", function() {				
		if(formPage == "0") {
			transParam({"action": "close"});
		} else {				
			transParam({"action": "back"});
		}		
	});	
});

function setFormData(data){
	$.each(data, function(key, value) {
		$(".show").each(function(index,item){
			var self = $(this);
			if(self.attr("name") === key){
				self.html(value);
			}
		})
	});
}
//风险管理列表获取
function getRiskList(inputData){
	var data = inputData || "";
	var param = {"tokenId":tokenId, "projId":projId, "numberAndName":data};
		myCommon.loading();
		myCommon.ajaxGet({
			urlV : apiBase + "/getRiskList?param="+JSON.stringify(param),
			successF : function(data) {
				myCommon.closeLoading();
				if(data["code"] != "200") {
					muiToast('获取信息失败');
					return ;
				}
//				console.log("data: " + JSON.stringify(data["data"]));
				if(data["data"].length > 0){
					var listData = "";
					$.each(data["data"], function(index,item) {
						listData += '<li class="mui-table-view-cell towerli" riskId = '
									+item["risk_id"]+'><div class = "fxbh"><span>'
									+item["risk_number"]+'</span><div>等级： <span>'
									+item["risk_grade"]+'</span></div></div><div class = "gxmc">'
									+item["procedure_name"]+'</div></li>'
					});
					$("#towerComplete").html(listData)				
					//跳转到详情
					$("#towerComplete .towerli").on("tap",function(){
						var nexturl = $("form").attr("action");
						var riskId = $(this).attr("riskId");
						var param = {"tokenId": tokenId, "apiBase": apiBase, "projId":projId, "riskId":riskId};
						nexturl += "?param=" + JSON.stringify(param);
						myCommon.loading();
						window.location.href = nexturl;							
					})			
				}
			},
			errorF : function() {
				myCommon.closeLoading();
				muiToast('获取信息失败');
			}
		})
}

//风险详情
function getRiskDetail (riskId) {
	var param = {"tokenId":tokenId, "projId":projId, "riskId":riskId};
		myCommon.loading();
		myCommon.ajaxGet({
			urlV : apiBase + "/getRiskDetail?param="+JSON.stringify(param),
			successF : function(data) {
				myCommon.closeLoading();
				if(data["code"] != "200") {
					muiToast('获取详情信息失败');
					return ;
				}
//				console.log("详情data: " + JSON.stringify(data["data"]));
				setFormData(data["data"][0])
			},
			errorF : function() {
				myCommon.closeLoading();
				muiToast('获取信息失败');
			}
		})
}
