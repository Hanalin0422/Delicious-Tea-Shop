import Header from './header';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import productData from '../data';
import earlGrey from '../img/earlGrey.jpg';
import luebose from '../img/luebose.jpg';
import camomile from '../img/camomile.jpg';
import Button from 'react-bootstrap/Button';
import '../CSS/detail.css'
import { useNavigate } from 'react-router-dom';
function Detail(){

    // 유저가 URL파라미터에 입력한거 가져오려면 useParams()쓰면 됨
    let {id} = useParams();
    let [tea, setTea] = useState(productData);
    let teaImg = [earlGrey, luebose, camomile];
    let navigate = useNavigate();
    
    //사용자가 준 id 값을 가지고 원하는 id를 가진 객체를 배열에서 찾는 방법
    let findProduct = tea.find(function(x){
        return x.id == id;
    })

    return(
    <div className="Detail">
        <Header/>
        <div className="detail--inner">
            <img className="content" src={teaImg[findProduct.id]} alt="" />
            <div className="title">
                <strong>{findProduct.title}</strong>
            </div>
            <div className="price">
                <p>{findProduct.price} 원</p>
            </div>
            <div className="exp">
                <p>{findProduct.content}</p>
            </div>
            <Button variant="danger">구매하기</Button>{' '}
            <Button variant="info" onClick={()=>{navigate(-1)}}>돌아가기</Button>{' '}
        </div>
        
    </div>
    )
}

export default Detail;