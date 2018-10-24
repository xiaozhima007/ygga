var timeTitle = document.getElementsByClassName("timeTitle")[0],
    date = new Date(),
    year = date.getFullYear(),
	month = date.getMonth();
	day = date.getDate(),
	week = date.getDay(),//得到当天星期 0-6
	dayOfMonth = [31,28+isLeap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],//定义每月具体天数
	textOfMonth = ["一","二","三","四","五","六","七","八","九","十","十一","十二"],
	firstDay = dayOfWeek(year,month,1),
	len = Math.ceil((dayOfMonth[month] + firstDay) / 7),
	today = year+"-"+(month+1)+"-"+day;
var urlParam;
var apiBase, userId, tokenId, jsonId, projId = null;
	
$(document).ready(function() {
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
	
	urlParam = myCommon.getParam();	
	if (urlParam) {
		apiBase = urlParam["apiBase"];
		userId = urlParam["userId"];
		tokenId = urlParam["tokenId"];
		projId = urlParam["projId"];
	}
	init(); 
	//日历点击的事件委托
		$("#calendar").on("tap",function(e){
	    $("#calendar *").removeClass("ontap");
	    var e = e || window.event;
	    var target = e.srcElement || e.target;
	//console.log(target)
	    //把日历的头部的年月日分割成数组，这里保存在其value属性上
	    var dayArr = timeTitle.getAttribute('value').split('-');
        //如果是上一月的点击
            if ( target.id === "dirL" ) {
			preMonth(dayArr[0]-0,dayArr[1]-1,dayArr[2]-0);
        
        	}else if ( target.id === "dirR" ) {
            //如果是下一月的点击
			nextMonth(dayArr[0]-0,dayArr[1]-1,dayArr[2]-0);
        
        	}else {
	  			if($(target).hasClass("unread")){
	  			var detaildate = target.getAttribute('value');//得到点击时间		
	  		showUnreadDetail(detaildate);
	  			}else{
	  		$("#bzRecord ul").html("");
	  		}
	  			if($(target).parent().hasClass("conDate")){
	  		$(target).addClass("ontap")	
        }
	}
	}) 
	//跳转到详情页
	$("#detail").on("tap",function(){
		var nextUrl = "sjsc-4.html";
		var date = datailTime();
		var param = {"tokenId":tokenId, "userId":userId, "projId":projId, "date":date, "apiBase":apiBase};
		nextUrl += "?param=" + JSON.stringify(param);
		window.location.href = nextUrl;
	})
	//返回
	$("#backBtn").off("tap").on("tap", function() {
		transParam({"action": "back"});
	});	
})
function init(){
	showDate(year,month,day);//显示日期
	showtoday();
	showUnread();
}
//获取查看详情的具体时间
function datailTime(){
	var T = "";
	var ontap = $(".conDate").find(".ontap");
	console.log(ontap)
	if(ontap.length !== 0){
		console.log(1)
		T = addzero(ontap.attr("value"));
	}else{
		console.log(2)
		T = addzero(today)
	}
	return T
}
/*未读信息获取 标注   测试*/
function showUnread(){
		/*获取列表*/
	    var param = {"tokenId":tokenId};
		myCommon.loading();
		myCommon.ajaxGet({
			urlV : apiBase + "/payCheckNotReadUser?param="+JSON.stringify(param),
			successF : function(data) {
				myCommon.closeLoading();
					if(data["code"] != "200") {
						muiToast('获取“未读班组列表”信息失败');
							return ;
					}
					console.log("data: " + JSON.stringify(data)); 
					$("#bzRecord ul").html("");
					
					if(data["data"].length > 0){
						/*获取teamName值*/	            		
						$.each(data["data"], function(index, item) { 
							var unreadName = item["teamName"];	
							var unreadDate =item["tsDate"];
							/*未读标注*/
							$(".conDate span").each(function(index1,item1){
							var val = addzero($(item1).attr("value"));						
									if(val == unreadDate){
									$(item1).addClass("unread");
								}
							})					
							/*生成今日未读班组*/
							if(unreadDate == addzero(today)){
								$("#bzRecord ul").append('<li class="mui-table-view-cell">'+unreadName+'</li>');											
							} 																	
						});							
					}else{
						$(".conDate span").each(function(index,item){
							if($(item).hasClass("unread")){
								$(item).removeClass("unread");						
							}
						})
					}
			}, 
			errorF : function() {
						myCommon.closeLoading();
						muiToast('获取“未读班组列表”信息失败');
			}
		})
//	}
}
/*未读信息展示*/
function showUnreadDetail(date){
	$("#bzRecord ul").html("");
	urlParam = myCommon.getParam();	
	if (urlParam) {
		apiBase = urlParam["apiBase"];
		tokenId = urlParam["tokenId"];			
		var param = {"tokenId":tokenId};
		myCommon.loading();
		myCommon.ajaxGet({
			urlV : apiBase + "/payCheckNotReadUser?param="+JSON.stringify(param),
			successF : function(data) {
				myCommon.closeLoading();
				if(data["code"] != "200") {
					muiToast('获取“未读班组列表”信息失败');
					return ;
				} 
				if(data["data"].length > 0){						            		
					$.each(data["data"], function(index, item) { 
						var unreadName = item["teamName"];	
						var unreadDate =item["tsDate"];									
						var val = addzero(date);						
						if(unreadDate == val){
							$("#bzRecord ul").append('<li class="mui-table-view-cell">'+unreadName+'</li>');											
						}        		            		
					});
				}
			},
			errorF : function() {
				myCommon.closeLoading();
				muiToast('获取“未读班组列表”信息失败');
			}	
		}) 	
	}
}
		
