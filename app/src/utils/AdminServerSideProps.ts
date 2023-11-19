// import { GetServerSideProps } from 'next/types'
// import Cookie from '@/utils/Cookie'
// import TokenModel from '@/models/TokenModel'

// // ** core
// import { COOKIE_NAMES } from '@/core/Constants'

// const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const { getCookie } = Cookie(req, res)
//   const auth: TokenModel | null = getCookie(COOKIE_NAMES.AUTH, true)
//   const redirectUrl = !req.url?.includes('login') ? req.url : null

//   if (auth) {
//     return {
//       props: {},
//     }
//   }

//   return {
//     redirect: {
//       permanent: false,
//       destination: `/admin/login${
//         redirectUrl ? `?redirectUrl=${redirectUrl}` : ''
//       }`,
//     },
//   }
// }

// export default getServerSideProps
