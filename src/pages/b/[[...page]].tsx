import { builder, BuilderComponent } from '@builder.io/react'

builder.init('fb69033bbea342819bfa342974dfe1c9')

const Page = (props: any) => {
  return (
    <div style={{ width: '100%' }}>
      <BuilderComponent model="page" />
    </div>
  )
}

export default Page

export async function getStaticProps({ params }: any) {
  const page =
    (await builder
      .get('page', {
        userAttributes: {
          urlPath: `/${params?.page?.join('/') || ''}`,
        },
      })
      .toPromise()) || null

  return {
    props: { page },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const pages = await builder.getAll('page', {
    options: { noTargeting: true },
  })

  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: true,
  }
}
