import React from 'react'
import Link from 'next/link'

const UploadBtn = ({link='#', text} : {link: string, text: string}) => {
  return (
    <Link href={link} className='h-10 px-4 gap-2 bg-[#23232b] rounded-xl flex items-center justify-center text-white hover:bg-[#2d2d37] transition-colors duration-200'>
      <p className='font-bold'>{text}</p>
        <i className="fa-solid fa-upload"></i>
    </Link>
  )
}

export default UploadBtn