window.util_GH = window.util_GH || {};

window.__GH_LOGIN_DONE__ = window.__GH_LOGIN_DONE__ || false;

function getAuthenticatedUid() {
    if (!window.localStorage) return "";
    if (localStorage.getItem("gtd_logged_in") !== "true") return "";
    return localStorage.getItem("gtd_uid") || "";
}

util_GH.login = function () {
    if (window.__GH_LOGIN_DONE__) {
        console.log(" [GH] login skipped (already done)");
        return true;
    }

    var uid = getAuthenticatedUid();
    if (!uid) {
        console.warn(" [GH] login blocked: missing authenticated session");
        window.location.replace("Login.html");
        return false;
    }

    window.__GH_LOGIN_DONE__ = true;
    window.gEntrix = window.gEntrix || {};
    gEntrix.host_id = uid;
    gEntrix.uniq_id = uid;
    console.log(" [GH] util_GH.login() authenticated user " + uid);

    if (window.WSS) {
        // PVP enabled — do NOT override WSS.init, let it connect to local PVP server
        WSS.msg_decoding_ERROR = WSS.msg_decoding_ERROR || function () { };
        console.log(" [GH] WSS PVP mode enabled (local server)");
    }

    if (window.NOTICE_FOREVER && typeof NOTICE_FOREVER.start === "function") {
        var rawNotice = NOTICE_FOREVER.start;
        NOTICE_FOREVER.start = function (msg) {
            if (String(msg || "").includes("Another device connects")) {
                console.warn("[GH] Suppressed duplicate login notice");
                return;
            }
            return rawNotice.apply(this, arguments);
        };
    }

    Main.do_next();

    return true;
};

util_GH.logout = function () {
    if (window.sessionStorage) sessionStorage.removeItem("gtd_session");
    if (window.localStorage) localStorage.removeItem("gtd_logged_in");
    window.location.replace("Login.html");
};

util_GH.get_login_id = function () {
    return getAuthenticatedUid();
};

util_GH.get_user_id = function () {
    return getAuthenticatedUid();
};

util_GH.get_user_name = function () {
    return (window.localStorage && localStorage.getItem("gtd_user")) || "";
};

util_GH.get_platform = function () {
    return "GH";
};

util_GH.is_login = function () {
    return !!getAuthenticatedUid();
};

util_GH.open_payment = function (data) {
    console.log(" [GH] Payment unavailable on local authenticated backend:", data);
};

console.log(" [GH] util_GH.js loaded for authenticated local backend.");