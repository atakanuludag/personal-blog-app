import { GetServerSideProps } from 'next/types'
import Cookie from '@/utils/Cookie'
import TokenModel from '@/models/TokenModel'

const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { getCookie } = Cookie(req, res)
  const auth: TokenModel | null = getCookie('auth', true)
  //const auth = true
  //console.log('req.cookies', req.cookies)

  if (auth) {
    return {
      props: {},
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: '/admin/login',
    },
  }
}

export default getServerSideProps
