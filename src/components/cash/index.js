import { Component } from 'refast';
import {PhotoField, Group } from 'saltui';


export default class reditem extends Component {
 constructor(props) {
    super(props);
    this.state = {
      photoList: [],
    };
  }

  onDelete=(index)=>{
    const photoList = this.state.photoList.filter((item, i) =>
      index !== i
    ) || [];

    this.setState({
      photoList,
    });
  }

  onChange=(fieldData, photoList)=> {
   // alert(JSON.stringify(fieldData))
    const res=fieldData.value[0].response;
    if(res.code=="200"){
       let obj={...this.state}
      let photo={url:res.data,name:fieldData.value[0].name};
      obj.photoList.push(photo)
      this.setState(obj);
    }else{
      alert(res.message)
    }
    
   
   
  }
  

  render() {

    const t = this;
    return (
              <div className="item"> 
               <Group.List >
               <PhotoField.H5
                    label="立项审批文件"
                    placeholder="请选择图片"
                    required
                    name="upload"
                    maxUpload={1}
                    tip="仅能上传jpg\png\pdf格式文件，不超过2M"
                    url="/act_web/actdingding/v1/05"
                    photoList={this.state.photoList}
                    onChange={(values, photos)=>t.onChange(values, photos)}
                    onDelete={(index)=>t.onDelete(index)}
                  />                            
                </Group.List >          
                  
               </div>
            )
            }
      }
