import { Component } from 'refast';
import {Button,Skeleton,PhotoField,TextareaField, Group, TextField, Field } from 'saltui';
import Icon from 'salt-icon';
import * as dd from 'dingtalk-jsapi';
import { basicJSON } from '../../app/variables';

import RedBatch from 'components/red';
import RedSingle from 'components/red/single';
import InterestBatch from 'components/interest';
import InterestSingle from 'components/interest/single';
import logic from './logic';

import './PageDing.less';
const { Element } = Skeleton;

const statebasicJSON=JSON.parse(JSON.stringify(basicJSON));
const localbasicJSON=JSON.parse(JSON.stringify(basicJSON));

 const showToast=(message)=>{
         dd.device.notification.toast({          
                    text: message //提示信息
                   
                })
 }
export default class Page extends Component {
  constructor(props) {
    super(props, logic);
    this.state = {
      loaded:true,
      isrender: false,
      error:true,
      photoList: [{
          name: '111',
          response: {
            url: 'http://gtms02.alicdn.com/tps/i2/TB1Xe3SMpXXXXX6XpXXTCU0QpXX-300-300.jpg',
          },
        },],

        ajaxdata:{
                  "department":{
                        "default":"请选择部门",
                        "typetext":"请选择部门",
                        "value":"",
                        "icon":true,
                        "errtxt":"",
                        "source":[]
                    },    
                   
                     "activityName":{
                        "default":"请选择活动",
                        "typetext":"请选择活动",
                        "value":"",
                        "icon":true,
                        "errtxt":"",
                        "source":[]
                    },   
                     "rewardType":{
                        "default":"请选择奖励类型",
                        "typetext":"红包",//1-红包 3--加息券 5--现金奖励
                        "value":"1",//1-红包 3--加息券 5--现金奖励
                        "icon":true,
                        "errtxt":"",
                        "source":[{
                                "value":"1",
                                "key": "红包"
                            }, 
                            {
                                "value":"3",
                                "key": "加息券"
                            }]
                    },                       
                                    
                    "list":[statebasicJSON],
                     
                     "reqType":1,//1--红包/加息券 2--现金奖励
                     
                      "applyName":"申请人",//申请人
                      "singledata":{
                      "userPhone":{
                          default:"",
                          errtxt:""
                          },
                          "userName":{
                            default:"",
                            errtxt:""
                          },
                          "applyReason":{
                            default:"",
                            errtxt:""
                          }
                     },

                     "SingleOrBatch":{
                    "source": [{
                                "value":"1",
                                "key": "单张发放"
                            }, 
                            {
                                "value":"2",
                                "key": "批量发放"
                            }],
                      "value":'1',
                      "typetext":"单张发放",

                     },
                      "dingcode":"",
                }
                   
                          
    };

    
  }
 
  componentDidMount() {

  //this.dispatch('submit',this.state.ajaxdata);
    //设置加载组件
     /*if(this.props.route.path=="interest"){
           let obj={...this.state};
           obj['ajaxdata']['rewardType']=3;
           obj['ajaxdata']['rewardTypeName']="加息券";
          this.setState({});   
            //console.log(this.state)    
           
        }*/
    //this.dispatch('getActivityInfo','activityName',0,this.state.ajaxdata);
      //this.dispatch('fetch', 1231);

  
      this.dispatch('getDepartment',this.state.ajaxdata);
     var that=this;

         
            dd.runtime.permission.requestAuthCode({
                    corpId: 'ding3e33fd34c55530c7', // 企业id
                    onSuccess: function(info) {

                        //alert("code" + info.code)
                        that.state.ajaxdata.dingcode=info.code  //通过该免登授权码可以获取用户身份
                         //alert(JSON.stringify(that.state))
                        that.setState({});   

                    },
                    onFail: function(err) {

                        alert("error"+JSON.stringify(err))
                    }

              });
            dd.biz.navigation.setRight({
                  show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
                  control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                  text: '关闭',//控制显示文本，空字符串表示显示默认文本
                  onSuccess : function(result) {
                      dd.biz.navigation.close({
                            onSuccess : function(result) {
                                /*result结构
                                {}
                                */
                            },
                            onFail : function(err) {}
                              })
                  },
                  onFail : function(err) {}
              });
              dd.ui.pullToRefresh.enable({
                  onSuccess: function() {
                    window.location.reload();
                    dd.ui.pullToRefresh.stop();
                  },
                  onFail: function() {
                  }
              });
       
    }

