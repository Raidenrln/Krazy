import Topbar from "../components/Topbar";
import { FaPlay, FaDiscord } from "react-icons/fa";
import { useTotalServerPlayers } from "../context/TotalPlayersContext";

const Home = () => {
  const { players } = useTotalServerPlayers();

  return (
    <div className="min-h-screen relative">
      <Topbar />

      <div className="w-full p-6 lg:p-9 flex flex-col items-center pt-24 lg:pt-9 gap-4">
        <div className="flex w-full gap-2">
          <div className="bg-(--bg) h-auto border border-(--border) w-full">
            <div className="w-full max-w-140 p-4 flex flex-col gap-3 px-5 py-10">
              {/* player Status */}
              <div className="inline-flex w-fit items-center px-6 py-2 bg-(--bg-deep) font-pixel text-[10px] text-(--violet) border border-(--violet) gap-2">
                <span>•</span>
                <span>
                  {players.online === 1
                    ? `${players.online} PLAYER ONLINE`
                    : `${players.online} PLAYERS ONLINE`}
                </span>
              </div>

              {/* main text */}
              <div className="text-white font-pixel text-[26px] lg:text-[28px] leading-snug flex flex-col font-extrabold">
                <span>Join the KRAZYSMP Today!</span>
                <span></span>
              </div>
              <div className="text-stone-300 font-mono text-[15px]">
                <p>
                  Multiplayer survival keeps running whether you're online or
                  not.
                </p>
              </div>

              {/* buttons */}
              <div className="flex font-pixel gap-2.5 text-[12px]">
                <button className="bg-(--violet) border px-3.5 py-5.5 flex items-center justify-center gap-2 w-full xs:w-auto">
                  <FaPlay size={16} /> Join now
                </button>
                <button className="text-white border px-3.5 py-5.5 flex items-center justify-center gap-2 w-full xs:w-auto">
                  <FaDiscord size={16} /> Discord
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full max-lg:hidden">
            {/* event card */}
            <div className="text-white w-full bg-(--bg) border border-(--border-light)">
              <div className="font-pixel border-b border-(--border-light) p-4 text-[14px]">
                <span>EVENTS</span>
              </div>
              <div className="flex flex-col p-4 font-mono">
                <div className="[18px] font-bold mb-2">
                  <span>Season 1 PVP community</span>
                </div>
                <div className="flex justify-between text-[16px]">
                  <span className="text-(--text-muted)">Starts in</span>
                  <span className="text-(--violet)">2 Days</span>
                </div>
                <div className="flex justify-between text-[16px]">
                  <span className="text-(--text-muted)">Prize Pool</span>
                  <span className="text-(--violet)">50000 Shards</span>
                </div>
              </div>
            </div>

            {/* Community Post */}
            <div className="text-white bg-(--bg) w-full border border-(--border-light)">
              <div className="font-pixel text-[14px] p-4 border-b border-(--border-light)">
                <span>Community Posts</span>
              </div>
              <div className="p-4">
                <div className="font-mono pb-4 border-b border-(--border-light) text-[15px]">
                  <h1 className="text-(--violet) wrap-break-word">
                    Posted by Roluna
                  </h1>
                  <h2>Title: Need Help</h2>
                  <p className="wrap-break-word">
                    - ANONG MAGANDANG FARM SA MINECRAFT????????
                  </p>
                  <p className="text-(--text-dim)">View more →</p>
                </div>
              </div>
              <div>
                <div className="font-mono pb-4 px-4 text-[15px]">
                  <h1 className="text-(--violet) wrap-break-word">
                    Posted by Raiden
                  </h1>
                  <h2>Title: Need Help</h2>
                  <p className="text-(--text) wrap-break-word">
                    - 2+2=4 hmmm depende kung 3 yan kasi kung 3 edi 5,
                    SYEMPREEEEEE
                  </p>
                  <p className="text-(--text-dim)">View more →</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(500px,1fr))] w-full gap-4 items-start">
          <div className="flex gap-4">
            {/* server Status */}
            <div className="w-full border border-(--border-light) text-white bg-(--bg)">
              <div className="flex justify-between border-b border-(--border-light) p-4 text-[13px]">
                <span className="font-pixel">Server Status</span>
                <span className="font-pixel text-(--redstone)">• LIVE</span>
              </div>
              <div className="w-full flex justify-between text-center font-mono text-[13px]">
                <div className="flex w-full flex-col border-r border-(--border-light) p-2">
                  <span>{`${players.online} / ${players.max}`}</span>
                  <span className="[14px] text-(--text-muted)">Players</span>
                </div>
                <div className="w-full flex flex-col p-2">
                  <span>1.21.11 - 26.2</span>
                  <span className="text-(--text-muted)">VERSION</span>
                </div>
                <div className="w-full flex flex-col border-l border-(--border-light) p-2">
                  <span>1D</span>
                  <span className="text-[14px] text-(--text-muted)">
                    UPTIME
                  </span>
                </div>
              </div>
            </div>
            {/* Update Post */}
            <div className="text-white w-full bg-(--bg) border border-(--border-light) h-auto">
              <div className="font-pixel border-b border-(--border-light) p-4 text-[14px]">
                <span>UPDATES</span>
              </div>
              <div>
                <div className="flex flex-col font-mono text-[14px] p-4 gap-2">
                  <span>VERSION 1.0.0</span>
                  <p>Posted 2 hours ago</p>
                  <p className="text-(--text-muted) font-extrabold">
                    Read more →
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:hidden">
            {/* event card */}
            <div className="text-white w-full bg-(--bg) border border-(--border-light) lg:hidden">
              <div className="font-pixel border-b border-(--border-light) p-4 text-[14px]">
                <span>EVENTS</span>
              </div>
              <div className="flex flex-col p-4 font-mono">
                <div className="[18px] font-bold mb-2">
                  <span>Season 1 PVP community</span>
                </div>
                <div className="flex justify-between text-[16px]">
                  <span className="text-(--text-muted)">Starts in</span>
                  <span className="text-(--violet)">2 Days</span>
                </div>
                <div className="flex justify-between text-[16px]">
                  <span className="text-(--text-muted)">Prize Pool</span>
                  <span className="text-(--violet)">50000 Shards</span>
                </div>
              </div>
            </div>

            {/* community post */}
            <div className="text-white bg-(--bg) w-full border border-(--border-light)">
              <div className="font-pixel text-[14px] p-4 border-b border-(--border-light)">
                <span>Community Posts</span>
              </div>
              <div className="p-4">
                <div className="font-mono pb-4 border-b border-(--border-light) text-[15px]">
                  <h1 className="text-(--violet) wrap-break-word">
                    Posted by Roluna
                  </h1>
                  <h2>Title: Need Help</h2>
                  <p className="wrap-break-word">
                    - ANONG MAGANDANG FARM SA MINECRAFT????????
                  </p>
                  <p className="text-(--text-dim)">View more →</p>
                </div>
              </div>
              <div>
                <div className="font-mono pb-4 px-4 text-[15px]">
                  <h1 className="text-(--violet) wrap-break-word">
                    Posted by Raiden
                  </h1>
                  <h2>Title: Need Help</h2>
                  <p className="text-(--text) wrap-break-word">
                    - 2+2=4 hmmm depende kung 3 yan kasi kung 3 edi 5,
                    SYEMPREEEEEE
                  </p>
                  <p className="text-(--text-dim)">View more →</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
