import { BsHouseFill, BsBellFill, BsPersonFill } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'
import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import SidebarPostButton from './SidebarPostButton'
import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser()
  const icons = [
    {
      label: 'Home',
      href: '/',
      icon: BsHouseFill
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: BsBellFill,
      auth: true,
      alert: currentUser?.hasNotification
    },
    {
      label: 'Profile',
      href: `/users/${currentUser?.id}`,
      icon: BsPersonFill,
      auth: true
    },
  ]

  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
      <div className='flex flex-col items-end'>
        <div className='space-y-2 lg:w-[230px]'>
          <SidebarLogo />
          {icons.map((icon) => (
            <SidebarItem 
              key={icon.href}
              href={icon.href}
              label={icon.label}
              icon={icon.icon}
              auth={icon.auth}
              alert={icon.alert}
            />
          ))}
          {currentUser && (<SidebarItem onClick={() => signOut()} icon={BiLogOut} label='Logout'/>
          )}
          <SidebarPostButton />
        </div>
      </div>
    </div>
  )
}

export default Sidebar

24820