import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface Profile {
  id: number;
  uuid: string;
  name: string;
  advancements: Record<string, any>;
}

interface ProfileContextType {
  profile: Profile | null;
  loading: boolean;
  fetchProfile: () => Promise<void>;
  logout: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
);

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token in localStorage");
      setProfile(null); // Clear profile when logged out
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        "https://spatial-drawings-board-profession.trycloudflare.com/api/players/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API response:", response.data);
      setProfile(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Profile error:", error.response?.data);
      } else {
        console.error("Failed to fetch profile:", error);
      }
      setProfile(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setProfile(null);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        fetchProfile,
        logout,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }

  return context;
};