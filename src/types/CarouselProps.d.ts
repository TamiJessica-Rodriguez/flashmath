interface CarouselProps {
    images: Image[];
    overlay: React.ReactNode;
    tempMarkers: MarkerProps[];
    onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
    onMouseMove?: (event: React.MouseEvent<HTMLDivElement>) => void;
    onMouseUp?: (event: React.MouseEvent<HTMLDivElement>) => void;
    handleEditToggle: () => void;
    onSlideChangeId: (id: number) => void;
}
