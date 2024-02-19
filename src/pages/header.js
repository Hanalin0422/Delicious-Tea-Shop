import '../App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';
import productData from '../data';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';

function Header(){
    let [tea, setTea] = useState(productData);
    let navigate = useNavigate();

    let ret = useQuery('userName', ()=>{
        return axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
            return a.data
        })
    })

    return(
        <div className="Header">
            <header>
                <div className="inner">
                <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                    <Container>
                    <Navbar.Brand href="/"><strong id="title-name">맛차</strong></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        <Nav.Link href="/" className='list'>Home</Nav.Link>
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
                        <Nav.Link onClick={()=> navigate('/cart')} className='list'>장바구니</Nav.Link>
                        <div className="material-symbols-outlined">shopping_basket</div>
                        <Nav.Link eventKey={2} href="#memes" className='list'>
                            { ret.isLoading && '로딩중'}
                            { ret.error && '에러남'}
                            { ret.data && ret.data.name }
                        </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
                </div>
            </header>
        </div>
    )
}
export default Header;