import $ from 'jquery';
import DatabaseConnectionHelper from '../helper/DatabaseConnectionHelper';

export const setData = (URL, param) => {
    const result = $.ajax({
        url: DatabaseConnectionHelper() + URL,
        type: "POST",
        data: {
            param: param
        },
        success: function(r){
            console.log(r);
        }
    });

    return result;
}