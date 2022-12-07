export interface Point {
    lng: number;
    lat: number;
}

export interface InternetAccess {
    id: number;
    name: string;
}

export interface Organization {
    id: number;
    address: string;
    fias: string;
    name: string;
    inn: string;
    kpp: string;
    acronym: string;
    location?: any;
    children?: any;
    accessPoints?: any;
}

export interface FCAccessPoint {
    id: number;
    type: string;
    address: string;
    point: Point;
    funCustomer: string;
    internetAccess: InternetAccess;
    declaredSpeed: string;
    contractId: number;
    contract: string;
    contacts: string;
    change: string;
    dateConnectionOrChange: string;
    numIncomingMessage: string;
    commentary: string;
    deleted: boolean;
    visible: boolean;
    organization: Organization;
    espdWhiteIp: string;
    numSourceEmailsRTK: string;
    oneTimePay: number;
    monthlyPay: number;
    zspdWhiteIp: string;
    availZspdOrMethodConToZspd: string;
    dateCommissioning : string;
}