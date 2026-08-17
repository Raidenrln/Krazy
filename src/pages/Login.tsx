import { Wifi } from "lucide-react";
const Login = () => {
  return (
    <div className="login-page h-screen w-screen inset-0 flex items-center justify-center text-white">
      <div className="flex flex-col w-75 h-auto bg-(--panel-raised) border-(--border-light) border rounded">
        
        {/* top section */}
        <div className="flex justify-center items-center gap-2 px-2 py-4 ">
          <div className="w-12.5 h-12.5">
            <img className="w-full h-full"></img>
          </div>
          <h1 className="font-pixel font-extrabold text-[12px]">KRAZY</h1>
        </div>
        <div className="flex justify-center">
          <hr className="w-full text-(--border)"></hr>
        </div>

        {/* username and password input */}
        <div className="w-full gap-4 px-4 py-6 flex font-pixel">
          <form className="w-full flex flex-col gap-4">
            <div className="flex w-full flex-col text-[8px] gap-2">
              <span className="text-(--text-muted)">USERNAME</span>
              <input className="font-body text-[12px] border h-10 border-(--border) bg-(--bg-deep) p-2"></input>
            </div>
            <div className="flex flex-col text-[8px] gap-2">
              <span className="text-(--text-muted)">PASSWORD</span>
              <input className="font-body text-[12px] border h-10 border-(--border) bg-(--bg-deep) p-2"></input>
            </div>
            <button className="text-[12px] bg-(--violet-dim) h-12">
              Login
            </button>
          </form>
        </div>

        {/* bottom section */}
        <div className="flex items-center justify-center">
          <hr className="w-[90%] text-(--border)"></hr>
        </div>
        <div className="flex flex-col gap-1.5 items-center justify-center ">
          <div className="flex justify-center items-center gap-1 px-2 py-4">
            <Wifi size={16} className="text-(--violet)" />
            <p className="text-[11px] font-body">
              124 players online right now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
