import React, { Component } from 'react';
import {Row, Col, TextInput} from 'react-materialize';
import '../css/guide.css';

//EXPENSE
class Expense extends Component{
    constructor(props){
        super(props);

        this.state = {
            mealDayNum: 2,
            hotelNum: 1,
            attractionNum: 1,
            carNum: 1,
            miscNum: 1,
            extraCarExpense: 0,
            inputAmount: '',
        };
    }
    

    render(){
        const mealDay = [];
        const hotel = [];
        const attraction = [];
        const car = [];
        const misc = [];

        var counter = 2;

        for(var i=2; i<this.state.mealDayNum; i++){
            mealDay.push(<ExpenseRestaurant key={counter} day={"D" + i}  id={counter} mealTime={"조식"} onChange={this.props.onChange}/>);
            mealDay.push(<ExpenseRestaurant key={counter+1} day={"D" + i}  id={counter+1} mealTime={"중식"} onChange={this.props.onChange}/>);
            mealDay.push(<ExpenseRestaurant key={counter+2} day={"D" + i}  id={counter+2} mealTime={"석식"} onChange={this.props.onChange}/>);
            counter = counter + 3;
        };

        for(var x=0; x<this.state.hotelNum; x++){
            hotel.push(<ExpenseHotel key={x} id={x} onChange={this.props.onChange}/>);
        }

        for(var ind=0; ind<this.state.attractionNum; ind++){
            attraction.push(<ExpenseAttraction key={ind} id={ind} onChange={this.props.onChange}/>);
        }

        for(var index=0; index<this.state.carNum; index++){
            car.push(<ExpenseCar key={index} id={index} onChange={this.props.onChange}/>);
        }

        for(var ix=1; ix<this.state.miscNum; ix++){
            misc.push(<this.ExpenseMisc key={ix} id={ix} onChange={this.props.onChange}/>);
        }

        return(
            <div className="guide-accounting-form expense">
                <h6>레스토랑</h6>
                {/* <hr /> */}
                <Row>
                    <Col s={12} className="form-restaurant-add">
                        <div className="waves-effect waves-light btn remove-btn" onClick={this.removeRestaurantDay} >-</div>
                        <div className="waves-effect waves-light btn add-btn" onClick={this.addRestaurantDay} >+</div>
                    </Col>
                    <div className="form-restaurant">
                        <ExpenseRestaurant day="D1" mealTime="중식" key="1" id={"0"} onChange={this.props.onChange}/>
                        <ExpenseRestaurant day="D1" mealTime="석식" key="2" id={"1"} onChange={this.props.onChange}/>
                        {mealDay}
                    </div>
                </Row>
                <hr />
                <h6>호텔</h6>
                <Row>
                    <Col s={12} className="form-hotel-add">
                        <div className="waves-effect waves-light btn remove-btn" onClick={this.removeHotel} >-</div>
                        <div className="waves-effect waves-light btn add-btn" onClick={this.addHotel} >+</div>
                    </Col>
                    <div className="form-hotel">
                        {hotel}
                    </div>
                    
                </Row>
                <hr />
                <h6>입장료</h6>
                
                <Row>
                    <Col s={12} className="form-attraction-add">
                        <div className="waves-effect waves-light btn remove-btn" onClick={this.removeAttraction} >-</div>
                        <div className="waves-effect waves-light btn add-btn" onClick={this.addAttraction} >+</div>
                    </Col>
                    <div className="form-attraction">
                        {attraction}
                    </div>
                </Row>
                <hr />
                <h6>차량비</h6>
                
                <Row>
                    <Col s={12} className="form-car-add">
                        <div className="waves-effect waves-light btn remove-btn" onClick={this.removeCar} >-</div>
                        <div className="waves-effect waves-light btn add-btn" onClick={this.addCar} >+</div>
                    </Col>
                    <div className="form-car">
                        {car}
                    </div>
                </Row>
                <hr />
                <h6>기타비용</h6>
                
                <Row>
                    <div className="form-expense-etc">
                        <this.ExpenseEtc title={"주차비용"} id={"1"} onChange={this.props.onChange}/>
                        <this.ExpenseEtc title={"가스비용"} id={"2"} onChange={this.props.onChange}/>
                        <this.ExpenseEtc title={"가이드 지급비용"}id={"3"} onChange={this.props.onChange}/>
                        <this.ExpenseEtc title={"픽업비용"} id={"4"} onChange={this.props.onChange}/>
                        <this.ExpenseEtc title={"별도 지급 차량비"} id={"5"} onChange={this.props.onChange}/>
                    </div>
                </Row>
                <hr />
                <h6>그 외</h6>
                
                <Row>
                    <div className="form-expense-misc">
                         <Col s={12} className="form-misc-add">
                            <div className="waves-effect waves-light btn remove-btn" onClick={this.removeMisc} >-</div>
                            <div className="waves-effect waves-light btn add-btn" onClick={this.addMisc} >+</div>
                        </Col>
                        <this.ExpenseMisc onChange={this.props.onChange} id={"0"}/>
                        {misc}
                    </div>
                </Row>
            </div>
        );
    }

