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


### 문제 발생
카트를 만들고 있는데 다른 페이지를 갔다가 다시 돌아오면 리덕스 변수가 유지 되지 않고 초기화 되는 문제가 발생했다.  

왜 브라우저를 새로고침하면 state가 초기값으로 돌아가요?  
=> 다시 파일을 읽기 때문에 원래 그런 거임.  
이게 싫으면 서버로 보내서 DB에 영구적으로 저장하면 됨.  
이게 안되면 차선책으로 localStorage에 저장하면 됨.  
localStorage를 사용하면 서버가 없어도 거의 반 영구적으로 데이터를 저장할 수 있음.  
이거의 특징이 key : value 형태로 데이터를 저장할 수 있음  
그리고 문자만 저장 가능하고 최대 5MB까지 저장 가능함.  
사이트 재접속해도 남아있고 브라우저 청소하면 삭제가 되는 형태.  
휘발성을 원하면 session storage를 이용하면 됨.
```
localStorage.setItem('age', '20')
```
이런 식으로 코드를 실행하면 데이터를 저장할 수 있음.
```
localStorage.getItem('age')
```
를 입력하면 해당 key에 대한 값인 20을 반환해줌.
```
localStorage.removeItem('age')
```
를 쓰면 삭제 가능.  
그리고 수정하는 방법은 없음. 데이터를 꺼내서 수정하고 다시 집어넣는 방법밖에 없음.  
object나 array를 저장하고 싶으면 json 형태로 바꿔서 저장하면 됨.  
근데 이때, value에서 [object Object] 이런 식으로 뜨면 object 자료가 깨졌다는 뜻임.
```
    let obj = {name : 'kim'};

    // 여기서 JSON.stringify는 객체를 스트링으로 전환해주는 함수
    localStorage.setItem('data', JSON.stringify(obj));

    //JSON을 array/object로 변환해주는 함수 : JSON.parse()
    let 값꺼내기 = localStorage.getItem('data');

    console.log(JSON.parse(값꺼내기));
```
그리고 수정의 경우는 다음과 같이 진행하면 됨.
```

    useEffect(()=>{
        // 일단 변경을 원하는 배열을 꺼냄.
        let takenValue = localStorage.getItem('watched');
        // 꺼낸 배열을 string에서 객체로 바꿔줌
        takenValue = JSON.parse(takenValue);
        // 배열로 바꾼 값에 원하는 값을 추가
        takenValue.push(findProduct.id);
        // 다시 localStorage에 저장하기
        localStorage.setItem('watched', JSON.stringify(takenValue));
    }, [])
```
---
redux-persist를 사용하면 state를 전부 localStorage에 보관할 수 있음.  
그래서 한번에 여기에 저장해서 꺼내다 사용할 수 있게 할 수 있음.  
=> 내가 구매하기를 눌렀을 때 array가 계속해서 추가되지 않고 초기화 되는 이유가 바로 이 때문.  
state가 새로운 페이지로 이동할 때마다 초기화 되기 때문인데 이때 redux-persist를 사용하면 해결 가능해보임.

---
### 여러가지 의문들
- ajax 성공시/실패시 html 보여주려면 어떻게 해야하지?
- 몇 초마다 자동으로 ajax 요청은 어떻게 하지?
- 실패시 몇 초후 요청을 재시도 해야하지?
- prefetch 어캐 함?

이런 기능들 직접 하기 귀찮으면 React Query쓰면 되는데 실시간 데이터를 계속 가져와야 하는 사이트에서 쓰면 좋지만 그 외에는 딱히... 사용하지는 않음.
```
npm install react-query@3
```
로 설치 하면 됨.  
그 다음 index.js로 셋팅을 좀 해야함.
```
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
```
이렇게 <QueryClientProvider> 태그로 감싸주면 됨.  
react-query를 이용하면 응용을 좀더 쉽게 할 수 있음.  
```
react-query를 이용해서 ajax 요청을 하려면.

let ret = useQuery('작명', ()=>{
    return axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
        return a.data
    })
})
```
이렇게 변수로 설정을 하면
1. 성공/실패/로딩중을 쉽게 파악할 수 있음.  
    => ret.data, ret.isLoading, ret.error 와 같은 변수들이 있음.  
    => 그래서 ajax가 로딩중일때 로딩중입니다를 보여주고 싶으면 {ret.isLoading}을 쓰면 됨.  
    => 이게 true면 로딩중입니다. false로 나오면 실제 이름이 나오게 만들면 됨.

