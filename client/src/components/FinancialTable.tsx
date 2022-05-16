import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import { FC } from "react";
import { keys } from "../dumb";
import { useAppSelector } from "../hooks/useRedux";
import { selectAllEntities } from "../redux/reducers/PriceTickerSlice";
import "./financialTable.scss";
import io from "socket.io-client";

const FinancialTable: FC = () => {
  const quotes = useAppSelector(selectAllEntities);
  const socket = io("http://localhost:4000/");

  return (
    <div className="tableBody">
      <TableContainer
        component={Paper}
        sx={{
          minWidth: 650,
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {keys.map((key, index) => (
                <>
                  <TableCell key={index} className="table-cell">
                    {key}
                  </TableCell>
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {quotes.map((ticker, index) => (
              <TableRow key={index} className="table-cell">
                <TableCell component="th" scope="row" className="table-cell">
                  {ticker.ticker}
                </TableCell>
                <TableCell component="th" scope="row" className="table-cell">
                  {ticker.exchange}
                </TableCell>
                <TableCell component="th" scope="row" className="table-cell">
                  {"$ " + ticker.price}
                </TableCell>
                <TableCell component="th" scope="row" className="table-cell">
                  {"$ " + ticker.change}
                </TableCell>
                <TableCell component="th" scope="row" className="table-cell">
                  {(ticker.change_percent * 100).toFixed(0) + "%"}
                </TableCell>
                <TableCell component="th" scope="row" className="table-cell">
                  {ticker.dividend}
                </TableCell>
                <TableCell component="th" scope="row" className="table-cell">
                  {ticker.yield}
                </TableCell>
                <TableCell component="th" scope="row" className="table-cell">
                  {moment(ticker.last_trade_time).format("hh:mm:ss")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FinancialTable;