/*today标注*/
function showtoday(){
	//obj[day+firstDay-1].className = "today";	
	$(".conDate span").each(function(index,item){
		var val = $(item).attr("value");
		if(val == today){
			$(item).addClass("today")
		}
	})
}

/*生成日期*/
function createDate(year,month,firstDay){    //调用getNum，得到月份的具体天数
	var str = "";
	var k = 1;	
	//生成月份天数
	var monthNum = dayOfMonth[month];
	var proMonthNum = dayOfMonth[(month-1)>-1?(month-1):11];
	for(var i = 0; i<=len; i++){	
		for(var j = 0; j<7; j++){
			if (firstDay){
				str+="<span class = 'unactive' value ="+ ((month==0)?year-1:year)+"-"+month+"-"+(proMonthNum - firstDay+1)+">"+(proMonthNum - firstDay+1)+"</span>";
				firstDay--;
				continue
			}			
			if(k>monthNum){
				str +="<span class ='unactive' value ="+((month==11)?year+1:year)+"-"+(month+2)+"-"+(k-monthNum) +">"+(k-monthNum)+"</span>";
			}else{
				str +='<span value = '+year+'-'+ (month+1)+'-'+k+'>'+k+'</span>';
			}	
			k++;
		}	
	}	
	$(".conDate").html(str);
}

/*判断是否闰年*/
function isLeap(year){
	//闰年的条件是符合下面二者之一：
	//(1)年份能被4整除，但不能被100整除；
	//(2)年份能被400整除。
	if((year%4==0 && year%100!=0)||(year%400==0)){
		return 1;
	}
	return 0;
}
/*判断第年每月第一天是星期几*/
function dayOfWeek(year,month,day){
	return (new Date(year,month,day).getDay());
}

/*上一月日历*/
function preMonth(year,month,day){
	if(month ==0){
		showDate(year-1,11,day);		
	}else{
		showDate(year,month-1,day);
	}	
}
/*下一月日历*/
function nextMonth(year,month,day){
	if(month ==11){
		showDate(year+1,0,day)
	}else{
		showDate(year,month+1,day)
	}	
}

//显示年月日
function showDate(year,month,day) {
	//console.log(month)
    var date = "",firstDay = dayOfWeek(year,month,1);		    
    date = textOfMonth[month] + "月 " +year;		    		   
    timeTitle.innerHTML = date; //日历头部显示
    timeTitle.setAttribute("value",year+"-"+(month+1)+"-"+day);
    createDate(year,month,firstDay);//生成日期执行//调用日历显示函数
    if(month == new Date().getMonth()&&year ==new Date().getFullYear()){
    	showtoday()
    }   
		showUnread();
}

function addzero(str){
	var arr = str.split("-");
	return arr[0]+"-"+(arr[1]<10?("0"+arr[1]):arr[1])+"-"+(arr[2]<10?("0"+arr[2]):arr[2])	
}