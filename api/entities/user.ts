export interface Role {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role_id: string;
    created_at: string;
    updated_at: string;
}