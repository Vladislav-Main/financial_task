import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PriceTicker } from '../../types/types';
import { io } from 'socket.io-client';
import { useState } from 'react';

export const fetchPriceTicker = createAsyncThunk(
  'priceTicker/fetchAll',
  async (_, thunkAPI) => {
    const socket = io('http://localhost:4000/');
    try {
      //socket.emit('start');
      const [data, setData] = useState<PriceTicker[]>([]);
      socket.on('ticker', (quotes: PriceTicker[]) => {
        setData(quotes);
      });
      const response = data;

      // const response = await axios.get<PriceTicker[]>('http://localhost:4000/');
      // return console.log(JSON.parse(JSON.stringify(response.data)));

      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        'Something went wrong :(. Our team is already resolving the problem!'
      );
    }
  }
);
