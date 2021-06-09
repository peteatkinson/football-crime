export interface IPostcode {
    postcode: string,
    quality: number,
    eastings: number,
    northings: number,
    country: string,
    nhs_ha: string,
    longitude: number,
    latitude: number,
    european_electoral_region: number,
    primary_care_trust: number,
    region: string,
    lsoa: string,
    msoa: string,
    incode: string,
    outcode: string,
    parliamentary_constituency: string,
    admin_district: string,
    parish: string,
    admin_county: string,
    admin_ward: string,
    ced: string,
    ccg: string,
    nuts: string,
    codes: ICodes
}

export interface ICodes {
    admin_district: string,
    admin_county: string,
    parish: string,
    parliamentary_constituency: string,
    ccg: string,
    ccg_id: string,
    ced: string,
    nuts: string,
    lsoa: string,
    msoa: string,
    lau2: string
}

export class PostcodeStatusResponse<TResult> {
    status: number;
    result: TResult;
}

export interface IConfiguration {
    apiKey: string
}