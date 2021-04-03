import React from 'react';
import {Table} from 'react-materialize';

const AddComponent = (props) => {
    return(
        <div className="addComponentWihtoutPlace">
            <Table>
                <thead>
                    <tr>
                        <th colSpan="2">항목 추가하기</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="input">
                        <td id="name">
                            <label>이름</label><br />
                            <input type="text" id="input-name" onChange={props.onChange}/>
                        </td>
                        <td id="add">
                            <div className="waves-effect waves-light btn" id="btn-add" onClick={props.onClick}>
                                추가
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default AddComponent;