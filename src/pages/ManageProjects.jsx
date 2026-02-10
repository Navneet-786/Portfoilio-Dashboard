import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  clearAllProjectErrors,
  deleteProject,
  getAllProjects,
  resetProjectSlice,
} from "@/store/slices/projectSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, Pen, Trash2, ArrowLeft, ExternalLink, Globe } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";

const ManageProjects = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => navigateTo("/");

  const { projects, loading, error, message } = useSelector(
    (state) => state.project
  );

  const dispatch = useDispatch();
  const handleProjectDelete = (id) => {
    dispatch(deleteProject(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [dispatch, error, loading, message]);

  return (
    <div className="min-h-screen w-full bg-slate-50/50 pt-8 pb-20 px-4 sm:px-10 sm:pl-28">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Manage Projects
            </h1>
            <p className="text-slate-500 font-medium">View, edit or remove your portfolio works.</p>
          </div>
          <Button variant="outline" className="w-fit gap-2 rounded-xl border-slate-200" onClick={handleReturnToDashboard}>
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Button>
        </div>

        <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
            <CardTitle className="text-xl font-bold">Project Inventory</CardTitle>
            <CardDescription>A complete list of all your published projects across all stacks.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/30">
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="pl-8 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Banner</TableHead>
                  <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Title & Stack</TableHead>
                  <TableHead className="hidden md:table-cell font-bold text-slate-400 uppercase text-[10px] tracking-widest">Status</TableHead>
                  <TableHead className="text-right pr-8 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects && projects.length > 0 ? (
                  projects.map((element) => (
                    <TableRow key={element._id} className="border-slate-50 hover:bg-slate-50/50 transition-colors group">
                      <TableCell className="pl-8 py-4">
                        <div className="relative h-14 w-24 rounded-xl overflow-hidden border border-slate-100 bg-slate-100 shadow-sm">
                          <img
                            src={element.projectBanner?.url}
                            alt={element.title}
                            className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800 text-base">{element.title}</span>
                          <span className="text-xs text-slate-400 font-medium">{element.stack}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="secondary" className={`rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${element.deployed === "Yes"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : "bg-slate-100 text-slate-500 border-slate-200"
                          }`}>
                          {element.deployed === "Yes" ? "Live" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <div className="flex justify-end items-center gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link to={`/view/project/${element._id}`}>
                                  <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100">
                                    <Eye className="h-4.5 w-4.5" />
                                  </Button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>View Details</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link to={`/update/project/${element._id}`}>
                                  <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl text-slate-400 hover:text-amber-600 hover:bg-amber-50 border border-transparent hover:border-amber-100">
                                    <Pen className="h-4.5 w-4.5" />
                                  </Button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>Edit Project</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-9 w-9 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100"
                                  onClick={() => handleProjectDelete(element._id)}
                                >
                                  <Trash2 className="h-4.5 w-4.5" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete Forever</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-20">
                      <div className="flex flex-col items-center gap-3">
                        <Globe className="w-12 h-12 text-slate-200" />
                        <p className="text-slate-400 font-medium italic">You haven't added any projects yet.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageProjects;
