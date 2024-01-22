import React, { useReducer, useRef, createContext } from "react"; // eslint-disable-line no-unused-vars

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import New from "./pages/New";
// import MyButton from "./components/MyButton";
// import MyHeader from "./components/MyHeader";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext(); // 데이터 전달 컨텍스트
export const DiaryDispatchContext = React.createContext(); //함수전달 컨텍스트

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date: 1705924086777,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2번",
    date: 1705924086778,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3번",
    date: 1705924086779,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    date: 1705924086780,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5번",
    date: 1705924086781,
  },
];
function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(0);
  //create
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  //remove
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  //edit
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };
  //init

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div className="App">
            {/* <MyHeader
          headText={"App"}
          leftChild={
            <MyButton text={"왼쪽 버튼"} onClick={() => alert("왼쪽 클릭")} />
          }
          rigthChild={<MyButton text={"오른쪽 버튼"} />}
        />
        <h2>App.js</h2>
        <MyButton
          text={"버튼"}
          onClick={() => alert("버튼클릭")}
          type={"positive"}
        />
        <MyButton
          text={"버튼"}
          onClick={() => alert("버튼클릭")}
          type={"negative"}
        />{" "}
        <MyButton text={"버튼"} onClick={() => alert("버튼클릭")} /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
              {/* :id를 쓰는 이유는 특정 아이디를 가지고 있는 다이어리를 수정하기위해 */}
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;

//  <img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} />
//       <img src={process.env.PUBLIC_URL + `/assets/emotion2.png`} />
//       <img src={process.env.PUBLIC_URL + `/assets/emotion3.png`} />
//       <img src={process.env.PUBLIC_URL + `/assets/emotion4.png`} />
//       <img src={process.env.PUBLIC_URL + `/assets/emotion5.png`} />
