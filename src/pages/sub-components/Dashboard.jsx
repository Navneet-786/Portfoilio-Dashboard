import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { clearAllSkillErrors } from "@/store/slices/skillSlice";
import {
  clearAllSoftwareAppErrors,
  deleteSoftwareApplication,
  getAllSoftwareApplications,
  resetSoftwareApplicationSlice,
} from "@/store/slices/softwareApplicationSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { clearAllTimelineErrors } from "@/store/slices/timelineSlice";
import { clearAllProjectErrors } from "@/store/slices/projectSlice";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import {
  Projector,
  Cpu,
  History,
  Layers,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  BarChart,
  PieChart as PieChartIcon,
  Trash2
} from "lucide-react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  const navigateTo = useNavigate();
  const gotoMangeSkills = () => navigateTo("/manage/skills");
  const gotoMangeTimeline = () => navigateTo("/manage/timeline");
  const gotoMangeProjects = () => navigateTo("/manage/projects");

  const { user } = useSelector((state) => state.user);
  const { skills, error: skillError } = useSelector((state) => state.skill);
  const {
    softwareApplications,
    loading: appLoading,
    error: appError,
    message: appMessage,
  } = useSelector((state) => state.softwareApplications);
  const { timeline, error: timelineError } = useSelector((state) => state.timeline);
  const { projects, error: projectError } = useSelector((state) => state.project);

  const [appId, setAppId] = useState(null);
  const dispatch = useDispatch();

  const handleDeleteSoftwareApp = (id) => {
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  };

  useEffect(() => {
    if (skillError) {
      toast.error(skillError);
      dispatch(clearAllSkillErrors());
    }
    if (appError) {
      toast.error(appError);
      dispatch(clearAllSoftwareAppErrors());
    }
    if (projectError) {
      toast.error(projectError);
      dispatch(clearAllProjectErrors());
    }
    if (appMessage) {
      toast.success(appMessage);
      setAppId(null);
      dispatch(resetSoftwareApplicationSlice());
      dispatch(getAllSoftwareApplications());
    }
    if (timelineError) {
      toast.error(timelineError);
      dispatch(clearAllTimelineErrors());
    }
  }, [dispatch, skillError, appError, projectError, appMessage, timelineError]);

  // Data for Charts
  const stackData = projects ? projects.reduce((acc, proj) => {
    const stack = proj.stack || "Other";
    const existing = acc.find(item => item.name === stack);
    if (existing) existing.value += 1;
    else acc.push({ name: stack, value: 1 });
    return acc;
  }, []) : [];

  const COLORS = ['#4f46e5', '#8b5cf6', '#ec4899', '#f97316', '#10b981'];

  return (
    <div className="relative min-h-screen w-full bg-slate-50/50 pt-8 pb-20 px-4 sm:px-10 sm:pl-28 overflow-hidden">
      <InteractiveGridPattern className="opacity-40" />

      <div className="relative z-10 space-y-10 max-w-7xl mx-auto">
        {/* TOP STATS BENTO GRID */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" /> Platform Insights
            </h2>
          </div>
          <BentoGrid>
            <BentoGridItem
              title="Total Projects"
              description="Published works in portfolio"
              header={<div className="text-4xl font-black text-slate-900">{projects?.length || 0}</div>}
              icon={<Projector className="w-12 h-12 text-indigo-500" />}
              className="md:col-span-1"
              onClick={gotoMangeProjects}
            />
            <BentoGridItem
              title="Technical Skills"
              description="Core competencies listed"
              header={<div className="text-4xl font-black text-slate-900">{skills?.length || 0}</div>}
              icon={<Cpu className="w-12 h-12 text-purple-500" />}
              className="md:col-span-1"
              onClick={gotoMangeSkills}
            />
            <BentoGridItem
              title="Career Milestones"
              description="Timeline entries recorded"
              header={<div className="text-4xl font-black text-slate-900">{timeline?.length || 0}</div>}
              icon={<History className="w-12 h-12 text-emerald-500" />}
              className="md:col-span-1"
              onClick={gotoMangeTimeline}
            />
            <BentoGridItem
              title="Active Profile"
              description={user?.fullName || "Portfolio Owner"}
              header={
                <div className="flex -space-x-2">
                  <img src={user?.avatar?.url} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="U" />
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-white shadow-sm text-indigo-600 font-bold text-xs uppercase">
                    {user?.fullName?.charAt(0)}
                  </div>
                </div>
              }
              icon={<Layers className="w-12 h-12 text-orange-500" />}
              className="md:col-span-1"
            />
          </BentoGrid>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* PROJECTS VISUALIZATION */}
          <Card className="lg:col-span-2 bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 bg-slate-50/50 pb-4">
              <div>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <BarChart className="w-4 h-4 text-indigo-600" /> Projects Distribution
                </CardTitle>
                <CardDescription>Breakdown by technology stack</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white text-slate-400">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="pt-8 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={stackData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <ReTooltip
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={40} />
                </ReBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="border-b border-slate-50 bg-slate-50/50">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-purple-600" /> Stack Ratio
              </CardTitle>
              <CardDescription>Overview of project tech types</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stackData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stackData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ReTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-slate-900">{projects?.length || 0}</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Total</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PROJECTS TABLE MODERN */}
        <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 bg-slate-50/50 px-8 py-6">
            <div>
              <CardTitle className="text-xl font-bold">Recent Projects</CardTitle>
              <CardDescription>Management overview of latest entries</CardDescription>
            </div>
            <Button variant="outline" className="rounded-xl border-slate-200 gap-2" onClick={gotoMangeProjects}>
              Full View <ChevronRight className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="pl-8 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Project</TableHead>
                  <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Stack</TableHead>
                  <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Status</TableHead>
                  <TableHead className="text-right pr-8 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects && projects.length > 0 ? (
                  projects.slice(0, 5).map((element) => (
                    <TableRow key={element._id} className="border-slate-50 hover:bg-slate-50/50 transition-colors group">
                      <TableCell className="pl-8 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-16 rounded-lg overflow-hidden border border-slate-100 bg-slate-100">
                            <img src={element.projectBanner?.url} className="h-full w-full object-cover" alt="B" />
                          </div>
                          <span className="font-bold text-slate-700">{element.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100 rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                          {element.stack}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`flex items-center gap-1.5 text-xs font-bold ${element.deployed === "Yes" ? "text-emerald-600" : "text-slate-400"}`}>
                          <div className={`h-1.5 w-1.5 rounded-full ${element.deployed === "Yes" ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`}></div>
                          {element.deployed === "Yes" ? "LIVE" : "DRAFT"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link to={`/update/project/${element._id}`}>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-indigo-600"><Layers className="h-4 w-4" /></Button>
                          </Link>
                          <Link to={element.projectLink} target="_blank">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-indigo-600"><ExternalLink className="h-4 w-4" /></Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-10 text-slate-400 italic">No projects added yet</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* TOOLS & TIMELINE SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="border-b border-slate-50 bg-slate-50/50">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Layers className="w-4 h-4 text-orange-600" /> Professional Toolbox
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                {softwareApplications?.slice(0, 4).map((app) => (
                  <div key={app._id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-slate-100 rounded-xl">
                        <img src={app.svg?.url} className="w-6 h-6 grayscale opacity-70" alt="I" />
                      </div>
                      <span className="font-bold text-slate-700 capitalize">{app.name}</span>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-slate-300 hover:text-red-500"
                      onClick={() => handleDeleteSoftwareApp(app._id)}
                    >
                      {appLoading && appId === app._id ? "..." : <Trash2 className="h-4 w-4" />}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="border-b border-slate-50 bg-slate-50/50 flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <History className="w-4 h-4 text-emerald-600" /> Career Path
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 uppercase tracking-tighter text-[10px] font-black" onClick={gotoMangeTimeline}>
                Full Log
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                {timeline?.slice(0, 4).map((item) => (
                  <div key={item._id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-slate-700 text-sm">{item.title}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.timeline.from}</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
