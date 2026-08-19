import { Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate()
  return (
    <div className="login-page min-h-screen w-full inset-0 flex items-center justify-center text-white p-4">
      <div className="flex flex-col w-full max-w-md h-auto bg-(--panel-raised) border-(--border-light) border-3 rounded">
        
        {/* top section */}
        <div className="flex justify-center items-center gap-2 px-32 py-12">
          <div className="w-12.5 h-12.5 border">
            <img className="w-12.5 h-12.5"></img>
          </div>
          <h1 className="font-pixel font-extrabold text-[16px]">KRAZY</h1>
        </div>
        <div className="flex justify-center">
          <hr className="w-full text-(--border) border-2"></hr>
        </div>

        {/* username and password input */}
        <div className="w-full gap-4 p-8 flex font-body">
          <form className="w-full flex flex-col gap-4">
            <div className="flex w-full flex-col text-[12px] gap-2 ">
              <span className="text-(--text-muted) font-bold">USERNAME</span>
              <input className="font-body text-[14px] border h-12 border-(--border) bg-(--bg-deep) p-2"></input>
            </div>
            <div className="flex flex-col text-[12px] gap-2 ">
              <span className="text-(--text-muted) font-bold">PASSWORD</span>
              <input className="font-body text-[12px] border h-12 border-(--border) bg-(--bg-deep) p-2"></input>
            </div>
            <button onClick={() => navigate("/home")} className="text-[12px] bg-(--violet-dim) h-12">
              Login
            </button>
          </form>
        </div>

        {/* bottom section */}
        <div className="flex items-center justify-center">
          <hr className="w-[90%] text-(--border)"></hr>
        </div>
        <div className="flex flex-col gap-1.5 items-center justify-center ">
          <div className="flex justify-center items-center gap-1 px-2 py-6">
            <Wifi size={16} className="text-(--violet)" />
            <p className="text-[12px] font-body">
              124 players online right now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;