import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type PlayersContext = {
  online: number;
  max: number;
};

interface TotalPlayerContextType {
  players: PlayersContext;
}

const TotalPlayerContext = createContext<TotalPlayerContextType | null>(null);

export const TotalPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<PlayersContext>({
    online: 0,
    max: 0,
  });

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const response = await fetch(
          "https://fruit-wizard-aluminium-relations.trycloudflare.com/api/server/players",
        );

        if (!response.ok) {
          throw new Error("Failed to get server status");
        }

        const data = await response.json();

        if(data.online_players === 0){
          data.online_players = 0
        }

        setPlayers({
        online: data.online_players,
        max: data.max_players,
        });
        console.log(data);
      } catch (error) {
        console.error("Failed to get Minecraft player count:", error);
      }
    };

    getPlayers();
  }, []);

  return (
    <TotalPlayerContext.Provider value={{ players }}>
      {children}
    </TotalPlayerContext.Provider>
  );
};

export const useTotalServerPlayers = () => {
  const context = useContext(TotalPlayerContext);

  if (!context) {
    throw new Error(
      "No TotalPlayerContext Provider",
    );
  }

  return context;
};
