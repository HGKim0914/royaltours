import React, { Component } from 'react';
import {Row, Col} from 'react-materialize';
import '../css/guide.css';

class CashSettlement extends Component {
    state = {
        cashPlus: 0,
        cashMinus: 0,
        inboundTip: 0,
        localTip:0,
    }
    render(){
        const plus = [];
        const minus = [];
        const inbound = [];
        const local = [];

        for(var x=0; x<this.state.cashPlus; x++){
            plus.push(<CashSettlementPlus key={x} />);
        }

        for(var y=0; y<this.state.cashMinus; y++){
            minus.push(<CashSettlementMinus key={y} />);
        }

        for(var z=0; z<this.state.inboundTip;z++){
            inbound.push(<TipSettlementInbound key={z} />);
        }

        for(var a=0; a<this.state.localTip;a++){
            local.push(<TipSettlementLocal key={z} />);
        }

        return(
            <Row>
            <div className="guide-accounting-form settlement plus">
                <Col s={12} className="form-tour-total-income">
                    <h6>자금의 수입(+)</h6>
                    <div className="waves-effect waves-light btn remove-btn" onClick={this.removeCashPlus} >-</div>
                    <div className="waves-effect waves-light btn add-btn" onClick={this.addCashPlus} >+</div>
                </Col>
                <Col s={12}>
                    <Col s={3}>
                        <p>행사비 수령</p>
                    </Col>
                    <Col s={3}>
                        <div className="input-field">
                            <input type="text" id="plus-cash-from-company" className="validate" />
                            <label>금액</label>
                        </div>
                    </Col>
                    <Col s={6}>
                        <div className="input-field">
                            <input type="text" id="plus-cash-from-company-desc" className="validate" />
                            <label>비고</label>
                        </div>
                    </Col>
                </Col>
                <Col s={12}>
                    <Col s={3}>
                        <p>투어비 현지수금</p>
                    </Col>
                    <Col s={3}>
                        <div className="input-field">
                            <input type="text" id="plus-cash-tourfee" className="validate" />
                            <label>금액</label>
                        </div>
                    </Col>
                    <Col s={6}>
                        <div className="input-field">
                            <input type="text" id="plus-cash-tourfee-desc" className="validate" />
                            <label>비고</label>
                        </div>
                    </Col>
                </Col>
                <Col s={12}>
                    <Col s={3}>
                        <p>쇼핑 매출<br />가이드 수금</p>
                    </Col>
                    <Col s={3}>
                        <div className="input-field">
                            <input type="text" id="plus-cash-from-shopping" className="validate" />
                            <label>금액</label>
                        </div>
                    </Col>
                    <Col s={6}>
                        <div className="input-field">
                            <input type="text" id="plus-cash-from-shopping-desc" className="validate" />
                            <label>비고</label>
                        </div>
                    </Col>
                </Col>
                <Col s={12}>
                    <Col s={3}>
                        <p>가이드 입금<br />(상조경비 등)</p>
                    </Col>
                    <Col s={3}>
                        <div className="input-field">
                            <input type="text" id="plus-cash-guide-deposit" className="validate" />
                            <label>금액</label>
                        </div>
                    </Col>
                    <Col s={6}>
                        <div className="input-field">
                            <input type="text" id="plus-cash-guide-deposit-desc" className="validate" />
                            <label>비고</label>
                        </div>
                    </Col>
                </Col>
                <Col s={12}>
                    <Col s={3}>
                        <p>기타입금</p>
                    </Col>
                    <Col s={3}>
                        <div className="input-field">
                            <input type="text" id="plus-cash-mis" className="validate" />
                            <label>금액</label>
                        </div>
                    </Col>
                    <Col s={6}>
                        <div className="input-field">
                            <input type="text" id="plus-cash-mis-desc" className="validate" />
                            <label>비고</label>
                        </div>
                    </Col>
                </Col>
                {plus}
                <Col s={12}>
                    <br /><hr /><br />
                </Col>
            </div>
            <div className="guide-accounting-form settlement minus">
                <Col s={12} className="form-tour-total-expense">
                    <h6>자금의 지출(-)</h6>
                    <div className="waves-effect waves-light btn remove-btn" onClick={this.removeCashMinus} >-</div>
                    <div className="waves-effect waves-light btn add-btn" onClick={this.addCashMinus} >+</div>
                </Col>
                <Col s={12}>
                    <Col s={3}>
                        <p>회사가 수금한 <br />가이드 팁(로컬행사)</p>
                    </Col>
                    <Col s={3}>
                        <div className="input-field">
                            <input type="text" id="minus-cash-tip" className="validate" />
                            <label>금액</label>
                        </div>
                    </Col>
                    <Col s={6}>
                        <div className="input-field">
                            <input type="text" id="minus-cash-tip-desc" className="validate" />
                            <label>비고</label>
                        </div>
                    </Col>
                </Col>
                <Col s={12}>
                    <Col s={3}>
                        <p>옵션포함의 경우 <br />옵션비용</p>
                    </Col>
                    <Col s={3}>
                        <div className="input-field">
                            <input type="text" id="minus-cash-option" className="validate" />
                            <label>금액</label>
                        </div>
                    </Col>
                    <Col s={6}>
                        <div className="input-field">
                            <input type="text" id="minus-cash-option-desc" className="validate" />
                            <label>비고</label>
                        </div>
                    </Col>
                </Col>
                <Col s={12}>
                    <Col s={3}>
                        <p>기타입금</p>
                    </Col>
                    <Col s={3}>
                        <div className="input-field">
                            <input type="text" id="minus-cash-mis" className="validate" />
                            <label>금액</label>
                        </div>
                    </Col>
                    <Col s={6}>
                        <div className="input-field">
                            <input type="text" id="minus-cash-mis-desc" className="validate" />
                            <label>비고</label>
                        </div>
                    </Col>
                </Col>
                {minus}
                <Col s={12}>
                    <br /><hr /><br />
                </Col>
            </div>
            <div className="guide-accounting-form settlement inbound">
                <Col s={12} className="form-tour-total-inbound">
                    <h6>가이드 팁의 정리(인바운드)</h6>
                    <div className="waves-effect waves-light btn remove-btn" onClick={this.removeTipInbound} >-</div>
                    <div className="waves-effect waves-light btn add-btn" onClick={this.addTipInbound} >+</div>
                </Col>
                <Col s={12}>
                    <div className="guide-portion">
                        <Col s={12}>
                            <span>팁 포함 행사의 가이드 포션(-)</span>
                        </Col>
                        {/* 팁 포함 행사의 가이드 포션 */}
                        <Col s={2}>
                            <div className="input-field">
                                <input type="number" id="included-tip-numPax" className="validate" />
                                <label>인원</label>
                            </div>
                        </Col>
                        <Col s={2}>
                            <div className="input-field">
                                <input type="number" id="included-tip-amount" className="validate" />
                                <label>팁 금액</label>
                            </div>
                        </Col>
                        <Col s={2}>
                            <div className="input-field">
                                <input type="number" id="included-tip-day" className="validate" />
                                <label>일 수</label>
                            </div>
                        </Col>
                        <Col s={2}>
                            <p>총 액</p>
                        </Col>
                        <Col s={4}>
                            <div className="input-field">
                                <input type="text" id="minus-cash-tip-desc" className="validate" />
                                <label>비고</label>
                            </div>
                        </Col>
                    </div>
                </Col>
                {inbound}
                <Col s={12}>
                    <br /><hr /><br />
                </Col>
            </div>

            <div className="guide-accounting-form settlement local">
                <Col s={12} className="form-tour-total-local">
                    <h6>가이드 팁의 정리(로컬행사)</h6>
                    <div className="waves-effect waves-light btn remove-btn" onClick={this.removeTipLocal} >-</div>
                    <div className="waves-effect waves-light btn add-btn" onClick={this.addTipLocal} >+</div>
                </Col>
                <Col s={12}>
                    <Col s={2}>
                        <select className="browser-default">
                            <option defaultValue="-">-</option>
                            <option value="성인">성인</option>
                            <option value="아동">아동</option>
                        </select>
                    </Col>
                    <Col s={2}>
                        <div className="input-field">
                            <input type="text" id="included-tip-numPax-local" className="validate" />
                            <label>인원</label>
                        </div>
                    </Col>
                    <Col s={2}>
                        <div className="input-field">
                            <input type="text" id="included-tip-amount-local" className="validate" />
                            <label>팁 금액</label>
                        </div>
                    </Col>
                    <Col s={2}>
                        <div className="input-field">
                            <input type="text" id="included-tip-day-local" className="validate" />
                            <label>일 수</label>
                        </div>
                    </Col>
                    <Col s={2}>
                        <p>총 액</p>
                    </Col>
                    <Col s={2}>
                        <div className="input-field">
                            <input type="text" id="minus-cash-tip-desc-local" className="validate" />
                            <label>비고</label>
                        </div>
                    </Col>
                </Col>
                {local}
            </div>
        </Row>
        );
    }

