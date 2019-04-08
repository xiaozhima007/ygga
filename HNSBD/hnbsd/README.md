## formId 转文件编号

灌注桩评级
        JCJL_GUZJ => 1
承台/连梁签证
        JCJL_YBCTLL => 2
基础拆模
        JCJL_YBCM => 3
基础浇制
        JCJL_YBJZ => 4
基础支模
        JCJL_JQZM => 5
灌注桩3-1
        JCJL_XJ => 6
普通基础分坑
        JCJL_FKKW => 7
灌注桩签证
        JCJL_YBGZZQ => 8

{
    "JCJL_GUZJ": "1",      //灌注桩评级
    "JCJL_YBCTLL"": "2",   //承台/连梁签证
    "JCJL_YBCM"": "3",     //基础拆模
    "JCJL_YBJZ"": "4",     //基础浇制
    "JCJL_JQZM"": "5",     //基础支模
    "JCJL_XJ"": "6",       //灌注桩3-1
    "JCJL_FKKW"": "7",     //普通基础分坑
    "JCJL_YBGZZQ": "8"     //灌注桩签证
}

view/jsjl/from-{id}-1.html?param={"userId":"xxx-xxx","tokenId":"xxx","apiBase":"xxx"}
view/jsjl/from-{id}-1.html?param={"userId":"xxx-xxx","tokenId":"xxx","apiBase":"xxx","jsonId":"xxx-xxx-xxx-xxx"}


http://127.0.0.1/hnbsd/view/jsjl/form-1-1.html?param={"tokenId":"ffd9bc23d7a54065a6f6d77e69f1dc0d8","projId":"C7C9291BD1F75ACADE695971041A376F","userId":"5003","apiBase":"http://127.0.0.1/grm/ecpm.proj.hnsbd/AndroidService"}
http://127.0.0.1/hnbsd/view/jsjl/form-1-1.html?param={"tokenId":"ffd9bc23d7a54065a6f6d77e69f1dc0d8","projId":"C7C9291BD1F75ACADE695971041A376F","userId":"5003","apiBase":"http://127.0.0.1/grm/ecpm.proj.hnsbd/AndroidService","jsonId":"22fb05fd9b-7197-47dc-afd4-060611a5e208"}


-http://192.168.10.45:9080/grm/ecpm.proj.hnsbd/AndroidService/getConstructionList?param={%22userId%22:%22d45c16ba-67a9-4a35-8dfd-b6753addb681%22,%22tokenId%22:123}
http://47.104.110.20:7001/grm/ecpm.proj.hnsbd/AndroidService/userLogin?param={"passWord":"abcd.1234","userName":"zhouxiaogang"} 正式接口

var formData = getFormData(true);
console.info("formdata: ", JSON.stringify(formData));


var data = {"hntqd":"99","zhuangs_a":"99","zhuangs_b":"99","zhuangs_c":"99","zhuangs_d":"99","cyys_a1":"99","cyys_a2":"99","cyys_b1":"99","cyys_b2":"99","cyys_c1":"99","cyys_c2":"99","cyys_d1":"99","cyys_d2":"99","zjzczd_a1":"99","zjzczd_a2":"99","zjzczd_b1":"99","zjzczd_b2":"99","zjzczd_c1":"99","zjzczd_c2":"99","zjzczd_d1":"99","zjzczd_d2":"99","llctbg_a":"99","llctbg_b":"99","llctbg_c":"99","llctbg_d":"99","zgjbhc":"1","zgjbhc_a":"99","zgjbhc_b":"99","zgjbhc_c":"99","zgjbhc_d":"99","llctdm_a1":"99","llctdm_a2":"99","llctdm_b1":"99","llctdm_b2":"99","llctdm_c1":"99","llctdm_c2":"99","llctdm_d1":"99","llctdm_d2":"99","llctgjbhc_a":"99","llctgjbhc_b":"99","llctgjbhc_c":"99","llctgjbhc_d":"99","zjjczxwy_1":"99","zjjczxwy_2":"776","zjjcnz":"1","zjjcnz_1":"77","zjjcnz_2":"77","tzdjl_a":"666","tzdjl_b":"6766","tzdjl_c":"676","tzdjl_d":"66","jcdmjtc_a":"88","jcdmjtc_b":"88","jcdmjtc_c":"88","jcdmjtc_d":"88","jcgk":"1","jcgk_ab":"88","jcgk_bc":"88","jcgk_cd":"88","jcgk_da":"88","jcgk_ac":"88","jcgk_bd":"88","text_tower_number":"8R025","tower_number":"8R025","text_sgjl":"灌注桩评级","sgjl":"灌注桩评级","banzu":"河南金信第一班组","stake_date":"2018-08-08","check_date":"2018-08-09","stake_number":"P27R","tower_type":"MT-48","jm_a":"11","jm_b":"11","jm_c":"22","jm_d":"22","jcxs_a":"44","jcxs_b":"44","jcxs_c":"54","jcxs_d":"5646"};
setFormData(data);


