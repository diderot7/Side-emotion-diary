import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Edit() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({
    id: "",
    mode: "",
  });
  const id = searchParams.get("id");
  const mode = searchParams.get("mode");

  console.log("mode:", mode);

  console.log("id :", id);

  return (
    <div>
      <h2>편집화면</h2>
      <button
        onClick={() => {
          setSearchParams({ id: "true", mode: "fake" });
        }}
      >
        QS바꾸기
      </button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        HOME으로 가기
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
}

export default Edit;
