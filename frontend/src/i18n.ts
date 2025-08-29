import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const saved = localStorage.getItem('locale') || 'en'

const resources = {
  en: {
    translation: {
      hero_title: 'Build delightful products with confidence',
      hero_sub: 'Clean, modern, and highly appealing web experiences.',
      cta_get_started: 'Get Started',
      cta_learn_more: 'Learn More'
    }
  },
  ko: {
    translation: {
      hero_title: '자신 있게 멋진 제품을 만드세요',
      hero_sub: '깔끔하고 현대적인 매력적인 웹 경험',
      cta_get_started: '시작하기',
      cta_learn_more: '자세히 보기'
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: saved,
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
})

export default i18n

