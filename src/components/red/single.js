import { Component } from 'refast';
import {PhotoField, Group, TextField, Field } from 'saltui';
import Icon from 'salt-icon';

const numberRegExp = /^(\d+\.\d*)|(\d+\.)|\d+/;
export default class reditem extends Component {
  constructor(props) {
    super(props);
    
   }
   componentWillReceiveProps(nextProps) {
     //this.setState({childarr: nextProps.arr});
    //alert(JSON.stringify(nextProps.arr));
        /*if(nextProps.location.state!=undefined){
            this.setState({
                activekey: nextProps.location.state.name
            })
        }*/
    }
   numberFilter=(originValue)=> {
    const matches = originValue.match(numberRegExp);
    let number = '';
    if (matches) {
      number = matches[0];
    }
    return number;
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
                                                  <Group.List>                                             
                                                     <Field  required label="红包金额" errMsg={item.interestLevel.errtxt}  icon={<Icon name={item.interestLevel.icon?'angle-right':'cross-round'} {...angleIconProps} onClick={()=>t.props.parenthandleClearCommon('interestLevel',index)} />}>
                                                        <div onClick={()=>t.props.parenthandleSelectCommon('interestLevel',index)}>{item.interestLevel.typetext}</div>
                                                   </Field>
                                                  </Group.List>
                                                  <Group.List>
                                                      <Field required label="变现金额" errMsg={item.minAmount.errtxt}  icon={<Icon name={item.minAmount.icon?'angle-right':'cross-round'} {...angleIconProps} onClick={()=>t.props.parenthandleClearCommon('minAmount',index)} />}>
                                                        <div onClick={()=>t.props.parenthandleSelectCommon('minAmount',index)}>{item.minAmount.typetext}</div>
                                                      </Field>
                                                   </Group.List>
                                                  <Group.List>
                                                      <Field required label="适用产品和期限" errMsg={item.productDate.errtxt}  icon={<Icon name={item.productDate.icon?'angle-right':'cross-round'} {...angleIconProps} onClick={()=>t.props.parenthandleClearCommon('productDate',index)} />}>
                                                        <div onClick={()=>t.props.parenthandleSelectCommon('productDate',index)}>{item.productDate.typetext}</div>
                                                      </Field>
                                                   </Group.List>
                                                  <Group.List>
                                                      <Field required label="有效期" errMsg={item.validityPeriod.errtxt}  icon={<Icon name={item.validityPeriod.icon?'angle-right':'cross-round'} {...angleIconProps} onClick={()=>t.props.parenthandleClearCommon('validityPeriod',index)} />}>
                                                        <div onClick={()=>t.props.parenthandleSelectCommon('validityPeriod',index)}>{item.validityPeriod.typetext}</div>
                                                      </Field>
                                                   </Group.List>
                                                  <Group.List>
                                                      <TextField label="申请张数" value="1张" readOnly />
                                                   </Group.List>
                                                    <Group.List>
                                                      <TextField label="客户注册手机号" errMsg={t.props.parentuserInfo.userPhone.errtxt}  required placeholder="请输入" filter={value => t.numberFilter(value)} value={t.props.parentuserInfo.userPhone.default} onChange={(value) => { t.props.parenthandleTextChange('userPhone', value)}} />        
                                                   </Group.List>
                                                   <Group.List>
                                                      <TextField label="客户姓名" errMsg={t.props.parentuserInfo.userName.errtxt}  required placeholder="请输入" value={t.props.parentuserInfo.userName.default} onChange={(value) => { t.props.parenthandleTextChange('userName', value) }} />        
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
