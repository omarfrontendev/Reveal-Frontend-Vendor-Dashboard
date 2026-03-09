export interface RegionBody {
    id: number,
    nameEn: string;
    nameAr: string;
    regionCode: string;
    areaId: number;
    coords: { lat: number; lng: number }[];
};

export interface CreateRegionResponse {
    success: boolean;
    data: {
        id: string;
        coords: { lat: number; lng: number }[];
        nameEn: string;
        nameAr: string;
        regionCode: string;
    };
};

export interface RegionsTableOptions {
    pageIndex: number;
    pageSize: number;
    search: string;
    areaId: number | null
};


export interface GetRegionsPayload {
    page: number;
    limit: number;
    search: string;
    areaId: number | null
}