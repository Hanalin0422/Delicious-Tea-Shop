import Wrapper from "../wrapper";
import Header from "./header";
import Table from 'react-bootstrap/Table';
import '../CSS/cart.css'
import { useDispatch, useSelector } from "react-redux";
import { addCount, minusCount, minusProduct } from "../store";

function Cart(){

    // redux store 가져와주는 함수
    // useSelector((state)=> {return state}) 가 기본 문법임.
    // 여기서 state는 store에 있는 모든 state이기 때문에 user만 가져다 쓰고 싶으면 state.user라고 쓰면 됨
    // ex ) let a = useSelector((state) => state.stock)
    let cart = useSelector((state)=> {return state.cart});
    let dispatch = useDispatch();

    console.log(cart);
    return(
        <Wrapper>
            <Header/>
            <div className="cart">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{width : '100px'}}>상품 번호</th>
                            <th>상품명</th>
                            <th style={{width : '150px'}}>수량</th>
                            <th style={{width : '150px'}}>장바구니에서 뻬기</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((num, i)=>
                                <tr>
                                    <td>{i+1}</td>
                                    <td>{cart[i].name}</td>
                                    <td>
                                        <button className="addMinus" onClick={()=>{
                                            dispatch(minusCount(cart[i].id));
                                        }}>-</button> &nbsp;
                                        {cart[i].count} 개 &nbsp;
                                        <button className="addMinus" onClick={()=>{
                                            dispatch(addCount(cart[i].id));
                                        }}>+</button>
                                    </td>
                                    <td><button onClick={()=>{
                                        dispatch(minusProduct(cart[i].id));
                                    }}>삭제</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        </Wrapper>
    )
}

export default Cart;