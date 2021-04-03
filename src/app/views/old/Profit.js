import React, { Component } from 'react';
import {Row, Col} from 'react-materialize';
import '../css/guide.css';

//Profit
class Profit extends Component{
    state ={
        shoppingNum: 1,
        optionNum: 1,
    }
    render(){
        const shopping = [];
        const option = [];

        for(var x=0; x<this.state.shoppingNum; x++){
            shopping.push(<ProfitShopping key={x} onChange={this.props.onChange} id={x+1}/>);
        }

        for(var y=0; y<this.state.optionNum; y++){
            option.push(<ProfitOption key={y} onChange={this.props.onChange} id={y+1}/>)
        }

        return(
            <div className="guide-accounting-form profit">
                <h6>쇼핑</h6>
                <Row>
                    <Col s={12} className="form-shopping-add">
                        <div className="waves-effect waves-light btn remove-btn" onClick={this.removeShopping} >-</div>
                        <div className="waves-effect waves-light btn add-btn" onClick={this.addShopping} >+</div>
                    </Col>
                    {shopping}
                </Row>
                <br /><br />
                <hr />
                <br /><br />
                <h6>옵션투어</h6>
                <Row>
                    <Col s={12} className="form-option-add">
                        <div className="waves-effect waves-light btn remove-btn" onClick={this.removeOption} >-</div>
                        <div className="waves-effect waves-light btn add-btn" onClick={this.addOption} >+</div>
                    </Col>
                    {option}
                </Row>
            </div>
        );
    }

    addShopping = () => {
        this.setState({
            shoppingNum: this.state.shoppingNum + 1,
        })
    }

    removeShopping = () => {
        if(this.state.shoppingNum > 1){
            this.setState({
                shoppingNum: this.state.shoppingNum - 1,
            })
        }
    }

    addOption = () => {
        this.setState({
            optionNum: this.state.optionNum + 1,
        })
    }

    removeOption = () => {
        if(this.state.optionNum > 1){
            this.setState({
                optionNum: this.state.optionNum - 1,
            })
        }
    }
}

class ProfitShopping extends Component{
    render(){
        return(
            <Col s={12}>
                <Col s={3}>
                    <label>쇼핑센터</label>
                    <select className="browser-default">
                        <option value="">-</option>
                        <option value="퓨어헬스(45%)">퓨어헬스(45%)</option>
                        <option value="퓨어헬스(40%)">퓨어헬스(40%)</option>
                        <option value="록키약방">록키약방</option>
                        <option value="캔모어">캔모어</option>
                    </select>
                </Col>
                <Col s={3}>
                    <div className="input-field">
                        <input type="number" id="shopping-amount" className="validate" />
                        <label>판매 총 액</label>
                    </div>
                </Col>
                <Col s={2}>
                    <div className="input-field">
                        <input type="number" id={this.props.id + ""} name="shopping-com-amount" className="validate" onChange={this.props.onChange}/>
                        <label>커미션 금액</label>
                    </div>
                </Col>
                <Col s={2}>
                    <div className="input-field">
                        <input type="number" id="shopping-guide-profit" className="validate" />
                        <label>가이드 수입</label>
                    </div>
                </Col>
                <Col s={2}>
                    <div className="input-field">
                        <input type="number" id="shopping-TC-profit" className="validate" />
                        <label>TC 수입</label>
                    </div>
                </Col>
            </Col>
        );
    }
}
export default Profit;

class ProfitOption extends Component{
    render(){
        return(
            <Col s={12}>
                <Col s={2}>
                    <label>선택관광</label>
                    <select className="browser-default">
                        <option value="">-</option>
                        <option value="설상차">설상차</option>
                        <option value="곤돌라">곤돌라</option>
                        <option value="헬기">헬기</option>
                        <option value="랍스터">랍스터</option>
                    </select>
                </Col>
                <Col s={2}>
                    <label>투어종류</label>
                    <select className="browser-default">
                        <option value="">-</option>
                        <option value="인바운드">인바운드</option>
                        <option value="로컬">로컬</option>
                    </select>
                </Col>
                <Col s={2}>
                    <label>구분</label>
                    <select className="browser-default">
                        <option value="">-</option>
                        <option value="성인">성인</option>
                        <option value="아동">아동</option>
                    </select>
                </Col>
                <Col s={2}>
                    <div className="input-field">
                        <input type="number" id="option-numPax" className="validate" />
                        <label>인원</label>
                    </div>
                </Col>
                <Col s={2}>
                    <div className="input-field">
                        <input type="number" id="shopping-sales-price" className="validate" />
                        <label>판매가</label>
                    </div>
                </Col>
                <Col s={2}>
                    <div className="input-field">
                        <input type="number" id={this.props.id + ""} name="option-total-amount" className="validate" onChange={this.props.onChange}/>
                        <label>총 액</label>
                    </div>
                </Col>

            </Col>
        );
    }
}