2. 또 이렇게 쓰면 좋은 점은 useState를 따로 선언하지 않아도 된다는 거임.
3. 얘는 틈만나면 자동으로 재요청을 해줌. (이걸 refetch라고 함.)
4. 너무 재요청을 많이 하는 것 같으면 이 요청하는 간격을 조정할 수 있음.
5. 또한, ajax 요청에서 실패하면 알아서 재요청을 해줌.
6. state 공유를 안해도 됨.  
    이거는 부모와 자식이 모두 ajax로 같은 데이터를 가져오는 코드가 있을 때 중복해서 두번이나 가져오는 일이 없도록 해줌.  
    그니까 똑똑해서 한번만 해줌.
7. cashing기능도 있음. 그래서 ajax 요청을 했을 때 5분 전에 한 요청의 결과를 우선적으로 보여주고 그 다음 요청한 결과를 보여주는 기능도 할 줄 암.  
    이렇게 하면 기존 성공 결과를 보여주고 그 다음 요청을 처리하기 때문에 훨씬 빠르게 동작한다는 느낌을 줄 수 있음.

> 업데이트 사항
1. 설치시엔 이거 입력
```
npm install react-query@3
```
2. import 해서 사용시엔 이거 입력
```
import {Queryclient, QueryClientProvider, useQuery} from '@transtack/react-query'
```
3. useQuery 쓸때는 '작명' 말고 ['작명']임
```
useQuery(['작명'],
```

---
### 코드를 짜다 보면 이상한 경우가 있음. (성능 개선편)
- props를 보냈는데 왜 출력이 안되지?
- 왜 이미지가 안나오지?   
같은 경우,  
=> 코드를 확인하거나 개발자 도구를 확인하면 됨.

