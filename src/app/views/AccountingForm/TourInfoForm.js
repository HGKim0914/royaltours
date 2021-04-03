import React, { Component } from 'react';
import { Col, Checkbox} from 'react-materialize';

class TourInfoInput extends Component{
    state = {
        tourtype: "-",
    }

    render(){
        var tc = this.props.info[5];
        var tourtype = this.props.info[4];

        //TC Checked or not
        var tcObj = "";
        console.log(tc);
        if(tc !== undefined){
            if(tc === "1"){
                tcObj = <Checkbox label="TC" value={tc} id="input-tc" onChange={this.props.onChange} checked={true} />
            }else{
                tcObj = <Checkbox label="TC" value={tc} id="input-tc" onChange={this.props.onChange} checked={false}/>
            }
        }

        return(
            <div className="input">
                <div className="title">
                    투어정보
                </div>
                <div className="desc">
                    <Col s={12}>
                        <Col s={3}>
                            <label>행사인원</label>
                            <input type="number" id="input-num" name="numpax" defaultValue={this.props.info[6]} />
                        </Col>
                        <Col s={3}>
                            <div id="cbx-tc">
                                {tcObj}
                                <label id="label"> 유무</label>
                            </div>
                        </Col>
                        <Col s={3}>
                            <label>룸 수</label>
                            <input type="number" id="input-roomnum" name="numroom" defaultValue={this.props.info[7]} />
                        </Col>
                        <Col s={3}>
                            <label>투어종류</label>
                            <select value={tourtype} className="browser-default" id="input-tourtype" onChange={this.props.onChange}>
                                <option defaultValue="-" disabled>-</option>
                                <option value="록키코치">록키코치</option>
                                <option value="캐완">캐완</option>
                                <option value="당일투어">당일투어</option>
                            </select>
                        </Col>
                    </Col>
                </div>
                <div className="empty" style={{color: "white"}}>.</div>
            </div>
        );
    }
}

export default TourInfoInput;
