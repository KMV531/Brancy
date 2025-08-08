'use client'

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { Card, CardHeader } from '@/components/ui/card'

const LogoSlider = () => {
  const servicesData = [
    '/assets/about/1.webp',
    '/assets/about/2.webp',
    '/assets/about/3.webp',
    '/assets/about/4.webp',
  ]

  return (
    <section className='mb-12 xl:mb-36'>
      <div className='flex justify-center'>
        <div className='max-w-6xl w-full'>
          <Swiper
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1400: { slidesPerView: 4 },
            }}
            loop={true}
            spaceBetween={30}
            modules={[Autoplay]}
            autoplay={{ delay: 7000, disableOnInteraction: false }}
            className='h-[200px]'
          >
            {servicesData.map((src, index) => (
              <SwiperSlide key={index}>
                <Card className='w-full max-w-[200px] h-[200px] flex justify-center items-center relative p-4 shadow-none border-0 mx-auto'>
                  <CardHeader className='absolute inset-0 flex justify-center items-center bg-white dark:bg-background border-0 shadow-none'>
                    <img
                      src={src}
                      alt={`Logo ${index + 1}`}
                      className='max-h-full max-w-full object-contain'
                    />
                  </CardHeader>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default LogoSlider
