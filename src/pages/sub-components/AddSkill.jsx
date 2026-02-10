import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, PlusCircle, PenTool, BarChart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addNewSkill,
  clearAllSkillErrors,
  getAllSkills,
  resetSkillSlice,
} from "@/store/slices/skillSlice";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddSkill = () => {
  const [title, setTitle] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [svg, setSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSvgPreview(reader.result);
      setSvg(file);
    };
  };

  const { loading, error, message } = useSelector((state) => state.skill);
  const dispatch = useDispatch();

  const handleAddNewSkill = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("proficiency", proficiency);
    formData.append("svg", svg);
    dispatch(addNewSkill(formData));
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
      // Reset local state
      setTitle("");
      setProficiency("");
      setSvg("");
      setSvgPreview("");
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex-1 bg-slate-50/50 py-10 px-4 sm:px-10 sm:pl-28">
      <Card className="max-w-2xl mx-auto bg-white border-slate-200 shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-600 rounded-2xl shadow-lg shadow-purple-200">
              <PlusCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-slate-900 tracking-tight">Add New Skill</CardTitle>
              <CardDescription>Register a new technical proficiency to your arsenal.</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleAddNewSkill} className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {/* TITLE */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <PenTool className="w-3 h-3" /> Skill Name
                </Label>
                <Input
                  placeholder="e.g. React.js, TypeScript, Docker"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-12 border-slate-200 focus:ring-purple-500 rounded-xl bg-slate-50/50"
                />
              </div>

              {/* PROFICIENCY */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <BarChart className="w-3 h-3" /> Proficiency Level (%)
                </Label>
                <Input
                  type="number"
                  placeholder="e.g. 90"
                  value={proficiency}
                  onChange={(e) => setProficiency(e.target.value)}
                  className="h-12 border-slate-200 focus:ring-purple-500 rounded-xl bg-slate-50/50 font-bold"
                  max="100"
                />
              </div>

              {/* SVG/ICON */}
              <div className="space-y-4">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Skill Visualization (Icon/SVG)</Label>
                <div className="relative group/icon min-h-[160px] border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/30 flex flex-col items-center justify-center transition-all hover:bg-slate-50 hover:border-purple-200 p-8 overflow-hidden">
                  {svgPreview ? (
                    <img
                      src={svgPreview}
                      className="w-20 h-20 object-contain drop-shadow-md"
                      alt="Preview"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="p-3 bg-white rounded-xl shadow-sm">
                        <ImagePlus className="w-6 h-6 text-slate-400" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-slate-600 font-bold text-sm">Upload Tech Icon</p>
                        <p className="text-[10px] text-slate-400">SVG preferred for crispness</p>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleSvg}
                  />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 flex justify-end">
              {loading ? (
                <SpecialLoadingButton content="Processing..." />
              ) : (
                <Button
                  type="submit"
                  className="h-12 px-10 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-xl shadow-purple-500/20 active:scale-95 transition-all"
                >
                  Register Skill
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddSkill;