    //Add or Remove
    addRestaurantDay = () => {
        this.setState({
            mealDayNum: this.state.mealDayNum + 1,
        });
    }
    removeRestaurantDay = () =>{
        if(this.state.mealDayNum > 2){
            this.setState({
                mealDayNum: this.state.mealDayNum - 1,
            })
        }
    }

    addHotel = () => {
        this.setState({
            hotelNum: this.state.hotelNum + 1,
        })
    }
    removeHotel = () => {
        if(this.state.hotelNum > 1){
            this.setState({
                hotelNum: this.state.hotelNum - 1,
            })
        }
    }

    addAttraction = () => {
        this.setState({
            attractionNum: this.state.attractionNum + 1,
        })
    }
    removeAttraction = () => {
        if(this.state.attractionNum > 1){
            this.setState({
                attractionNum: this.state.attractionNum - 1,
            })
        }
    }
    addCar = () => {
        this.setState({
            carNum: this.state.carNum + 1,
        })
    }
    removeCar = () => {
        if(this.state.carNum > 1){
            this.setState({
                carNum: this.state.carNum - 1,
            })
        }
    }

    addMisc = () => {
        this.setState({
            miscNum: this.state.miscNum + 1,
        })
    }
    removeMisc = () => {
        if(this.state.miscNum > 1){
            this.setState({
                miscNum: this.state.miscNum - 1,
            })
        }
    }

    ExpenseEtc = (props) =>{
        return(
            <Col s={12}>
                <Col s={4}>
                    <p>{props.title}</p>
                </Col>
                <Col s={4}>
                    <TextInput label="금액" type="number" id={props.id} onChange={props.onChange} name="etc-expense"/>
                </Col>
                <Col s={4}>
                    <label>지급 방식</label>
                    <select className="browser-default">
                        <option defaultValue="-">-</option>
                        <option value="회사카드">회사카드</option>
                        <option value="회사체크">회사체크</option>
                        <option value="가이드페이">가이드 페이</option>
                        <option value="REM">Reimbersement</option>
                    </select>
                </Col>
            </Col>
        );
    }

    ExpenseMisc = (props) =>{
        return(
            <Col s={12}>
                <Col s={4}>
                    <TextInput label="지출 내용" />
                </Col>
                <Col s={4}>
                    <TextInput label="금액" type="number" id={props.id+""} onChange={props.onChange} name="misc-expense"/>
                </Col>
                <Col s={4}>
                    <label>지급 방식</label>
                    <select className="browser-default">
                        <option defaultValue="-">-</option>
                        <option value="회사카드">회사카드</option>
                        <option value="회사체크">회사체크</option>
                        <option value="가이드페이">가이드 페이</option>
                        <option value="REM">Reimbersement</option>
                    </select>
                </Col>
            </Col>
        );
    }
}

export default Expense;
class ExpenseRestaurant extends Component{
    render(){
        const {day, mealTime} = this.props;
        return(
            <Col s={12}>
                <Col s={2}>
                    <p>{day}.{mealTime}</p>
                </Col>
                <Col s={2}>
                    <label>식당명</label>
                    <select className="browser-default">
                        <option defaultValue="-">-</option>
                        <option value="일억조">일억조</option>
                        <option value="호프스시">호프스시</option>
                        <option value="WK가든">WK가든</option>
                        <option value="돈미">돈미</option>
                    </select>
                </Col>
                <Col s={2}>
                    <TextInput label="금액" type="number" id={this.props.id+""} onChange={this.props.onChange} name="rest-expense"/>
                </Col>
                <Col s={2}>
                    <TextInput label="인원" type="number" id={this.props.id+""} onChange={this.props.onChange} name="rest-expense"/>
                </Col>
                <Col s={2}>
                    <p>인당 금액</p>
                </Col>
                <Col s={2}>
                    <label>지급 방식</label>
                    <select className="browser-default">
                        <option defaultValue="-">-</option>
                        <option value="회사카드">회사카드</option>
                        <option value="회사체크">회사체크</option>
                        <option value="가이드페이">가이드 페이</option>
                        <option value="REM">Reimbersement</option>
                    </select>
                </Col>
            </Col>
        );
    }
}