    addCashPlus = () => {
        this.setState({
            cashPlus: this.state.cashPlus + 1,
        });
    }
    removeCashPlus = () =>{
        if(this.state.cashPlus > 0){
            this.setState({
                cashPlus: this.state.cashPlus - 1,
            })
        }
    }

    addCashMinus = () => {
        this.setState({
            cashMinus: this.state.cashMinus + 1,
        });
    }
    removeCashMinus = () =>{
        if(this.state.cashMinus > 0){
            this.setState({
                cashMinus: this.state.cashMinus - 1,
            })
        }
    }

    addTipInbound = () => {
        this.setState({
            inboundTip: this.state.inboundTip + 1,
        });
    }
    removeTipInbound = () =>{
        if(this.state.inboundTip > 0){
            this.setState({
                inboundTip: this.state.inboundTip - 1,
            })
        }
    }

    addTipLocal = () => {
        this.setState({
            localTip: this.state.localTip + 1,
        });
    }
    removeTipLocal = () =>{
        if(this.state.localTip > 0){
            this.setState({
                localTip: this.state.localTip - 1,
            })
        }
    }
}
export default CashSettlement;

const CashSettlementPlus = (props) => (
    <Col s={12}>
        <Col s={3}>
            <p>기타입금</p>
        </Col>
        <Col s={3}>
            <div className="input-field">
                <input type="text" id="plus-cash-mis" className="validate" />
                <label>금액</label>
            </div>
        </Col>
        <Col s={6}>
            <div className="input-field">
                <input type="text" id="plus-cash-mis-desc" className="validate" />
                <label>비고</label>
            </div>
        </Col>
    </Col>
)


