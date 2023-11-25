export interface IStock {
    art: string;
    st1: number;
    st2: number;
}

export interface IBrand {
    id: number;
    name: string;
}

export interface IProduct {
    name: string;
    art: string;
    brand: IBrand;
    price: number;
    year: number;
    stock?: IStock;
}


export interface ICart extends IProduct {
    count: number;
}

