import Header from '@/components/Header'
import { useRouter } from 'next/router'
import useUser from '@/hooks/useUser'
import { ClipLoader } from 'react-spinners'

const UserView = () => {
  const router = useRouter()
  const { userId } = router.query

  const { data: fetchedUser, isLoading } = useUser(userId as string)

  if (isLoading || !fetchedUser) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='gray' size={70}/>
      </div>
    )
  }

  return (
    <>
      <Header showBackButton label={fetchedUser?.name} />
    </>
  )
}

export default UserView