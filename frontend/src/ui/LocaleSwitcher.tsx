import { useTranslation } from 'react-i18next'

export function LocaleSwitcher() {
  const { i18n } = useTranslation()
  const toggle = () => {
    const next = i18n.language.startsWith('en') ? 'ko' : 'en'
    i18n.changeLanguage(next)
    localStorage.setItem('locale', next)
  }
  return (
    <button onClick={toggle} className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary">{i18n.language.toUpperCase()}</button>
  )
}

