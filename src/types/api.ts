export interface ApiResponse<T> {
    data: {
        data: {
            data: T;
        };
    };
}