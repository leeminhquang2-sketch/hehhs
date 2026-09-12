/**********************************************
 *
 *  - util_Global.js에서 아래 Platform.init()을 호출함.
 *  - 각플랙폼별 내용을 기재한다. *
 * file name 	platform.js
 *
 **********************************************/

var Platform =	{}

Platform.init = function()
{
	////////////////////////////////////버전발행시 체크사항 1.  app_release의 "RELEASE"여부 //////////////////////////////////////////
	glo.app_release = "TEST"; // Chế độ TEST để bỏ qua kiểm tra AndroidBridge và Server CDN
	glo.platform = glo.PLATFORM.AMO;
	glo.enable_server = 0;
	glo.enable_server2 = 0;
	glo.enable_guild = 0;

	////////////////////////////////////버전발행시 체크사항 3.  버전명 표기 등 최신 update했는가 //////////////////////////////////////////
	switch(glo.platform)
	{
		case glo.PLATFORM.ATV:  
							glo.URL_prefix = "./";
							glo.app_name   = "TOWER_DEFENCE_ATV";
							glo.version    = "TD_ATV_20231120";
							DEFINE.MONTH_MAX_PAYMENT = 100000000; //ATV는 제한이 없다. 1억으로 설정해 두자	 
							glo.is_numkey = false; //숫자 키패드가 없다. default는 true이기 때문에 다른 플랫폼에는 할 필요 없음. --> 하지만 key pad있는 놈들도 있더라.
							                       //숫자 키패드 관련 처리는, S_ATTENDANCE.js에서 처리 한다. 
							break;	
		case glo.PLATFORM.AMO:  
							glo.URL_prefix = (typeof location !== "undefined" && location.hostname === "103.143.208.18") ? "http://103.143.208.18/TOWERDEFENCE_AMO/" : "./";
							glo.URL_prefix_common = (typeof location !== "undefined" && location.hostname === "103.143.208.18") ? "http://103.143.208.18/TOWERDEFENCE_COMMON/" : "./";
							glo.app_name   = "TOWER_DEFENCE_AMO";
							glo.version    = "TD_AMO_20240621";
							DEFINE.MONTH_MAX_PAYMENT = 100000000; //AMO는 제한이 없다. 1억으로 설정해 두자
							glo.mouse.use = 1; //Android Mobile은 touch전용이다. 여기에 명시하지 않으면 default는 0값을 가진다.  							
							break;							

	}

	//플랫폼이 정해졌다면, 플랫폼에 맞는 goods를 define하라.
	DEFINE.goods(); 

	// AndroidBridge Mocking for standalone browser execution
	if (typeof window.AndroidBridge === "undefined") {
		window.AndroidBridge = {
			setKeyBlock: function() {},
			getSTBId: function() { return "LOCAL_STB_001"; },
			getSTBModel: function() { return "WEB_LOCAL"; },
			getSTBName: function() { return "LOCAL_DEV"; },
			getSTBIp: function() { return "127.0.0.1"; },
			getSTBMac: function() { return "00:00:00:00:00:00"; },
			getSTBAddr: function() { return "LOCAL"; },
			getLang: function() { return "en"; },
			checkPaymentMonth: function() { return "T99"; }
		};
	}
}	