var data = {"lzdmcc_a":"878","lzdmcc_b":"66987","lzdmcc_c":"87987","lzdmcc_d":"7987","lldmcc_a":"79","lldmcc_b":"877","lldmcc_c":"79887","lldmcc_d":"987","ctdmcc_a":"7987","ctdmcc_b":"89798","ctdmcc_c":"797","ctdmcc_d":"98798","dlgg_a":"9879","dlgg_b":"7987","dlgg_c":"7978","dlgg_d":"7987","zjctggsl_a":"979","zjctggsl_b":"979","zjctggsl_c":"9798","zjctggsl_d":"97798","zjlzggsl_a":"9879","zjlzggsl_b":"987798","zjlzggsl_c":"97879","zjlzggsl_d":"9798","zjllggsl_a":"9799","zjllggsl_b":"9798","zjllggsl_c":"78988","zjllggsl_d":"789987","gjlzggsl_a":"987798","gjlzggsl_b":"9789987","gjlzggsl_c":"98789","gjlzggsl_d":"98778","gjllggsl_a":"89779","gjllggsl_b":"879798","gjllggsl_c":"978798","gjllggsl_d":"7998","text_tower_number":"8S029","tower_number":"8S029","text_sgjl":"承台/连梁签证","sgjl":"承台/连梁签证","banzu":"112343423443","stake_number":"P31G（J7 1G)","text_jldw":"河南送变电2","jldw":"河南送变电2","sgjm_a":"9898","sgjm_b":"8979","sgjm_c":"8989","sgjm_d":"899","jcxh_a":"ZJT343H","jcxh_b":"ZJT343H","jcxh_c":"ZJT343H","jcxh_d":"ZJT343H","gjbhchd_a":"999","gjbhchd_b":"9879","gjbhchd_c":"8997","gjbhchd_d":"96756","gcbgk":"3","jcbgk_ab":"7667","jcbgk_ba":"8","jcbgk_bc":"87686","jcbgk_cb":"8767","jcbgk_bd":"7687","jcbgk_dc":"78968","jcbgk_da":"8768","jcbgk_ad":"687","jcbgk_ao":"8687","jcbgk_bo":"876","jcbgk_co":"68","jcbgk_do":"868"};
setFormData(data);

var data = {"text_tower_number":"8S118","tower_number":"8S118","text_sgjl":"灌注桩3-1","sgjl":"灌注桩3-1","banzu":"65456","jcbh":"5756","zjxs":"765765","tx":"SJ30105JD-54","jcxs":"ZJT351","zkh":"75756","gz_start_date":"2018-08-08","gz_start_time":"10:51:00","gz_end_date":"2018-08-08","gz_end_time":"10:51:00","gjgjzj":"67678","gjgjcd":"867868","gjjj":"878667","jgzj":"87878","jgcd":"878787","jgsl":"787887","jgjj":"8787","jqjjj":"8778","htdbg":"8787","kdcdchd":"7887","ldti":"8778","dgjmj":"8778","dgbzqk":"7887","dgzc":"7878","fsff":"8787","spyjhdgmssd":"7887","ckfs":"868","zkzj":"8787","zksd":"878","szwd_f":"87687","szwd_t":"878","hntqd":"887","skqd":"8878","dld":"8787","shuini":"8787","kf":"887","fmh":"887","sha":"8787","shi":"8787","shui":"878","wjj":"878","qita":"88","snbz":"88787","szgg":"887","szlj":"88","_s_data":[{"gz_date":"2018-08-08","gz_time":"11:04:00","ds":"7887","zsl":"6867","knhntbg":"8687","cgcd":"687","mgsd":"66"},{"gz_date":"2018-08-09","gz_time":"11:05:00","ds":"8989","zsl":"998","knhntbg":"9898","cgcd":"9898","mgsd":"99999"},{"gz_date":"2018-08-11","gz_time":"11:06:00","ds":"089809","zsl":"8989","knhntbg":"9898","cgcd":"9898","mgsd":"8998"}]};
setFormData(data);

