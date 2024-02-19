import { useEffect, useState } from "react";

function EventTwo(){
    // state는 비동기 처리 함수이기 때문에 완료되기 까지 시간이 오래 걸리면 제쳐두고 다음 코드를 실행해줌.
    // 그렇기 때문에 정확히 동기화 처리 되게 코드를 쓰고 싶다면 useEffect로 해결할 수 있음.
    // 보니까 정확히 이 동작을 실행 했을 때, 그 다음 동작을 실행하게 만들고 싶으면 그 다음 동작을 useEffect에 넣고
    // 상태 변경 되면 이 다음 state 변경해주세요~ 라고 [state]를 작성하는 형식인 것 같음.
    let [count, setCount] = useState(0);
    let [age, setAge] = useState(20);

    useEffect(()=>{
        if(count !== 0 && count < 3){
            setAge(age+1);
        }
    }, [count])
    return (
        <div>
            <div>안녕하십니까 전 {age}살 입니다.</div>
            <button onClick={()=>{
                setCount(count+1);
                console.log(count)
            }}>누르면 한살 먹기</button>
        </div>
    )
}

export default EventTwo;