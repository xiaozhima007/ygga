## formId 转文件编号

地螺式复检表
        SJSC_DLFJ => 1
地螺式自检表
        DLZJ_SJSC => 2
基础专检记录
        JCZJ_SJSC=> 3
组立接地专检表
        ZLJDZJ_SJSC => 4
组立接地自检表
        ZLJDZZJ_SJSC => 5
组立接地复检表
        ZLJDFJ_SJSC => 6

{
    "DLFJ_SJSC": "1",      //地螺式复检表
    "DLZJ_SJSC": "2",      //地螺式自检表
    "JCZJ_SJSC": "3",      //基础专检记录
    "ZLJDZJ_SJSC": "4",    //组立接地专检表
    "ZLJDZZJ_SJSC": "5",   //组立接地自检表
    "ZLJDFJ_SJSC": "6",    //组立接地复检表
}

view/jsjl/from-{id}-1.html?param={"userId":"xxx-xxx","tokenId":"xxx","apiBase":"xxx"}
view/jsjl/from-{id}-1.html?param={"userId":"xxx-xxx","tokenId":"xxx","apiBase":"xxx","jsonId":"xxx-xxx-xxx-xxx"}

http://127.0.0.1/sjjc/view/sjjc/sjjc-towerList.html?param={"userId":"5003","projId":"C7C9291BD1F75ACADE695971041A376F","tokenId":"aa280ba7e7b24e62b53904ce5243272b","apiBase":"http://127.0.0.1/grm/ecpm.proj.hnsbd/AndroidService"}
http://127.0.0.1/sjjc/view/sjjc/sjjc-1-1.html?param={"userId":"5003","projId":"C7C9291BD1F75ACADE695971041A376F","tokenId":"aa280ba7e7b24e62b53904ce5243272b","apiBase":"http://127.0.0.1/grm/ecpm.proj.hnsbd/AndroidService"}


http://192.168.10.108:9080/grm/ecpm.proj.hnsbd/AndroidService/userLogin?param={"passWord":"abcd.1234","userName":"xz"}
http://192.168.10.108:9080/grm/ecpm.proj.hnsbd/AndroidService/getRecordByTwoerNumber1?param={"userId":"5003","formId":"SJSC_DLFJ","towerNumber":"8L028","tokenId":"533d3d38ed814e3aaa39724f3a92678a","projId":"C7C9291BD1F75ACADE695971041A376F"}
http://192.168.10.140:9080/grm/ecpm.proj.hnsbd/AndroidService/savaTempjson?param={"tokenId":"e576ee9a0d354a9bb55a5b9152a12111","userId":"5003","projId":"C7C9291BD1F75ACADE695971041A376F","baseItemType":"DLFJ_SJSC","jsonData":{"text_tower_number":"8S090","tower_number":"8S090","text_sgjl":"地螺式复检表","sgjl":"地螺式复检表","text_banzu":"测试班组A","banzu":"测试班组A","jcxs":"ZJT312","formId":"DLFJ_SJSC"},"docBaseMasterKeyList":""}
http://192.168.10.108:9080/grm/ecpm.proj.hnsbd/AndroidService/getTempjsonList?param={"tokenId":"33718284a1474c949563402a7c72f955","userId":"5003","projId":"C7C9291BD1F75ACADE695971041A376F","baseItemType":["DLFJ_SJSC","DLZJ_SJSC","JCZJ_SJSC","ZLJDZJ_SJSC","ZLJDZZJ_SJSC","ZLJDFJ_SJSC"]}

http://47.104.110.20:7001/grm/ecpm.proj.hnsbd/AndroidService/userLogin?param={"passWord":"abcd.1234","userName":"zhouxiaogang"} 正式接口

var formData = getFormData(true);
console.info("formdata: ", JSON.stringify(formData));

var chk_key = "_data_jsjl";
var chk_content = window.localStorage.getItem(chk_key);
var chk_data = JSON.parse(chk_content);
console.info("chk_data: ", JSON.stringify(chk_data));

