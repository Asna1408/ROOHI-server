import { BannerType } from "../../types/admin/BannerType";


export interface GetBannerUsecaseInterface{
    getBanners(skip: number, limit: number): Promise<{ banners: BannerType[]; total: number }>
}