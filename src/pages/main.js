import '../App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import earlGrey from '../img/earlGrey.jpg'
import luebose from '../img/luebose.jpg';
import camomile from '../img/camomile.jpg';
import { useState } from 'react';
import productData from '../data';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Main(){
    let [tea, setTea] = useState(productData);
    let teaImg = [earlGrey, luebose, camomile,earlGrey, luebose, camomile,earlGrey, luebose, camomile];
    let navigate = useNavigate();
    // 사용자가 버튼 클릭한 횟수
    let [buttonClick, setButtonClick] = useState(2);


    return (
        <div className="Main">
          <header>
            <div className="inner">
              <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                  <Navbar.Brand href="/"><strong id="title-name">맛차</strong></Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                      <Nav.Link onClick={()=>{navigate('/')}} className='list'>Home</Nav.Link>
                      <Nav.Link href="#pricing" className='list'>이번주 신상</Nav.Link>
                      <NavDropdown title="상품 둘러보기" id="collapsible-nav-dropdown" className='list'>
                        {
                        tea.map(function(num, i){
                          return(
                            <NavDropdown.Item href="#action/3.1">{tea[i].title}</NavDropdown.Item>
                          )
                        })
                        }
                      </NavDropdown>
                    </Nav>
                    <Nav>
                      <Nav.Link href="#deets" className='list'>장바구니</Nav.Link>
                      <div className="material-symbols-outlined">shopping_basket</div>
                      <Nav.Link eventKey={2} href="#memes" className='list'>마이페이지</Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </div>
          </header>
    
          <div className="inner">
            <div className="main-bg"></div>
            <div className="products-list">
              <Container>
                <Row>
                  {
                    tea.map(function(num, i){
                      return (
                        <ProdModal tea={tea} teaImg={teaImg} num={num}/>
                      )
                    })
                  }
                </Row>
              </Container>
              <div className='add'>
                  {
                    buttonClick < 4 ?
                    <Button onClick={()=>{
                      setButtonClick(buttonClick+1);
                      console.log(buttonClick);

                        // npm install axios를 해서 이제 서버랑 통신 할거임.
                        //어떤 데이터를 요청할지 서버 개발자에게 url을 물어봐서 집어넣기.
                        axios.get('https://codingapple1.github.io/shop/data'+buttonClick+'.json')
                        .then((data)=>{
                          let copy = [...tea, ...data.data];
                          // let ret = copy.concat(data.data); 위에가 편법
                          setTea(copy);
                          console.log(copy);
                        })
                        .catch(()=>{
                          // ajax요청 실패할시 에러 처리는 여기다가
                          console.log('예외 처리 해주기 / 데이터 못 가져옴!');
                        })
                    }}>더보기</Button> : null
                  }

              </div>
            </div>
          </div>
    
        </div>
      );
    
        // 상품 설명을 담는 모달
    function ProdModal(props){
      let i = props.num.id;
      return(
        <Col>
          {/* 이미지 url 넣을 때, './img/tea'+props.i+'.jpg' 이런 식으로 넣어도 됨 */}
          <img src={props.teaImg[i]} onClick={()=>{navigate('/detail/'+ i)}} style={{cursor:'pointer'}}/>
          <h4 className="main-bg-es" style={{paddingTop:'20px'}}>{props.tea[i].title}</h4>
          <p>{props.tea[i].price} 원</p>
          <p>{props.tea[i].content}</p>
        </Col>
      )

    }
    
}

export default Main;