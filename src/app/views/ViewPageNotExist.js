import React, {Component} from 'react';
import {Row} from 'react-materialize';
import '../css/Login.css';

class ViewPageNotExist extends Component{
    render(){
        return(
            <Row>
                {/* Title */}
                <div className="pagenotexist-title">
                    <div className="inner">
                        <a href="/">
                        <h6><img src={require('../imgs/logo-mapleleaf.png')} alt="img_logo" /> ROYAL TOURS</h6>
                        </a>
                    </div>
                </div>

                <div className="pagenotexist-desc">
                    <h6>요청하신 페이지를 찾을 수 없습니다.</h6>
                    <p>
                        방문하시려는 페이지의 주소가 잘못 입력되었거나, <br />
                        페이지의 방문 권한이 없습니다. <br /><br />

                        입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.<br />

                        <br />
                        <br />
                        <a href="/">되돌아가기</a>
                    </p>
                </div>
            </Row>
        );
    }
}

export default ViewPageNotExist;