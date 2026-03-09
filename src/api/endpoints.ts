
const users = {
    getAllUsers: "/users?page=1&limit=100",
    getUsers: "/users",
    createUsers: "/users",
    getgetUserById: (id: string) => `/users/${id}`,
    updateUser: (id: string) => `/users/${id}`,
    deleteUser: (id: string) => `/users/${id}`,
};

const auth = {
    login: "auth/login",
    checkEmailState: "auth/check-email-state",
    requestOTp: "auth/request-otp",
    verfiyOTp: "auth/verify-otp"
};

const area = {
    getAreas: "/vendors/area",
    createArea: "/vendors/area",
    getAreaById: (id: string) => `/vendors/area/${id}`,
    updateArea: (id: string) => `/vendors/area/${id}`,
    deleteArea: (id: string) => `/vendors/area/${id}`,
};

const regions = {
    getRegions: "/vendors/regions",
    createRegion: "/vendors/regions",
    getRegionById: (id: string) => `/vendors/regions/${id}`,
    updateRegion: (id: string) => `/vendors/regions/${id}`,
    deleteRegion: (id: string) => `/vendors/regions/${id}`,
}

const subRegions = {
    getSubRegions: "/vendors/sub-regions",
    createSubRegion: "/vendors/sub-regions",
    getSubRegionById: (id: string) => `/vendors/sub-regions/${id}`,
    updateSubRegion: (id: string) => `/vendors/sub-regions/${id}`,
    deleteSubRegion: (id: string) => `/vendors/sub-regions/${id}`,
}

const malls = {
    getMalls: "/vendors/malls",
    createMall: "/vendors/malls",
    getMallById: (id: string) => `/vendors/malls/${id}`,
    updateMall: (id: string) => `/vendors/malls/${id}`,
    deleteMall: (id: string) => `/vendors/malls/${id}`,
}

const shifts = {
    getShifts: "/vendors/shifts",
    createShift: "/vendors/shifts/bulk",
    getShiftById: (id: string) => `/vendors/shifts/${id}`,
    updateShift: (id: string) => `/vendors/shifts/${id}`,
    deleteShift: (id: string) => `/vendors/shifts/${id}`,
}

const booths = {
    getBooths: "/vendors/booths",
    createBooth: "/vendors/booths",
    getBoothById: (id: string) => `/vendors/booths/${id}`,
    updateBooth: (id: string) => `/vendors/booths/${id}`,
    deleteBooth: (id: string) => `/vendors/booths/${id}`,
}

const clients = {
    getClients: "/clients",
    createClient: "/clients",
    getClientById: (id: string) => `/clients/${id}`,
    updateClient: (id: string) => `/clients/${id}`,
    deleteClient: (id: string) => `/clients/${id}`,
}

const permissions = {
    getPermissions: "/vendors/permissions",
    createPermission: "/vendors/permissions",
    updatePermission: (id: string) => `/vendors/permissions/profile/${id}`,
    deletePermission: (id: string) => `/vendors/permissions/profile/${id}`,
    getPermissionById: (id: string) => `/vendors/permissions/profile/${id}`,
}

export const endpoints = {
    auth,
    users,
    area,
    regions,
    subRegions,
    malls,
    shifts,
    booths,
    clients,
    permissions
};