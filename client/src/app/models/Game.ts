import { Title } from "@angular/platform-browser";

interface Game{
    id_game?: number;
    title?: string;
    description?: string;
    image?:string;
    created_at?: Date
};

export { Game };