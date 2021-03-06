/**
 * 初始化代理商管理详情对话框
 */
var TAgentInfoDlg = {
    tAgentInfoData : {}
};

/**
 * 清除数据
 */
TAgentInfoDlg.clearData = function() {
    this.tAgentInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称b
 * @param val 数据的具体值
 */
TAgentInfoDlg.set = function(key, val) {
    this.tAgentInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
TAgentInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
TAgentInfoDlg.close = function() {
    parent.layer.close(window.parent.TAgent.layerIndex);
}

/**
 * 收集数据
 */
TAgentInfoDlg.collectData = function() {
    this
    .set('id')
    .set('username')
    .set('password')
    .set('phone')
    .set('nickName')
    .set('level')
    .set('status')
    .set('agentId')
    .set('agentOneId')
    .set('agentTwoId')
    .set('createTime')
    .set('updateTime')
    .set('fee')
    ;
}

/**
 * 提交添加
 */
TAgentInfoDlg.addSubmit = function() {
    $("#ensure").attr("disabled",true);
    if(!(/^1[3456789]\d{9}$/.test(this.get("username")))){
        Feng.error("登录名输入有误！");
        $("#ensure").removeAttr("disabled");
        return;
    }
    if(!(/^1[3456789]\d{9}$/.test(this.get("phone")))){
        Feng.error("手机号码输入有误");
        $("#ensure").removeAttr("disabled");
        return;
    }

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/tAgent/add", function(data){
        if(data.code == 200){
            Feng.success("添加成功!");
            $("#ensure").removeAttr("disabled");
            window.parent.TAgent.table.refresh();
            TAgentInfoDlg.close();
        }else{
            Feng.error(data.message);
            $("#ensure").removeAttr("disabled");
        }

    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
        $("#ensure").removeAttr("disabled");
    });
    ajax.set(this.tAgentInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
TAgentInfoDlg.editSubmit = function() {
    $("#ensure").attr("disabled",true);
    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/tAgent/update", function(data){
        if(data.code == 200){
            Feng.success("修改成功!");
            $("#ensure").removeAttr("disabled");
            window.parent.TAgent.table.refresh();
            TAgentInfoDlg.close();
        }else{
            Feng.error(data.message);
            $("#ensure").removeAttr("disabled");
        }
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
        $("#ensure").removeAttr("disabled");
    });
    ajax.set(this.tAgentInfoData);
    ajax.start();
}



/**
 * 提交修改
 */
TAgentInfoDlg.fuzhi = function() {
    var Url2=document.getElementById("shareUrl");
    Url2.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    layer.alert("复制成功！",{
        title:'提示',
    });
}

$(function() {
     var statusValue = $("#statusValue").val();
     if(statusValue == null || statusValue == undefined){
            $("#status").val(1);
     }else{
            $("#status").val(statusValue);
     }
});
