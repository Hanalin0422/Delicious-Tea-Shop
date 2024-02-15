import Header from './header';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import productData from '../data';
import earlGrey from '../img/earlGrey.jpg';
import luebose from '../img/luebose.jpg';
import camomile from '../img/camomile.jpg';
import Button from 'react-bootstrap/Button';
import '../CSS/detail.css'
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

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

    let [alertt, setAlert] = useState(true);
    let [num, setNum] = useState('');

    function numChange(e){
        setNum(e.target.value);
        if(isNaN(num) == true){
            e.target.value = '';
            setNum(e.target.value);
        }
    }

    // setTimeout(()=>{실행할 코드}, 1000)
    useEffect(()=>{
        setTimeout(()=>{
            setAlert(false);
        }, 2000);

        if(isNaN(num) == true){
            alert('숫자를 입력해주세요!');
        }

    }, [num])

    // 1. 특정 컴포넌트가 재랜더링 될때마다 코드실행하고 싶으면 사용.
    // 2. mount시 1회 코드 실행하고 싶으면 useEffect(()=>{}, [])
    // 3. unmount시 1회 코드 실행하고 싶으면 useEffect(()=> { return ()}, [])

    return(
    <div className="Detail">
        <Header/>
        {
            alertt ? 
            <div id="discount">
                <Alert key={'info'} variant={'info'}>
                    2초 이내에 구매하면 50% 할인!
                </Alert>
            </div> : null
        }
        
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
            <div id="quantity">
                <input id="quantity-input" type='text'onChange={(e)=> numChange(e)}/> 개 구매하기!
            </div>
            <Button variant="danger">구매하기</Button>{' '}
            <Button variant="info" onClick={()=>{navigate(-1)}}>돌아가기</Button>{' '}
        </div>
        
    </div>
    )
}

export default Detail;
