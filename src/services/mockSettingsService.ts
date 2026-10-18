export interface UserSettings {
  theme: 'light' | 'system';
  defaultDataset: string;
  preferredResultView: 'chart' | 'table';
  defaultChartType: 'bar' | 'line';
  historyPersistenceEnabled: boolean;
  maxHistoryItems: number;
  autoFormatSql: boolean;
}

export const DEFAULT_SETTINGS: UserSettings = {
  theme: 'light',
  defaultDataset: 'sales',
  preferredResultView: 'chart',
  defaultChartType: 'bar',
  historyPersistenceEnabled: true,
  maxHistoryItems: 50,
  autoFormatSql: true
};

const SETTINGS_KEY = 'datamind_user_settings_v1';

export class MockSettingsService {
  public static getSettings(): UserSettings {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch {
      // ignore
    }
    return DEFAULT_SETTINGS;
  }

  public static saveSettings(settings: UserSettings): void {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }

  public static resetSettings(): UserSettings {
    try {
      localStorage.removeItem(SETTINGS_KEY);
    } catch {
      // ignore
    }
    return DEFAULT_SETTINGS;
  }
}
