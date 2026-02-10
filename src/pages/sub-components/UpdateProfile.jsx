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
  updateProfile,
} from "@/store/slices/userSlice";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  UserIcon,
  Mail,
  Phone,
  Globe,
  ImagePlus,
  Save,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Facebook
} from "lucide-react";

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );
  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
  const [portfolioURL, setPortfolioURL] = useState(user && user.portfolioURL);
  const [linkedInURL, setLinkedInURL] = useState(
    user && (user.linkedInURL === "undefined" ? "" : user.linkedInURL)
  );
  const [githubURL, setGithubURL] = useState(
    user && (user.githubURL === "undefined" ? "" : user.githubURL)
  );
  const [instagramURL, setInstagramURL] = useState(
    user && (user.instagramURL === "undefined" ? "" : user.instagramURL)
  );
  const [twitterURL, setTwitterURL] = useState(
    user && (user.twitterURL === "undefined" ? "" : user.twitterURL)
  );
  const [facebookURL, setFacebookURL] = useState(
    user && (user.facebookURL === "undefined" ? "" : user.facebookURL)
  );
  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState(
    user && user.avatar && user.avatar.url
  );
  const [resume, setResume] = useState(user && user.resume && user.resume.url);
  const [resumePreview, setResumePreview] = useState(
    user && user.resume && user.resume.url
  );

  const dispatch = useDispatch();

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };
  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioURL", portfolioURL);
    formData.append("linkedInURL", linkedInURL);
    formData.append("githubURL", githubURL);
    formData.append("instagramURL", instagramURL);
    formData.append("twitterURL", twitterURL);
    formData.append("facebookURL", facebookURL);
    formData.append("avatar", avatar);
    formData.append("resume", resume);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetUserSlice());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, loading, error, isUpdated, message]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="bg-white border-slate-200 shadow-xl rounded-3xl overflow-hidden border-none text-black dark:text-white">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
          <CardTitle className="text-2xl font-bold text-slate-900">Edit Portfolio Profile</CardTitle>
          <CardDescription>Update your personal brand details and professional assets.</CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-10">
          {/* MEDIA ASSETS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Profile Identity Avatar</Label>
              <div className="relative group/avatar w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl bg-slate-100 mx-auto transition-transform hover:scale-105">
                <img src={avatarPreview || "/avatarHolder.jpg"} className="w-full h-full object-cover" alt="Avatar" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer hover:bg-black/60">
                  <ImagePlus className="w-8 h-8 mb-1" />
                  <span className="text-[10px] font-bold uppercase">Update</span>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={avatarHandler} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Professional Resume Asset</Label>
              <div className="relative group/resume h-48 rounded-2xl overflow-hidden border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center transition-all hover:bg-slate-100 hover:border-indigo-300">
                {resumePreview ? (
                  <img src={resumePreview} className="w-full h-full object-cover grayscale-0 group-hover/resume:grayscale-[0.3] transition-all" alt="Resume" />
                ) : (
                  <div className="flex flex-col items-center text-slate-400 gap-2">
                    <ImagePlus className="w-8 h-8" />
                    <span className="text-xs font-bold uppercase">Upload Resume</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-indigo-600/40 opacity-0 group-hover/resume:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Button variant="secondary" className="bg-white text-indigo-600 font-bold rounded-xl pointer-events-none">
                    Change File
                  </Button>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={resumeHandler} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* CORE INFO */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Legal Name</Label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12 bg-slate-50/50 border-slate-100 rounded-xl focus:ring-indigo-500 font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Mail className="w-3 h-3" /> Email Address
                </Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-slate-50/50 border-slate-100 rounded-xl focus:ring-indigo-500 font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Phone className="w-3 h-3" /> Phone Number
                </Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 bg-slate-50/50 border-slate-100 rounded-xl focus:ring-indigo-500 font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Globe className="w-3 h-3" /> Portfolio URL
                </Label>
                <Input
                  value={portfolioURL}
                  onChange={(e) => setPortfolioURL(e.target.value)}
                  className="h-12 bg-slate-50/50 border-slate-100 rounded-xl focus:ring-indigo-500 font-bold"
                />
              </div>
            </div>

            {/* SOCIALS */}
            <div className="space-y-6 bg-slate-50/30 p-6 rounded-3xl border border-slate-100">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Github className="w-3 h-3" /> GitHub URL
                </Label>
                <Input
                  value={githubURL}
                  onChange={(e) => setGithubURL(e.target.value)}
                  className="h-10 bg-white border-slate-100 rounded-xl focus:ring-indigo-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Linkedin className="w-3 h-3 text-blue-700" /> LinkedIn URL
                </Label>
                <Input
                  value={linkedInURL}
                  onChange={(e) => setLinkedInURL(e.target.value)}
                  className="h-10 bg-white border-slate-100 rounded-xl focus:ring-indigo-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Instagram className="w-3 h-3 text-pink-600" /> Instagram
                </Label>
                <Input
                  value={instagramURL}
                  onChange={(e) => setInstagramURL(e.target.value)}
                  className="h-10 bg-white border-slate-100 rounded-xl focus:ring-indigo-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Twitter className="w-3 h-3" /> Twitter (X)
                </Label>
                <Input
                  value={twitterURL}
                  onChange={(e) => setTwitterURL(e.target.value)}
                  className="h-10 bg-white border-slate-100 rounded-xl focus:ring-indigo-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Facebook className="w-3 h-3 text-blue-600" /> Facebook
                </Label>
                <Input
                  value={facebookURL}
                  onChange={(e) => setFacebookURL(e.target.value)}
                  className="h-10 bg-white border-slate-100 rounded-xl focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Professional Narrative (About)</Label>
            <Textarea
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              className="min-h-[150px] bg-slate-50/50 border-slate-100 rounded-2xl focus:ring-indigo-500 p-4 leading-relaxed"
            />
          </div>

          <div className="flex justify-end pt-6 border-t border-slate-100">
            {loading ? (
              <SpecialLoadingButton content="Synchronizing..." />
            ) : (
              <Button
                onClick={handleUpdateProfile}
                className="h-14 px-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-95 transition-all flex items-center gap-2"
              >
                <Save className="w-5 h-5" /> Save Profile Changes
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateProfile;
