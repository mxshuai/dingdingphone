import { Component } from 'refast';
import {PhotoField, Group, TextField, Field } from 'saltui';
import Icon from 'salt-icon';

export default class reditem extends Component {
  constructor(props) {
    super(props);
   }
  

  render() {
    const angleIconProps = { fill: 'rgba(31,56,88,0.40)', width: 20, height: 20 };
    const t = this;
    return (
              <div className="item"> 
                         {
                          this.props.arr.map((item,index) => { //这个地方通过this.props.arr接收到父组件传过来的arr，然后在{}里面进行js的循环
                              return (
                                              <Group key={index}>
                                              <Group.Head  className="t-FS12 t-PT10 t-PB10 t-PL20 t-PR20 t-MT20">红包{index+1}{index!="0"? (<span  onClick={()=>t.props.parentdelOneItem(index)} className="t-FR" style={{color:'#09c'}}>删除</span>):null}</Group.Head>
                                                  <Group.List className="t-MT0">
                                                      <Field  required label="红包金额" errMsg={item.interestLevel.errtxt}  icon={<Icon name={item.interestLevel.icon?'angle-right':'cross-round'} {...angleIconProps} onClick={()=>t.props.parenthandleClearCommon('interestLevel',index)} />}>
                                                        <div onClick={()=>t.props.parenthandleSelectCommon('interestLevel',index)}>{item.interestLevel.typetext}</div>
                                                      </Field>
                                                   
                                                      <Field required label="变现金额" errMsg={item.minAmount.errtxt}  icon={<Icon name={item.minAmount.icon?'angle-right':'cross-round'} {...angleIconProps} onClick={()=>t.props.parenthandleClearCommon('minAmount',index)} />}>
                                                        <div onClick={()=>t.props.parenthandleSelectCommon('minAmount',index)}>{item.minAmount.typetext}</div>
                                                      </Field>
                                                   
                                                      <Field required label="适用产品和期限" errMsg={item.productDate.errtxt}  icon={<Icon name={item.productDate.icon?'angle-right':'cross-round'} {...angleIconProps} onClick={()=>t.props.parenthandleClearCommon('productDate',index)} />}>
                                                        <div onClick={()=>t.props.parenthandleSelectCommon('productDate',index)}>{item.productDate.typetext}</div>
                                                      </Field>
                                                   
                                                      <Field required label="有效期" errMsg={item.validityPeriod.errtxt}  icon={<Icon name={item.validityPeriod.icon?'angle-right':'cross-round'} {...angleIconProps} onClick={()=>t.props.parenthandleClearCommon('validityPeriod',index)} />}>
                                                        <div onClick={()=>t.props.parenthandleSelectCommon('validityPeriod',index)}>{item.validityPeriod.typetext}</div>
                                                      </Field>
                                                   
                                                      <Field required label="申请张数" errMsg={item.applyNum.errtxt}  icon={<Icon name={'angle-right'} {...angleIconProps}  />}>
                                                        <div onClick={()=>t.props.parenthandleSelectCommon('applyNum',index)}>{item.applyNum.typetext}</div>
                                                      </Field>
                                                      <PhotoField.H5
                                                        label="客户名单"
                                                        placeholder="请选择文件"
                                                        required
                                                        name="upload"
                                                        maxUpload={5}
                                                        tip="最多可上传5个excel文件"
                                                        type="file"
                                                        url="/act_web/actdingding/v1/06"
                                                        //url="http://172.30.37.111:3001/file_upload"
                                                        photoList={item.fileList}
                                                        onChange={(values, fileList)=>t.props.parentonChange(values, fileList,index)}
                                                        onDelete={(num)=>t.props.parentonDelete(num,index)}
                                                      />  
                                                   </Group.List>
                                               </Group> 

                                      )
                                                        }
                                            )
                      }                                    
                            
                  
               </div>
            )
            }
      }
