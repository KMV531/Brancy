import Image from 'next/image'
import React from 'react'
import LogoSlider from './LogoSlider'

const AboutSection = () => {
  return (
    <main className='container mx-auto pb-20 bg-white'>
      <LogoSlider />
      <section className='flex flex-col space-y-8 lg:space-y-16 items-center justify-center px-5 lg:px-0'>
        <div>
          <Image
            src={'/assets/about/about2.webp'}
            alt='About 2 hero image'
            width={1300}
            height={1300}
            className='object-contain w-[80rem] h-full'
          />
        </div>
        <div className='flex flex-col space-y-3 items-center justify-center'>
          <h1 className='text-xl md:text-2xl lg:text-5xl text-blue-950 py-10 font-medium'>
            Best Cosmetics Provider
          </h1>
          <p className='max-w-3xl text-gray-600 text-center'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel arcu
            aliquet sem risus nisl. Neque, scelerisque in erat lacus ridiculus
            habitant porttitor. Malesuada pulvinar sollicitudin enim, quis
            sapien tellus est. Pellentesque amet vel maecenas nisi. In elementum
            magna nulla ridiculus sapien mollis volutpat sit. Arcu egestas massa
            consectetur felis urna porttitor ac.
          </p>
        </div>
      </section>
    </main>
  )
}

export default AboutSection
