import { api } from "@/api";
import { endpoints } from "@/api/endpoints";
import { cleanAndTrim } from "@/utils/clean-data";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchVendors = createAsyncThunk(
    "vendors/fetchVendors",
    async (params: any, { rejectWithValue }) => {
        const cleanedParams = cleanAndTrim(params);
        try {
            const response = await api.get(`${endpoints.vendors.getVendors}?${new URLSearchParams(cleanedParams).toString()}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || { message: "Something went wrong." });
        }
    }
);