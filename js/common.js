if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", "/css/adapter.css");
    document.getElementsByTagName("head")[0].appendChild(link);
}
_indList = new Array();
_indList[0] = ([ "Bing","Baidu", "Google","Github",
"https://cn.bing.com/search?q=","http://www.baidu.com/s?wd=", "https://ditu.amap.com/search?query=", "https://www.google.com/search?q="]);
_indList[1] = ([ "CSDN","Yahoo","linux", "Yandex",
"https://so.csdn.net/so/search?q=", "https://search.yahoo.com/search?p=","https://www.runoob.com/?s=", "https://yandex.com/search/?text="]);
_indList[2] = (["Scholar","Bing学术","Sci-hub", "百度学术", 
"https://xs2.studiodahu.com/scholar?q=", "https://cn.bing.com/academic/search?q=", "https://sci-hub.se/", "http://xueshu.baidu.com/s?wd="]);
_indList[3] = (["知乎", "百科","Drug","Wiki", 
"https://www.zhihu.com/search?type=content&q=", "http://baike.baidu.com/item/","https://go.drugbank.com/unearth/q?utf8=%E2%9C%93&searcher=drugs&query=","http://en.wikipedia.org/wiki/"]);
_indList[4] = ([ "谷歌翻译","百度翻译","有道词典","WEBSTER",
 "https://translate.google.cn/#en/zh-CN/","http://fanyi.baidu.com/translate#zh/en/", "http://dict.youdao.com/search?q=","https://www.merriam-webster.com/dictionary/"]);
_indList[5] = (["淘宝","京东", "天猫", "当当", 
"https://s.taobao.com/search?q=","http://search.jd.com/Search?enc=utf-8&keyword=","http://list.tmall.com/search_product.htm?_input_charset=utf-8&q=","http://search.dangdang.com/?key="]);
_indList[6] = (["PubChem", "PDB", "JMC","PubMed", 
"https://pubchem.ncbi.nlm.nih.gov/#query=","https://www.rcsb.org/structure/","https://pubs.acs.org/action/doSearch?AllField=","https://pubmed.ncbi.nlm.nih.gov/?term="]);
_usrslt = 0;


var params={XOffset:0,YOffset:0,fontColor:"#444",fontColorHI:"#000",fontSize:"16px",fontFamily:"arial",borderColor:"gray",bgcolorHI:"#ebebeb",sugSubmit:!1};

//BaiduSuggestion.bind("iptsrh", params, show);
BaiduSuggestion.bind("iptsrh", params);

Msg = '请输入...';
$("#iptsrh").click(function(){
	if($("#iptsrh").val()==Msg) {
		$("#iptsrh").val('');
	}
});
$("#iptsrh").focus();

$("span[id$='srch']").click(function() {
	
    $("span[id$='srch']").attr("class", "bgsrh bgsrhnbt");
    $(this).attr("class", "bgsrh bgsrhbt");
    _usrslt = $(this).attr("tmp");
    $("#srhbt0").html(_indList[_usrslt][0]);
    if (_indList[_usrslt][1] == "") {
        $("#srhbt1").hide()
	} else {
        $("#srhbt1").show();
        $("#srhbt1").html(_indList[_usrslt][1])
    }
    if (_indList[_usrslt][2] == "") {
        $("#srhbt2").hide()
	} else {
        $("#srhbt2").show();
        $("#srhbt2").html(_indList[_usrslt][2])
    }
    if (_indList[_usrslt][3] == "") {
        $("#srhbt3").hide()
	} else {
        $("#srhbt3").show();
        $("#srhbt3").html(_indList[_usrslt][3])
    }
    $("#iptsrh").focus()
});
$("button[id^='srhbt']").click(function() {
    var _idstr = $(this).attr("id");
    _idstr = parseInt(_idstr.charAt(_idstr.length - 1)) + 4;
    _srhstr = $("#iptsrh").val();
    openTag(_idstr, _srhstr)
});
$(document).keydown(function(event) {
    if (event.keyCode == 13) {
        _srhstr = $("#iptsrh").val();
        if (_srhstr != "" && $("[class='bdSug_ml']").html() == null) {
            openTag(4, _srhstr)
        }
    }
});


function show(str) {
    openTag(4, str)
}
function HTMLDeCode(str) {
    var s = "";
    if (str.length == 0) {
        return ""
    }
    s = str.replace("&", "%26");
    return s;
}
function openTag(_idstr, _srhstr) {
	if (_srhstr=='') {
		$("#iptsrh").val(Msg);	
		$("#iptsrh").focus();
		return false;
	}
	if(_usrslt==5 && _idstr==5){_srhstr=utfToGbk(_srhstr,_indList[_usrslt][_idstr])}
	else{		
		_srhstr = encodeURI(_srhstr);
	}
	var newTab=window.open('about:blank');
	newTab.location.href = _indList[_usrslt][_idstr] + HTMLDeCode(_srhstr);
}
function utfToGbk(_str, _url) {
    $.ajaxSetup({
        async: false
    });
    $code = "";
    $.post("tran.php?f=1", {
        utf: _str
    },
    function(result) {
        $code = result;
    });
    return $code;
};
