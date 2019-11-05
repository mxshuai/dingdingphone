// 这里放置全局的变量
//const isDev = __LOCAL__;
const isDev = false;
const basicJSON = {
                                   "interestLevel":{
                                      "default":"请选择",
                                      "typetext":"请选择",
                                      "icon":true,
                                      "value":'',
                                      "errtxt":"",
                                      "source":[]                            
                                  },
                                   "minAmount":{
                                      "default":"请选择",
                                      "typetext":"请选择",
                                      "icon":true,
                                      "errtxt":"",
                                      "value":'',
                                      "source":[]
                                  },
                                   "productDate":{
                                      "default":"适用产品和有效期",
                                      "typetext":"请选择适用产品和有效期",
                                      "icon":true,
                                      "errtxt":"",
                                      "value":'',
                                      "source":[]
                                  },
                                   "validityPeriod":{
                                      "default":"有效期",
                                      "typetext":"请选择有效期",
                                      "icon":true,
                                      "errtxt":"",
                                      "value":'',
                                      "source":[]
                                  },
                                   "applyNum":{
                                      "default":"申请张数",
                                      "typetext":"请选择申请张数",
                                      "icon":true,
                                      "errtxt":"",
                                      "value":'',
                                      "source":[]
                                  },
                                  "id":''
                    };
const urlPrefix = isDev ? '/mock/' : '/';

export default {
  urlPrefix,
  isDev,
  basicJSON,
  // 这里放置全局的调用的URL
  URLS: {},
};
