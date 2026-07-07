import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import api from '../services/api';
import {
  MENU_ITEMS,
  menuSettingKey,
  getDefaultMenuVisibility,
  buildNavLinks,
  isMenuVisible as checkMenuVisible,
} from '../utils/menuConfig';

const SiteSettingsContext = createContext();

const parseMenuVisibility = (settings = {}) => {
  const visibility = getDefaultMenuVisibility();
  MENU_ITEMS.forEach(item => {
    const raw = settings[menuSettingKey(item.id)];
    if (raw !== undefined && raw !== null) {
      visibility[item.id] = raw === true || raw === 'true';
    }
  });
  return visibility;
};

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({});
  const [menuVisibility, setMenuVisibility] = useState(getDefaultMenuVisibility);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await api.get('/settings/public');
      const data = res.data?.data || {};
      setSettings(data);
      setMenuVisibility(parseMenuVisibility(data));
    } catch {
      setMenuVisibility(getDefaultMenuVisibility());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const navLinks = useMemo(() => buildNavLinks(menuVisibility), [menuVisibility]);

  const isMenuVisible = useCallback(
    id => checkMenuVisible(menuVisibility, id),
    [menuVisibility]
  );

  return (
    <SiteSettingsContext.Provider
      value={{ settings, menuVisibility, navLinks, isMenuVisible, loading, refreshSettings: fetchSettings }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);
