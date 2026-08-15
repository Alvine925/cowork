import { useEffect } from 'react'
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter'
import { Toaster } from 'sonner'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp'
import { BackToTop } from '@/components/layout/BackToTop'
import { SeoHead } from '@/components/seo/SeoHead'

import HomePage from '@/pages/home'
import AboutPage from '@/pages/about'
import ContactPage from '@/pages/contact'
import PricingPage from '@/pages/pricing'
import ServicesPage from '@/pages/services'
import LocationsPage from '@/pages/locations'
import IndustriesPage from '@/pages/industries'
import PartnersPage from '@/pages/partners'
import ResourcesPage from '@/pages/resources'
import CareersPage from '@/pages/careers'
import PrivacyPolicyPage from '@/pages/privacy-policy'
import TermsOfServicePage from '@/pages/terms-of-service'
import CookiePolicyPage from '@/pages/cookie-policy'
import RefundPolicyPage from '@/pages/refund-policy'
import NotFound from '@/pages/not-found'
import BlogPage from '@/pages/blog'
import BlogPostPage from '@/pages/blog-post'

// Service pages
import VirtualOfficePage from '@/pages/services/virtual-office'
import BusinessAddressPage from '@/pages/services/business-address'
import MailHandlingPage from '@/pages/services/mail-handling'
import MailForwardingPage from '@/pages/services/mail-forwarding'
import MeetingRoomsPage from '@/pages/services/meeting-rooms'
import HotDeskPage from '@/pages/services/hot-desk'
import DedicatedDeskPage from '@/pages/services/dedicated-desk'
import ReceptionServicesPage from '@/pages/services/reception-services'
import BusinessExpansionPage from '@/pages/services/business-expansion'
import CompanyRegistrationPage from '@/pages/services/company-registration'

// Location pages
import NairobiPage from '@/pages/locations/nairobi'
import MombasaPage from '@/pages/locations/mombasa'
import KisumuPage from '@/pages/locations/kisumu'
import NakuruPage from '@/pages/locations/nakuru'
import EldoretPage from '@/pages/locations/eldoret'

// Scroll to top on every route change
function ScrollToTop() {
  const [location] = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location])
  return null
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <SeoHead />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/pricing" component={PricingPage} />
        <Route path="/industries" component={IndustriesPage} />
        <Route path="/partners" component={PartnersPage} />
        <Route path="/resources" component={ResourcesPage} />
        <Route path="/careers" component={CareersPage} />
        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/terms-of-service" component={TermsOfServicePage} />
        <Route path="/cookie-policy" component={CookiePolicyPage} />
        <Route path="/refund-policy" component={RefundPolicyPage} />

        <Route path="/services" component={ServicesPage} />
        <Route path="/services/virtual-office" component={VirtualOfficePage} />
        <Route path="/services/business-address" component={BusinessAddressPage} />
        <Route path="/services/mail-handling" component={MailHandlingPage} />
        <Route path="/services/mail-forwarding" component={MailForwardingPage} />
        <Route path="/services/meeting-rooms" component={MeetingRoomsPage} />
        <Route path="/services/hot-desk" component={HotDeskPage} />
        <Route path="/services/dedicated-desk" component={DedicatedDeskPage} />
        <Route path="/services/reception-services" component={ReceptionServicesPage} />
        <Route path="/services/business-expansion" component={BusinessExpansionPage} />
        <Route path="/services/company-registration" component={CompanyRegistrationPage} />

        <Route path="/locations" component={LocationsPage} />
        <Route path="/locations/nairobi" component={NairobiPage} />
        <Route path="/locations/mombasa" component={MombasaPage} />
        <Route path="/locations/kisumu" component={KisumuPage} />
        <Route path="/locations/nakuru" component={NakuruPage} />
        <Route path="/locations/eldoret" component={EldoretPage} />

        <Route path="/blog" component={BlogPage} />
        <Route path="/blog/:slug" component={BlogPostPage} />

        <Route component={NotFound} />
      </Switch>
    </>
  )
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Router />
        </main>
        <Footer />
        <FloatingWhatsApp />
        <BackToTop />
      </div>
      <Toaster richColors position="top-right" />
    </WouterRouter>
  )
}

export default App
