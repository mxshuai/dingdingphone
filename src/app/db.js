import nattyFetch from 'natty-fetch';
import 'dingtalk-jsapi/entry/mobile';
import showPreloader from 'dingtalk-jsapi/api/device/notification/showPreloader';
import hidePreloader from 'dingtalk-jsapi/api/device/notification/hidePreloader';

import { urlPrefix, isDev } from './variables';

// See https://github.com/Jias/natty-fetch for more details.
const context = nattyFetch.context({
  mockUrlPrefix: urlPrefix,
  urlPrefix,
  mock: isDev,
  // jsonp: true,
  withCredentials: false,
  traditional: true,
  //data: {
   // _tb_token_: '',
  //},
  //delay:1000,
  method:'POST',
  timeout: 0,
  didFetch: () => hidePreloader(),
  // 请按照需要开启
  fit(response) {
      //alert(JSON.stringify(response))
      return {
              success:response.message,
              content: response,
              error: {
                errorMsg: response.message,
                errorCode: response.code
              },
            };   
  },
  willFetch() {
                showPreloader({
                text: "loading..", //loading显示的字符，空表示不显示文字
                showIcon: true, //是否显示icon，默认true
                onSuccess : function(result) {
                    /*{}*/
                },
                onFail : function(err) {}
            })
  
    }

});

context.create('SomeModuleAPI', {

//获取部门列表
  getDepartment: {
    mockUrl: 'query/mockjson.json',
    url: '/act_web/actdingding/v1/04',
    data:{},
    
  },
 
  //活动和活动id获取
  getActivityId: {
    mockUrl: 'query/activejson.json',
    url: '/act_web/actdingding/v1/02',
    data:{},//默认为红包、默认选中  运营部门
    
  },
  //活动对应的模板信息
  getActivityInfo: {
    mockUrl: 'query/redjson.json',
    url: '/act_web/actdingding/v1/03',
    data:{},
   
  },
  submit: {
    mockUrl: 'query/redjson.json',
    url: '/act_web/actdingding/v1/01',
    data:{},
    
  },
});

export default context.api;
