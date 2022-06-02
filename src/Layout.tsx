import { lazy, Suspense, useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'
import builder, { BuilderComponent } from '@builder.io/react'
import { useCart } from '@faststore/sdk'

import Alert from 'src/components/common/Alert'
import Footer from 'src/components/common/Footer'
import Navbar from 'src/components/common/Navbar'
import Toast from 'src/components/common/Toast'
import RegionalizationBar from 'src/components/regionalization/RegionalizationBar'
import RegionalizationModal from 'src/components/regionalization/RegionalizationModal'
import { useUI } from 'src/sdk/ui'
import { useModal } from 'src/sdk/ui/modal/Provider'

const CartSidebar = lazy(() => import('src/components/cart/CartSidebar'))

function Layout({ children }: PropsWithChildren<unknown>) {
  const [announcement, setAnnouncement] = useState()
  const { displayMinicart } = useUI()
  const { isRegionalizationModalOpen, setIsRegionalizationModalOpen } =
    useModal()

  const cart = useCart()

  useEffect(() => {
    console.log('cart changes', cart.items)
    async function fetchContent() {
      const itemsIds = cart.items.map((item) => item.id)

      const anouncementContent = await builder
        .get('announcement-bar', {
          cacheSeconds: 120,
          userAttributes: {
            cartItems: itemsIds.map((item: string) => item),
          } as any,
        })
        .toPromise()

      setAnnouncement(anouncementContent)
    }

    fetchContent()
  }, [cart.items])

  return (
    <>
      <div id="layout">
        <Alert>
          {/* Get 10% off today:&nbsp;<span>NEW10</span> */}
          <BuilderComponent model="announcement-bar" content={announcement} />
        </Alert>

        <Navbar />

        <main>
          <RegionalizationBar classes="display-mobile" />
          {children}
        </main>

        <Footer />

        <Toast />

        {displayMinicart && (
          <Suspense fallback={null}>
            <CartSidebar />
          </Suspense>
        )}
      </div>
      <RegionalizationModal
        isOpen={isRegionalizationModalOpen}
        onDismiss={() => setIsRegionalizationModalOpen(false)}
      />
    </>
  )
}

export default Layout
