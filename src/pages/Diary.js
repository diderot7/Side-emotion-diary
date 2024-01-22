import React from "react";
import { useParams } from "react-router-dom";

function Diary() {
  const { id } = useParams();
  console.log(id);

  return <div>일기 상세페이지 화면</div>;
}

export default Diary;
