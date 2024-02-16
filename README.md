# 맛차

> 맛차라는 차를 파는 쇼핑몰 사이트 입니다.  
장바구니 기능까지 만들려고 하고 있어요.  
리액트로 제작 중입니다.  


![image](https://github.com/Hanalin0422/Delicious-Tea-Shop/assets/78638427/857c5980-e1a3-433c-9db9-0e8f1dfa819a)


CSS 파일을 잔뜩 만들었는데   
npm install styled-components 를 사용하여 스타일 컴포넌트를 쓰면 css파일 없어도 됨!  
import styled from 'styled-components' 를 써서 import를 한다음 쓰면 되는데  
내가 css를 쓰지 않고 전부 js에서 해결하고 싶다! 할때 쓰는 라이브러리임.
```
let YellowBtn = styled.button`
    background : yellow;
    color : black;
    padding : 10px;
`
```
이런식으로 사용하면 됨.   
사용은
```
<YellowBtn>버튼</YellowBtn>
```
이렇게 하면 됨.  
이렇게 하면 css 파일로 가지 않아도 되니까 훨씬 편리하다는 장점이 있음. 또한 로딩 시간이 향상됨.  
이렇게 하는 이유는 리액트가 스타일을 다 합치기 때문에 스타일이 다른 js파일로 오염될 수 있기 때문.  
그러나 이런식으로 사용하면 그 파일 내에서만 쓸 수 있음.  
아니면 {해당js파일이름}.module.css 이렇게 써서 그 js 파일에 종속 시키는 방법이 있음.  

근데 만약에 노란색 버튼이 아니라 파란 버튼을 쓰고 싶다면?
```
let YellowBtn = styled.button`
    background : ${props => props.bg};
    color : black;
    padding : 10px;
`
```
이렇게 props로 컴포넌트를 재활용 할수 있음.
```
<YellowBtn bg="blue">버튼</YellowBtn>
```
파라미터 안에는 자바스크립트 문법도 쓸 수 있음.
```
let YellowBtn = styled.button`
    background : ${props => props.bg == 'blue' ? 'white' : 'black'};
    color : black;
    padding : 10px;
`
```
또 기존 스타일도 복사 가능함
```
let NewBtn = styled.button(YellowBtn)`
    margin : 20px;
`
```
근데 단점도 있음.  
html구조가 복잡해져서 스타일이 복잡해지면 찾기 어려움.  
또한 다른 파일에서 해당 스타일이 필요할 경우 import를 해야하는데 그럴 거면 걍 CSS 파일 만들고 맘.  
또한, 팀으로 일할때 다른 사람이 내가 짠 걸 못 알아볼 수 있음.  

---
## 컴포넌트의 Lifecycle
컴포넌트가 보이는 순간을 mount된다라고 함.  
페이지에 장착이 되는 mount,  
가끔 업데이트 되는 update,  
필요없으면 제거되는 unmount  
이렇게 컴포넌트는 인생 주기를 겪음  

이걸 왜 배우냐면 내가 거기에 중간 중간 간섭하기 위해서임. (간섭은 코드 실행을 말하는 거임)  
갈고리를 달아 컴포넌트에 간섭하는 걸 Hook이라고 하는 것.  

- 컴포넌트에 갈고리를 다는법
```
useEffect(()=>{

    return()=>{
        코드를 여기에 적으면 useEffect 동작 전에 실행이됨.
        보통 기존 타이머는 제거하고 다시 타이머를 장착할 때 사용하기도 함.
        이걸 클리너 function이라고 함.
    }
}, [실행 조건을 넣을 수 있는 곳])
```
이 안에 적은 코드는 mount, update시 코드를 실행해줌.  
코드는 컴포넌트 안에 적어주면 됨.  
useEffet는 디버깅을 위해 두번 동작이 되는데 사용자에게는 한번만 동작됨.  
useEffect는 실행되는 시점이 조금 다름. 이 안에 있는 코드는 html 렌더링 후에 동작함.  
예를 들어 for문을 만번 돌린다고 할 경우, 이걸 useEffect안에 넣으면 미리 다른거 다 처리하고 나중에 어려운 작업을 동작하게 해서 사람들에게 좀 더 동작이 빠르다는 느낌을 줄 수 있게 할 수 있음.  

어디에 사용을 하느냐?
-> 어려운 연산
-> 서버에서 데이터를 가져오는 작업
-> 타이머 장착할때  

근데 왜 effect라는 이름을 쓰냐면 함수의 핵심기능이 아니라 곁다리 기능이여서 이름이 저따구라고 생각하면 됨.  

그리고 []안에 변수같은 것을 넣으면 그 변수의 값이 변경이 될 때마다 useEffect안에 있는 코드가 실행됨. 따라서 컴포넌트 moount시 1회만 실행하고 싶으면 []와 같이 빈 변수도 좋으니 그냥 넣어놓으면 1회만 실행시킬 수 있음.  

#### 타이머 제거하는 법
- let a = setTimeout(()=> {}, 1000)
- return ()=>{ clearTimeout(a)}

이런 clean up fucntion은 mount시 실행 안됨. unmount시 실행됨. 


####  서버에게 데이터를 요청하는 방법
데이터를 요청할 때는   
1. 방법(GET/POST)
2. 어떤 자료(URL) 적어 보내라.  
get 요청 할 수 있는 공간 가장 쉬운 건 url.  
근데 이제 리액트는 ajax를 사용할 거임.  
get/post 요청시 원래 새로고침이 되는데 이제 그게 싫으면 ajax를 사용하면 되는 거임.

서버에 데이터를 전송하고 싶다면
```
axios.post('url', {name:'kim})
```
과 같이 보내면 됨.  
여러곳에 동시에 요청을 하고 싶다면
```
Promise.all([axios.get('/url1'), axios.get('/url2')])
.then(()=>{

})
```
와 같이 짜면 내가 요청한 정보들이 전부 다 도착했을 때 (요청이 전부 다 성공했을 때), then() 뒤에 함수를 실행 시킬 수 있음.  
일단 서버는 string만 가능한데 json 데이터를 주고 받으려면 ""를 써서 object를 string 처리해주면 됨.  
```
fetch()
```
를 써도 get 요청이 가능한데 그러면 그 밑에
```
fetch('url')
    .then(결과=> 결과.json())
    .then(data =>{})
```
와 같이 써줘야 함. 즉, JSON을 내가 array/object로 변환하는 과정을 직접 작성해야함. 하지만 axios를 사용하면 알아서 그 과정을 해줌.  

#### 전환 애니메이션 만드는 방법
전환 애니메이션은 css 파일 가서 class명 하나 만들어서 이 class 명을 부착하면 애니메이션이 동작하게 하면 됨.  
즉
1. css 파일로 가서 애니메이션 동작 전 className 만들기
2. 애니메이션 동작 후 className 만들기
3. 애니메이션 동작 후 className 만들기
4. className에 transition 속성 추가  

> 페이지를 자연스럽게 전환하기 위해서  
npm install framer-motion  
사용할 거임.

일단 이거 깔고
App.js에다
```
    <AnimatePresence>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/detail/:id' element={<Detail/>}/>
          <Route path='/about' element={<About/>}>
            {/* 이거는 /about/member랑 똑같음, 이걸 nested router라고 함. 
            또한 about이랑 member를 한꺼번에 보여줄수도 있음 
            넣고 싶은 공간에 <Outlet></Outlet>을 작성해주면 됨.*/}
            <Route path='member' element={<About/>}/>  
            <Route path='location' element={<About/>}/>
          </Route>
          <Route path='/event' element={<Event/>}>
            <Route path='one' element={<Event_ONE/>}/>
            <Route path='two' element={<Event_TWO/>}/>
          </Route>
          <Route path='*' element={<div>404 없는 페이지 입니다!</div>}/>
        </Routes>
    </AnimatePresence>
```
라우터를 AnimatePresence태그로 다 감싸기.  
그리고 모든 페이지에 적용할 것이기 때문에 컴포넌트를 다 만들어 줄거임.  
wrapper라는 컴포넌트를 만들건데 그거는 파일을 하나 생성해서
```
import React from "react";
import { motion } from 'framer-motion';
import { pageEffect } from "./CSS/animation";

const Wrapper = ({children}) =>{
    return(
        <motion.div
            initial= "initial"
            animate= "in"
            exit="out"
            transition={{duration : 0.3}}
            variants={pageEffect}
            >
            {children}
            </motion.div>
    )
}
export default Wrapper;
```
요렇게 작성해주고 이때 children을 넣어줘야 제대로 동작함.  
저거 안넣으면 동작을 안함.  
그다음 내가 동작 시키고 싶은 애니메이션을 animation.js에 입력을 할건데 내 파일은 그게 src/CSS/animation.js에 있음.
```
export const pageEffect = {
    initial:{
        opacity : 0
    },
    in : {
        opacity : 1
    },
    out : {
        opacity : 0
    }
};
```
대충 이런 식으로 해주면 됨.  
이제 마지막으로 페이지에 적용시켜주고 싶으면 각 페이지 함수의 return을 
Wrapper태그로 감싸주면 됨.
```
function Main(){
    (... 변수 선언 자리)

    return (
        <Wrapper>
            <div className="Main">
                (해당 내용 ...)
            </div>
        </Wrapper>
    )
}
```
이런 식으로 내가 애니메이션 동작을 원하는 페이지에 적용해주면 잘 적용되는 것을 볼 수 있음.

### Single Page Application의 단점
#### : 컴포넌트간 state 공유가 어려움
이걸 정말 잘 느낀 것은 props를 어떻게 받아야 할지 몰라 난감한 경우가 지금도 발생.  
근데 부모 자식 관계면 props전송이 가능하니까 부모 자식 관계를 만들면 되는데 그게 귀찮음.  
아무튼 만약 App > Datail > Tab 과 같이 부모 자식 관계가 형성이 되었는데 App의 state 변수를 Tab에 전송하고 싶을 경우 한번에 되지 않아서 Detail로 보내고 Tab에서 받아와야 함.  

근데 이게 9개 중첩되어 있으면 어쩔거임?  
=> props가 싫으면 사용하지 않게 도와줄 2가지 방법이 있음.  
1. Context API (리액트 기본문법)   
: 근데 얘는 성능 이슈와 컴포넌트 재활용이 안된다는 단점으로 인해 잘 사용 안함.  
얘 특징이 state변경시 쓸데없는 것까지 재런더링함. 매우 비효율적으로 성능 이슈 발생.  
또한 다른 페이지에서 재사용하려고 하면 컴포넌트가 없다고 나올 수도 있음.
2. Redux 등 외부라이브러리  
: redux를 사용하면 컴포넌트들이 props없이 state 공유 가능.  
이걸 하면 js를 하나 생성해서 state를 다 몰아넣고 그걸 빼서 쓰는 거임.   
그래서 사이즈가 크면 대부분 redux를 요구함.  
리액트 18버전 이상이여야 가능
```
npm install @reduxjs/toolkit react-redux
```
설치 했으면 state를 보관하는 js 파일을 하나 생성해줘야 하는데 store.js라고 파일명 지정.  
(정해져 있는 것 같음, 함수 이름이 store임)  

아무튼 그리고 난 후 파일에 일단
```
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
    reducer:{
        
    }
})
```
이거 그대로 입력.

그런 다음 index.js로 가서
```
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  >> 이 부분이 추가 된거임!!!
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
```
를 쓰면 셋팅 끝.  


#### Redux의 state 변경하는 법
---
state를 수정해주는 함수를 만들고 원할 때 그 함수를 실행해달라고 store.js에 요청하면 됨.  
1. state 수정해주는 함수 미리 만들기 (reducers:{함수(state를 변경하는 함수)})  
```
reducers : {
    changeName(state){
        return 'john' + state
    }
}
```
이런 식으로 추가해주면 되는데 이때 파라미터로 들어가는 state는 현재 해당하는 state의 값을 의미함.

2. 함수를 만들었으면 다른 곳에 쓸 수 있게 export해야함.  
export는 밖으로 빼야함.  
```
export let {(내가 만든 변경할 수 있는 함수1), (내가 만든 변경할 수 있는 함수2)...} = (stae이름).actions
```
3. 만든 함수를 import해서 사용할건데
4. let dispatch = useDispatch()라는 것을 선언해서 store.js로 요청을 보내는 함수를 선언해줘야 함.
5. 그다음
```
dispatch((state 변경해주는 함수 이름()))
```
이렇게 사용하면 됨.  

- 그러면 state가 array/object이면 어떻게 변경할 건데?  
=> 약간 특이함.  
```
changeName(state){
    state.name = 'park' 과 같이 array/object의 경우 직접 수정해도 state 변경됨.
}
```
또한 state 변경함수에 파라미터 뚫는 법은  
```
increase(state, a){
    state.age += a.payload;
}
```
이런 함수가 있을 경우
```
increase(10)
```
이렇게 적으면 한번에 10을 더해주는 함수로 교체할 수 있게 됨.  
여기서 payload를 쓰는 이유는 이렇게 해야 정확하게 숫자를 더해주기 때문에 사용하는 거임.
```
increate(state, action){}
```
이라고 작명을 하는 경우가 있는데 state변경함수를 action이라고 함.