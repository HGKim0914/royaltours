import React, { Component } from 'react';
import {Row, Col, Select, TextInput, Button, Collection, CollectionItem} from 'react-materialize';
import Setting from './NavigationBar';
import '../css/guide.css';
import TourList from './TourList';

//Cookie
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

class TotalTourList extends Component {
    constructor(){
        super();

        //Get The User Information
        var getId = getCookie("id");
        var getName = getCookie("name");
        var getDepartment = getCookie("department");
        var getAuthorization = getCookie("authorization");

        this.state = {
            id: getId,
            name: getName,
            department: getDepartment,
            authorization: getAuthorization,
        }
    }

    render() {
        return (
            <Row>
                <Setting authorization={this.state.authorization}/>
                <Col s={12}>
                    <div className="admin-accounting-list">
                        <SearchSortingControl />
                        <div className="title">
                            투어리스트
                        </div>
                        <TourList authorization={true}/>
                    </div>
                </Col>
            </Row>
        );
    }
}
export default TotalTourList;

const SearchSortingControl = (props) => {
    return(
        <Row>
            <div className="tourlist-search">
            <Col s={12}>
                {/* Sorting Date */}
                <Col s={2}>
                    <TextInput label="년도" />
                </Col>
                <Col s={3}>
                    <Select>
                        <option value="1">1월</option>
                        <option value="2">2월</option>
                        <option value="3">3월</option>
                        <option value="4">4월</option>
                        <option value="5">5월</option>
                        <option value="6">6월</option>
                        <option value="7">7월</option>
                        <option value="8">8월</option>
                        <option value="9">9월</option>
                        <option value="10">10월</option>
                        <option value="11">11월</option>
                        <option value="12">12월</option>
                    </Select>
                </Col>
                <Col s={2}><br />~</Col>
                <Col s={2}>
                    <TextInput label="년도" />
                </Col>
                <Col s={3}>
                    <Select>
                        <option value="1">1월</option>
                        <option value="2">2월</option>
                        <option value="3">3월</option>
                        <option value="4">4월</option>
                        <option value="5">5월</option>
                        <option value="6">6월</option>
                        <option value="7">7월</option>
                        <option value="8">8월</option>
                        <option value="9">9월</option>
                        <option value="10">10월</option>
                        <option value="11">11월</option>
                        <option value="12">12월</option>
                    </Select>
                </Col>
            </Col>
            
            <Col s={12}>
                <Col s={4}>
                    <Collection style={{width: '200px'}}>
                        <CollectionItem id="search-inbound">
                            인바운드
                        </CollectionItem>
                        <CollectionItem id="search-local">
                            로컬
                        </CollectionItem>
                    </Collection>
                </Col>
                <Col s={4}>
                    <TextInput label="가이드 성함" style={{width: '200px'}}/>
                </Col>
                <Col s={4}>
                <Button waves="light" style={{marginRight: '5px', marginTop: '25px', width: '150px', background: 'rgb(51, 103, 175)'}}>
                    검색
                </Button>
            </Col>
            </Col>
            </div>
        </Row>
    );
}