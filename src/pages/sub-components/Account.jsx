import React, { useState } from "react";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";
import { Button } from "@/components/ui/button";
import { User, Settings, ShieldCheck, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile");
  const navigateTo = useNavigate();

  const handleReturnToDashboard = () => navigateTo("/");

  return (
    <div className="min-h-screen w-full bg-slate-50/50 pt-8 pb-20 px-4 sm:px-10 sm:pl-28">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-xl bg-white border border-slate-200" onClick={handleReturnToDashboard}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
              <p className="text-slate-500 font-medium">Manage your professional identity and security.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* NAVIGATION SIDEBAR */}
          <div className="lg:col-span-1 space-y-2">
            <Button
              variant={selectedComponent === "Profile" ? "default" : "ghost"}
              className={`w-full justify-start h-12 rounded-xl gap-3 font-bold transition-all ${selectedComponent === "Profile"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "text-slate-600 hover:bg-white hover:text-indigo-600"
                }`}
              onClick={() => setSelectedComponent("Profile")}
            >
              <User className="w-4 h-4" /> Profile Overview
            </Button>
            <Button
              variant={selectedComponent === "Update Profile" ? "default" : "ghost"}
              className={`w-full justify-start h-12 rounded-xl gap-3 font-bold transition-all ${selectedComponent === "Update Profile"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "text-slate-600 hover:bg-white hover:text-indigo-600"
                }`}
              onClick={() => setSelectedComponent("Update Profile")}
            >
              <Settings className="w-4 h-4" /> Edit Profile
            </Button>
            <Button
              variant={selectedComponent === "Update Password" ? "default" : "ghost"}
              className={`w-full justify-start h-12 rounded-xl gap-3 font-bold transition-all ${selectedComponent === "Update Password"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "text-slate-600 hover:bg-white hover:text-indigo-600"
                }`}
              onClick={() => setSelectedComponent("Update Password")}
            >
              <ShieldCheck className="w-4 h-4" /> Security
            </Button>
          </div>

          {/* CONTENT AREA */}
          <div className="lg:col-span-3">
            {(() => {
              switch (selectedComponent) {
                case "Profile":
                  return <Profile />;
                case "Update Profile":
                  return <UpdateProfile />;
                case "Update Password":
                  return <UpdatePassword />;
                default:
                  return <Profile />;
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
