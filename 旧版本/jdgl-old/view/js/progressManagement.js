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
})


