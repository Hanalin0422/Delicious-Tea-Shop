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