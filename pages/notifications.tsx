import Header from '@/components/Header'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import NotificationsFeed from '@/components/NotificationsFeed'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

const notifications = () => {
  return (
    <>
      <Header label='Notifications' showBackButton/>
      <NotificationsFeed />
    </>
  )
}

export default notifications