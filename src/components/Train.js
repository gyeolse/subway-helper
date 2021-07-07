import { Paper, TableContainer } from "@material-ui/core";
import { Table, TableRow, TableCell } from "@material-ui/core";
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
    <TableRow>
      <TableCell component="th" scope="row">
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
      </TableCell>
      <TableCell>{trainNo}</TableCell>
      <TableCell align="middle">{trainSttus}</TableCell>
      <TableCell align="middle">{statnTnm}</TableCell>
      <TableCell align="middle">
        {updnLine === 0 ? "상행 " : "하행 "} {directAt === 1 ? "급행 " : " "}{" "}
      </TableCell>
    </TableRow>
  );
}

const style = {
  container: {
    marginRight: 8,
  },
};

export default Train;