var data = {"lzdmcc_a":"0909","lzdmcc_b":"9","lzdmcc_c":"99","lzdmcc_d":"9009","lldmcc_a":"090","lldmcc_b":"0909","lldmcc_c":"90","lldmcc_d":"9009","ctdmcc_a":"0909","ctdmcc_b":"0909","ctdmcc_c":"090","ctdmcc_d":"009","dlgg_a":"090","dlgg_b":"0909","dlgg_c":"0909","dlgg_d":"0909","zjctggsl_a":"0909","zjctggsl_b":"0909","zjctggsl_c":"00","zjctggsl_d":"090","zjlzggsl_a":"0909","zjlzggsl_b":"090","zjlzggsl_c":"090","zjlzggsl_d":"090","zjllggsl_a":"00","zjllggsl_b":"00","zjllggsl_c":"090","zjllggsl_d":"88","gjlzggsl_a":"08","gjlzggsl_b":"998","gjlzggsl_c":"898","gjlzggsl_d":"8989","gjllggsl_a":"89980","gjllggsl_b":"098","gjllggsl_c":"890809","gjllggsl_d":"8098","text_tower_number":"8S032","tower_number":"8S032","text_sgjl":"承台/连梁签证","sgjl":"承台/连梁签证","banzu":"河南金信第一班组","stake_number":"P34G","text_jldw":"河南送变电1","jldw":"河南送变电1","sgjm_a":"0","sgjm_b":"0","sgjm_c":"0","sgjm_d":"0","jcxh_a":"Z346H","jcxh_b":"Z346H","jcxh_c":"Z346H","jcxh_d":"Z346H","gjbhchd_a":"09098","gjbhchd_b":"0990","gjbhchd_c":"0909","gjbhchd_d":"0909","gcbgk":"3","jcbgk_ab":"0909","jcbgk_ba":"0990","jcbgk_bc":"0909","jcbgk_cb":"0990","jcbgk_bd":"9090","jcbgk_dc":"0909","jcbgk_da":"0909","jcbgk_ad":"09","jcbgk_ao":"090","jcbgk_bo":"9009","jcbgk_co":"0909","jcbgk_do":"0909"}


var data = {"zjtjd":"1","zjtjd_d":"8989","zjtjd_f":"9889","zjtjd_m":"8998","zxtwz":"888","jcgk_ab":"88","jcgk_bc":"88","jcgk_cd":"88","jcgk_da":"88","jcgk_ac":"88","jcgk_bd":"88","jcks_a":"88","jcks_b":"88","jcks_c":"88","jcks_d":"88","kddmcc_a1":"88","kddmcc_a2":"88","kddmcc_b1":"88","kddmcc_b2":"88","kddmcc_c1":"88","kddmcc_c2":"88","kddmcc_d1":"88","kddmcc_d2":"88","dcdb_l":"88","dcdb_w":"88","dchd":"88","text_tower_number":"8S039","tower_number":"8S039","text_sgjl":"普通基础分坑","sgjl":"普通基础分坑","banzu":"河南金信第一班组","tower_type":"SZ30103JD-54","hcg":"8888","jcxs":"Z33P36","jm_a":"0","jm_b":"0","jm_c":"0","jm_d":"0","startDate":"2018-08-08","checkDate":"2018-08-18"}

var chk_key = "_data_jsjl";
var chk_content = window.localStorage.getItem(chk_key);
var chk_data = JSON.parse(chk_content);
console.info("chk_data: ", JSON.stringify(chk_data));

