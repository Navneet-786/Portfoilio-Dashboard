import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addNewSoftwareApplication,
  clearAllSoftwareAppErrors,
  getAllSoftwareApplications,
  resetSoftwareApplicationSlice,
} from "@/store/slices/softwareApplicationSlice";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus, PlusCircle, AppWindow, Wrench } from "lucide-react";

const AddSoftwareApplications = () => {
  const [name, setName] = useState("");
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

  const { loading, error, message } = useSelector(
    (state) => state.softwareApplications
  );
  const dispatch = useDispatch();

  const handleAddNewSoftwareApp = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("svg", svg);
    dispatch(addNewSoftwareApplication(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSoftwareAppErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSoftwareApplicationSlice());
      dispatch(getAllSoftwareApplications());
      setName("");
      setSvg("");
      setSvgPreview("");
    }
  }, [dispatch, loading, error, message]);

  return (
    <div className="flex-1 bg-slate-50/50 py-10 px-4 sm:px-10 sm:pl-28">
      <Card className="max-w-2xl mx-auto bg-white border-slate-200 shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500 rounded-2xl shadow-lg shadow-amber-200">
              <AppWindow className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-slate-900 tracking-tight">Add Tool / App</CardTitle>
              <CardDescription>Register a new software application or productivity tool.</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleAddNewSoftwareApp} className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {/* NAME */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Wrench className="w-3 h-3" /> Application Name
                </Label>
                <Input
                  placeholder="e.g. Visual Studio Code, Postman, Jira"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 border-slate-200 focus:ring-amber-500 rounded-xl bg-slate-50/50"
                />
              </div>

              {/* ICON */}
              <div className="space-y-4">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Tool Identity (Icon/SVG)</Label>
                <div className="relative group/icon min-h-[160px] border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/30 flex flex-col items-center justify-center transition-all hover:bg-slate-50 hover:border-amber-200 p-8 overflow-hidden">
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
                        <p className="text-slate-600 font-bold text-sm">Upload Tool Icon</p>
                        <p className="text-[10px] text-slate-400">SVG or PNG formatted</p>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleSvg}
                  />
                  {svgPreview && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/icon:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="secondary" className="bg-white text-amber-600 font-bold rounded-xl pointer-events-none">
                        Change Icon
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 flex justify-end">
              {loading ? (
                <SpecialLoadingButton content="Adding Tool..." />
              ) : (
                <Button
                  type="submit"
                  className="h-12 px-10 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow-xl shadow-amber-500/20 active:scale-95 transition-all"
                >
                  <PlusCircle className="w-4 h-4 mr-2" /> Register Tool
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddSoftwareApplications;
