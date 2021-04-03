import React, { Component } from 'react';
import {Row, Col, Select, TextInput, Button, Table, Modal} from 'react-materialize';
import Setting from './NavigationBar';
import '../css/admin.css';

class MonthlyNetIncome extends Component {
  render() {
    return (
        <Row>
            <Setting />
            <Col s={12}>
                <div className="admin-accounting-list monthlyNetIncome">
                    <SearchSortingControl />
                    <div className="title">
                        투어결산서
                    </div>
                    <MonthlyNetIncomeTable />
                </div>
            </Col>
        </Row>
    );
  }
}
export default MonthlyNetIncome;

const SearchSortingControl = (props) => {
    return(
        <Row>
            <div className="tourlist-search">
            <Col s={10}>
                {/* Sorting Date */}
                <Col s={2}>
                    <TextInput label="년도" />
                </Col>
                <Col s={3}>
                    <Select>
                        <option value="1">1월</option>
                        <option value="2" >2월</option>
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
                <Col s={1}><br />~</Col>
                <Col s={2}>
                    <TextInput label="년도" />
                </Col>
                <Col s={3}>
                    <Select>
                        <option value="1">1월</option>
                        <option value="2" >2월</option>
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
            <Col s={2}>
                <Button waves="light" style={{marginRight: '5px', marginTop: '25px', width: '100%', background: 'rgb(51, 103, 175)'}}>
                    검색
                </Button>
            </Col>
            </div>
        </Row>
    );
}

var accumulatedTourFee = 0; //행사비
//비용
var accumulatedCarExpense = 0;
var accumulatedTourExpense = 0;
var accumulatedExpense = 0;
var accumulatedProfit = 0;
var accumulatedShoppingNetIncome = 0;
var accumulatedOptionNetIncome = 0;
var accumulatedGuideInput = 0;
var accumulatedNetIncome = 0;
var accumulatedCustomer = 0;
var accumulatedShoppingProfit = 0;
var accumulatedOptionProfit = 0;

class MonthlyNetIncomeTable extends Component{
    state = {
        tableRow: 4,

        //result
        totalCustomer: 0,
        totalTourFee: 0,
        totalExpense: 0,
        totalCarExpense: 0,
        totalTourExpense: 0,
        totalProfit: 0,
        totalShoppingNetIncome: 0,
        totalOptionNetIncome: 0,
        totalGuideInput: 0,
        totalNetIncome: 0,
        totalShoppingProfit: 0,
        totalOptionProfit: 0,
        

        temp: ["1-3", "0901블루오션", "캐완,밴휘", "홍선민", "3", "0", "10000", "6684", 
                        "603.28", "0", "0", "350", "65",
                        "672.00", "439.25", "3729", "825",
                        "0", "0", "0", "0", "0", "0",
                        "0",
                        "0", "0", "0", "0", "0", "0",
                        "0",
                        "0",
                        "0"],

        //기간, 행사명, 거래처명, 가이드, 인원, T/C유무, 행사비, 총지출액[7], 
        //차량비계 - ((버스렌트), (회사차량), (소형차렌트), (가스비), (주차비[12])), 
        //행사지출 - ((식사비), (입장료), (호텔료), (가이드비[16])),  
        //쇼핑액 - ((퓨어헬스(45%)), (퓨어헬스(40%), (잡화-벤쿠버), (약방-캔모어), (녹용방-벤쿠버), (녹용방-캘거리[22]))
        //쇼핑수익[23]
        //쇼핑컴 - ((퓨어헬스(45%)), (퓨어헬스(40%), (잡화-벤쿠버), (약방-캔모어), (녹용방-벤쿠버), (녹용방-캘거리[29]))
        //옵션액[30]
        //옵션수익[31]
        //가이드입금[32]
    }

    componentDidMount(){
        this.setState({
            totalCustomer: this.state.totalCustomer + parseInt(accumulatedCustomer),
            totalTourFee: this.state.totalTourFee + parseFloat(accumulatedTourFee),
            totalExpense: this.state.totalExpense + parseFloat(accumulatedExpense),
            totalCarExpense: this.state.totalCarExpense + parseFloat(accumulatedCarExpense),
            totalTourExpense: this.state.totalTourExpense + parseFloat(accumulatedTourExpense),
            totalProfit: this.state.totalProfit + parseFloat(accumulatedProfit),
            totalShoppingNetIncome: this.state.totalShoppingNetIncome + parseFloat(accumulatedShoppingNetIncome),
            totalOptionNetIncome: this.state.totalOptionNetIncome + parseFloat(accumulatedOptionNetIncome),
            totalGuideInput: this.state.totalGuideInput + parseFloat(accumulatedGuideInput),
            totalNetIncome: this.state.totalNetIncome + parseFloat(accumulatedNetIncome),
            totalShoppingProfit: this.state.totalShoppingProfit + parseFloat(accumulatedShoppingProfit),
            totalOptionProfit: this.state.totalOptionProfit + parseFloat(accumulatedOptionProfit),
        });
    }

