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
  clearAllTimelineErrors,
  deleteTimeline,
  getAllTimeline,
  resetTimelineSlice,
} from "@/store/slices/timelineSlice";
import { Trash2, ArrowLeft, History } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ManageTimeline = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => navigateTo("/");

  const { timeline, loading, error, message } = useSelector(
    (state) => state.timeline
  );
  const dispatch = useDispatch();

  const handleDeleteTimeline = (id) => {
    dispatch(deleteTimeline(id));
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
    }
  }, [dispatch, error, message, loading]);

  return (
    <div className="min-h-screen w-full bg-slate-50/50 pt-8 pb-20 px-4 sm:px-10 sm:pl-28">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Experience Timeline
            </h1>
            <p className="text-slate-500 font-medium">Manage your professional journey and academic milestones.</p>
          </div>
          <Button variant="outline" className="w-fit gap-2 rounded-xl border-slate-200 bg-white" onClick={handleReturnToDashboard}>
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Button>
        </div>

        <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden border-none outline-none">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
            <CardTitle className="text-xl font-bold">Timeline Inventory</CardTitle>
            <CardDescription>A chronological record of your career highlights and education.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/30">
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="pl-8 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Title</TableHead>
                  <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Description</TableHead>
                  <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Duration</TableHead>
                  <TableHead className="text-right pr-8 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeline && timeline.length > 0 ? (
                  timeline.map((element) => (
                    <TableRow key={element._id} className="border-slate-50 hover:bg-slate-50/50 transition-colors group">
                      <TableCell className="pl-8 py-4">
                        <span className="font-bold text-slate-800 text-base">{element.title}</span>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-slate-500 line-clamp-1 max-w-[300px]">{element.description}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-700">{element.timeline.from}</span>
                          <span className="text-[10px] text-slate-400">to {element.timeline.to ? element.timeline.to : "Present"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-xl text-slate-300 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all"
                          onClick={() => handleDeleteTimeline(element._id)}
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-20">
                      <div className="flex flex-col items-center gap-3">
                        <History className="w-12 h-12 text-slate-200" />
                        <p className="text-slate-400 font-medium italic">Your professional timeline is currently empty.</p>
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

export default ManageTimeline;
