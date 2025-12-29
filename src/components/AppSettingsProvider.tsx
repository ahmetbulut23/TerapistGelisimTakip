'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
type Language = 'Türkçe' | 'English'

type AppSettingsContextType = {
    theme: Theme
    setTheme: (theme: Theme) => void
    language: Language
    setLanguage: (lang: Language) => void
}

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined)

export function AppSettingsProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light')
    const [language, setLanguage] = useState<Language>('Türkçe')
    const [mounted, setMounted] = useState(false)

    // Initialize from props or local storage would happen here in a real app
    // For now, we'll fetch from API on mount
    useEffect(() => {
        async function loadSettings() {
            try {
                const res = await fetch('/api/settings')
                if (res.ok) {
                    const data = await res.json()
                    if (data.preferences?.theme) setTheme(data.preferences.theme)
                    if (data.preferences?.language) setLanguage(data.preferences.language)
                }
            } catch (e) {
                console.error("Failed to load settings", e)
            }
            setMounted(true)
        }
        loadSettings()
    }, [])

    useEffect(() => {
        if (!mounted) return
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
        if (theme === 'dark') {
            root.style.colorScheme = 'dark'
        } else {
            root.style.colorScheme = 'light'
        }
    }, [theme, mounted])

    // Simple placeholder for language change - in real app would use i18n
    useEffect(() => {
        if (!mounted) return
        document.documentElement.lang = language === 'Türkçe' ? 'tr' : 'en'
    }, [language, mounted])

    return (
        <AppSettingsContext.Provider value={{ theme, setTheme, language, setLanguage }}>
            {children}
        </AppSettingsContext.Provider>
    )
}

export function useAppSettings() {
    const context = useContext(AppSettingsContext)
    if (context === undefined) {
        throw new Error('useAppSettings must be used within an AppSettingsProvider')
    }
    return context
}
