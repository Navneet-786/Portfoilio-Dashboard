import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Layers,
  Cpu,
  Info,
  MonitorCheck,
  Globe
} from "lucide-react";

const ViewProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(`http://localhost:4000/api/v1/project/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.project.title);
          setDescription(res.data.project.description);
          setStack(res.data.project.stack);
          setDeployed(res.data.project.deployed);
          setTechnologies(res.data.project.technologies);
          setGitRepoLink(res.data.project.gitRepoLink);
          setProjectLink(res.data.project.projectLink);
          setProjectBanner(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getProject();
  }, [id]);

  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => navigateTo("/");

  const descriptionList = description.split(". ");
  const technologiesList = technologies.split(", ");

  return (
    <div className="min-h-screen w-full bg-slate-50/50 pt-8 pb-20 px-4 sm:px-10 sm:pl-28">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-xl bg-white border border-slate-200" onClick={handleReturnToDashboard}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
              <p className="text-slate-500 font-medium">Detailed project overview and technical highlights.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to={gitRepoLink} target="_blank">
              <Button variant="outline" className="gap-2 rounded-xl border-slate-200 bg-white">
                <Github className="w-4 h-4" /> Code
              </Button>
            </Link>
            {deployed === "Yes" && (
              <Link to={projectLink} target="_blank">
                <Button className="gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-white border-slate-200 shadow-xl rounded-3xl overflow-hidden border-none text-black dark:text-white">
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                <img
                  src={projectBanner ? projectBanner : "/avatarHolder.jpg"}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 backdrop-blur text-slate-900 border-none px-3 py-1 font-bold shadow-sm">
                    {stack}
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden border-none p-8 text-black dark:text-white">
              <div className="flex items-center gap-2 mb-6 text-slate-800">
                <Info className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-bold">About Project</h2>
              </div>
              <div className="space-y-4">
                {descriptionList.map((item, index) => (
                  <p key={index} className="text-slate-600 leading-relaxed">
                    {item}{index < descriptionList.length - 1 ? "." : ""}
                  </p>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-8 text-black dark:text-white">
            <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden border-none">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-4">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-600" /> Tech Stack
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  {technologiesList.map((item, index) => (
                    <Badge key={index} variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200 rounded-lg px-3 py-1 text-xs font-bold transition-all">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden border-none">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-4">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <MonitorCheck className="w-4 h-4 text-emerald-600" /> Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                  <span className="text-sm font-bold text-slate-400">STATUS</span>
                  <span className={`text-xs font-black uppercase tracking-widest ${deployed === "Yes" ? "text-emerald-600" : "text-amber-500"}`}>
                    {deployed === "Yes" ? "Successfully Deployed" : "Development Phase"}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                  <span className="text-sm font-bold text-slate-400">STACK</span>
                  <span className="text-sm font-black text-slate-700">{stack}</span>
                </div>
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Repository</span>
                    <Link to={gitRepoLink} target="_blank" className="block p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-medium text-slate-600 truncate hover:text-indigo-600 transition-colors">
                      <div className="flex items-center gap-2">
                        <Github className="w-3 h-3" /> {gitRepoLink}
                      </div>
                    </Link>
                  </div>
                  {deployed === "Yes" && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live URL</span>
                      <Link to={projectLink} target="_blank" className="block p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs font-medium text-indigo-600 truncate hover:bg-indigo-50 transition-colors">
                        <div className="flex items-center gap-2">
                          <Globe className="w-3 h-3" /> {projectLink}
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