    render(){
        const tourList = [];

        //Display Table
        for(var idx=0; idx<this.state.tableRow; idx++){
            tourList.push(<TourData num={idx + 1} data={this.state.temp} key={idx} />);
        }
        

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits:2,
        });

        return(
            <div className="netIncome table">
                <Table>
                    <thead>
                        <tr>
                            <th>순서</th>
                            <th>기간</th>
                            <th>행사명</th>
                            <th>거래처명</th>
                            <th>가이드</th>
                            <th>인원</th>
                            <th>T/C유무</th>
                            <th>행사비(CND)</th>

                            {/* 총지출액 */}
                            <th id="totalExpense-title">총지출액</th>
                            <th>차량비계</th>
                            <th>행사지출</th>
                            
                            {/* 총수입액 */}
                            <th id="totalProfit-title">총수입액</th>
                            <th>쇼핑컴</th>
                            <th>옵션수익</th>
                            <th>가이드<br/>입금</th>

                            <th id="totalNetIncome-title">손익(CND)</th>
                            <th>누계</th>

                            <th>쇼핑액</th>
                            <th>옵션액</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {tourList}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{formatter.format(this.state.totalCustomer)}</td>
                            <td></td>
                            <td>{formatter.format(this.state.totalTourFee)}</td>
                            <td id="totalExpense-result">{formatter.format(this.state.totalExpense)}</td>
                            <td>{formatter.format(this.state.totalCarExpense)}</td>
                            <td>{formatter.format(this.state.totalTourExpense)}</td>
                            <td id="totalProfit-result">{formatter.format(this.state.totalProfit)}</td>
                            <td>{formatter.format(this.state.totalShoppingNetIncome)}</td>
                            <td>{formatter.format(this.state.totalOptionNetIncome)}</td>
                            <td>{formatter.format(this.state.totalGuideInput)}</td>
                            <td id="netIncome-result">{formatter.format(this.state.totalNetIncome)}</td>
                            <td></td>
                            <td>{formatter.format(this.state.totalShoppingProfit)}</td>
                            <td>{formatter.format(this.state.totalOptionProfit)}</td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        );
    }
}
class TourData extends Component{
    render(){
        //누적에러 수정
        if(this.props.num === 1 && accumulatedNetIncome !== 0){
            accumulatedNetIncome = 0;
        }

        const totalCarExpense = 
            parseFloat(this.props.data[8]) + 
            parseFloat(this.props.data[9]) + 
            parseFloat(this.props.data[10]) + 
            parseFloat(this.props.data[11]) + 
            parseFloat(this.props.data[12]);

        const totalTourExpense = 
            parseFloat(this.props.data[13]) + 
            parseFloat(this.props.data[14]) + 
            parseFloat(this.props.data[15]) + 
            parseFloat(this.props.data[16]);

        const totalShoppingProfit = 
            parseFloat(this.props.data[17]) + 
            parseFloat(this.props.data[18]) + 
            parseFloat(this.props.data[19]) + 
            parseFloat(this.props.data[20]) + 
            parseFloat(this.props.data[21]) + 
            parseFloat(this.props.data[22]);

        const totalShoppingCom = 
            parseFloat(this.props.data[24]) + 
            parseFloat(this.props.data[25]) + 
            parseFloat(this.props.data[26]) + 
            parseFloat(this.props.data[27]) + 
            parseFloat(this.props.data[28]) + 
            parseFloat(this.props.data[29]);

        //총지출액
        const totalExpense = parseFloat(totalCarExpense) + parseFloat(totalTourExpense);
        const totalProfit = parseFloat(totalShoppingProfit) + parseFloat(this.props.data[31]) + parseFloat(this.props.data[32]);
        const netIncome = parseFloat(this.props.data[6]) - 
                        parseFloat(totalExpense) + 
                        parseFloat(totalProfit);

        //누적
        accumulatedTourFee = parseFloat(accumulatedTourFee) + parseFloat(this.props.data[6]); //행사비
        accumulatedCarExpense = parseFloat(accumulatedCarExpense) + parseFloat(totalCarExpense);
        accumulatedTourExpense = parseFloat(accumulatedTourExpense) + parseFloat(totalTourExpense);
        accumulatedExpense = parseFloat(accumulatedExpense) + parseFloat(totalExpense);
        accumulatedCustomer = parseInt(this.props.data[4]) + parseInt(accumulatedCustomer); //행사인원
        accumulatedShoppingNetIncome = parseFloat(accumulatedShoppingNetIncome) + parseFloat(totalShoppingCom);
        accumulatedOptionNetIncome = parseFloat(accumulatedOptionNetIncome) + parseFloat(this.props.data[31]); //옵션수익
        accumulatedGuideInput = parseFloat(accumulatedGuideInput) + parseFloat(this.props.data[32]); //가이드입금
        accumulatedProfit = parseFloat(accumulatedProfit) + parseFloat(totalProfit);
        accumulatedNetIncome = parseFloat(accumulatedNetIncome) + parseFloat(netIncome);
        accumulatedShoppingProfit = parseFloat(accumulatedShoppingProfit) + parseFloat(totalShoppingProfit);
        accumulatedOptionProfit = parseFloat(accumulatedOptionProfit) + parseFloat(this.props.data[30]);

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits:2,
        });

        return(
            <tr>
                <td>{this.props.num}</td>
                <td>{this.props.data[0]}</td>
                <td>{this.props.data[1]}</td>
                <td>{this.props.data[2]}</td>
                <td>{this.props.data[3]}</td>
                <td>{this.props.data[4]}</td>
                <td>{this.props.data[5]}</td>
                <td>{formatter.format(this.props.data[6])}</td>

                {/* 총지출액 */}
                <td id="totalExpense">{formatter.format(totalExpense)}</td>
                <td id="expense">
                {/* 차량비계 */}
                <Modal header="차량비계" trigger={<div>{formatter.format(totalCarExpense)}</div>}>
                    <Table>
                        <thead>
                            <tr>
                                <th>버스렌트</th>
                                <th>회사차량</th>
                                <th>소형차렌트</th>
                                <th>가스비</th>
                                <th>주차비</th>
                                <th>총 차량비</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.props.data[8]}</td>
                                <td>{this.props.data[9]}</td>
                                <td>{this.props.data[10]}</td>
                                <td>{this.props.data[11]}</td>
                                <td>{this.props.data[12]}</td>
                                <td>{totalCarExpense}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal>
                </td>

                <td id="expense">
                {/* 행사지출 */}
                <Modal header="행사지출" trigger={<div>{formatter.format(totalTourExpense)}</div>}>
                    <Table>
                        <thead>
                            <tr>
                                <th>식사대</th>
                                <th>입장료</th>
                                <th>호텔료</th>
                                <th>가이드비</th>
                                <th>총계</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.props.data[13]}</td>
                                <td>{this.props.data[14]}</td>
                                <td>{this.props.data[15]}</td>
                                <td>{this.props.data[16]}</td>
                                <td>{totalTourExpense}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal>
                </td>

                {/* 총수입액 */}
                <td id="totalProfit">{formatter.format(totalProfit)}</td>

                <td id="profit">
                {/* 쇼핑수입 */}
                <Modal header="쇼핑컴" trigger={<div>{formatter.format(totalShoppingCom)}</div>}>
                    <Table>
                        <thead>
                            <tr>
                                <th>퓨어헬스(45%)</th>
                                <th>퓨어헬스(40%)</th>
                                <th>잡화(밴쿠버)</th>
                                <th>약방(캔모어)</th>
                                <th>녹용방(밴쿠버)</th>
                                <th>녹용방(캘거리)</th>
                                <th>총 쇼핑컴</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.props.data[24]}</td>
                                <td>{this.props.data[25]}</td>
                                <td>{this.props.data[26]}</td>
                                <td>{this.props.data[27]}</td>
                                <td>{this.props.data[28]}</td>
                                <td>{this.props.data[29]}</td>
                                <td>{totalShoppingCom}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal>
                </td>

                {/* 옵션수익 */}
                <td id="profit">{formatter.format(this.props.data[31])}</td>
                
                {/* 가이드입금 */}
                <td id="profit">{formatter.format(this.props.data[32])}</td>

                {/* 손익 */}
                <td id="netincome">{formatter.format(netIncome)}</td>

                {/* 누계 */}
                <td>{formatter.format(accumulatedNetIncome)}</td>

                <td>
                {/* 쇼핑액 */}
                <Modal header="쇼핑액" trigger={<div>{formatter.format(totalShoppingProfit)}</div>}>
                    <Table>
                        <thead>
                            <tr>
                                <th>퓨어헬스(45%)</th>
                                <th>퓨어헬스(40%)</th>
                                <th>잡화(밴쿠버)</th>
                                <th>약방(캔모어)</th>
                                <th>녹용방(밴쿠버)</th>
                                <th>녹용방(캘거리)</th>
                                <th>총 쇼핑액</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.props.data[17]}</td>
                                <td>{this.props.data[18]}</td>
                                <td>{this.props.data[19]}</td>
                                <td>{this.props.data[20]}</td>
                                <td>{this.props.data[21]}</td>
                                <td>{this.props.data[22]}</td>
                                <td>{totalShoppingProfit}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal>
                </td>

                {/* 옵션액 */}
                <td>{formatter.format(this.props.data[30])}</td>
            </tr>
        );
    }
}