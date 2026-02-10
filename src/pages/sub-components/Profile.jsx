import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Mail, Phone, Globe, Github, Linkedin, Instagram, Twitter, Facebook, ExternalLink, FileText } from "lucide-react";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* PROFILE IMAGES CARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden border-none">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-4">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-slate-800">
              <User className="w-4 h-4 text-indigo-600" /> Identity Image
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative group rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
              <img
                src={user?.avatar?.url}
                alt="Profile"
                className="w-full h-80 object-cover grayscale-0 group-hover:grayscale-[0.5] transition-all duration-500"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden border-none">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-4">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-slate-800">
              <FileText className="w-4 h-4 text-purple-600" /> Professional Resume
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Link to={user?.resume?.url} target="_blank">
              <div className="relative group rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
                <img
                  src={user?.resume?.url}
                  alt="Resume"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-indigo-600/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-indigo-600 px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow-xl">
                    <ExternalLink className="w-4 h-4" /> View Full Resume
                  </span>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* BASIC INFORMATION */}
      <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden border-none text-black dark:text-white">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
          <CardTitle className="text-xl font-bold text-slate-800">Core Information</CardTitle>
          <CardDescription>Primary contact details and portfolio identity.</CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                Full Name
              </Label>
              <Input
                disabled
                defaultValue={user?.fullName}
                className="h-12 bg-slate-50/50 border-slate-100 text-slate-800 font-bold focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Mail className="w-3 h-3" /> Professional Email
              </Label>
              <Input
                disabled
                defaultValue={user?.email}
                className="h-12 bg-slate-50/50 border-slate-100 text-slate-800 font-bold"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Phone className="w-3 h-3" /> Contact Phone
              </Label>
              <Input
                disabled
                defaultValue={user?.phone}
                className="h-12 bg-slate-50/50 border-slate-100 text-slate-800 font-bold"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Globe className="w-3 h-3" /> Portfolio Ecosystem
              </Label>
              <Input
                disabled
                defaultValue={user?.portfolioURL}
                className="h-12 bg-slate-50/50 border-slate-100 text-slate-800 font-bold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Professional Narrative (About)</Label>
            <Textarea
              disabled
              defaultValue={user?.aboutMe}
              className="h-12 bg-slate-50/50 border-slate-100 text-slate-600 font-medium leading-relaxed min-h-[120px] p-4"
            />
          </div>
        </CardContent>
      </Card>

      {/* SOCIAL LINKS */}
      <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden border-none text-black dark:text-white">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8 px-6 py-4">
          <CardTitle className="text-base font-bold text-slate-800">Connected Platforms</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "GitHub", val: user?.githubURL, icon: Github, color: "text-slate-900" },
              { label: "LinkedIn", val: user?.linkedInURL, icon: Linkedin, color: "text-blue-700" },
              { label: "Instagram", val: user?.instagramURL, icon: Instagram, color: "text-pink-600" },
              { label: "Twitter (X)", val: user?.twitterURL, icon: Twitter, color: "text-slate-900" },
              { label: "Facebook", val: user?.facebookURL, icon: Facebook, color: "text-blue-600" }
            ].map((social, idx) => (
              <div key={idx} className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <social.icon className={`w-3 h-3 ${social.color}`} /> {social.label}
                </Label>
                <Input
                  disabled
                  defaultValue={social.val || "Not provided"}
                  className="h-10 bg-white border-slate-100 text-xs text-slate-600 truncate"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
