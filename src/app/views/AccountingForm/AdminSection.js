import React, { Component } from 'react';
import $ from 'jquery';
import DatabaseConnectionHelper from '../../helper/DatabaseConnectionHelper';

class AdminSection extends Component{
    constructor(){
        super();

        var formURL = window.location.href.split("/");
        var tourcode = formURL[formURL.length - 1];
        tourcode = decodeURIComponent(tourcode);

        this.state = {
            tourcode: tourcode,
            amount: "",
        }

        this.callData();
    }
    render(){
        var amount = "";
        if(this.state.amount !== ""){
            amount = this.state.amount;
        }

        return(
            <div className="input">
                <div className="title">
                    행사비 수입
                </div>
                <div className="input">
                    <table>
                        <tbody>
                            <tr>
                                <td id="input-tour-profit-title">
                                    <span>행사비 수입</span>
                                </td>
                                <td>
                                    <label>금액</label><br />
                                    <input type="number" id="input-tour-profit" value={amount} onChange={this.updateAmount}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    //Event Handler
    updateAmount = (event) => {
        this.setState({
            amount: event.target.value,
        })

        this.props.onChange(event);
    }

    // Call data
    callData = () => {
        $.ajax({
            url: DatabaseConnectionHelper() + "GetTourProfitController.php",
            type: "POST",
            data: {
                tourcode: this.state.tourcode,
            },
            success: (result) => {

                if(result !== "" && result !== "false"){
                    var data = JSON.parse(result);
                    this.setState({
                        amount: data[0][0],
                    });
                }
                //Tell parent class that the data is loaded from php
                this.props.onLoadedData("tourprofit");
            }
        });
    }
}

export default AdminSection;