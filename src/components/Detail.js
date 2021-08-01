import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button, TextField } from "@material-ui/core";
import { isBrowser, isMobile } from "react-device-detect";
function Detail({ location }) {
  const [message, setmessage] = useState("");
  const [temperature, settemperature] = useState("");
  const [etcbox, setetcbox] = useState(false);

  const messageChange = (e) => {
    setmessage(e.target.value);
    console.log(message);
  };

  const checkTrainStatus = (trainStatus) => {
    console.log(trainStatus);

    if (trainStatus == "0" || trainStatus == 0) {
      return "진입";
    } else if (trainStatus == "1" || trainSttus == 1) {
      return "도착";
    } else {
      return "출발";
    }
  };

  let directAt = location.state.directAt == 1 ? "급행" : " "; //급행여부
  let statnNm = location.state.statnNm; //현재 위치
  let statnTnm = location.state.statnTnm; //종점
  let trainNo = location.state.trainNo; //열차번호
  let trainSttus = location.state.trainSttus; //열차상태 (도착/진입/출발)
  let updnLine = location.state.updnLine == 0 ? "상행" : "하행";

  let trainCallCenter = ""; //호선에 따라서 다른 콜센터 번호 부여

  let makeSMSMessage = () => {
    return (
      statnNm +
      "에" +
      trainSttus +
      "중인" +
      trainNo +
      "에서 민원신고합니다. " +
      "사유 : 마스크 미착용"
    );
  };

  let testUrl = "sms:" + "enter the phone number" + "&body=" + makeSMSMessage();

  const temperatureClickListener = () => {};

  const textBoxVisibleListener = () => {
    if (etcbox == false) {
      setetcbox(true);
    } else {
      setetcbox(false);
    }
  };

  const sendSMSListener = () => {
    //Mobile 화면만 지원하도록 설정
    if (isMobile) {
      alert("고객센터로 SMS 전송합니다.");
    } else if (isBrowser) {
      alert("현재 PC 화면은 지원하지 않습니다.");
    } else {
      alert("기타 브라우저는 지원하지 않습니다.");
    }
  };

  return (
    <div>
      <h2>
        현재 위치 {statnNm}에 {trainSttus} 중입니다.
      </h2>
      <h2>열차 번호는 {trainNo} 입니다.</h2>
      <h3>종점 : {statnTnm} </h3>
      <h3>불편 사항을 적어주세요</h3>

      <div>{/* 온도 높/낮, 마스크 미착용, 시설물 파괴,  */}</div>
      {console.log(location.state)}

      <a href={testUrl}>체 크</a>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={temperatureClickListener}
        >
          온도
        </Button>
        <Button variant="contained" color="primary">
          마스크
        </Button>
        <Button variant="contained" color="primary">
          시설물 파괴
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={textBoxVisibleListener}
        >
          기타
        </Button>
      </div>

      {etcbox == true ? (
        <TextField
          label="내용"
          multiline
          rows={3}
          fullWidth="contained"
          defaultValue="내용을 입력해주세요."
        />
      ) : (
        ""
      )}
      {/* <form>
        <input type="text" name="message" onChange={messageChange} />
        <button type="submit">문자 메시지 전송</button>
      </form> */}

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={sendSMSListener}
      >
        SMS로 전송하기
      </Button>
      <Link
        to={{
          pathname: `/#`,
        }}
      >
        홈으로 이동
      </Link>
    </div>
  );
}

export default Detail;
