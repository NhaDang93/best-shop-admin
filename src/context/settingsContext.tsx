// ** React Imports
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

// ** MUI Imports
import { PaletteMode } from '@mui/material';

// ** ThemeConfig Import
import themeConfig from 'src/configs/themeConfig';

// ** Types Import
import { useTranslation } from 'react-i18next';
import { ContentWidth, ThemeColor } from 'src/layouts/types';
import { Cookies, CookiesKey, LanguageEnum } from 'src/utils';
import { LAYOUT_DETAIL_WIDTH } from 'src/utils/constants';

export type Settings = {
  mode: PaletteMode;
  themeColor: ThemeColor;
  contentWidth: ContentWidth;
  language: LanguageEnum;
  layoutDetailWidth: number;
};

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
      await i18n.changeLanguage(updatedSettings?.language);
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
        language: language ?? LanguageEnum.vi_VN,
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
