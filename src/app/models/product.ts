export interface Product {
    id: number;
    img: string;
    color: string;
    brand: string;
    model: string;
    release_year: number;
    display: Display;
    processor: string;
    ram: string;
    storage: string;
    battery: string;
    fast_charging: string;
    wireless_charging: boolean;
    reverse_charging: boolean;
    camera: Camera;
    features: string[];
    price: number;
}
export interface Camera {
    main:               string;
    front:              string;
    video_capabilities: string;
}

export interface Display {
    type:         string;
    size:         string;
    resolution:   string;
    refresh_rate: RefreshRate;
    protection:   string;
}

export enum RefreshRate {
    The120Hz = "120 Hz",
    The144Hz = "144 Hz",
    The165Hz = "165 Hz",
    The60Hz = "60 Hz",
    The90Hz = "90 Hz",
}

export interface Product_Information
{
   id : number
   brand : string
   model : string
   ram : string
   color : string
   storage : string
   Quantity : number
   Price : number
   img : string
   total : number
}

export interface CurrentUser
{
   Username : string
}

export interface total_amount
{
    total_amount : number
}

export interface total_quantities
{
    totalQuantities : number
}

export interface current_flag
{
    flag : boolean;
}