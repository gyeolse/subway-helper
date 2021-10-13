import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { isBrowser, isMobile } from "react-device-detect";

function Detail({ location }) {
  //props variables
  // let directAt = location.state.directAt == 1 ? "급행" : " "; //급행여부
  let statnNm = location.state.statnNm; //현재 위치
  let statnTnm = location.state.statnTnm; //종점
  let trainNo = location.state.trainNo; //열차번호
  let trainSttus = location.state.trainSttus; //열차상태 (도착/진입/출발)
  let updnLine = location.state.updnLine == 0 ? "상행" : "하행";
  let subwayNm = location.state.subwayNm;

  // final variables
  const [resultMessages, setresultMessages] = useState("");
  const [isCheckValue, setisCheckValue] = useState(false);
  const [etcbox, setetcbox] = useState(false);
  const [callCenter, setcallCenter] = useState("");

  // check the variables value
  const [isSelectTemp, setisSelectTmp] = useState(false); //온도
  const [isSelectMask, setisSelectMask] = useState(false); //마스크 미착용
  const [isSelectDestroy, setisSelectDestroy] = useState(false); //시설물 파괴
  const [isSelectOrder, setisSelectOrder] = useState(false); //질서저해
  const [isSelectEtc, setisSelectEtc] = useState(false);

  // 다른 변수를 체크했을 때, 나머지를 모두, false로 세팅해주는 함수 필요.
  const makeFalse = () => {
    setisSelectDestroy(false);
    setisSelectMask(false);
    setisSelectDestroy(false);
    setisSelectOrder(false);
    setisSelectEtc(false);

    setisCheckValue(false);
    setetcbox(false);
  };

  // Button click Listener
  const tempClickListener = () => {
    makeFalse(); // 모두 false로 설정
    setisSelectTmp(true); // 해당 temp 만 true로 설정
    setresultMessages("온도에 문제가 있습니다. "); //결과 메시지 설정
    setisCheckValue(true);
  };

  const maskClickListener = () => {
    makeFalse();
    setisSelectMask(true);
    setresultMessages("마스크를 쓰지 않은 사람이 있습니다. ");
    setisCheckValue(true);
  };

  const destroyClickListener = () => {
    makeFalse();
    setisSelectDestroy(true);
    setresultMessages("시설물 고장이 있습니다. ");
    setisCheckValue(true);
  };

  const orderClickListener = () => {
    makeFalse();
    setisSelectMask(true);
    setresultMessages("질서 저해하는 사람이 탑승하고 있습니다. ");
    setisCheckValue(true);
  };

  const etcClickListener = () => {
    makeFalse();
    setisSelectEtc(true);
    if (etcbox == false) {
      setetcbox(true);
    } else {
      setetcbox(false);
    }
    setisCheckValue(true);
  };

  const sendSMSListener = () => {
    //Message 만들기
    let FinalMessage =
      //Mobile 화면만 지원하도록 설정
      // if (isMobile) {
      //   alert("고객센터로 SMS 전송합니다.");
      // } else if (isBrowser) {
      //   alert("현재 PC 화면은 지원하지 않습니다.");
      // } else {
      //   alert("기타 브라우저는 지원하지 않습니다.");
      // }

      alert("고객센터로 SMS 전송합니다. ");
    console.log(FinalMessage);
  };

  // 그 외 functions
  //etc message 변화 함수
  const messageChange = (e) => {
    setresultMessages(e.target.value);
  };

  //콜센터 세팅
  const confirmCallCenter = (subwayNm) => {
    // 추후 수정 필요. 역별로 다름.
    if (
      subwayNm == "1호선" ||
      subwayNm == "2호선" ||
      subwayNm == "3호선" ||
      subwayNm == "4호선"
    ) {
      return "15771234";
    } else {
      return "15447769";
    }
  };

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

  //callcenter 확인
  let callCenterNum = confirmCallCenter(subwayNm);

  let testUrl = "sms:" + "enter the phone number" + "&body=" + makeSMSMessage();
  let meessageurl =
    "sms:" +
    callCenterNum +
    "&body=" +
    resultMessages +
    " 빠른 조치 부탁드립니다. ";
  return (
    <div>
      <h2>
        현재 위치 {statnNm}에 {trainSttus} 하는 중이에요.
      </h2>
      <h2>
        열차 번호는 {trainNo} 이에요. 종점은 {statnTnm} 이에요.{" "}
      </h2>

      <h3>불편 사항을 선택해주세요. </h3>

      <div>{/* 온도 높/낮, 마스크 미착용, 시설물 파괴,  */}</div>
      {console.log(location.state)}

      <a href={testUrl}>체 크</a>
      <div>
        <Button variant="contained" color="primary" onClick={tempClickListener}>
          온도
        </Button>
        <Button variant="contained" color="primary" onClick={maskClickListener}>
          마스크
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={orderClickListener}
        >
          질서저해
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={destroyClickListener}
        >
          시설물 파괴
        </Button>
        <Button variant="contained" color="primary" onClick={etcClickListener}>
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
          onChange={messageChange}
        />
      ) : (
        ""
      )}

      <div>
        {isCheckValue == true ? (
          <h3>최종적으로 {resultMessages} 라고 전송할게요.</h3>
        ) : (
          ""
        )}
      </div>

      {/* <form>
        <input type="text" name="message" onChange={messageChange} />
        <button type="submit">문자 메시지 전송</button>
      </form> */}

      <Button
        fullWidth
        variant="contained"
        color="primary"
        href={meessageurl}
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
