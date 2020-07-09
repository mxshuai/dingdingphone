import { basicJSON} from '../../app/variables';
import 'dingtalk-jsapi/entry/mobile';
import alert from 'dingtalk-jsapi/api/device/notification/alert';
import close from 'dingtalk-jsapi/api/biz/navigation/close';

export default {
  defaults() {
    return {
      loaded: false,    
      realajaxdata: {},
      error: false,
      ajaxdata:{}
    };
  },
  async getDepartment({ fn, setState },ajaxdata) {
    const realajaxdata = await fn.DB.SomeModuleAPI.getDepartment();

    for(var item in realajaxdata.data){//遍历json对象的每个key/value对,p为key
          let temp={};
          temp.key=realajaxdata.data[item]
          temp.value=item
          ajaxdata.department.source.push(temp) 
               
        }
     
    setState({ isrender: true, ajaxdata});

  },
  async getActivityId({ fn, setState },ajaxdata) {

    const postdata={"deptment":ajaxdata.department.value,"reqType":ajaxdata.reqType};
     
    const realajaxdata  = await fn.DB.SomeModuleAPI.getActivityId(postdata);
   // console.log(realajaxdata)
    ajaxdata.activityName.value=""; 
    ajaxdata.activityName.typetext=ajaxdata.activityName.default; 
    ajaxdata.activityName.icon=true; 
    ajaxdata.activityName.source=[]; 
    ajaxdata["list"]=[];   
    ajaxdata["list"][0]=JSON.parse(JSON.stringify(basicJSON));
    //alert(JSON.stringify(realajaxdata))
    //const realajaxdata={"data":[{"id":5,"deptment":"101","activityId":206,"createtime":null,"updatetime":null,"flag":null,"operateuser":null,"deptName":"运营部门","activityTitle":"钉钉审批测试","activityBeginTime":1570001163,"activityEndTime":1571210765,"activityStatus":4},{"id":7,"deptment":"101","activityId":101,"createtime":null,"updatetime":null,"flag":null,"operateuser":null,"deptName":"运营部门","activityTitle":"翼龙汇会员招募","activityBeginTime":1495590743,"activityEndTime":1577843567,"activityStatus":4},{"id":3,"deptment":"101","activityId":94,"createtime":null,"updatetime":null,"flag":null,"operateuser":null,"deptName":"运营部门","activityTitle":"加息券活动","activityBeginTime":1491036149,"activityEndTime":1577384152,"activityStatus":4},{"id":1,"deptment":"101","activityId":28,"createtime":null,"updatetime":null,"flag":null,"operateuser":null,"deptName":"运营部门","activityTitle":"生日红包活动","activityBeginTime":1469013363,"activityEndTime":1609430399,"activityStatus":4}]};
     realajaxdata.data.forEach((item) => {
            let temp={};
            temp.key=item.activityTitle
            temp.value=item.activityId
            ajaxdata.activityName.source.push(temp) 
            //console.log(temp.value)
            // let {interestLevel}=basicJSON
              //asd.interestLevel=ajaxdata["list"]["0"]["interestLevel"];  
            //ajaxdata["list"]["0"]["interestLevel"]["source"].push(temp)  
            //if(temp.value==28){
              //ajaxdata["list"]["0"]["interestLevel"]=basicJSON.interestLevel
            //}
            //console.log(basicJSON.interestLevel)
            //console.log(ajaxdata["list"]["0"]["interestLevel"])
           // console.log(ajaxdata.activityName.source)
                
                   
    });  

   
    setState({ajaxdata});
    
  },
  async getActivityInfo({ fn, setState },prams,index,ajaxdata) {
      const localbasicJSON=JSON.parse(JSON.stringify(basicJSON));
    
    var postdata={};
    if(prams=='activityName'||prams=='rewardType'){
     postdata={
      activityId:ajaxdata.activityName.value,
      rewardType:ajaxdata.rewardType.value
    };
              
     //数据初始化
     ajaxdata["list"][index]["interestLevel"]=localbasicJSON.interestLevel;
     ajaxdata["list"][index]["minAmount"]=localbasicJSON.minAmount;
     ajaxdata["list"][index]["productDate"]=localbasicJSON.productDate;
     ajaxdata["list"][index]["validityPeriod"]=localbasicJSON.validityPeriod;
     ajaxdata["list"][index]["applyNum"]=localbasicJSON.applyNum;
     console.log('1111'+JSON.stringify(localbasicJSON.interestLevel))

    }else if(prams=='interestLevel'){
     postdata={
      activityId:ajaxdata.activityName.value,
      rewardType:ajaxdata.rewardType.value,
      reqValue:ajaxdata.list[index].interestLevel.value
    };
     //数据初始化
     ajaxdata["list"][index]["minAmount"]=localbasicJSON.minAmount;
     ajaxdata["list"][index]["productDate"]=localbasicJSON.productDate;
     ajaxdata["list"][index]["validityPeriod"]=localbasicJSON.validityPeriod;
     ajaxdata["list"][index]["applyNum"]=localbasicJSON.applyNum;
    }else if(prams=='minAmount'){
      postdata={
      activityId:ajaxdata.activityName.value,
      rewardType:ajaxdata.rewardType.value,
      reqValue:ajaxdata.list[index].interestLevel.value,
      reqActivateBalance:ajaxdata.list[index].minAmount.value
    };
     //数据初始化
    
     ajaxdata["list"][index]["productDate"]=localbasicJSON.productDate;
     ajaxdata["list"][index]["validityPeriod"]=localbasicJSON.validityPeriod;
     ajaxdata["list"][index]["applyNum"]=localbasicJSON.applyNum;
    }else if(prams=='productDate'){
      postdata={
      activityId:ajaxdata.activityName.value,
      rewardType:ajaxdata.rewardType.value,
      reqValue:ajaxdata.list[index].interestLevel.value,
      reqActivateBalance:ajaxdata.list[index].minAmount.value,
      reqRealizationPro:ajaxdata.list[index].productDate.value
    };
     //数据初始化
    
     ajaxdata["list"][index]["validityPeriod"]=localbasicJSON.validityPeriod;
     ajaxdata["list"][index]["applyNum"]=localbasicJSON.applyNum;
    }else if(prams=='validityPeriod'){
      postdata={
      activityId:ajaxdata.activityName.value,
      rewardType:ajaxdata.rewardType.value,
      reqValue:ajaxdata.list[index].interestLevel.value,
      reqActivateBalance:ajaxdata.list[index].minAmount.value,
      reqRealizationPro:ajaxdata.list[index].productDate.value,
      reqValidateDays:ajaxdata.list[index].validityPeriod.value
    };
     //数据初始化
     
     ajaxdata["list"][index]["applyNum"]=localbasicJSON.applyNum;
    }

    //alert(JSON.stringify(postdata))
    const realajaxdata  = await fn.DB.SomeModuleAPI.getActivityInfo(postdata);
     //alert(JSON.stringify(realajaxdata))
    //const realajaxdata  = [{"id":750,"type":1,"title":"钉钉测试红包1","value":1.0000,"validityDays":5,"experienceDays":null,"activateBalance":100.00,"realizationPro":",y30,y90,y180,y365,tc30,tc90,yp1,yp3,yp6,yp12,","realizationChannel":",1,2,3,4,","description":"单笔满100元可变现1个红包；每出借1笔只能变现1个红包；红包与加息券不可叠加使用；","realizationProStr":"仅限出借翼农计划30天、90天、180天、365天产品，翼农惠享1月、3月、6月、12月产品，私人定制封闭期30天及以上产品。","realizationChannelStr":"在app、翼龙钱包、wap、pc可使用。"},{"id":751,"type":1,"title":"钉钉测试红包2","value":2.0000,"validityDays":5,"experienceDays":null,"activateBalance":200.00,"realizationPro":",y30,y90,y180,y365,tc30,tc90,yp1,yp3,yp6,yp12,","realizationChannel":",1,2,3,4,","description":"单笔满100元可变现1个红包；每出借1笔只能变现1个红包；红包与加息券不可叠加使用；","realizationProStr":"仅限出借翼农计划30天、90天、180天、365天产品，翼农惠享1月、3月、6月、12月产品，私人定制封闭期30天及以上产品。","realizationChannelStr":"在app、翼龙钱包、wap、pc可使用。"}];
    
     realajaxdata.data.forEach((item) => {
            let temp={};
            let tempprams='';
            if(prams=='activityName'||prams=='rewardType'){

               temp.key=item.value//activityName   选择活动之后确定金额 
               temp.value=item.value
               tempprams='interestLevel'
               ajaxdata["list"][index][tempprams]["source"].push(temp)       
                                                 
              }else if(prams=='interestLevel'){

                temp.key=item.activateBalance//interestLevel  选择金额之后确定起投金额
                temp.value=item.activateBalance
                tempprams='minAmount'
                ajaxdata["list"][index][tempprams]["source"].push(temp)      
  
              }else if(prams=='minAmount'){

                temp.key=item.realizationProStr//minAmount    选择起投金额之后确定适用产品
                temp.value=item.realizationPro
                tempprams='productDate'
                ajaxdata["list"][index][tempprams]["source"].push(temp)      
                         
              }else if(prams=='productDate'){

                 temp.key=item.validityDays//productDate       选择适用产品之后确定有效期
                 temp.value=item.validityDays
                 tempprams='validityPeriod'
                 ajaxdata["list"][index][tempprams]["source"].push(temp)      
               
              }else if(prams=='validityPeriod'){

                ajaxdata["list"][index]["id"]=item.id;
                //alert(JSON.stringify(ajaxdata["list"][index]))
              }


              
    });
    //console.log(ajaxdata);  
     
     //alert('最终的'+JSON.stringify(ajaxdata))
    //setState({ loaded: true,isrender: true, "ajaxdata":{"list":[{"id":1}]}});
    setState({ ajaxdata});
  },
  async submit({ fn, setState },ajaxdata) {
    const totaldata={};
    if(ajaxdata.rewardType.value!=5){
    totaldata.applyDeptName=ajaxdata.department.typetext;//申请部门名称（中文）
    totaldata.activityName=ajaxdata.activityName.typetext;//所选活动名称（中文）
    totaldata.activityId=ajaxdata.activityName.value;
    totaldata.rewardId=ajaxdata.list[0].id;
    totaldata.rewardTypeName=ajaxdata.rewardType.typetext;//申请类型名称（中文）
    totaldata.type=ajaxdata.rewardType.value;
    totaldata.sendType=ajaxdata.SingleOrBatch.value;
    totaldata.mobile=ajaxdata.singledata.userPhone.default;
    totaldata.applyUser=ajaxdata.applyName;//申请人
    totaldata.username=ajaxdata.singledata.userName.default;//客户姓名
    totaldata.description=ajaxdata.singledata.applyReason.default;//申请原因
    
    totaldata.balance=ajaxdata.list[0].interestLevel.value;
    totaldata.activateBalanceName=ajaxdata.list[0].minAmount.typetext;//变现/激活金额名称(含中文) 例： 20万
    totaldata.activateBalance=ajaxdata.list[0].minAmount.value;
    totaldata.realizationProName=ajaxdata.list[0].productDate.typetext;//适用产品和期限名称中文
    totaldata.realizationPro=ajaxdata.list[0].productDate.value;
    totaldata.validityDays=ajaxdata.list[0].validityPeriod.value;
    totaldata.upperserialnumber=ajaxdata.dingcode;//钉钉流水号
    totaldata.count=ajaxdata.list[0].applyNum.value;//申请张数
  }else{
    totaldata.applyDeptName=ajaxdata.department.typetext;//申请部门名称（中文）
    totaldata.activityName=ajaxdata.activityName.typetext;//所选活动名称（中文）
    totaldata.rewardTypeName=ajaxdata.rewardType.typetext;//申请类型名称（中文）
    totaldata.activityId=ajaxdata.activityName.value;
    totaldata.rewardId=ajaxdata.list[0].id;
    totaldata.type=ajaxdata.rewardType.value;
    totaldata.applyUser=ajaxdata.applyName;//申请人
    /*let newarr=[];
    for(let obj of ajaxdata.photoList){
        const param = (({name,url}) => ({name, url}))(obj)
        newarr.push(param)
     } 
    totaldata.photoList=newarr;//图片列表*/
    totaldata.auditImgUrl=ajaxdata.photoList[0].url;//申请原因
    totaldata.description=ajaxdata.singledata.applyReason.default;//申请原因
    totaldata.upperserialnumber=ajaxdata.dingcode;//钉钉流水号
    totaldata.count=ajaxdata.list[0].applyNum.value;//申请张数

  }
  
 

    //const totaldata={"activityId":"206","rewardId":750,"type":"1","mobile":"111111","applyUser":"aaaaaa",
    //"balance":"1","activateBalance":"100","realizationPro":",y30,y90,y180,y365,tc30,tc90,yp1,yp3,yp6,yp12,",
    //"validityDays":"5","upperserialnumber":"111"}
    //alert(JSON.stringify(totaldata))

    const result  = await fn.DB.SomeModuleAPI.submit(totaldata);
    setState({ loaded: true});
    //alert(JSON.stringify(result))
    if(result.code!="200"){
      alert({
          message: result.message,
          title: "提示",//可传空
          buttonName: "确定",
          onSuccess : function() {
              //onSuccess将在点击button之后回调
              /*回调*/
          },
          onFail : function(err) {}
      });      
    }else{  
      alert({
          message: "提交成功",
          title: "提示",//可传空
          buttonName: "确定",
          onSuccess : function() {
               close({})
          },
          onFail : function(err) {}
      }); 

      
    }
    
    
  },
   async submitBatch({ fn, setState },ajaxdata) {
    const totaldata={};


          totaldata.applyDeptName=ajaxdata.department.typetext;//申请部门名称（中文）
          totaldata.activityName=ajaxdata.activityName.typetext;//所选活动名称（中文）
          totaldata.activityId=ajaxdata.activityName.value;
          

          totaldata.type=ajaxdata.rewardType.value;
          totaldata.sendType=ajaxdata.SingleOrBatch.value;

          totaldata.applyUser=ajaxdata.applyName;//申请人

          totaldata.description=ajaxdata.singledata.applyReason.default;//申请原因

          totaldata.batchPrizeVOList =[];

          ajaxdata.list.forEach((item) => {

          let tempobj={};

          tempobj.rewardId=item.id;

          tempobj.prizeRate=item.interestLevel.value;
          //totaldata.activateBalanceName=ajaxdata.list[0].minAmount.value.label;//变现/激活金额名称(含中文) 例： 20万

          tempobj.prizeMinAmont=item.minAmount.value;
          //totaldata.realizationProName=ajaxdata.list[0].productDate.value.label;//适用产品和期限名称中文

          tempobj.realizationProName=item.productDate.value;

          tempobj.validityDays=item.validityPeriod.value;
          
          tempobj.count=item.applyNum.value;//申请张数
          tempobj.customerExcelVOList=item.photoList;

          totaldata.batchPrizeVOList.push(tempobj);

          })

         totaldata.upperserialnumber=ajaxdata.dingcode;//钉钉流水号
 

    //const totaldata={"activityId":"206","rewardId":750,"type":"1","mobile":"111111","applyUser":"aaaaaa",
    //"balance":"1","activateBalance":"100","realizationPro":",y30,y90,y180,y365,tc30,tc90,yp1,yp3,yp6,yp12,",
    //"validityDays":"5","upperserialnumber":"111"}
    //alert(JSON.stringify(totaldata))

    const result  = await fn.DB.SomeModuleAPI.submitBatch(totaldata);
    setState({ loaded: true});
    //alert(JSON.stringify(result))
    if(result.code!="200"){
      alert({
          message: result.message,
          title: "提示",//可传空
          buttonName: "确定",
          onSuccess : function() {
              //onSuccess将在点击button之后回调
              /*回调*/
          },
          onFail : function(err) {}
      });      
    }else{  
      alert({
          message: "提交成功",
          title: "提示",//可传空
          buttonName: "确定",
          onSuccess : function() {
               close({})
          },
          onFail : function(err) {}
      }); 

      
    }
    
    
  },
};
