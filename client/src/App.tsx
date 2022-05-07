import { useEffect, useState } from 'react';
import '../src/styles/App.scss';
// import { useAppDispatch } from './hooks/useRedux';
// import { fetchPriceTicker } from './redux/reducers/AsyncThunk';
import { io } from 'socket.io-client';
import { PriceTicker } from './types/types';
// import FinancialTable from './components/FinancialTable';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';

function App() {
  const dumpArr: PriceTicker[] = [
    {
      ticker: 'AAPL',
      exchange: 'NASDAQ',
      price: 222.98,
      change: 42.17,
      change_percent: 0.55,
      dividend: 0.23,
      yield: 0.19,
      last_trade_time: '2022-05-01T12:01:19.000Z',
    },
    {
      ticker: 'GOOGL',
      exchange: 'NASDAQ',
      price: 178.35,
      change: 165.0,
      change_percent: 0.28,
      dividend: 0.73,
      yield: 1.98,
      last_trade_time: '2022-05-01T12:01:19.000Z',
    },
    {
      ticker: 'MSFT',
      exchange: 'NASDAQ',
      price: 299.89,
      change: 102.31,
      change_percent: 0.6,
      dividend: 0.49,
      yield: 1.4,
      last_trade_time: '2022-05-01T12:01:19.000Z',
    },
    {
      ticker: 'AMZN',
      exchange: 'NASDAQ',
      price: 140.57,
      change: 110.17,
      change_percent: 0.92,
      dividend: 0.61,
      yield: 0.84,
      last_trade_time: '2022-05-01T12:01:19.000Z',
    },
    {
      ticker: 'FB',
      exchange: 'NASDAQ',
      price: 179.73,
      change: 150.17,
      change_percent: 0.38,
      dividend: 0.02,
      yield: 0.71,
      last_trade_time: '2022-05-01T12:01:19.000Z',
    },
    {
      ticker: 'TSLA',
      exchange: 'NASDAQ',
      price: 135.18,
      change: 123.86,
      change_percent: 0.88,
      dividend: 0.53,
      yield: 0.65,
      last_trade_time: '2022-05-01T12:01:19.000Z',
    },
  ];
  const [priceTicker, setPriceTicker] = useState<PriceTicker[]>(dumpArr);
  const [newPriceTicker, setNewPriceTicker] = useState<PriceTicker[]>([]);
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   const socket = io('http://localhost:4000/');
  //   socket.emit('start', () => {});
  //   dispatch(fetchPriceTicker());
  // }, [dispatch]);
  const keys: string[] = [
    'ticker',
    ' exchange',
    'price',
    'change',
    'change_percent',
    'dividend',
    'yield',
    'last_trade_time',
  ];

  useEffect(() => {
    const socket = io('http://localhost:4000/');
    socket.emit('start');

    socket.on('ticker', (quotes: PriceTicker[]) => {
      if (quotes) {
        console.log(quotes);
        setNewPriceTicker(quotes);

        console.log('noquotes');
      }

      setPriceTicker(newPriceTicker);
    });
  }, []);

  console.log('priceTicker', newPriceTicker);
  console.log('oldPriceTicker', priceTicker);

  return (
    <div className="App">
      {/* {message.map((item) => item.price)} */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {keys.map((key, index) => (
                <TableCell key={index}>{key}</TableCell>
              ))}
              {/* <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {newPriceTicker.map((ticker, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {ticker.ticker}
                </TableCell>
                <TableCell component="th" scope="row">
                  {ticker.exchange}
                </TableCell>
                <TableCell component="th" scope="row">
                  {'$ ' + ticker.price}
                </TableCell>
                <TableCell component="th" scope="row">
                  {ticker.change}
                </TableCell>
                <TableCell component="th" scope="row">
                  {ticker.change_percent}
                </TableCell>
                <TableCell component="th" scope="row">
                  {ticker.dividend}
                </TableCell>
                <TableCell component="th" scope="row">
                  {ticker.yield}
                </TableCell>
                <TableCell component="th" scope="row">
                  {moment(ticker.last_trade_time).format('LT')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <FinancialTable /> */}
    </div>
  );
}

export default App;
