import React from "react";
import { Link } from "react-router-dom";

function Train({ statnNm, trainNo, trainSttus, statnTnm, updnLine, directAt }) {
  const Test = () => {
    console.log(trainSttus);
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

  return (
    { Test },
    (
      <div>
        <Link
          to={{
            pathname: `/report/${trainNo}`,
            state: {
              statnNm,
              trainNo,
              trainSttus,
              statnTnm,
              updnLine,
              directAt,
            },
          }}
        >
          {statnNm}
        </Link>
        {trainNo}번호 상태 : {trainSttus} {statnTnm}행{" "}
        {updnLine === 0 ? "상행 " : "하행 "} {directAt === 1 ? "급행 " : " "}{" "}
      </div>
    )
  );
}

export default Train;
