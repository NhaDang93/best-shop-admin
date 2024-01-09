// ** React Imports
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cookies, CookiesKey, LanguageEnum } from 'src/utils';
// ** MUI Imports
import { PaletteMode } from '@mui/material';

// ** ThemeConfig Import
import themeConfig from '@/configs/themeConfig';

// ** Types Import
import { ContentWidth, Skin, ThemeColor } from '@/layouts/types';

export type Settings = {
  mode: PaletteMode;
  themeColor: ThemeColor;
  contentWidth: ContentWidth;
  language: LanguageEnum;
  layoutDetailWidth: number;
  skin: Skin;
  navCollapsed: boolean;
};

const LAYOUT_DETAIL_WIDTH = 1064;

export type SettingsContextValue = {
  settings: Settings;
  saveSettings: (updatedSettings: Settings) => void;
};

const initialSettings: Settings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  contentWidth: themeConfig.contentWidth,
  layoutDetailWidth: LAYOUT_DETAIL_WIDTH,
  language: LanguageEnum.en_US,
  skin:
    themeConfig.layout === 'horizontal' && themeConfig.skin === 'semi-dark'
      ? 'default'
      : themeConfig.skin,
  navCollapsed: themeConfig.navCollapsed,
};

// ** Create Context
export const SettingsContext = createContext<SettingsContextValue>({
  saveSettings: () => null,
  settings: initialSettings,
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  // ** State
  const [settings, setSettings] = useState<Settings>({ ...initialSettings });

  const { i18n } = useTranslation();

  const saveSettings = async (updatedSettings: Settings) => {
    if (updatedSettings?.language !== settings.language) {
      await Cookies.save(CookiesKey.LANGUAGE, updatedSettings?.language);
      // await i18n.changeLanguage(updatedSettings?.language);
    }
    setSettings(updatedSettings);
  };

  useEffect(() => {
    (async () => {
      const language = (await Cookies.load(
        CookiesKey.LANGUAGE
      )) as LanguageEnum;
      await saveSettings({
        ...settings,
        language: language ?? LanguageEnum.en_US,
      });
    })();
  }, []);

  const value = useMemo(
    () => ({ settings, saveSettings }),
    [settings, saveSettings]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;
