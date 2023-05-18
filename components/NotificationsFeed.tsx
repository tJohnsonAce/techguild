import useCurrentUser from '@/hooks/useCurrentUser'
import useNotifications from '@/hooks/useNotifications'
import { useEffect } from 'react'
import { FaPhoenixSquadron } from 'react-icons/fa'

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()
  const { data: fetchedNotifications = [] } =  useNotifications(currentUser?.id)

  useEffect(() => {
    mutateCurrentUser()
  }, [mutateCurrentUser])

  if (fetchedNotifications.length === 0) {
    return (
      <div className='text-neutral-500 text-center p-6 text-xl'>
        No notifications yet
      </div>
    )
  }
  return (
    <div className='flex flex-col'>
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div key={notification.id} className='flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800'>
          <FaPhoenixSquadron color='white' size={24} />
          <p className='text-white'>
            {notification.body}
          </p>
        </div>
      ))}
    </div>
  )
}

export default  NotificationsFeed

42226