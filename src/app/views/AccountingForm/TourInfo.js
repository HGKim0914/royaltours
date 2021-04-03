import React from 'react';
import {Table} from 'react-materialize';

const TourInfo = (props) => {
    var land = "";
    if(props.info[3] !== null){
        land = "랜드구분: " + props.info[3];
    }
    return(
        <Table>
            <tbody>
                <tr>
                    <td>행사명: {props.info[0]}</td>
                    <td>가이드 성명: {props.info[12]}</td>
                    <td>인바운드/로컬: {props.info[8]}</td>
                    <td>{land}</td>
                </tr>
                <tr>
                    <td colSpan={4}>행사 날짜: {props.info[1]} ~ {props.info[13]}</td>
                </tr>
            </tbody>
        </Table>
    );
}

export default TourInfo;