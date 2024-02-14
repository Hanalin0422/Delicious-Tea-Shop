import Header from './header';
import { Outlet } from 'react-router-dom';

function About(){
    return(
    <div className="About">
        <Header/>
        <div>
            <h4>맛차를 알려줄게요!</h4>
            {/* 멤버의 페이지를 어디에 보여줄 지 구멍을 뚫어준 공간이라고 생각하면 됨 => Outlet */}
            <Outlet></Outlet>
        </div>
    </div>
    )
}

export default About;