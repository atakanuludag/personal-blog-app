// ** next
import { NextApiResponse, NextApiRequest } from 'next'

// ** config
import { REVALIDATE_SECRET } from '@/config'

// ? https://github.com/vercel/next.js/discussions/34567

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { secret, path } = req.query

  if (secret !== REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Geçersiz Token' })
  }

  if (path === '' || path === null || path === undefined) {
    return res.status(400).json({
      message:
        'Revalidate path eksik, lütfen cache yenilemek istediğiniz sayfa path i ekleyiniz. Full path belirtiniz. Örnek /teknik-servis/teknik-servis-urun-gonderimi/ ',
    })
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    //await Promise.all([res.revalidate(`/`), res.revalidate(`/page`)])
    await res.revalidate(path as string)
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
