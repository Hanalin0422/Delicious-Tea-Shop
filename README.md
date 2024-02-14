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