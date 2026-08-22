const Footer = () => {
  return (
    <div className="w-full h-auto bg-(--bg) border-t border-(--border-light) bottom-0">
      <div className="flex flex-col">
        <div className="text-white flex h-full w-full justify-between p-4">
          <div className="flex items-center">
            <div className="w-10 h-10">
              <img></img>
            </div>
            <div className="">
              <h1 className="font-pixel text-[13px]">KRAZY</h1>
              <p className="font-body text-[12px]">A Multiplayer Survival</p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-(--text-muted) font-pixel text-[9px]">Site</span>
              <div className="text-[13px] flex gap-2 flex-col text(--text-dim)">
                <p>About</p>
                <p>Rules</p>
                <p>Contact</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-(--text-muted) font-pixel text-[9px]">Legal</span>
              <div className="text-[13px] flex gap-2 flex-col text(--text-dim)">
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-(--text-muted) font-pixel text-[9px]">Social</span>
              <div className="text-[13px] flex gap-2 flex-col text(--text-dim)">
                <p>Discord</p>
                <p>Youtube</p>
                <p>Tiktok</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 font-mono text-[12px]">
          <span className="text-white">© 2026 Krazy. Not affiliated with Mojang or Microsoft.</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
