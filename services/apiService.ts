export interface ApiServiceInterface {
    apiGet(url: string): any;
    apiPost(url: string, data: any): any;
    apiDelete(url: string, param: any): any;
    apiGetWithParam(url: string, param: any): any;
}