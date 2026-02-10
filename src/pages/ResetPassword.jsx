import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  resetPassword,
  clearAllForgotResetPassErrors,
} from "@/store/slices/forgotResetPasswordSlice";
import { getUser } from "@/store/slices/userSlice";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { toast } from "react-toastify";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { ShieldCheck, Lock, KeyRound } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleResetPassword = () => {
    dispatch(resetPassword(token, password, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotResetPassErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
    if (message !== null && message !== undefined) {
      toast.success(message);
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticated, error, loading, message, navigateTo]);

  return (
    <div className="relative w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 overflow-hidden bg-slate-50">
      <div className="relative z-10 min-h-[100vh] flex items-center justify-center py-12 px-6">
        <div className="mx-auto grid w-full max-w-[400px] gap-8 bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-slate-100">
          <div className="grid gap-3 text-center">
            <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-2">
              <ShieldCheck className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">New Credentials</h1>
            <p className="text-slate-500 font-medium">
              Please enter your new high-security password below.
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 pl-12 bg-slate-50 border-slate-100 focus:ring-indigo-500 rounded-xl font-medium"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Confirm Identity</Label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-12 pl-12 bg-slate-50 border-slate-100 focus:ring-indigo-500 rounded-xl font-medium"
                />
              </div>
            </div>

            {!loading ? (
              <Button
                onClick={() => handleResetPassword()}
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] mt-2"
              >
                Reset Credentials
              </Button>
            ) : (
              <SpecialLoadingButton content={"Finalizing..."} />
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: VISUAL */}
      <div className="hidden lg:flex relative items-center justify-center bg-indigo-900 overflow-hidden">
        <InteractiveGridPattern
          className="absolute inset-0 opacity-30 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
          width={40}
          height={40}
          numSquares={30}
          maxOpacity={0.5}
          duration={3}
          repeatDelay={1}
        />
        <div className="relative z-10 text-center px-12">
          <div className="inline-block p-4 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 mb-8 shadow-2xl">
            <img src="/reset.png" alt="reset" className="w-96 h-auto drop-shadow-2xl" />
          </div>
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Access Restored.</h2>
          <p className="text-indigo-200 text-lg font-medium max-w-md mx-auto leading-relaxed">
            "Small changes in security leads to big changes in privacy. Keep your credentials safe."
          </p>
        </div>

        {/* DECORATIVE ORBS */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-500 rounded-full blur-[100px] opacity-20" />
      </div>
    </div>
  );
};

export default ResetPassword;
