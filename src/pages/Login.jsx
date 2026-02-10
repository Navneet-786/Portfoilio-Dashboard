import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearAllUserErrors, login } from "@/store/slices/userSlice";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { LogIn, Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = () => {
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, error, loading, navigateTo]);

  return (
    <div className="relative w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 overflow-hidden bg-slate-50">
      {/* LEFT COLUMN: FORM */}
      <div className="relative z-10 min-h-[100vh] flex items-center justify-center py-12 px-6">
        <div className="mx-auto grid w-full max-w-[400px] gap-8 bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-slate-100">
          <div className="grid gap-3 text-center">
            <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-2">
              <LogIn className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
            <p className="text-slate-500 font-medium">
              Securely access your portfolio command center.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 pl-12 bg-slate-50 border-slate-100 focus:ring-indigo-500 rounded-xl font-medium"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between ml-1">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Security Key</Label>
                <Link
                  to="/password/forgot"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Forgot access?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pl-12 bg-slate-50 border-slate-100 focus:ring-indigo-500 rounded-xl font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {loading ? (
              <SpecialLoadingButton content={"Verifying..."} />
            ) : (
              <Button
                onClick={() => handleLogin()}
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
              >
                Authenticate
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: VISUAL */}
      <div className="hidden lg:flex relative items-center justify-center bg-indigo-600 overflow-hidden">
        <InteractiveGridPattern
          className="absolute inset-0 opacity-40 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
          width={40}
          height={40}
          numSquares={30}
          maxOpacity={0.5}
          duration={3}
          repeatDelay={1}
        />
        <div className="relative z-10 text-center px-12">
          <div className="inline-block p-4 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 mb-8 shadow-2xl">
            <img src="/login.png" alt="login" className="w-96 h-auto drop-shadow-2xl" />
          </div>
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Portfolio Command</h2>
          <p className="text-indigo-100 text-lg font-medium max-w-md mx-auto opacity-80 leading-relaxed">
            "Design is not just what it looks like and feels like. Design is how it works."
          </p>
        </div>

        {/* DECORATIVE ORBS */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-500 rounded-full blur-[100px] opacity-50" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-500 rounded-full blur-[100px] opacity-30" />
      </div>
    </div>
  );
};

export default Login;
