import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWinners = createAsyncThunk('winners/fetchWinners', async () => {
  const response = await fetch('/ticketApi/winners');
  const data = await response.json();
  return data.winners;
});

const winnerSlice = createSlice({
  name: 'winners',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWinners.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const updateWinnerStatus = createAsyncThunk(
  'winners/updateStatus',
  async ({ id, status }) => {
    const response = await fetch(`/ticketApi/update-winner-status/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    return data.winner;
  }
);



export default winnerSlice.reducer;
export const selectWinners = (state) => state.winners;
