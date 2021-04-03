import React, {Component} from 'react';
import {Table} from 'react-materialize';
import '../css/Setting.css';

const List = (props) => {
    const data = [];
    for(var idx=0; idx<props.data.length; idx++){
        data.push(<Data key={idx} data={props.data[idx]}  onChange={props.onChange} />);
    }
    return(
        <Table>
            <thead>
                <tr>
                    <th id="delete">삭제</th>
                    <th>{props.name}</th>
                </tr>
            </thead>
            <tbody>
                {data}
            </tbody>
        </Table>
    );
}
export default List;

class Data extends Component{
    render(){
        return(
            <tr>
                <td>
                    <label>
                        <input type="checkbox" id="cbx-delete" name={this.props.data[0]} onChange={this.props.onChange} />
                        <span></span>
                    </label>
                </td>
                <td>{this.props.data[1]}</td>
            </tr>
        );
    }
}