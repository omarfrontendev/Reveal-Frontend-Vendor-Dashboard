import { createSlice } from "@reduxjs/toolkit";
import { fetchVendors } from "./vendorsThunk";

interface VendorsState {
    vendors: any[];
    loading: boolean;
    error: string | null;
    total: number;
}

const initialState: VendorsState = {
    vendors: [],
    loading: false,
    error: null,
    total: 0,
};

export const vendorsSlice = createSlice({
    name: "vendors",
    initialState,
    reducers: {
        updateVendorStatus: (state, action: { payload: { id: number; isActive: boolean } }) => {
            const { id, isActive } = action.payload;
            const user = state.vendors.find(u => u.id === id);
            if (user) {
                user.isActive = isActive;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVendors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVendors.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.vendors = action.payload?.data?.VendorDetails as any[];
                state.total = action.payload?.data?.meta?.total || 0;
            })
            .addCase(fetchVendors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});

export const { updateVendorStatus } = vendorsSlice.actions;
export default vendorsSlice.reducer;
