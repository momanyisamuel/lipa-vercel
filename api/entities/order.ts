
export interface OrderItem {
    id: string;
    product_id: string;
    quantity: number;
    price: number;
    status: string;
}

export interface Order {
    id: string;
    customer_id: string;
    total: number;
    items: OrderItem[];
}