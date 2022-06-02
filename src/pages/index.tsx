import builder from '@builder.io/react'
import { NextSeo, SiteLinksSearchBoxJsonLd } from 'next-seo'

import BannerText from 'src/components/sections/BannerText'
import Hero from 'src/components/sections/Hero'
import IncentivesHeader from 'src/components/sections/Incentives/IncentivesHeader'
import IncentivesMock from 'src/components/sections/Incentives/incentivesMock'
import ProductShelf from 'src/components/sections/ProductShelf'
import { ITEMS_PER_SECTION } from 'src/constants'
import { mark } from 'src/sdk/tests/mark'

import storeConfig from '../../store.config'

builder.init('fb69033bbea342819bfa342974dfe1c9')

function Page() {
  return (
    <>
      {/* SEO */}
      <NextSeo
        title={storeConfig.seo.title}
        description={storeConfig.seo.description}
        titleTemplate={storeConfig.seo.titleTemplate}
        canonical={storeConfig.storeUrl}
        openGraph={{
          type: 'website',
          url: storeConfig.storeUrl,
          title: storeConfig.seo.title,
          description: storeConfig.seo.description,
        }}
      />
      <SiteLinksSearchBoxJsonLd
        url={storeConfig.storeUrl}
        potentialActions={[
          {
            target: `${storeConfig.storeUrl}/s/?q={search_term_string}`,
            queryInput: 'required name=search_term_string',
          },
        ]}
      />

      {/*
        WARNING: Do not import or render components from any
        other folder than '../components/sections' in here.

        This is necessary to keep the integration with the CMS
        easy and consistent, enabling the change and reorder
        of elements on this page.

        If needed, wrap your component in a <Section /> component
        (not the HTML tag) before rendering it here.
      */}
      <Hero
        title="New Offers"
        subtitle="At BaseStore you can shop the best tech of 2022. Enjoy and get 10% off on your first purchase."
        linkText="See all"
        link="/"
        imageSrc="https://storeframework.vtexassets.com/arquivos/ids/190897/Photo.jpg"
        imageAlt="Quest 2 Controller on a table"
      />

      <IncentivesHeader incentives={IncentivesMock} />

      <ProductShelf
        first={ITEMS_PER_SECTION}
        selectedFacets={[{ key: 'productClusterIds', value: '138' }]}
        title="Most Wanted"
      />

      {/* <ProductTiles
        first={3}
        selectedFacets={[{ key: 'productClusterIds', value: '141' }]}
        title="Just Arrived"
      /> */}

      <BannerText
        title="Receive our news and promotions in advance. Enjoy and get 10% off on your first purchase."
        actionPath="/"
        actionLabel="Call to action"
      />

      {/* <ProductShelf
        first={ITEMS_PER_SECTION}
        selectedFacets={[{ key: 'productClusterIds', value: '142' }]}
        title="Deals & Promotions"
      /> */}
    </>
  )
}

Page.displayName = 'Page'
export default mark(Page)
