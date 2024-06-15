export interface InventoryItem {
    id: string;
    product_id: string;
    quantity: number;
    description: string;
    image: string;
    category: string;
    created_at: string;
    updated_at: string;
}

export interface Inventory {
    items: InventoryItem[];
    total: number;
}