import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Content, Download, Language, Profile } from "@/types/app";

interface AppState {
  language: Language | null;
  isOnboarded: boolean;
  isLoggedIn: boolean;
  isGuest: boolean;
  currentProfile: Profile | null;
  profiles: Profile[];
  myList: Content[];
  downloads: Download[];
  continueWatching: Content[];
}

interface AppContextType extends AppState {
  setLanguage: (lang: Language) => void;
  completeOnboarding: () => void;
  login: (isGuest?: boolean) => void;
  logout: () => void;
  selectProfile: (profile: Profile) => void;
  addProfile: (profile: Profile) => void;
  addToMyList: (content: Content) => void;
  removeFromMyList: (contentId: string) => void;
  addDownload: (download: Download) => void;
  removeDownload: (downloadId: string) => void;
  updateProgress: (contentId: string, progress: number) => void;
}

const defaultProfiles: Profile[] = [
  { id: "1", name: "Me", avatar: "👤", type: "adult" },
  { id: "2", name: "Kids", avatar: "👶", type: "kids" },
];

const STORAGE_KEY = "kalaignar_app_state";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : {
          language: null,
          isOnboarded: false,
          isLoggedIn: false,
          isGuest: false,
          currentProfile: null,
          profiles: defaultProfiles,
          myList: [],
          downloads: [],
          continueWatching: [],
        };
  });

  /* -------------------- PERSIST STATE -------------------- */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  /* -------------------- ACTIONS -------------------- */
  const setLanguage = (lang: Language) => {
    setState((prev) => ({ ...prev, language: lang }));
  };

  const completeOnboarding = () => {
    setState((prev) => ({ ...prev, isOnboarded: true }));
  };

  const login = (isGuest = false) => {
    setState((prev) => ({
      ...prev,
      isLoggedIn: true,
      isGuest,
    }));
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      language: null,
      isOnboarded: false,
      isLoggedIn: false,
      isGuest: false,
      currentProfile: null,
      profiles: defaultProfiles,
      myList: [],
      downloads: [],
      continueWatching: [],
    });
  };

  const selectProfile = (profile: Profile) => {
    setState((prev) => ({ ...prev, currentProfile: profile }));
  };

  const addProfile = (profile: Profile) => {
    setState((prev) => ({
      ...prev,
      profiles: [...prev.profiles, profile],
    }));
  };

  const addToMyList = (content: Content) => {
    setState((prev) => {
      if (prev.myList.some((c) => c.id === content.id)) return prev;
      return { ...prev, myList: [...prev.myList, content] };
    });
  };

  const removeFromMyList = (contentId: string) => {
    setState((prev) => ({
      ...prev,
      myList: prev.myList.filter((c) => c.id !== contentId),
    }));
  };

  const addDownload = (download: Download) => {
    setState((prev) => ({
      ...prev,
      downloads: [...prev.downloads, download],
    }));
  };

  const removeDownload = (downloadId: string) => {
    setState((prev) => ({
      ...prev,
      downloads: prev.downloads.filter((d) => d.id !== downloadId),
    }));
  };

  const updateProgress = (contentId: string, progress: number) => {
    setState((prev) => {
      const exists = prev.continueWatching.find((c) => c.id === contentId);
      if (exists) {
        return {
          ...prev,
          continueWatching: prev.continueWatching.map((c) =>
            c.id === contentId ? { ...c, progress } : c
          ),
        };
      }
      return prev;
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setLanguage,
        completeOnboarding,
        login,
        logout,
        selectProfile,
        addProfile,
        addToMyList,
        removeFromMyList,
        addDownload,
        removeDownload,
        updateProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
