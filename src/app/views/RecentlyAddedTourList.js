import React, {Component} from 'react';
import {Col} from 'react-materialize';
import '../css/Guide.css';
import DatabaseConnectionHelper from '../helper/DatabaseConnectionHelper';
import $ from 'jquery';
import { setData } from '../js/model';
import { isJson } from '../js/functions';

class TourList extends Component{
    constructor(){
        super();

        var getId = sessionStorage.getItem("id");
        this.state = {
            data: [],
            id: getId,
        }

        this.callData();
    }
    render(){
        var tourlist = null;
        if(this.state.data.length > 0){
            tourlist = <this.tourlistTableComponent />
        }
        return(
            <Col s={12}>
                {tourlist}
            </Col>
        );
    }

    tourlistTableComponent = () => {
        var tourlist = [];
        for(var idx=0; idx < this.state.data.length; idx++){
            if (idx < 10) tourlist.push(<this.tourComponent key={idx} data={this.state.data[idx]} />);
            else break;
        }

        return(
            <div className="add-tour">
                <div className="title">
                    <p>최근 생성된 투어 리스트</p>
                </div>
                <div className="context">
                    <table>
                        <thead>
                            <tr>
                                <td>투어 생성일</td>
                                <td>행사일</td>
                                <td>투어코드</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {tourlist}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    tourComponent = (props) => {
        return(
            <tr>
                <td>{props.data[0]}</td>
                <td>{props.data[1]} - {props.data[2]}</td>
                <td>{props.data[3]}</td>
                <td><div key="delete-btn" className="waves-effect waves-light btn btn-delete" id={props.data[3]} onClick={this.deleteTour}>삭제</div></td>
            </tr>
        );
    }

    //Delete tour
    deleteTour = async (event) => {
        var tourcode = event.target.id;
        var result = await setData("DeleteTourController.php", tourcode);
        
        if(isJson(result)){
            reloadePage();
        }
    }

    callData = () => {
        $.ajax({
            url: DatabaseConnectionHelper() + "DisplayRecentlyAddedTourController.php",
            type: "POST",
            data: {
                uploader: this.state.id,
            },
            success: (result) => {
                this.setTourData(result);
            }
        })
    }

    setTourData = (result) => {
        var data = JSON.parse(result);
        this.setState({
            data: data,
        })
    }
}

export default TourList;

//JavaScript
function reloadePage(){
    window.location.reload(true);
}