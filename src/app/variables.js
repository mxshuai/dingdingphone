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
                                      "typetext":"1张",
                                      "icon":true,
                                      "errtxt":"",
                                      "value":'1',
                                      "source":[{
                                                  "value":"1",
                                                  "key": "1张"
                                              }, 
                                              {
                                                  "value":"2",
                                                  "key": "2张"
                                              },
                                              {
                                                  "value":"3",
                                                  "key": "3张"
                                              },
                                              {
                                                  "value":"4",
                                                  "key": "4张"
                                              },
                                              {
                                                  "value":"5",
                                                  "key": "5张"
                                              }]
                                  },
                                  "fileList":[],
                                  "photoList":[],
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
