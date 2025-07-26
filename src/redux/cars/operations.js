import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/cars");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFilteredCars = createAsyncThunk(
  "cars/fetchFilteredCars",
  async (filters, thunkAPI) => {
    try {
      const params = new URLSearchParams();

      if (filters.brand) {
        params.append("brand", filters.brand);
      }
      if (filters.rentalPrice) {
        params.append("rentalPrice", filters.rentalPrice);
      }
      if (filters.minMileage) {
        params.append("minMileage", filters.minMileage);
      }
      if (filters.maxMileage) {
        params.append("maxMileage", filters.maxMileage);
      }
      if (filters.limit) {
        params.append("limit", filters.limit);
      }
      if (filters.page) {
        params.append("page", filters.page);
      }

      const queryString = params.toString();
      const url = queryString ? `/cars?${queryString}` : "/cars";

      console.log("Fetching cars with URL:", url);
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (carId, thunkAPI) => {
    try {
      const res = await axios.get(`/cars/${carId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchBrands = createAsyncThunk(
  "cars/fetchBrands",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/brands");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
