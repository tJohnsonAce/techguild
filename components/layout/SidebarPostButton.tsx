import React from 'react'
import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { IoCreateSharp } from 'react-icons/io5'

import useLoginModal from '@/hooks/useLoginModal'

const SidebarPostButton = () => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const onClick = useCallback(() => {
    loginModal.onOpen()
  }, [loginModal])

  return (
    <div onClick={onClick}>
      <div className='mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-cyan-950 hover:bg-opacity-80 transition cursor-pointer'>
        <IoCreateSharp size={24} color='white'/>
      </div>
      <div className='mt-6 hidden lg:block px-4 py-2 rounded-full bg-cyan-950 hover:bg-opacity-90 cursor-pointer transition'>
        <p className='hidden lg:block text-center font-semibold text-white text-[20px]'>
          Post
        </p>
      </div>
    </div>
  )
}

export default SidebarPostButton