근데 component로 만든 걸들도 일반 html로 변형하기 때문에 개발자 도구에서는 그런 걸 보기가 힘듬.  
그럴 경우 크롬 웹 스토어에서 <strong>React Developer Tools</strong> 설치하면 됨.  
그리고 난 후 다시 개발자 도구를 열면 component 탭이 생기는 데 거기서 inspect툴을 이용해서 확인하고자 하는 것을 누르면 어떤 component들로 이루어졌는지 쉽게 확인할 수 있음.
![image](https://github.com/Hanalin0422/Delicious-Tea-Shop/assets/78638427/c2fc6a80-4d59-4ed7-9ec9-4d6ed033deec)

결론은 props와 state가 어떻게 반영되고 있는지 바로바로 확인할 수 있다는 거임.

#### Profiler 탭
이상하게 느린 컴포넌트들이 있을 거임.  
그런 성능 저하를 만드는 componet들을 잡는 탭이라고 보면됨.  
어떤 컴포넌트들이 랜더링 됬는지를 알려주면서 차트바로 알려주는데 몇초에 걸쳐서 랜더링 되었는지 알려줌.  
그래서 이걸 보고 성능 저하가 난 component들을 찾아 가면 되는 거임.  
근데 보통 컴포넌트 랜더링은 굉장히 빠르기 때문에 딱히 걱정 X.  
보통 서버에서 보내는 데이터가 느려서 느린 경우가 대다수임.

#### Redux DevTools 
어떤 redux의 state들이 변경되고 있는지 한눈에 볼 수 있게 해주는 확장 웹.  
store를 한번에 보여준다고 생각하면 됨.

#### 성능을 향상시킬 수 있는 또 하나의 팁
리액트와 같은 single page application의 특징은 npm build를 하면 js파일 하나에 모든 코드를 다 쑤셔넣기 때문에 사이즈가 매우 큼.  
- 그래서 유저가 메인 페이지에 접속하면 그 커다란 자바스크립트 파일을 다운 받아야 해서 로딩 속도가 좀 느려지게 됨.  
그래서 그걸 잘게 자르고 싶다 하면 
- lazy 하게 컴포넌트들을 로딩해라 라고 할 수 있음.
이 뜻은 이 component가 필요할 때 그때 import 해주세요 라는 뜻임.
```
const Detail = lazy(() => import ('./routes/Detail.js'));
```
이렇게 하면 js파일도 따로 만들어짐.  
이렇게 하는 경우의 단점이라면 페이지 이동때 사용자가 하얀색 페이지를 봐야 할 수도 있음.  
그러면 
```
<Suspense fallback = {<div>로딩중임</div>}></Suspense>
```
라는 태그로 감싸주면 로딩 되는 중안 사용자는 로딩중이라는 페이지를 보게 만들 수 있음.  
근데 대부분 모든 페이지들을 lazy load하게 사용하기 때문에 <Routes> 전체를 <Suspense>로 감싸도 됨.

#### 성능 개선 2 : 재렌더링 막는 memo, useMemo
내가 원하는 자식 component의 재렌더링을 막고 싶을 경우,  

꼭 필요할 때만 재렌더링 해주세요 =>  momo()  
```
(이게 지금 자식 component임.)
let Child = memo(function(){
    consol.log('자식 컴포넌트가 재랜더링 되고 있어요!')
    return <div> 자식임 </div>
})
```
memo의 정확한 원리는  
특정 상황에서만 재렌더링해주는 함수임.  
즉, props가 변할 때만 재렌더링해주는 함수인 거임.  
그렇기 때문에 기존 props랑 신규 props랑 계속 비교하기 때문에 온갖곳에 다 가져다 붙이지 마셈.  
그리고 대부분 붙일 일 없음.

##### useMemo 사용법
```
function 함수(){
    return 반복문10억본 돌린 결과
}

function Cart(){
    let ret = 함수();
}

```
와 같이 반복문을 10억번 돌려서 결과값을 cart에서 써야한다고 했을 때, cart는 재렌더링될때마다 반복문을 10억번 돌려야함.  
그러니 이럴 때는 useMemo()를 사용할 건데
```
let ret = useMemo(() => {return 함수()}, [state])
```
이렇게 사용하면 됨.  
이 뜻은 컴포넌트 렌더링 1회만 실행한다는 소리와 같음.  
사실 useEffect랑 똑같음.  
그래서 state가 변경될 때만 렌더링 해라 라고 할 수도 있음.  
- 그렇다면 useEffect와 useMemo의 차이점은?  
=>  useEffect는 html 실행이 다 끝나면 실행이 되지만 useMemo는 렌더링 될때 같이 실행이 됨.  
즉, 실행 시점이 다름.

#### 성능 개선 3 : useTransition, useDeferredValue
리액트가 업데이트 되고 나서 사용하게 된 신기능들.  
1. 리액트는 원래 automatic batch 기능이 있음.  
이게 뭐냐면 아래와 같이  
    state1변경()  
    state2변경()  
    state3변경()  
    이렇게 state 변경문들이 쭉 작성되어 있을 때, state 변경이 전부 일어났을 때 맨 마지막에서만 재렌더링이 1회가 됨. 이걸 batching이라고 함.  
    state가 변경될 때마다 재렌더링이 되는게 아니라 이런 식으로 뭉쳐있으면 마지막에 딱 한번만 재렌더링을 해주는 거임.  
    근데 예외가 있음.  
    ajax, setTimeout과 같이 좀 늦게 동작하는 코드들 안에 이런 state 변경문들이 있다면 batching이 일어나지 않음.  
    하지만 이 코드가 어디있더간에 리액트18 버전 이상이면 한번만 재렌더링 해줌.

2. useTransition으로 느린 컴포넌트 성능향상 가능해짐.  
(카드 돌려막기)

```
import { useState } from "react";

let a = new Array(10000).fill(0);

function UseTransition(){
    let [name, setName] = useState('');

    return (
        <div className="UseTransition">
            <input type="text" onChange={(e) => { setName(e.target.value)}}/>
            {
                a.map(()=>{
                    return <div>{name}</div>
                })
            }
        </div>
    )
}
```
타이핑을 할때마다 div 박스를 10000개 생성해야 하기 때문에 버벅거리며 성능 저하가 일어나면,  
(조작 후에 0.2초 넘게 반응이 없으면 느린 사이트란 인식을 주며 부정적인 사용자 경험을 줄 수 있음.)  
1. 일단 사이트를 1000개씩 나눠서 보여주는 방법도 있음.
2. 두번째 방법으로는 리액트18 버전 이상부터 사용 가능한 문법이 있음.
```
let [isPending, startTransition] = useTransition();
```
이걸 사용하면 되는데 여기서 startTransition은 함수임.  
성능 저하를 일으키는 함수를 startTransition으로 감싸주면 됨.
```
import { useState, useTransition } from "react";

let a = new Array(10000).fill(0);

function UseTransition(){
    let [name, setName] = useState('');
    let [isPending, startTransition] = useTransition();

    return (
        <div className="UseTransition">
            <input type="text" onChange={(e) => { 
                startTransition(()=> {
                    setName(e.target.value)
                    })
                }}/>
                
            {
                a.map(()=>{
                    return <div>{name}</div>
                })
            }
        </div>
    )
}
```
이렇게 쓰면 조금 더 성능을 향상 시킬 수 있다는 거임.  

- 그렇다면 startTransition 동작 원리는 무엇일까?  
지금 현재 상황에서 성능이 저하되는 이유는  
1. a를 <input>에 보여주기
2. div박스로 보여주기  
이걸 두개를 동시에 처리를 하려니까 버벅이는 거임.  
근데 startTransition()으로 감싸주면 이 함수 안에 있는 코드를 약간 늦춰줌.  
즉, 다른 중요한 작업을 먼저 진행하고 그 뒤에 처리하게 만들어주는 거임.  
<strong>늦게 처리해주세요</strong> 함수라고 보면 될 것 같음.  

그렇다면 isPending은 무엇이냐?  
-> startTransition이 처리중일 때 true로 변하는 변수임.  
```
{
    isPending ? '로딩중' :
    a.map(()=>{
        return <div>{name}</div>
    })
}
```
이렇게 하면 처리되는 동안 로딩중을 띄울 수도 있게 됨.

#### useDeferredValue
useDefferredValue 써도 느린 컴포넌트 성능 향상 가능함.
```
let state = useDeferredValue(name)
```
state나 props를 넣을 수 있는 함수임.  
변동 사항이 생겼을 때 좀 늦게 처리해주는 함수임.  



웹 사이트 앱인 척 하기
---
![image](https://github.com/Hanalin0422/Delicious-Tea-Shop/assets/78638427/75b0b878-6f20-4eaf-b26f-a3bb77ea81f6)

사이트 들어 갔을 때, 이런 팝업창이 뜨는 경우가 있음.  
이게 실은 웹사이트 바로가기 추가 버튼임. (근데 앱이랑 똑같아 보임.)  
설치하면 앱이랑 똑같아 보이는 효과를 보여줌.  
이걸 <strong>PWA</strong>라고 함.  

> PWA  
: 웹 사이트를 모바일 앱처럼 설치해서 쓸 수 있게 해주는 기술

[장점]  
1. 설치 마케팅 비용이 적음. (훨씬 적은 비용으로 앱처럼 사용하게 할 수 있음)
2. 돈을 가장 많이 쓰는 4~50대 아날로그 유저들을 배려함. (웹사이트 바로가기 못하는 사람들)
3. html css js 만으로도 모바일 까지 대응 가능.
4. 푸시알림, 센서등과 같은 앱 제공 기능도 브라우저가 제공할 수 있음.

[단점]  
1. 앱 스토어를 방문하지 않아도 설치가 가능하다는 점에서 이질적이게 느껴질 수 있음.  

웹 사이트를 개간지나게 만들었다면 PWA로 할 수도 있음.  

※ 근데 이거를 하고 싶으면 PWA가 셋팅된 리액트 프로젝트를 하나 생성해야함.
```
npx create-react-app 프로젝트명 --template cra-template-pwa
```
이러면 PWA가 설치된 리액트 프로젝트 하나가 생성이 됨.  
여기서 코딩을 시작하면 됨.
> 오잉? 그러면 기존 코드는 어떡해요? 못하는 거에요?  
>> 넹, 못합니다. 처음부터 이렇게 만들었어야죠.  
굳이 하고 싶으면 그냥 새 PWA 프로젝트 하나 만들어서 기존코드 복붙 하세욤

### PWA의 조건
1. manifest.json  
    앱 설정 파일임. 여기서 여러가지 앱에 대한 이름, 아이콘, 배경색과 같은 다양한 것들을 설정할 수 있음
2. service-worker.js  
    - 이 파일을 만들려면 index.js 파일에 들어가서 serviceWorkerRegistration.unregister()를  serviceWorkerRegistration.register()로 바꾸고 빌드를 한번 하면(npm run build) 자동으로 service-worker.js 파일이 생성됨.  
    - 오프라인에서도 사이트를 열 수 있게 도와주는 파일이라고 보면 됨. (모든 파일들이 하드에 미리 저장하는 것이기 때문에)

이 두 파일이 있어야 함. (근데 설치하면서 미리 만들어져 있음 ㅎ)  
