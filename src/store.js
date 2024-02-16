import { configureStore, createSlice } from "@reduxjs/toolkit";
import cartData from "./cartData";

// createSlice는 useState랑 거의 비슷한 용도라고 보면됨.
// 아무튼 state를 그러면 한번 만들어보자는 거임!
// let user = createSlice({
    // name : 'state 이름',
    // initialState : '실제 state의 값'
//     name : 'user',
//     initialState : 'hanalin'
// })

let cart = createSlice({
    name : 'cart',
    initialState : cartData,
    reducers :{
        addCount(state, action){
            // 여기서 e라는 파라미터는 해당 배열에 대한 하나하나의 데이터를 의미함. 여기서는 객체
            let num = state.findIndex((e)=> e.id == action.payload);
            state[num].count++;
        },
        minusCount(state, action){
            let num = state.findIndex((e)=> e.id == action.payload);
            if(state[num].count > 0){
                state[num].count--;
            }
        },
        plusProduct(state, action){
            state.push(action.payload);
        }
    }
})
export let {addCount, minusCount, plusProduct} = cart.actions;


// state를 만들었으면 이제 이 밑에 등록해야됨.
// 근데 공유가 필요가 없으면 굳이 store에 저장해서 쓸 필요는 없음.
// 모든걸 store에 넣지 말기
export default configureStore({
    reducer:{
        cart : cart.reducer,
    }
})