   handleAjax=(workNo)=>{
    var a={"a":1,"b":1,"list":[{"c":1,"arr":[{"d":1},{"f":1}],"obj":{"g":1}}]}
    var b={"s":2,"b":2,"list":[{"c":2,"arr":[{"d":2},{"f":2}],"obj":{"g":2}}]}
    let {list:[{obj:asd}]}=a;
    b.list[0].obj=asd;
    //a.list[0].obj=b.list[0].obj;
    b.list[0].obj.g='3';
    console.log(a.list[0].obj)
    console.log(b.list[0].obj)
    console.log(asd)
      //this.dispatch('submit',this.state.ajaxdata);
  
    // this.dispatch('fetch', { workNo });

  }

  //通用清除已选值
  handleClearCommon=(prams,index)=>{
    //alert(index)
     if(typeof(index)==="undefined"){
          var index=0
         }

    let ajaxdata={...this.state.ajaxdata};//只能更新整个ajaxdata数据，不能写成this.state.ajaxdata.list[0]
     //alert(JSON.stringify(obj))
    ajaxdata["list"][index][prams]['typetext']=ajaxdata["list"][index][prams]['default'];
    ajaxdata["list"][index][prams]['value']="";
    ajaxdata["list"][index][prams]['value_cn']="";
    ajaxdata["list"][index][prams]['icon']=true;
    //清除之后联动初始化
    if(prams=='interestLevel'){
     ajaxdata["list"][index]["minAmount"]=localbasicJSON.minAmount;
     ajaxdata["list"][index]["productDate"]=localbasicJSON.productDate;
     ajaxdata["list"][index]["validityPeriod"]=localbasicJSON.validityPeriod;
     ajaxdata["list"][index]["applyNum"]=localbasicJSON.applyNum;
    }else if(prams=='minAmount'){
     ajaxdata["list"][index]["productDate"]=localbasicJSON.productDate;
     ajaxdata["list"][index]["validityPeriod"]=localbasicJSON.validityPeriod;
     ajaxdata["list"][index]["applyNum"]=localbasicJSON.applyNum;
    }else if(prams=='productDate'){
     ajaxdata["list"][index]["validityPeriod"]=localbasicJSON.validityPeriod;
     ajaxdata["list"][index]["applyNum"]=localbasicJSON.applyNum;
    }else if(prams=='validityPeriod'){
     ajaxdata["list"][index]["applyNum"]=localbasicJSON.applyNum;
    }    
    //alert(prams)
    this.setState({ajaxdata});//只能更新整个ajaxdata数据，不能写成this.state.ajaxdata.list[0]
    //alert(this.state.ajaxdata.list[0])
  }
  //通用选择框
  handleSelectCommon=(prams,index)=>{
    
       var that = this;
       //alert(index)
       if(typeof(index)==="undefined"){
        index=0;
       }
       let ajaxdata= {...this.state.ajaxdata};
       if(ajaxdata["list"][index][prams].source.length==0){
       showToast("无可选择项")
        return false;
       }      
      // alert(JSON.stringify(ajaxdata)) 
       dd.biz.util.chosen({
         source:ajaxdata["list"][index][prams].source,
         selectedKey:ajaxdata["list"][index][prams].source[0].key , // 默认选中的key
         onSuccess : function(result) {              
                    ajaxdata["list"][index][prams]['typetext']=result.key                   
                    ajaxdata["list"][index][prams]['value']=result.value                      
                    ajaxdata["list"][index][prams]['icon']=false
                    that.setState({ajaxdata});   
                    //alert(JSON.stringify(ajaxdata))                  
                    that.dispatch('getActivityInfo',prams,index,that.state.ajaxdata);
                    
                    
          },
         onFail : function(err) {}
      })

  }
  //活动专用清除已选值
  handleClearAct=(prams)=>{

    let ajaxdata={...this.state.ajaxdata}

    ajaxdata[prams]['typetext']=ajaxdata[prams]['default'];
    ajaxdata[prams]['value']="";
    ajaxdata[prams]['icon']=true;
    if(prams=="department"){

        ajaxdata["activityName"]['typetext']=ajaxdata["activityName"]['default'];
        ajaxdata["activityName"]['value']="";
        ajaxdata["activityName"]['icon']=true;
        ajaxdata["activityName"]['source']=[];
     }
    ajaxdata["list"]=[];
    //ajaxdata["list"][0]=localbasicJSON;//第一次清除之后会导致localbasicJSON已经改变，第二次再掉就变化了//貌似只有数组才会有问题，对象没有
    ajaxdata["list"][0]=JSON.parse(JSON.stringify(basicJSON));
    //alert(JSON.stringify(localbasicJSON))
    //alert(JSON.stringify(ajaxdata))

    this.setState({ajaxdata});

  }
  //活动专用选择框
  handleSelectAct=(prams)=>{
 
       var that = this;
       let ajaxdata={...that.state.ajaxdata}
       if(ajaxdata[prams].source.length==0){
       showToast("无可选择项")
        return false;
       }      
       dd.biz.util.chosen({
         source:ajaxdata[prams].source,
         selectedKey:ajaxdata[prams].source[0].key , // 默认选中的key
         onSuccess : function(result) {              
                    ajaxdata[prams]['typetext']=result.key                   
                    ajaxdata[prams]['value']=result.value                     
                    ajaxdata[prams]['icon']=false
                    that.setState({ajaxdata});
                    if(prams=="department"){
                      that.dispatch('getActivityId',that.state.ajaxdata);
                    }else if(prams=="rewardType"){
                      if(ajaxdata["activityName"]['value']){                         
                         that.dispatch('getActivityInfo',prams,0,that.state.ajaxdata);                       
                      }
                    }else{
                      that.dispatch('getActivityInfo',prams,0,that.state.ajaxdata);
                    }
                   
                   
                    
          },
         onFail : function(err) {}
      })

  }
  //单张与批量选择
   handleChangeNum=()=> {
    return false;
//this.dispatch('getActivityId',this.state.ajaxdata);
     var that = this;
    let ajaxdata={...this.state.ajaxdata}
    

     dd.biz.util.chosen({
         source:ajaxdata.SingleOrBatch.source,
         selectedKey:ajaxdata.SingleOrBatch.source[0].key , // 默认选中的key
         onSuccess : function(result) {              
                    ajaxdata['SingleOrBatch']['typetext']=result.key                   
                    ajaxdata['SingleOrBatch']['value']=result.value

                  
                    ajaxdata["activityName"]['typetext']=ajaxdata["activityName"]['default'];
                    ajaxdata["activityName"]['value']="";
                    ajaxdata["activityName"]['icon']=true;

                    ajaxdata["list"]=[];

                    
                    //obj["ajaxdata"]["list"]=[];
                    //alert(JSON.stringify(basicJSON));
                    //alert(JSON.stringify(obj));
                    //obj["ajaxdata"]["list"][0]=localbasicJSON;//不能用localbasicJSON，问题待查
                    ajaxdata["list"][0]=JSON.parse(JSON.stringify(basicJSON));
               
                      //alert(JSON.stringify(localbasicJSON));
                      //alert(JSON.stringify(obj));
         
                        that.setState({ajaxdata});
              
                    
          },
         onFail : function(err) {}
      })

    }
    //通用文本框修改
    handleTextChange=(name, newValue)=> {
       let ajaxdata={...this.state.ajaxdata}
        ajaxdata['singledata'][name]['default']=newValue;
        this.setState({ajaxdata});
    }