const ExpenseHotel = (props) => {
    var idx = "1";
    // if(props.idx !== null){
    //     idx = props.idx;
    // }
    return(
        <Col s={12}>
            <div className="hotel-expense">
            <Row>
                <Col s={12}>
                    <span>호텔 No.{idx}</span>
                </Col>

                <Col s={4}>
                    <input type="date" name={"hotel-expense"}/>
                    <label>체크인 날짜</label>
                </Col>
                <Col s={1}>
                    <p>~</p>
                </Col>
                <Col s={4}>
                    <input type="date" name={"hotel-expense"}/>
                    <label>체크인 날짜</label>
                </Col>
                <Col s={3}>
                    <label>호텔명</label>
                    <select className="browser-default">
                        <option defaultValue="-">-</option>
                        <option value="포포인트 써리">포포인트 써리</option>
                        <option value="라마다 레벨스톡">라마다 레벨스톡</option>
                        <option value="컴포트인 써리">컴포트인 써리</option>
                        <option value="베케이션인">베케이션인</option>
                    </select>
                </Col>
            </Row>
            <Row>
                {/* 호텔정보 */}
                
                <Col s={3}>
                    <TextInput label="룸 수" type="number" id={props.id+""} onChange={props.onChange} name={"hotel-expense"}/>
                </Col>
                <Col s={3}>
                    <TextInput label="금액" type="number" id={props.id+""} onChange={props.onChange} name={"hotel-expense"}/>
                </Col>
                <Col s={2}>
                    <p>방당 가격</p>
                </Col>
                <Col s={4}>
                    <label>지급 방식</label>
                    <select className="browser-default">
                        <option defaultValue="-">-</option>
                        <option value="회사카드">회사카드</option>
                        <option value="회사체크">회사체크</option>
                        <option value="가이드페이">가이드 페이</option>
                        <option value="REM">Reimbersement</option>
                    </select>
                </Col>
            </Row>   
            </div>
        </Col>
    );
}

const ExpenseAttraction = props => (
    <Col s={12}>
        <Col s={3}>
            <label>장소</label>
            <select className="browser-default">
                <option defaultValue="-">-</option>
                <option value="설상차">설상차</option>
                <option value="레이크루이스곤돌라">레이크루이스곤돌라</option>
                <option value="설퍼산곤돌라">설퍼산곤돌라</option>
                <option value="부차드가든">부차드가든</option>
            </select>
        </Col>
        <Col s={3}>
            <TextInput label="인원" type="number" id={props.id+""} onChange={props.onChange} name={"attraction-expense"}/> 
        </Col>
        <Col s={3}>
            <TextInput label="금액" type="number" id={props.id+""} onChange={props.onChange} name={"attraction-expense"}/> 
        </Col>
        <Col s={3}>
            <label>지급 방식</label>
            <select className="browser-default">
                <option defaultValue="-">-</option>
                <option value="캐완,밴휘">회사카드</option>
                <option value="캐완,밴휘">회사체크</option>
                <option value="캐완,밴휘">가이드 페이</option>
                <option value="REM">Reimbersement</option>
            </select>
        </Col>
    </Col>
)

const ExpenseCar = props => (
    <Col s={12}>
        <Col s={3}>
            <label>회사명</label>
            <select className="browser-default">
                <option defaultValue="-">-</option>
                <option value="밍닷">밍닷</option>
                <option value="PWC">PWC</option>
                <option value="PJL">PJL</option>
                <option value="기타">기타</option>
            </select>
        </Col>
        <Col s={2}>
            <TextInput label="기간" type="number" id={"" + props.id} onChange={props.onChange} name="car-expense"/>
        </Col>
        <Col s={2}>
            <TextInput label="금액" type="number" id={"" + props.id} onChange={props.onChange} name="car-expense"/>
        </Col>
        <Col s={2}>
            <p>하루 비용</p>
        </Col>
        <Col s={2}>
            <label>지급 방식</label>
            <select className="browser-default">
                <option defaultValue="-">-</option>
                <option value="회사카드">회사카드</option>
                <option value="회사체크">체크</option>
                <option value="가이드페이">가이드 페이</option>
                <option value="REM">Reimbersement</option>
            </select>
        </Col>
    </Col>
)

