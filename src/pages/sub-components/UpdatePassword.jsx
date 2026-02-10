import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllUserErrors,
  getUser,
  resetUserSlice,
  updatePassword,
} from "@/store/slices/userSlice";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, ShieldAlert, Save, KeyRound } from "lucide-react";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(resetUserSlice());
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, loading, error, isUpdated, message]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="max-w-xl mx-auto bg-white border-slate-200 shadow-xl rounded-3xl overflow-hidden border-none text-black dark:text-white">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
          <div className="flex items-center gap-3 mb-2 text-indigo-600">
            <ShieldAlert className="w-6 h-6" />
            <CardTitle className="text-2xl font-bold text-slate-900">Security & Privacy</CardTitle>
          </div>
          <CardDescription>Secure your account by updating your current password.</CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Lock className="w-3 h-3" /> Current Password
              </Label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="h-12 bg-slate-50/50 border-slate-100 rounded-xl focus:ring-indigo-500 font-bold"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <KeyRound className="w-3 h-3" /> New Configuration
              </Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-12 bg-slate-50/50 border-slate-100 rounded-xl focus:ring-indigo-500 font-bold"
                placeholder="Enter new password"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Confirm Alignment</Label>
              <Input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="h-12 bg-slate-50/50 border-slate-100 rounded-xl focus:ring-indigo-500 font-bold"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            {loading ? (
              <SpecialLoadingButton content="Updating Security..." />
            ) : (
              <Button
                onClick={handleUpdatePassword}
                className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" /> Update Credentials
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatePassword;
