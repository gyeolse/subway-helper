import React, { useState } from "react";
import { Link } from "react-router-dom";

function Detail({ location }) {
  const [message, setmessage] = useState("");

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
  let trainSttus = checkTrainStatus(location.state.trainSttus); //열차상태 (도착/진입/출발)
  let updnLine = location.state.updnLine == 0 ? "상행" : "하행";

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

  return (
    <div>
      <h2>
        현재 위치 {statnNm}에 {trainSttus} 중입니다.
      </h2>
      <h2>열차 번호는 {trainNo} 입니다.</h2>
      <h3>종점 : {statnTnm} </h3>
      <h3>불편 사항을 적어주세요</h3>

      {console.log(location.state)}

      <a href={testUrl}>체 크</a>
      {/* <form>
        <input type="text" name="message" onChange={messageChange} />
        <button type="submit">문자 메시지 전송</button>
      </form> */}
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