const CashSettlementMinus = (props) => (
    <Col s={12}>
        <Col s={3}>
            <p>기타입금</p>
        </Col>
        <Col s={3}>
            <div className="input-field">
                <input type="text" id="minus-cash-mis" className="validate" />
                <label>금액</label>
            </div>
        </Col>
        <Col s={6}>
            <div className="input-field">
                <input type="text" id="minus-cash-mis-desc" className="validate" />
                <label>비고</label>
            </div>
        </Col>
    </Col>

)

const TipSettlementInbound = (props) => (

    <Col s={12}>
        <div className="guide-portion">
            <Col s={12}>
                <span>기타</span>
            </Col>
            <Col s={2}>
                <div className="input-field">
                    <input type="text" id="included-tip-numPax" className="validate" />
                    <label>인원</label>
                </div>
            </Col>
            <Col s={2}>
                <div className="input-field">
                    <input type="text" id="included-tip-amount" className="validate" />
                    <label>팁 금액</label>
                </div>
            </Col>
            <Col s={2}>
                <div className="input-field">
                    <input type="text" id="included-tip-day" className="validate" />
                    <label>일 수</label>
                </div>
            </Col>
            <Col s={2}>
                <p>총 액</p>
            </Col>
            <Col s={4}>
                <div className="input-field">
                    <input type="text" id="minus-cash-tip-desc" className="validate" />
                    <label>비고</label>
                </div>
            </Col>
        </div>
    </Col>

)

const TipSettlementLocal = (props) => (

    <Col s={12}>
        <Col s={2}>
            <select className="browser-default">
                <option defaultValue="-">-</option>
                <option value="성인">성인</option>
                <option value="아동">아동</option>
            </select>
        </Col>
        <Col s={2}>
            <div className="input-field">
                <input type="text" id="included-tip-numPax-local" className="validate" />
                <label>인원</label>
            </div>
        </Col>
        <Col s={2}>
            <div className="input-field">
                <input type="text" id="included-tip-amount-local" className="validate" />
                <label>팁 금액</label>
            </div>
        </Col>
        <Col s={2}>
            <div className="input-field">
                <input type="text" id="included-tip-day-local" className="validate" />
                <label>일 수</label>
            </div>
        </Col>
        <Col s={2}>
            <div className="input-field">
                <input type="text" id="included-tip-total-local" className="validate" />
                <label>총 액</label>
            </div>
        </Col>
        <Col s={2}>
            <div className="input-field">
                <input type="text" id="minus-cash-tip-desc-local" className="validate" />
                <label>비고</label>
            </div>
        </Col>
    </Col>

)