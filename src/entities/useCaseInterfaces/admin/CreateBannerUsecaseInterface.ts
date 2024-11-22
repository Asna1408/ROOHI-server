import { BannerType } from "../../types/admin/BannerType";


export interface CreateBannerUsecaseInterface{
    createBanner(data: BannerType):Promise <BannerType >
}