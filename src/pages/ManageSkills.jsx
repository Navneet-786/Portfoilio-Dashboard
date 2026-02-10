import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  clearAllSkillErrors,
  updateSkill,
  resetSkillSlice,
  deleteSkill,
  getAllSkills,
} from "@/store/slices/skillSlice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Trash2, ArrowLeft, Cpu, MoreVertical, Search } from "lucide-react";

const ManageSkills = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => navigateTo("/");

  const { loading, skills, error, message } = useSelector(
    (state) => state.skill
  );
  const dispatch = useDispatch();

  const [newProficiency, setNewProficiency] = useState(1);
  const handleInputChange = (proficiency) => {
    setNewProficiency(proficiency);
  };

  const handleUpdateSkill = (id) => {
    dispatch(updateSkill(id, newProficiency));
  };

  const handleDeleteSkill = (id) => {
    dispatch(deleteSkill(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  }, [dispatch, loading, error, message]);

  return (
    <div className="min-h-screen w-full bg-slate-50/50 pt-8 pb-20 px-4 sm:px-10 sm:pl-28">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Technical Arsenal
            </h1>
            <p className="text-slate-500 font-medium">Manage and fine-tune your technical proficiencies.</p>
          </div>
          <Button variant="outline" className="w-fit gap-2 rounded-xl border-slate-200 bg-white" onClick={handleReturnToDashboard}>
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Button>
        </div>

        <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden border-none outline-none">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Skills Inventory</CardTitle>
              <CardDescription>Adjust your proficiency levels which are reflected in your portfolio.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills && skills.length > 0 ? (
                skills.map((element) => (
                  <div key={element._id} className="relative group p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-indigo-50 rounded-xl">
                          <Cpu className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="font-bold text-slate-800 text-lg leading-tight capitalize">{element.title}</h3>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Core Competency</span>
                        </div>
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg group-hover:opacity-100 opacity-0 transition-opacity"
                              onClick={() => handleDeleteSkill(element._id)}
                            >
                              <Trash2 className="h-4.5 w-4.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-red-600 text-white border-none font-bold text-xs">Delete Skill</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Proficiency Level</Label>
                        <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{element.proficiency}%</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Input
                          type="number"
                          defaultValue={element.proficiency}
                          onChange={(e) => handleInputChange(e.target.value)}
                          onBlur={() => handleUpdateSkill(element._id)}
                          className="h-10 border-slate-100 bg-slate-50/50 text-slate-900 focus:ring-indigo-500 rounded-xl font-bold"
                          min="0"
                          max="100"
                        />
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-600 rounded-full transition-all duration-1000"
                            style={{ width: `${element.proficiency}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 flex flex-col items-center gap-4 border-2 border-dashed border-slate-100 rounded-3xl">
                  <Search className="w-12 h-12 text-slate-200" />
                  <p className="text-slate-400 font-medium italic">No skills found in your repertoire.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageSkills;
