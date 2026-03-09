import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.Slice";
import areaReducer from "./features/area/area.slice";
import { regionsSlice } from "./features/regions/regions.slice";
import { subRegionsSlice } from "./features/sub-regions/sub-regions.slice";
import { mallsSlice } from "./features/malls/malls.slice";
import { boothsSlice } from "./features/booths/booths.slice";
import { shiftsSlice } from "./features/shifts/shifts.slice";
import { usersSlice } from "./features/users/users.slice";
import { rolesSlice } from "./features/roles/roles.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    area: areaReducer,
    regions: regionsSlice.reducer,
    subRegions: subRegionsSlice.reducer,
    malls: mallsSlice.reducer,
    booths: boothsSlice.reducer,
    shifts: shiftsSlice.reducer,
    users: usersSlice.reducer,
    roles: rolesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;