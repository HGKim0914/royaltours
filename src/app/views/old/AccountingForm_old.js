import React, { Component } from 'react';
import {Collapsible, CollapsibleItem, Row, Col, TextInput, Checkbox} from 'react-materialize';
import '../css/Guide.css';

import Setting from './NavigationBar';
import Expense from './Expense';
import Profit from './Profit';
import CashSettlement from './CashSettlement';


class AccountingForm extends Component {
    constructor(props){
        super(props);

        var getId = getCookie("id");
        var getName = getCookie("name");
        var getDepartment = getCookie("department");
        var getAuthorization = getCookie("authorization");

        this.state = {
            id: getId,
            name: getName,
            department: getDepartment,
            authorization: getAuthorization,

            //기타비용
            parkingExpense: 0,
            gasExpense: 0,
            guideExpense: 0,
            pickupExpense: 0,
            extraCarExpense: 0,

            restExpense: [],
            carExpense: [],
            attrExpense: [],
            hotelExpense: [],
            miscExpense: [],

            // Profit
            shoppingComProfit: [],
            optionComProfit: [],

            //정산보고서 기본 정보
            tourCode: "04202019록키",
            tourDate: "04/20/2019",
            guideName: "홍길동",
            tourType: "인바운드",
        };
    }
    

    render() {
        //TOTAL EXPENSE
        var totalRestaurantExpense = 0;
        for(var idx=0; idx<this.state.restExpense.length; idx++){
            if(this.state.restExpense[idx] !== undefined && this.state.restExpense[idx] !== null){
                totalRestaurantExpense += parseFloat(this.state.restExpense[idx]);
            }
        }

        var totalHotelExpense = 0;
        for(idx=0; idx<this.state.hotelExpense.length; idx++){
            if(this.state.hotelExpense[idx] !== undefined && this.state.hotelExpense[idx] !== null){
                totalHotelExpense += parseFloat(this.state.hotelExpense[idx]);
            }
        }

        var totalCarExpense = 0;
        for(idx=0; idx<this.state.carExpense.length; idx++){
            if(this.state.carExpense[idx] !== undefined && this.state.carExpense[idx] !== null){
                totalCarExpense += parseFloat(this.state.carExpense[idx]);
            }
        }

        var totalAttrExpense = 0;
        for(idx=0; idx<this.state.attrExpense.length; idx++){
            if(this.state.attrExpense[idx] !== undefined && this.state.attrExpense[idx] !== null){
                totalAttrExpense += parseFloat(this.state.attrExpense[idx]);
            }
        }

        var totalMiscExpense = 0;
        for(idx=0; idx<this.state.miscExpense.length; idx++){
            if(this.state.miscExpense[idx] !== undefined && this.state.miscExpense[idx] !== null){
                totalMiscExpense += parseFloat(this.state.miscExpense[idx]);
            }
        }

        //Profit
        var totalShoppingProfit = 0;
        for(idx=0; idx<this.state.shoppingComProfit.length; idx++){
            if(this.state.shoppingComProfit[idx] !== undefined && this.state.shoppingComProfit[idx] !== null){
                totalShoppingProfit += parseFloat(this.state.shoppingComProfit[idx]);
            }
        }

        var totalOptionProfit = 0;
        for(idx=0; idx<this.state.optionComProfit.length; idx++){
            if(this.state.optionComProfit[idx] !== undefined && this.state.optionComProfit[idx] !== null){
                totalOptionProfit += parseFloat(this.state.optionComProfit[idx]);
            }
        }

        var totalExpense = 
            parseFloat(this.state.extraCarExpense)
            + parseFloat(this.state.gasExpense)
            + parseFloat(this.state.guideExpense)
            + parseFloat(this.state.pickupExpense)
            + parseFloat(this.state.parkingExpense)
            + totalRestaurantExpense
            + totalHotelExpense
            + totalCarExpense
            + totalAttrExpense
            + totalMiscExpense;

        return (
            <Row>
                <Setting authorization={this.state.authorization}/>
                <Col s={12}>
                    <div className="guide-accounting-form">
                        <div className="guide-accounting-form info">
                            <h4>투어 정산 보고서</h4>
                            <p>행사명: {this.state.tourCode}</p>
                            <p>행사일자: {this.state.tourDate}</p>
                            <p>가이드 성명: {this.state.guideName}</p>
                            <p>투어종류: {this.state.tourType}</p>
                        </div>
                        <this.TourInfo />
                        <Collapsible id="dropdown-menu">
                            <CollapsibleItem header="투어 정산 관리">
                                <CashSettlement />
                            </CollapsibleItem>
                            <CollapsibleItem header="지출">
                                <Expense onChange={this.handleChangeExpense}/>
                            </CollapsibleItem>
                            <CollapsibleItem header="수입">
                                <Profit onChange={this.handleChangeProfit}/>
                            </CollapsibleItem>
                        </Collapsible>
                        <this.AccountTotal totalExpense={totalExpense} totalShoppingProfit={totalShoppingProfit} totalOptionProfit={totalOptionProfit}/>
                        <div className="form-submit">
                            <a className="waves-effect waves-light btn form-submit-btn" href="\">제출</a>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }

    TourInfo = props => (
        <div className="guide-accounting-form tour-info">
            <Row>
                <Col s={12}>
                    <div className="guide-accounting-form title">
                        투어 정보
                    </div>
                </Col>
                <Col s={4}>
                    <TextInput id="txtInput" label="행사인원" type="number"/>
                </Col>
                <Col s={4}>
                    <TextInput id="txtInput" label="룸 수(Per night)" type="number"/>
                </Col>
                <Col s={4}>
                    <label>투어 종류</label>
                    <select className="browser-default">
                        <option defaultValue="-">-</option>
                        <option value="캐완,밴휘">캐완, 벤휘</option>
                        <option value="캐완,밴휘">캐완, 벤휘</option>
                        <option value="캐완,밴휘">캐완, 벤휘</option>
                        <option value="캐완,밴휘">캐완, 벤휘</option>
                    </select>
                </Col>
                <Col s={5}>
                    <label>차량</label>
                    <select className="browser-default">
                        <option defaultValue="-">-</option>
                        <option value="캐완,밴휘">캐완, 벤휘</option>
                        <option value="캐완,밴휘">캐완, 벤휘</option>
                        <option value="캐완,밴휘">캐완, 벤휘</option>
                        <option value="캐완,밴휘">캐완, 벤휘</option>
                    </select>
                </Col>
                <Col s={5}>
                    <label>차량 회사</label>
                    <select className="browser-default">
                        <option defaultValue="-">-</option>
                        <option value="캐완,밴휘">캐완, 벤휘</option>
                        <option value="캐완,밴휘">캐완, 벤휘</option>
                        <option value="캐완,밴휘">캐완, 벤휘</option>
                        <option value="캐완,밴휘">캐완, 벤휘</option>
                    </select>
                </Col>
                <Col s={2}>
                    <div className="tc">
                        <Checkbox value="T/C" label="T/C 여부" />
                    </div>
                </Col>
            </Row>
        </div>
    )

    AccountTotal = (props) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits:2,
        });
        
