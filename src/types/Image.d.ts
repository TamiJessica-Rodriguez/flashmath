export interface Image {
    id: number;
    fileName: any;
    date?: string;
    dataURL: string;
    file?: {
        name: string;
    };
    markers?: MarkerProps[];
}
