import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const contactDetails = [
  {
    icon: '/assets/phone.webp',
    alt: 'Phone icon',
    lines: [
      <Link
        key='phone1'
        href='tel:+11020303023'
        className='hover:text-orange-300 transition-colors'
      >
        +11 0203 03023
      </Link>,
      <Link
        key='phone2'
        href='tel:+11020303023'
        className='hover:text-orange-300 transition-colors'
      >
        +11 0203 03023
      </Link>,
    ],
  },
  {
    icon: '/assets/email.webp',
    alt: 'Email icon',
    lines: [
      <Link
        key='email1'
        href='mailto:example@demo.com'
        className='hover:text-orange-300 transition-colors'
      >
        example@demo.com
      </Link>,
      <Link
        key='email2'
        href='mailto:demo@example.com'
        className='hover:text-orange-300 transition-colors'
      >
        demo@example.com
      </Link>,
    ],
  },
  {
    icon: '/assets/location-pin.webp',
    alt: 'Location icon',
    lines: [
      <p key='loc1'>Sunset Beach, North</p>,
      <p key='loc2'>Carolina (NC), 28468</p>,
    ],
  },
]

const ContactInfo = () => {
  return (
    <main className='container mx-auto px-5 py-10 max-w-6xl'>
      <section className='bg-orange-50 rounded-xl p-8'>
        <div className='flex flex-col lg:flex-row items-center justify-center text-center gap-16 text-sm md:text-lg text-black'>
          {contactDetails.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center space-y-4 px-6 ${
                index < contactDetails.length - 1
                  ? 'lg:border-r-2 border-gray-300'
                  : ''
              }`}
            >
              <Image src={item.icon} alt={item.alt} width={40} height={40} />
              {item.lines.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default ContactInfo
