import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { BriefingProvider } from './context/BriefingContext'
import { ArticlePage, FormPageView, LegalPage, NotFound } from './pages/InfoPages'
import { Home } from './pages/Home'
import { ServicePage } from './pages/ServicePage'
import { TaxBrief } from './pages/TaxBrief'

export default function App() {
  return (
    <BrowserRouter>
      <BriefingProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services/:slug" element={<ServicePage />} />
            <Route path="tax-brief" element={<TaxBrief />} />
            <Route path="about" element={<ArticlePage id="about" />} />
            <Route path="vault" element={<ArticlePage id="vault" />} />
            <Route path="careers" element={<FormPageView id="careers" />} />
            <Route path="insights" element={<FormPageView id="insights" />} />
            <Route path="press" element={<FormPageView id="press" />} />
            <Route path="whistleblower" element={<FormPageView id="whistleblower" />} />
            <Route path="legal/:slug" element={<LegalPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BriefingProvider>
    </BrowserRouter>
  )
}
