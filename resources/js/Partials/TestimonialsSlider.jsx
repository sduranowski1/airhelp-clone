import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Rating from '@mui/material/Rating';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function TestimonialsSlider() {
    // Array of testimonials
    const testimonials = [
        {
            name: "Piotr Nowakowski",
            feedback: "Consistently excellent! Every interaction leaves me impressed. From their meticulous attention to detail to their exceptional customer service, this team delivers nothing short of excellence. I wholeheartedly recommend their service to anyone seeking top-tier quality."
        },
        {
            name: "Andrzej Wiśniewski",
            feedback: "This company has consistently delivered outstanding service. Their dedication to customer satisfaction is evident in every interaction. I've been a loyal customer for years, and I have no plans of going elsewhere. Highly recommended!"
        },
        // Add more testimonials here...
    ];

    return (
        <div className="container mb-5">
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={4}
            // pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            className="swiper-container"
            breakpoints={{
                0: {
                    // width: 768,
                    slidesPerView: 1,
                },
                768: {
                    // width: 768,
                    slidesPerView: 4,
                },
            }}
        >
            <SwiperSlide>
                    {/* Slide 1 */}
                    <div className="swiper-slide">
                        <div className="slider-wraapper h-100">
                            <div className="card card-hover h-100 text-center"
                                 style={{boxShadow: '0px 4px 6px rgba(0, 0, 0, 0)'}}>
                                <div className="card-body d-flex flex-column align-items-center">
                                    <div className="icon mb-3 d-flex justify-content-center">
                                        {/* <img src={require("path/to/your/image")} className="img-fluid" style={{ maxWidth: '100px' }} /> */}
                                    </div>
                                    <div>
                                        <Rating name="size-large" defaultValue={5} size="large" readOnly />
                                        <h5>Piotr Nowakowski</h5>
                                        <p>Consistently excellent! Every interaction leaves me impressed. From their
                                            meticulous attention to detail to their exceptional customer service, this
                                            team delivers nothing short of excellence.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </SwiperSlide>
            <SwiperSlide>
                    {/* Slide 2 */}
                    <div className="swiper-slide">
                        <div className="slider-wraapper  h-100">
                            <div className="card card h-100 text-center"
                                 style={{boxShadow: '0px 4px 6px rgba(0, 0, 0, 0)'}}>
                                <div className="card-body d-flex flex-column align-items-center">
                                    <div className="icon mb-3 d-flex justify-content-center">
                                        {/* <img src={require("path/to/your/image")} className="img-fluid" style={{ maxWidth: '100px' }} /> */}
                                    </div>
                                    <div>
                                        <Rating name="size-large" defaultValue={5} size="large" readOnly />
                                        <h5>Andrzej Wiśniewski</h5>
                                        <p>This company has consistently delivered outstanding service. Their dedication
                                            to customer satisfaction is evident in every interaction. I have no plans of going elsewhere.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </SwiperSlide>
                    {/* Slide 3 */}
            <SwiperSlide>
                    <div className="swiper-slide">
                        <div className="slider-wraapper  h-100">
                            <div className="card card h-100 text-center"
                                 style={{boxShadow: '0px 4px 6px rgba(0, 0, 0, 0)'}}>
                                <div className="card-body d-flex flex-column align-items-center">
                                    <div className="icon mb-3 d-flex justify-content-center">
                                        {/* <img src={require("path/to/your/image")} className="img-fluid" style={{ maxWidth: '100px' }} /> */}
                                    </div>
                                    <div>
                                        <Rating name="size-large" defaultValue={5} size="large" readOnly />
                                        <h5>Karzimierz Hałas</h5>
                                        <p>I can't say enough good things about this service. From start to finish,
                                            everything was seamless. The product quality is unmatched, and the customer
                                            support is excellent.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </SwiperSlide>
            <SwiperSlide>
                    {/* Slide 4 */}
                    <div className="swiper-slide">
                        <div className="slider-wraapper h-100">
                            <div className="card card h-100 text-center"
                                 style={{boxShadow: '0px 4px 6px rgba(0, 0, 0, 0)'}}>
                                <div className="card-body d-flex flex-column align-items-center">
                                    <div className="icon mb-3 d-flex justify-content-center">
                                        {/* <img src={require("path/to/your/image")} className="img-fluid" style={{ maxWidth: '100px' }} /> */}
                                    </div>
                                    <div>
                                        <Rating name="size-large" defaultValue={5} size="large" readOnly />
                                        <h5>Jan Kowalski</h5>
                                        <p>The service provided was exceptional. I was pleasantly surprised by the
                                            quality and professionalism. The product exceeded my expectations, and I
                                            will definitely recommend it to others.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </SwiperSlide>
            <SwiperSlide>
                    {/* Slide 5 */}
                    <div className="swiper-slide">
                        <div className="slider-wraapper h-100">
                            <div className="card card h-100 text-center"
                                 style={{boxShadow: '0px 4px 6px rgba(0, 0, 0, 0)'}}>
                                <div className="card-body d-flex flex-column align-items-center">
                                    <div className="icon mb-3 d-flex justify-content-center">
                                        {/* <img src={require("path/to/your/image")} className="img-fluid" style={{ maxWidth: '100px' }} /> */}
                                    </div>
                                    <div>
                                        <Rating name="size-large" defaultValue={5} size="large" readOnly />
                                        <h5>Maria Nowak</h5>
                                        <p>I have had the pleasure of using this service multiple times, and each time I
                                            am impressed. The attention to detail and customer care is commendable.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </SwiperSlide>
            <SwiperSlide>
                    {/* Slide 6 */}
                    <div className="swiper-slide">
                        <div className="slider-wraapper  h-100">
                            <div className="card card h-100 text-center"
                                 style={{boxShadow: '0px 4px 6px rgba(0, 0, 0, 0)'}}>
                                <div className="card-body d-flex flex-column align-items-center">
                                    <div className="icon mb-3 d-flex justify-content-center">
                                        {/* <img src={require("path/to/your/image")} className="img-fluid" style={{ maxWidth: '100px' }} /> */}
                                    </div>
                                    <div>
                                        <Rating name="size-large" defaultValue={5} size="large" readOnly />
                                        <h5>Katarzyna Wójcik</h5>
                                        <p>Impeccable service time and time again! Their commitment to excellence shines
                                            through in every interaction. For those seeking a service that goes above
                                            and beyond, look no further.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </SwiperSlide>
            <SwiperSlide>
                    {/* Slide 7 */}
                    <div className="swiper-slide">
                        <div className="slider-wraapper h-100">
                            <div className="card card h-100 text-center"
                                 style={{boxShadow: '0px 4px 6px rgba(0, 0, 0, 0)'}}>
                                <div className="card-body d-flex flex-column align-items-center">
                                    <div className="icon mb-3 d-flex justify-content-center">
                                        {/* <img src={require("path/to/your/image")} className="img-fluid" style={{ maxWidth: '100px' }} /> */}
                                    </div>
                                    <div>
                                        <Rating name="size-large" defaultValue={5} size="large" readOnly />
                                        <h5>Andżelika Wojewódzka</h5>
                                        <p>Each experience with this service leaves me thoroughly impressed. Their
                                            meticulous approach and genuine care for their customers are truly
                                            commendable. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </SwiperSlide>
        </Swiper>
        </div>
);
}

export default TestimonialsSlider;
