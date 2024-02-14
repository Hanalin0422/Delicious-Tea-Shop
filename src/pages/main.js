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

function Main(){
    let [tea, setTea] = useState(productData);
    let teaImg = [earlGrey, luebose, camomile];
    let navigate = useNavigate();


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