  //增加加息券list
  addOneItem=(index)=>{
   
     let ajaxdata={...this.state.ajaxdata}
     let localbasicJSON=JSON.parse(JSON.stringify(basicJSON));
      alert(JSON.stringify(ajaxdata["list"][0]["interestLevel"]))

     localbasicJSON["interestLevel"]=JSON.parse(JSON.stringify(ajaxdata.list[0].interestLevel))
     localbasicJSON["interestLevel"]['typetext']=JSON.parse(JSON.stringify(ajaxdata.list[0].interestLevel)).default;
     localbasicJSON["interestLevel"]['value']="";
     localbasicJSON["interestLevel"]['icon']=true;

    
     //alert(JSON.stringify(ajaxdata["list"][0]["interestLevel"]))
    // alert(JSON.stringify(newlocalbasicJSON))
     ajaxdata.list.push(localbasicJSON)
  //alert(JSON.stringify(ajaxdata))
     this.setState({ajaxdata});
     
  }
   //删除加息券list
  delOneItem=(num)=>{
     let ajaxdata={...this.state.ajaxdata}
     ajaxdata.list.splice(ajaxdata.list.findIndex(item => item.index === num), 1)
     this.setState({ajaxdata});
     console.log(ajaxdata.list)
  }
    submit=()=>{
      //逻辑判断提交条件
      let obj=this.state.ajaxdata;
      if(obj.department.value==""){
        showToast("请选择部门")
       
        return false;
      }
      if(obj.activityName.value==""){
        showToast("请选择活动")
       
        return false;
      }
      else if(obj.list[0].interestLevel.value==""){
        showToast("请选择金额")
       
        return false;
      }
      else if(obj.list[0].minAmount.value==""){
        showToast("请选择变现金额")
        
        return false;
      }
      else if(obj.list[0].productDate.value==""){
        showToast("请选择适用产品")
       
        return false;
      }
      else if(obj.list[0].productDate.value==""){
        showToast("请选择有效期")
        
        return false;
      }
      else if(obj.singledata.userPhone.default==""){
        showToast("请填写客户手机号")
       
        return false;
      }
      else if(obj.singledata.userName.default==""){
        showToast("请填写客户名")
       
        return false;
      }
      else if(obj.singledata.applyReason.default==""){
        showToast("请填写申请原因")
       
        return false;
      }


      let {loaded}=this.state;
      if(loaded){       
        this.setState({ loaded: false});
        this.dispatch('submit',this.state.ajaxdata);
      }
       
    }


