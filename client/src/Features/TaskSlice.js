import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

const BASE_URL = ENV.SERVER_URL;


export const getTasks = createAsyncThunk("tasks/getTasks", async () => {
  const response = await axios.get(`${BASE_URL}/task`);
  return response.data;
});


export const addTask = createAsyncThunk("tasks/addTask", async (taskData) => {
  const response = await axios.post(`${BASE_URL}/addTask`, taskData);
  return response.data.task; 
});


export const updateTask = createAsyncThunk("tasks/updateTask", async (taskData) => {
 
  const response = await axios.put(`${BASE_URL}/updateTask/${taskData.id}`, {
    title: taskData.title,
    description: taskData.description,
    status: taskData.status,
    priority: taskData.priority,
  });
  return response.data.task;
});


export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await axios.delete(`${BASE_URL}/deleteTask/${id}`);
  return id;
});

//update the state  when it's completeed 
export const markAsCompleted = createAsyncThunk("tasks/markAsCompleted", async (id) => {
  const response = await axios.patch(`${BASE_URL}/completeTask/${id}`);
  return response.data.task;
});


const taskSlice = createSlice({
  name: "tasks",
  initialState: { items: [], isLoading: false, isSuccess: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Tasks
      .addCase(getTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      // Add Task
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update Task - 
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete Task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      //update the state  when it's completeed 
      .addCase(markAsCompleted.fulfilled, (state, action) => {
    const index = state.items.findIndex((item) => item._id === action.payload._id);
    if (index !== -1) {

    state.items[index].status = "Completed";
  }
})
      
    
  },
});

export default taskSlice.reducer;