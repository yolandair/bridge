  /**
 * @author 张玺
 * @class
 * @classdesc 用于客户端内网页和客户端的通信,参数不需要URL编码.
 * @example
 * var bridge = new Bridge();
 * bridge.Back() //返回上一页面
 * bridge.ShowWeb("http://m.chinaso.com","手机国搜") //在新视图中打开页面
*/
function Bridge()
{
  var theScheme = "chinaso.app"
  var isAndroid = navigator.userAgent.match(/android/gi);
  var isIos = navigator.userAgent.match(/iphone|ipod/gi);


  /**
   * @param {Object} param - 向客户端发送的数据
  */
  function post(param)
  {
    if(isIos)
    {
      var query = "";
      var value = "";
      for(key in param)
      {
        value = param[key];
        // if(key == "url"){
        //  value = decodeURIComponent(value);
        // }
        query += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
      }
      query = query.slice(0,query.length-1)
      query = query.replace(/'/g,"\\'");
      var url = "window.location.href = '"+theScheme+"://?"+query+"'"
      setTimeout(url, 10);
    }
    if(isAndroid)
    {
      var paramArray = {}
      for(key in param)
      {
        paramArray[key] = param[key];
      }
      try {
        window.ActionBridge.post(JSON.stringify(paramArray))
      } catch (error){

      }
    }
    console.log(document.location.host);
    if(document.location.host == "")
    {
      debugPost(param);
    }
  }
  /**
   * [调试用]会alert出向客户端发送的信息
   * @param {Object} param - 向客户端发送的数据
  */
  function debugPost(param)
  {
    var query = "";
    var value = "";
    for(key in param)
      {
        value = param[key];
        // if(key == "url"){
        //  value = decodeURIComponent(param[key]);
        // }
        query += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
      }
    query = query.slice(0,query.length-1)
    query = query.replace("'","\\'");
    var url = theScheme+"://?"+query

    var paramArray = {}
    for(key in param)
    {
      paramArray[key] = param[key];
    }
    var json = JSON.stringify(paramArray)

    console.log(url);
    console.log(json);
    alert(url);
    alert(json);
  }
  /**
   * 仅支持iOS
   * https://github.com/bang590/JSPatch
   * @param {String} jsScript - JSPatch 脚本
  */
  function Patch(jsScript)
  {
    post({"action":"Patch","jsScript":jsScript});
  }
  /**
  */
  function Back()
  {
    post({"action":"Back"});
  }
  /**
  */
  function Refresh()
  {
    post({"action":"Refresh"});
  }
  /**
  */
  function DeleteCard()
  {
    post({"action":"DeleteCard"});
  }
  /**
  */
  function SelectCity()
  {
    post({"action":"SelectCity"});
  }
  /**
  * @param {String} content - 关键字
  */
  function ShowSearchBar(content)
  {
    post({"action":"ShowSearchBar","content":content});
  }
  /**
  * @param {String} content - 关键字
  */
  function SetKeywords(content)
  {
    post({"action":"SetKeywords","content":content});
  }
  /**
  * @param {String} url - 加载的网页
  */
  function ShowManager(url)
  {
    post({"action":"ShowManager","url":url});
  }
  /**
  * @param {String} url - 加载的网页
  * @param {String} title - 显示在顶部的标题
  */
  function ShowNavWeb(url,title)
  {
    post({"action":"ShowNavWeb",
         "url":url,
         "title":title});
  }
  /**
  * @param {Number} height - 卡片要被设置高度
  */
  function ChangeCardHeight(height)
  {
    post({"action":"ChangeCardHeight","height":height});
  }
  /**
  */
  function ShowMenu()
  {
    post({"action":"ShowMenu"});
  }
  /**
  */
  function NeedLogin()
  {
    post({"action":"NeedLogin"});
  }
  /**
  */
  function RefreshHomeCardList()
  {
    post({"action":"RefreshHomeCardList"});
  }
  /**
  * @param {String} functionName - 需要下拉刷新时被调用的js语句
  */
  function NeedPullToRefresh(functionName)
  {
    post({"action":"NeedPullToRefresh",
      "function":functionName});
  }
  /**
  * 显示分享工具栏
  * @param {String} title   - 分享的标题
  * @param {String} url     - 分享的URL
  * @param {String} content - 分享的详情
  * @param {String} pic     - 分享的图片URL
  */
  function ShowShareToolbar(title,url,content,pic)
  {
    post({"action":"ShowShareToolbar",
          "title":title,
          "url":url,
          "content":content,
          "pic":pic});
  }
  /**
  * @param {String} title   - 分享的标题
  * @param {String} url     - 分享的URL
  * @param {String} content - 分享的详情
  * @param {String} pic     - 分享的图片URL
  * @param {String} commentURL - 评论页URL
  * @param {String} nid        - 新闻nid
  * @param {String} contentId  - 新闻contentId
  */
  function ShowCommentToolbar(title,url,content,pic,commentURL,nid,contentId)
  {
    post({"action":"ShowCommentToolbar",
        "title":title,
          "url":url,
        "content":content,
        "pic":pic,
        "count":0,
        "commentURL":commentURL,
        "nid":nid,
        "contentId":contentId,
        "fchkLcom":"0"});
  }
  /**
  * @param {String} nid        - 新闻nid
  * @param {String} contentId  - 新闻contentId
  */
  function ShowCommentListToolbar(nid,contentId)
  {
    post({"action":"ShowCommentListToolbar",
        "nid":nid,
        "contentId":contentId,
        "fchkLcom":"0"});
  }
  /**
  * @param {String} functionName - 需要播放视频时被调用的js语句
  */
  function PlayVideo(functionName)
  {
    post({"action":"PlayVideo",
      "function":functionName});
  }
  /**
  * @param {String} url - 视频文件URL
  */
  function GetVideo(url)
  {
    post({"action":"GetVideo",
           "url":url});
  }
  /**
  * 弹出分享菜单
  * @param {String} title    - 分享的标题
  * @param {String} url      - 分享的URL
  * @param {String} content  - 分享的详情
  * @param {String} pic      - 分享的图片URL
  * @param {String} platform - 指定分享到哪里(QQ,WechatSession,WechatTimeline)，空则为全平台
  */
  function Share(title,url,content,pic,platform)
  {
    post({"action":"Share",
         "title":title,
           "url":url,
       "content":content,
           "pic":pic,
      "platform":platform});
  }
  /**
  * @param {String} url - 加载的网页
  * @param {String} title - 显示在顶部的标题
  */
  function ShowWeb(url,title)
  {
    post({"action":"ShowWeb",
         "url":url,
           "title":title});
  }
  /**
  * @param {String} content - 反馈的内容
  * @param {String} contact - 反馈人的联系方式
  */
  function FeedBack(content,contact)
  {
    post({"action":"FeedBack",
       "content":content,
           "contact":contact});
  }


  this.post=post;
  this.debugPost=debugPost;
  this.Back=Back;
  this.Refresh=Refresh;
  this.DeleteCard=DeleteCard;
  this.SelectCity=SelectCity;
  this.ShowSearchBar=ShowSearchBar;
  this.SetKeywords=SetKeywords;
  this.ShowManager=ShowManager;
  this.ShowNavWeb=ShowNavWeb
  this.ChangeCardHeight=ChangeCardHeight
  this.ShowMenu=ShowMenu;
  this.NeedLogin=NeedLogin;
  this.RefreshHomeCardList=RefreshHomeCardList;
  this.NeedPullToRefresh=NeedPullToRefresh;
  this.ShowShareToolbar=ShowShareToolbar;
  this.ShowCommentToolbar=ShowCommentToolbar;
  this.PlayVideo=PlayVideo;
  this.GetVideo=GetVideo;
  this.Share=Share;
  this.ShowWeb=ShowWeb;
  this.ShowCommentListToolbar=ShowCommentListToolbar;
  this.FeedBack=FeedBack;
  this.Patch=Patch;
}

module.exports = Bridge;
