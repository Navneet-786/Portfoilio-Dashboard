import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  clearAllMessageErrors,
  deleteMessage,
  getAllMessages,
  resetMessagesSlice,
} from "@/store/slices/messageSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { useNavigate } from "react-router-dom";
import { MessageSquare, User, Mail, Trash2, ArrowLeft, Inbox } from "lucide-react";
import { Label } from "@/components/ui/label";

const Messages = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => navigateTo("/");

  const { messages, loading, error, message } = useSelector(
    (state) => state.messages
  );

  const [messageId, setMessageId] = useState("");
  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetMessagesSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, error, message, loading]);

  return (
    <div className="min-h-screen w-full bg-slate-50/50 pt-8 pb-20 px-4 sm:px-10 sm:pl-28">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Message Center
            </h1>
            <p className="text-slate-500 font-medium">Review and manage inquiries from your portfolio.</p>
          </div>
          <Button variant="outline" className="w-fit gap-2 rounded-xl border-slate-200 bg-white" onClick={handleReturnToDashboard}>
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Button>
        </div>

        <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden border-none outline-none">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
            <div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Inbox className="w-5 h-5 text-indigo-600" /> Inbox
              </CardTitle>
              <CardDescription>You have {messages?.length || 0} active inquiries.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {messages && messages.length > 0 ? (
                messages.map((element) => (
                  <Card key={element._id} className="relative group p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <MessageSquare className="w-16 h-16 text-indigo-600" />
                    </div>

                    <CardHeader className="p-0 mb-6 border-b border-slate-50 pb-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
                            <User className="w-4 h-4 text-indigo-600" /> {element.senderName}
                          </div>
                          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-widest">
                            <Mail className="w-3 h-3" /> {element.subject}
                          </div>
                        </div>

                        {loading && messageId === element._id ? (
                          <SpecialLoadingButton content="..." width="w-8" />
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl"
                            onClick={() => handleMessageDelete(element._id)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="p-0">
                      <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Message Content</Label>
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                          <p className="text-slate-600 text-sm leading-relaxed italic">
                            "{element.message}"
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full py-20 flex flex-col items-center gap-4 border-2 border-dashed border-slate-100 rounded-3xl">
                  <MessageSquare className="w-12 h-12 text-slate-200" />
                  <p className="text-slate-400 font-medium italic">Your inbox is currently empty.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
