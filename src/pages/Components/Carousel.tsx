// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import { Navigation, Pagination } from 'swiper';
// import { useEffect, useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setPageTitle } from '../../store/themeConfigSlice';
// import { IRootState } from '../../store';
// import IconCaretDown from '../../components/Icon/IconCaretDown';
// import { Swiper as SwiperType } from 'swiper/types';
// import Marker from '../../components/Marker';

// const Carousel: React.FC<CarouselProps> = ({ images, overlay, tempMarkers, onMouseDown, onMouseMove, onMouseUp, handleEditToggle, onSlideChangeId }) => {
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(setPageTitle('Carousel'));
//     });
//     const themeConfig = useSelector((state: IRootState) => state.themeConfig);
//     const [currentSlide, setCurrentSlide] = useState(1);

//     useEffect(() => {
//         const initialImageId = images[currentSlide - 1]?.id;
//         if (initialImageId) {
//             onSlideChangeId(initialImageId);
//         }
//     }, [images, currentSlide, onSlideChangeId]);

//     const handleSlideChange = (swiper: SwiperType) => {
//         const newSlideIndex = swiper.activeIndex + 1;
//         setCurrentSlide(newSlideIndex);
//         onSlideChangeId(images[swiper.activeIndex]?.id);
//     };

//     return (
//         <div className="pt-5 space-y-8">
//             <div className="panel" style={{ width: '100%', margin: '0 auto' }}>
//                 {' '}
//                 <div className="flex items-center justify-between mb-5">
//                     <h5 className="font-semibold text-lg dark:text-white-light">Processade bilder</h5>

//                     <button onClick={handleEditToggle} className="btn btn-primary">
//                         {overlay ? 'Spara' : 'Ändra'}
//                     </button>
//                 </div>
//                 <div className="text-center mb-3">
//                     <p>
//                         Bild {currentSlide} / {images.length} - {images[currentSlide - 1]?.fileName}
//                     </p>
//                 </div>
//                 <div
//                     className="relative mx-auto mb-5"
//                     style={{ width: '800px', height: '600px' }} // Fixed size for the Carousel container
//                 >
//                     <Swiper
//                         modules={[Navigation, Pagination]}
//                         navigation={overlay ? false : { nextEl: '.swiper-button-next-ex1', prevEl: '.swiper-button-prev-ex1' }}
//                         pagination={overlay ? false : { clickable: true }}
//                         onSlideChange={handleSlideChange}
//                         className="swiper"
//                         dir={themeConfig.rtlClass}
//                         key={themeConfig.rtlClass === 'rtl' ? 'true' : 'false'}
//                         style={{ width: '100%', height: '100%' }}
//                     >
//                         {images.map((image, i) => (
//                             <SwiperSlide key={i} className="relative" style={{ width: '100%', height: '100%' }}>
//                                 {' '}
//                                 <img src={image.dataURL} alt={image.file?.name} style={{ width: '100%', height: '100%' }} />
//                                 {image.markers?.map((marker: MarkerProps, idx: number) => (
//                                     <Marker key={`marker-${i}-${idx}`} {...marker} onClick={() => console.log(`Marker clicked: ${marker.label}`)} color={idx % 2 === 0 ? 'blue' : 'green'} />
//                                 ))}
//                             </SwiperSlide>
//                         ))}

//                         {!overlay && (
//                             <>
//                                 <button className="swiper-button-prev-ex1 grid place-content-center ltr:left-2 rtl:right-2 p-1 transition text-primary hover:text-white border border-primary hover:border-primary hover:bg-primary rounded-full absolute z-[999] top-1/2 -translate-y-1/2">
//                                     <IconCaretDown className="w-5 h-5 rtl:-rotate-90 rotate-90" />
//                                 </button>
//                                 <button className="swiper-button-next-ex1 grid place-content-center ltr:right-2 rtl:left-2 p-1 transition text-primary hover:text-white border border-primary hover:border-primary hover:bg-primary rounded-full absolute z-[999] top-1/2 -translate-y-1/2">
//                                     <IconCaretDown className="w-5 h-5 rtl:rotate-90 -rotate-90" />
//                                 </button>
//                             </>
//                         )}
//                     </Swiper>

//                     {overlay && (
//                         <div
//                             onMouseDown={onMouseDown}
//                             onMouseMove={onMouseMove}
//                             onMouseUp={onMouseUp}
//                             style={{
//                                 position: 'absolute',
//                                 top: 0,
//                                 left: 0,
//                                 width: '100%',
//                                 height: '100%',
//                                 zIndex: 10,
//                             }}
//                         >
//                             {tempMarkers.map((tempMarker: MarkerProps, idx: number) => (
//                                 <Marker key={`temp-marker-${idx}`} {...tempMarker} color="red" />
//                             ))}
//                             {overlay}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Carousel;
