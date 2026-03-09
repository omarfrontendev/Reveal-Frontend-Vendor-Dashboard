import { api } from "@/api";
import { endpoints } from "@/api/endpoints";
import type { GetAreasPayload } from "@/types/area";
import { cleanAndTrim } from "@/utils/clean-data";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAreas = createAsyncThunk(
    "areas/fetchAreas",
    async (params: GetAreasPayload, { rejectWithValue }) => {
        const cleanedParams = cleanAndTrim(params);
        try {
            const response = await api.get(`${endpoints.area.getAreas}?${new URLSearchParams(cleanedParams).toString()}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || { message: "Something went wrong." });
        }
    }
);