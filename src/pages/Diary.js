import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DiaryStateContext } from "../App";
import { getStringDate } from "../utill/date.js";
import { emotionList } from "../utill/emotion.js";
import MyHeader from "../components/MyHeader.js";
import MyButton from "../components/MyButton.js";

function Diary() {
  const { id } = useParams();
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();

  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);
  if (!originData) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    const curEmotionDta = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(originData.emotion)
    );
    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(originData.date))} 기록`}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rigthChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${originData.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${originData.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionDta.emotion_img} />
              <div className="emotion_descript">
                {curEmotionDta.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{originData.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
}

export default Diary;
