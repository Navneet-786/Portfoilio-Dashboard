import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  addNewTimeline,
  clearAllTimelineErrors,
  getAllTimeline,
  resetTimelineSlice,
} from "@/store/slices/timelineSlice";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { History, CalendarDays, PenTool, Milestone } from "lucide-react";

const AddTimeline = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { loading, error, message } = useSelector((state) => state.timeline);
  const dispatch = useDispatch();

  const handleAddNewTimeline = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("from", from);
    formData.append("to", to);
    dispatch(addNewTimeline(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
      setTitle("");
      setDescription("");
      setFrom("");
      setTo("");
    }
  }, [dispatch, error, message, loading]);

  return (
    <div className="flex-1 bg-slate-50/50 py-10 px-4 sm:px-10 sm:pl-28">
      <Card className="max-w-2xl mx-auto bg-white border-slate-200 shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-200">
              <Milestone className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-slate-900 tracking-tight">Add Milestone</CardTitle>
              <CardDescription>Record a new achievement or career update to your timeline.</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleAddNewTimeline} className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {/* TITLE */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <PenTool className="w-3 h-3" /> Event Title
                </Label>
                <Input
                  placeholder="e.g. Lead Developer at Acme Corp, B.Tech Graduation"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-12 border-slate-200 focus:ring-emerald-500 rounded-xl bg-slate-50/50"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <History className="w-3 h-3" /> Key Responsibilities / Details
                </Label>
                <Textarea
                  placeholder="Describe what you achieved or learned during this period..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px] border-slate-200 focus:ring-emerald-500 rounded-xl bg-slate-50/50 p-4"
                />
              </div>

              {/* DATES */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <CalendarDays className="w-3 h-3" /> Start Date
                  </Label>
                  <Input
                    type="text"
                    placeholder="e.g. June 2022"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="h-12 border-slate-200 focus:ring-emerald-500 rounded-xl bg-slate-50/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <CalendarDays className="w-3 h-3" /> End Date
                  </Label>
                  <Input
                    type="text"
                    placeholder="e.g. Dec 2023 or Present"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="h-12 border-slate-200 focus:ring-emerald-500 rounded-xl bg-slate-50/50"
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
                  className="h-12 px-10 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/20 active:scale-95 transition-all"
                >
                  Save Milestone
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTimeline;
