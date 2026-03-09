export interface AreaBody {
    id?: number,
    nameEn: string;
    nameAr: string;
    areaCode: string;
    coords: { lat: number; lng: number }[];
};

export interface CreateAreaResponse {
    statusCode: number;
    message: string,
    data: {
        id: string;
        coords: { lat: number; lng: number }[];
        nameEn: string;
        nameAr: string;
        areaCode: string;
    };
};

export interface AreasTableOptions {
    vendorId?: number;
    pageIndex: number;
    pageSize: number;
    search: string;
};

export interface GetAreasPayload {
    vendorId?: number;
    page: number;
    limit: number;
    search: string;
}