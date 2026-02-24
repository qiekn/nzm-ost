import { createContext, useCallback, useContext, useState, type ReactNode } from "react"
import { zh } from "./zh"
import { en } from "./en"
import type { TranslationKey } from "./zh"

export type Lang = "zh" | "en"
const LANG_KEY = "nzm-ost-lang"
const dicts = { zh, en } as const

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: TranslationKey) => string
}

const LangContext = createContext<LangContextValue>(null!)

function loadLang(): Lang {
  try {
    const v = localStorage.getItem(LANG_KEY)
    if (v === "zh" || v === "en") return v
  } catch { /* ignore */ }
  return "zh"
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(loadLang)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try { localStorage.setItem(LANG_KEY, l) } catch { /* ignore */ }
  }, [])

  const t = useCallback((key: TranslationKey) => {
    return dicts[lang][key] ?? key
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
