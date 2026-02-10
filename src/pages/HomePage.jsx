import { Link, useNavigate } from "react-router-dom";
import {
  FolderGit,
  History,
  Home,
  LayoutGrid,
  LogOut,
  MessageSquareMore,
  Package2,
  PanelLeft,
  PencilRuler,
  User,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import Dashboard from "./sub-components/Dashboard";
import AddSkill from "./sub-components/AddSkill";
import AddProject from "./sub-components/AddProject";
import AddSoftwareApplications from "./sub-components/AddSoftwareApplications";
import Account from "./sub-components/Account";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { toast } from "react-toastify";
import Messages from "./sub-components/Messages";
import AddTimeline from "./sub-components/AddTimeline";
import { clearAllUserErrors } from "../store/slices/userSlice";

const HomePage = () => {
  const [active, setActive] = useState("Dashboard");
  const { isAuthenticated, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged Out!");
  };
  const navigateTo = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated, error, dispatch, navigateTo]);

  const navItems = [
    { id: "Dashboard", label: "Dashboard", icon: Home },
    { id: "Add Project", label: "Add Project", icon: FolderGit },
    { id: "Add Skill", label: "Add Skill", icon: PencilRuler },
    { id: "Add Uses", label: "Add Tools", icon: LayoutGrid },
    { id: "Add Timeline", label: "Add Milestone", icon: History },
    { id: "Messages", label: "Messages", icon: MessageSquareMore },
    { id: "Account", label: "Account", icon: User },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50/50">
      {/* DESKTOP SIDEBAR */}
      <aside className="fixed inset-y-0 left-0 hidden w-20 flex-col border-r border-slate-200 bg-white sm:flex z-50 shadow-sm">
        <nav className="flex flex-col items-center gap-6 px-2 sm:py-8">
          <Link className="group flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/20 text-lg font-semibold text-white transition-transform hover:scale-105 active:scale-95">
            <Package2 className="h-6 w-6 transition-all group-hover:rotate-12" />
          </Link>

          <div className="flex flex-col gap-4 mt-4">
            {navItems.map((item) => (
              <TooltipProvider key={item.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-200 ${active === item.id
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 translate-x-1"
                        : "text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                        }`}
                      onClick={() => setActive(item.id)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="sr-only">{item.label}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-slate-900 text-white border-none font-semibold px-3 py-1.5 rounded-lg shadow-xl">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </nav>

        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-slate-400 transition-all hover:text-red-600 hover:bg-red-50 active:scale-95"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Logout</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-red-600 text-white border-none font-semibold px-3 py-1.5 rounded-lg shadow-xl">
                Logout
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      {/* HEADER */}
      <header className="sticky top-0 z-40 flex h-20 items-center gap-4 border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 sm:px-10 w-full transition-all">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="sm:hidden text-slate-600">
              <PanelLeft className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs border-r border-slate-200">
            <nav className="grid gap-4 text-lg font-medium pt-8">
              <div className="flex items-center gap-3 mb-8 px-2">
                <div className="bg-indigo-600 p-2 rounded-xl">
                  <Package2 className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-slate-900 tracking-tight">Admin Console</span>
              </div>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${active === item.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : "text-slate-500 hover:text-indigo-600 hover:bg-indigo-50"
                    }`}
                  onClick={() => setActive(item.id)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              ))}
              <div className="mt-8 pt-8 border-t border-slate-100">
                <button
                  className="w-full flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-4 sm:ml-20">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img
                src={user?.avatar?.url || "/avatarHolder.jpg"}
                alt="avatar"
                className="relative w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                Welcome back, <span className="text-indigo-600 capitalize">{user?.fullName?.split(' ')[0]}</span>
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-1">Dashboard Overview</p>
            </div>
          </div>

          <div className="flex items-center gap-3">

            <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>
            <Link to="http://localhost:5173/" target="_blank">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-6 shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all">
                View Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 w-full bg-transparent overflow-x-hidden">
        {(() => {
          switch (active) {
            case "Dashboard":
              return <Dashboard />;
            case "Add Project":
              return <AddProject />;
            case "Add Skill":
              return <AddSkill />;
            case "Add Uses":
              return <AddSoftwareApplications />;
            case "Add Timeline":
              return <AddTimeline />;
            case "Messages":
              return <Messages />;
            case "Account":
              return <Account />;
            default:
              return <Dashboard />;
          }
        })()}
      </div>
    </div>
  );
};

export default HomePage;