        const totalExpense = formatter.format(props.totalExpense);
        const extraCarExpense = formatter.format(this.state.extraCarExpense);
        const totalShoppingProfit = formatter.format(props.totalShoppingProfit);
        const totalOptionProfit = formatter.format(props.totalOptionProfit);

        return(
            <div className="guide-accounting-form account-total">
                <Row>
                    <Col s={12}>
                        <div className="guide-accounting-form title">
                                총 계
                        </div>
                        <table className="guide-accounting-form table">
                            <tbody>
                                <tr>
                                    <td>투어수입</td>
                                    <td id="amount"></td>
                                </tr>
                                <tr>
                                    <td>총지출</td>
                                    <td id="amount">{totalExpense}</td>
                                </tr>
                                <tr>
                                    <td>쇼핑수입</td>
                                    <td id="amount">{totalShoppingProfit}</td>
                                </tr>
                                <tr>
                                    <td>옵션수입</td>
                                    <td id="amount">{totalOptionProfit}</td>
                                </tr>
                                <tr>
                                    <td>가이드 입금</td>
                                    <td id="amount"></td>
                                </tr>
                                <tr>
                                    <td>별도 지급 차량비</td>
                                    <td id="amount">{extraCarExpense}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td id="revenue">손익금</td>
                                    <td id="amount"></td>
                                </tr>
                            </tfoot>
                        </table>
                    </Col>
                </Row>
            </div>
        );
    }


    // Update Total Expense
    handleChangeExpense = (input) => {
        var idx = input.target.id;
        var value = input.target.value;
        if(value === ""){
            value = "0";
        }

        //레스토랑비용이 업데이트 되었을때
        if(input.target.name === "rest-expense"){
            // this.restExpense[parseInt(input.target.id, 10)] = input.target.value;
            let restExpenseCopy = JSON.parse(JSON.stringify(this.state.restExpense));
            restExpenseCopy[idx] = value;
            this.setState({
                restExpense:restExpenseCopy
            });
        }
        //호텔 비용이 업데이트 되었을때
        else if(input.target.name === "hotel-expense"){
            let hotelExpenseCopy = JSON.parse(JSON.stringify(this.state.hotelExpense));
            hotelExpenseCopy[idx] = value;
            this.setState({
                hotelExpense:hotelExpenseCopy,
            })
        }
        //어트랙션 비용이 업데이트 되었을 때
        else if(input.target.name === "attraction-expense"){
            let attrExpenseCopy = JSON.parse(JSON.stringify(this.state.attrExpense));
            attrExpenseCopy[idx] = value;
            this.setState({
                attrExpense:attrExpenseCopy,
            })
        }
        //차량비가 업데이트 되었을 때
        else if(input.target.name === "car-expense"){
            let carExpenseCopy = JSON.parse(JSON.stringify(this.state.carExpense));
            carExpenseCopy[idx] = value;
            this.setState({
                carExpense:carExpenseCopy,
            })
        }
        //기타비용이 업데이트 되었을때
        else if(input.target.name === "etc-expense"){
            if(idx === "1"){
                this.setState({
                    parkingExpense: value,
                })
            }else if(idx === "2"){
                this.setState({
                    gasExpense: value,
                })
            }else if(idx === "3"){
                this.setState({
                    guideExpense: value,
                })
            }else if(idx === "4"){
                this.setState({
                    pickupExpense: value,
                })
            }else if(idx === "5"){
                this.setState({
                    extraCarExpense: value,
                })
            }
        }
        //추가 기타비용이 업데이트 되었을때
        else if(input.target.name === "misc-expense"){
            let miscExpenseCopy = JSON.parse(JSON.stringify(this.state.miscExpense));
            miscExpenseCopy[idx] = value;
            this.setState({
                miscExpense:miscExpenseCopy,
            })
        }
    }

    handleChangeProfit = (input) => {
        console.log(input.target.id);
        console.log(input.target.name);
        var idx = input.target.id;
        var value = input.target.value;

        if(value === ""){
            value = "0";
        }

        if(input.target.name === "shopping-com-profit"){
            let shoppingCompanyProfitCopy = JSON.parse(JSON.stringify(this.state.shoppingComProfit));
            shoppingCompanyProfitCopy[idx] = value;
            this.setState({
                shoppingComProfit: shoppingCompanyProfitCopy,
            })
        }else if(input.target.name === "option-com-profit"){
            let optionCompanyProfitCopy = JSON.parse(JSON.stringify(this.state.optionComProfit));
            optionCompanyProfitCopy[idx] = value;
            this.setState({
                optionComProfit: optionCompanyProfitCopy,
            })
        }

    }
}
export default AccountingForm;

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