  render() {
    const angleIconProps = { fill: 'rgba(31,56,88,0.40)', width: 20, height: 20 };
    const t = this;

    //const { ajaxdata = {} } = t.state;
    //alert(JSON.stringify(t.state))
    if(t.state.ajaxdata.rewardType.value==3){
      var Tag = t.state.ajaxdata.SingleOrBatch.value==1 ? InterestSingle : InterestBatch;//模板名称也可以根据数据变更,模板名称是只读属性，在渲染时定义
    }else{
      var Tag = t.state.ajaxdata.SingleOrBatch.value==1 ? RedSingle : RedBatch;//模板名称也可以根据数据变更,模板名称是只读属性，在渲染时定义
    }
    
    //console.log(t.state.Tag)
    //const Tag = t.state.Tag;//模板名称也可以根据数据变更
    return (
            <div className="container">          
                {t.state.isrender ? (
                      <div>
                      <Group.List >
                        <Field required label="所选部门" errMsg={t.state.ajaxdata.department.errtxt}  icon={<Icon name={t.state.ajaxdata.department.icon?'angle-right':'cross-round'} {...angleIconProps} onClick={()=>t.handleClearAct('department')} />}>
                            <div onClick={()=>t.handleSelectAct('department')}>{t.state.ajaxdata.department.typetext}</div>
                          </Field>
                      </Group.List>
                     
                      <Group.List >
                       
                        <Field required label="所选活动" errMsg={t.state.ajaxdata.activityName.errtxt}  icon={<Icon name={t.state.ajaxdata.activityName.icon?'angle-right':'cross-round'} {...angleIconProps} onClick={()=>t.handleClearAct('activityName')} />}>
                            <div onClick={()=>t.handleSelectAct('activityName')}>{t.state.ajaxdata.activityName.typetext}</div>
                          </Field>
                      </Group.List>
                       <Group.List >
                        <Field required label="奖励类型"  icon={<Icon name={'angle-right'} {...angleIconProps}  />}>
                            <div onClick={()=>t.handleSelectAct('rewardType')}>{t.state.ajaxdata.rewardType.typetext}</div>
                          </Field>
                      </Group.List>
                      <Group.List >
                        <Field required label="发放类型" icon={<Icon name={'angle-right'} {...angleIconProps} />}>
                            <div onClick={()=>t.handleChangeNum()}>{t.state.ajaxdata.SingleOrBatch.typetext}</div>
                          </Field>
                      </Group.List>                        
                      
                      <Tag parentuserInfo={t.state.ajaxdata.singledata}  arr={t.state.ajaxdata.list} parenthandleTextChange={t.handleTextChange} parentdelOneItem={t.delOneItem} parenthandleSelectCommon={t.handleSelectCommon} parenthandleClearCommon={t.handleClearCommon} />
                      {t.state.ajaxdata.SingleOrBatch.value!=1 ? (
                      <div className="t-LH44 t-BCd t-FAC t-MT16" onClick={()=>t.addOneItem()}  style={{color:'#09c'}}>{t.state.ajaxdata.rewardType.value==3 ?"增加加息券":"增加红包"}+</div>
                      ):null}
                     
                      <Group.List>
                        <TextField label="发放时间"  value="审批后即时发放"  readOnly />        
                     </Group.List>
                     
                     <Group.List>
                      <TextareaField required minRows={2} maxRows={5} label="申请原因" placeholder="请输入" value={t.state.ajaxdata.singledata.applyReason.default} onChange={(value) => { t.handleTextChange('applyReason', value) }} />
                    </Group.List> 
                                
                         <div className="section-content">
                          <Button type="primary" onClick={()=>t.submit()}>提交</Button>
                      </div>
                      </div>
                ) : <Skeleton animate rows={2} type={3} />}
            </div>

    );
  }
}
