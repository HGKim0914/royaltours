import React, { Component } from 'react';
import {Table} from 'react-materialize';

class TourList extends Component {
  render() {
    const data = [
        ["04-04-2019", "04-04-2019록키", "홍길동", "캐완,밴휘", false],
        ["04-16-2019", "04-04-2019록키", "홍길동", "캐완,밴휘", true]
    ];
    return (
        <Table>
            <thead>
                <tr>
                    <th data-field="date">DATE</th>
                    <th data-field="tour-code">투어코드</th>
                    <th>가이드 성명</th>
                    <th>투어 종류</th>
                    <th data-field="confirmation">Confirmation</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <DisplayTourList key="1" data={data[0]} auth={this.props.authorization}/>
                <DisplayTourList key="2" data={data[1]} auth={this.props.authorization}/>
            </tbody>
        </Table>
    );
  }
}
export default TourList;

const DisplayTourList = (props) => {
    var confirm = "";
    const modifyReport = [];
    
    //If data is confirmed
    if(props.data[4]){
        confirm = "Confirmed";

        //If the user authorized to edit the report. 
        if(props.auth){
            modifyReport.push(<a key="1" href="guide-accounting-form"><div className="waves-effect waves-light btn modify-btn">수정</div></a>);
        }
        modifyReport.push(<a key="2" href="accounting-report"><div className="waves-effect waves-light btn view-btn">보기</div></a>);
    }else{
        confirm = "Not confirmed";

        modifyReport.push(<a key="1" href="guide-accounting-form"><div className="waves-effect waves-light btn modify-btn">수정</div></a>);
        modifyReport.push(<a key="2" href="accounting-report"><div className="waves-effect waves-light btn view-btn">보기</div></a>);
    }
    return(
        <tr>
            {/* 날짜 */}
            <td>{props.data[0]}</td>
            {/* 행사명 */}
            <td>{props.data[1]}</td>
            {/* 가이드성명 */}
            <td>{props.data[2]}</td>
            <td>{props.data[3]}</td>
            {/* 컴펌여부 */}
            <td>{confirm}</td>
            <td>
                {modifyReport}
            </td>
        </tr>
    );
}
