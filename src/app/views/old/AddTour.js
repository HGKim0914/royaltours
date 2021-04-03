import React, { Component } from 'react';
import {Row, Col, Button, TextInput, RadioGroup} from 'react-materialize';
import Setting from './NavigationBar';
import '../css/admin.css';


function getCookie(data){
    var msg = data + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var temp = decodedCookie.split(';');
    for(var idx=0; idx<temp.length; idx++){
      var temp2 = temp[idx];
      while(temp2.charAt(0) === ' '){
        temp2 = temp2.substring(1);
      }
      if(temp2.indexOf(msg)===0){
        return temp2.substring(msg.length, temp2.length);
      }
    }
    return "";
  }

class AddTour extends Component {
    constructor(){
        super();

        var getId = getCookie("id");
        var getName = getCookie("name");
        var getDepartment = getCookie("department");
        var getAuthorization = getCookie("authorization");
        
        this.state = {
            id: getId,
            name: getName,
            department: getDepartment,
            authorization: getAuthorization,

            guide: [],

            selectedGuide: "",
        }

        //Connection with php and get guide name
        fetch("http://localhost:8888/DisplayGuide.php")
        .then(res => res.json())
        .then((result) => 
            this.storeGuideName(result),
        );
    }

    storeGuideName = (data) => {
        this.setState({
            guide: data,
        });
    }
    render() {
        return (
            <Row>
                <Setting authorization={this.state.authorization}/>
                <Col s={12}>
                    <div className="admin-accounting-list add-tour">
                        <div className="title">
                            투어추가
                        </div>
                        <AddComponent guideList = {this.state.guide} onChange={this.guideClicked}/>
                    </div>
                </Col>
            </Row>
        );
    }

    //When userID clicked
    guideClicked = (obj) => {
        this.setState({
            selectedGuide: obj.target.value,
        })
    }
}
export default AddTour;

class AddComponent extends Component {
    constructor(){
        super();
        //Get current date
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();

        if(dd < 10)  dd = '0'+dd
        if(mm < 10)  mm = '0'+mm

        today = yyyy + '-' + mm + '-' + dd;
        this.state = {
            currentDate: today,
        }
    }
    render(){
        var guideNames = ["홍길동", "춘향", "이미정"];
        if(this.props.guideList !== null){
            guideNames = this.props.guideList;
        }

        //Display the guides
        const guideList = [];
        for(var idx=0; idx<guideNames.length; idx++){
            guideList.push(<GuideNameList name={guideNames[idx][1]} id={guideNames[idx][0]} key={idx} />);
        }

        return(
            <Row>
                <Col s={12}>
                    <div className="tourComponent">
                        <TextInput type="date" label="투어날짜" value={this.state.currentDate} id="tour-date"/>
                        <TextInput label="투어코드" id="tour-name"/>
                        <label>가이드 성함</label>
                        <select className="browser-default" onChange={this.props.onChange}>
                            <option defaultValue="-">-</option>
                            {guideList}
                        </select>
                        <br />
                        <div style={{width: '300px', textAlign: 'left', paddingLeft: '20px'}}>
                            <RadioGroup
                                name="size"
                                label="tour-type"
                                options=
                                    {[{label: '인바운드',value: 'inbound'},
                                    {label: '로컬',value: 'local'}]} />
                        </div>
                        <Button  waves="light" id="save-btn" style={{marginRight: '5px' , marginTop: '25px', width: "150px", background: "rgb(51, 103, 175)"}}>
                            투어 생성
                        </Button>
                    </div>
                </Col>
            </Row>
        );
    }
}

const GuideNameList = (props) => {
    return(
        <option value={props.id}>{props.name}</option>
    );
}
