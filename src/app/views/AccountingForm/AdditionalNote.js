import React, { Component } from 'react';
import $ from 'jquery';
import DatabaseConnectionHelper from '../../helper/DatabaseConnectionHelper';

class AdditionalNote extends Component{
    constructor(){
        super();

        //Get tourcode
        var formURL = window.location.href.split("/");
        var tourcode = formURL[formURL.length - 1];
        tourcode = decodeURIComponent(tourcode);

        this.state = {
            note: null,
            tourcode: tourcode,
            data: "",
        }

        this.callData();
    }
    render(){
        var note = "";
        
        if(this.state.data !== ""){
            note = this.state.data;
        }

        if(this.state.note !== null){
            note = this.state.note;
        }

        return(
            <div className="input">
                <div className="title">
                    비고
                </div>
                <textarea rows="10" cols="50" id="input-additiona-note" value={(note)? note: ''} onChange={this.updateNote}/>
            </div>
        );
    }
    updateNote = (event) => {
        this.setState({
            note: event.target.value,
        });
        this.props.onChange(event);
    }

    callData = () => {
        $.ajax({
            url: DatabaseConnectionHelper() + "GetAdditionalNoteController.php",
            type: "POST",
            data: {
                tourcode: this.state.tourcode,
            },
            success: (result) => {

                if(result !== "" && result !== "false"){
                    var data = JSON.parse(result);
                    this.setState({
                        data: data[0][0],
                    });
                }
                this.props.onLoadedData("additionalnote");
            }
        });
    }
}

export default AdditionalNote;