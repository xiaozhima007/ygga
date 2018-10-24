###Welcome to use MarkDown
页面url:
http://127.0.0.1/sjsc/view/sjsc/sjsc-1.html?param={"tokenId":"ffd9bc23d7a54065a6f6d77e69f1dc0d8","projId":"C7C9291BD1F75ACADE695971041A376F","userId":"5003","apiBase":"http://127.0.0.1/grm/ecpm.proj.hnsbd/AndroidService"}
http://127.0.0.1/sjsc/view/sjsc/sjsc-record.html?param={"tokenId":"0d6af90c14b44941882a9b2b84b35a48","projId":"DA4B58AE931F99E6B052B0CE1011DDBA","userId":"5009",%22apiBase%22:%22http://127.0.0.1/grm/ecpm.proj.hnsbd/AndroidService%22}

接口：getPayCheckBanzuList  三交三查获取班组列表信息   tokenId:tokenId:   {{"code":"200","data":[{"teanId":"班组id","teamName":"班组名称"}],"message":"获取数据成功！"}}

接口：getPayCheckPush  三交三查推送     tokenId:tokenId; data:[{teamId:"班组id"}]  {"code":"200","data":{"isSuccess":"1"},"message":"获取数据成功！"}

接口：payCheckNotReadUser  //三交三查推送信息未读用户信息
参数：tokenId:"tokenId",date:"2018-09-05"
返回值：{"code":"200","data":[{"userId":"userId","xsmc":"用户名称","teamName":"班组名称","teammanageId":"班组id"}],"message":"获取数据成功！"}
http://192.168.10.254:9080/grm/ecpm.proj.hnsbd/AndroidService/userLogin?param={"passWord":"abcd.1234","userName":"xz"}
http://192.168.10.140:9080/grm/ecpm.proj.hnsbd/AndroidService/getPayCheckBanzuList?param={"tokenId":"2d8a924cb1a54dd6945411552f9495ab"}
http://192.168.10.140:9080/grm/ecpm.proj.hnsbd/AndroidService/getPayCheckPush?param={"tokenId":"1dd00037aa1a484dade2ff864c9133f2","projId":"C7C9291BD1F75ACADE695971041A376F","userId":"5003","data":[{"teamId":"88FBD15792022AF1260DAFB58B0C6EF3"},{"teamId":"12AE0F4E193776A816A64DBED5062C04"}]}
http://192.168.10.140:9080/grm/ecpm.proj.hnsbd/AndroidService/payCheckNotReadUser?param={"tokenId":"1dd00037aa1a484dade2ff864c9133f2","projId":"C7C9291BD1F75ACADE695971041A376F","userId":"5003","date":"2018-09-05"}
完整url:
 
http://47.104.110.20:7001/grm/ecpm.proj.hnsbd/AndroidService/getPayCheckPush?param={"tokenId":"0d6af90c14b44941882a9b2b84b35a48","projId":"DA4B58AE931F99E6B052B0CE1011DDBA","userId":"5009","data":[{teamId:"88FBD15792022AF1260DAFB58B0C6EF3"},{teamId:"3F50F52E0480AD5B42147D67B28B8B76"}]}
http://47.104.110.20:7001/grm/ecpm.proj.hnsbd/AndroidService/userLogin?param={%22passWord%22:%22abcd.1234%22,%22userName%22:%22zhouxiaogang%22}
http://47.104.110.20:7001/grm/ecpm.proj.hnsbd/AndroidService/getPayCheckBanzuList?param={"tokenId":"2d8a924cb1a54dd6945411552f9495ab"}
http://47.104.110.20:7001/grm/ecpm.proj.hnsbd/AndroidService/payCheckNotReadUser?param={"tokenId":"0d6af90c14b44941882a9b2b84b35a48","projId":"DA4B58AE931F99E6B052B0CE1011DDBA","userId":"5009",%22date%22:%222018-09-05%22}

"data":[{"teamId":"122588321D25F0F0434A8C4297852BD2","teamName":"班组C"},{"teamId":"6D547A52F177A0FAD1E5732CE5BBA710","teamName":"777"},{"teamId":"12AE0F4E193776A816A64DBED5062C04","teamName":"333"},{"teamId":"FE937F3AD15178792E561E62C0EAB005","teamName":"666"},{"teamId":"67BBD3EE7B6839ADA7A6BFCF129AE17A","teamName":"555"}]

"data":[{"teamId":"88FBD15792022AF1260DAFB58B0C6EF3"},{"teamId":"122588321D25F0F0434A8C4297852BD2"},{"teamId":"6D547A52F177A0FAD1E5732CE5BBA710"},{"teamId":"276601E3B733F6AB428AD0265DEA28B5"},{"teamId":"12AE0F4E193776A816A64DBED5062C04"},{"teamId":"FE937F3AD15178792E561E62C0EAB005"},{"teamId":"67BBD3EE7B6839ADA7A6BFCF129AE17A"},{"teamId":"3F50F52E0480AD5B42147D67B28B8B76"}]



