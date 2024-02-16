import './App.css';
// 외부라이브러리 사용법
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import Main from './pages/main';
import Detail from './pages/detail';
import About from './pages/about';
import Event from './pages/event';
import Event_ONE from './pages/event-one';
import Event_TWO from './pages/event-two';
import Cart from './pages/Cart';
import { AnimatePresence } from 'framer-motion';

// public폴더는 압축이 안되니까 public에 사진을 넣고 바로 가져다 사용할 수도 있는데
// public 폴더 이미지 쓰는 권장방식이 <img src={process.env.PUBLIC_URL + '/logo192.png'}

function App() {
  return (
    <div className="App">
      {/* 라우터 사용하는 법 */}
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
          <Route path='/cart' element={<Cart />}/>
          <Route path='*' element={<div>404 없는 페이지 입니다!</div>}/>
        </Routes>
        </AnimatePresence>
    </div>
  );
}


export default App;
