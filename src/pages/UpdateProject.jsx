import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link, ArrowLeft, ImagePlus, Save, Globe, Github, Layers, Cpu, Images, PlusCircle, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import {
  clearAllProjectErrors,
  getAllProjects,
  resetProjectSlice,
  updateProject,
} from "@/store/slices/projectSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UpdateProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");

  // Gallery State
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newImagesPreview, setNewImagesPreview] = useState([]);

  const { error, message, loading } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleProjectBanner = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBannerPreview(reader.result);
      setProjectBanner(file);
    };
  };

  const handleNewGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(prev => [...prev, ...files]);
    files.forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setNewImagesPreview(prev => [...prev, reader.result]);
      };
    });
  };

  const removeNewImage = (index) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
    setNewImagesPreview(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/project/get/${id}`, {
          withCredentials: true,
        });
        const p = res.data.project;
        setTitle(p.title);
        setDescription(p.description);
        setStack(p.stack);
        setDeployed(p.deployed);
        setTechnologies(p.technologies);
        setGitRepoLink(p.gitRepoLink);
        setProjectLink(p.projectLink);
        setProjectBanner(p.projectBanner?.url);
        setProjectBannerPreview(p.projectBanner?.url);
        setExistingImages(p.projectImages || []);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch project");
      }
    };
    getProject();

    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
      setNewImages([]);
      setNewImagesPreview([]);
    }
  }, [id, message, error, dispatch]);

  const handleUpdateProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("deployed", deployed);
    formData.append("stack", stack);
    formData.append("technologies", technologies);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);

    if (projectBanner instanceof File) {
      formData.append("projectBanner", projectBanner);
    }

    newImages.forEach(img => {
      formData.append("projectImages", img);
    });

    // Note: I'm not implementing specific existing image deletion via current backend update endpoint
    // It currently appends new images.

    // axios call directly or via dispatch
    // In previous code it was dispatch(updateProject(id, formData));
    // Let's assume updateProject action exists in slice
    // I need to check slice too later if it's correct.

    dispatch(updateProject(id, formData));
  };

  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => navigateTo("/");

  return (
    <div className="min-h-screen w-full bg-slate-50/50 pt-8 pb-20 px-4 sm:px-10 sm:pl-28">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-xl bg-white border border-slate-200" onClick={handleReturnToDashboard}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Update Project</h1>
              <p className="text-slate-500 font-medium">Refine details and manage your project gallery.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleUpdateProject} className="space-y-8">
          <Card className="bg-white border-slate-200 shadow-xl rounded-3xl overflow-hidden border-none text-black dark:text-white">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" /> Identity & Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-10">

              {/* PRIMARY BANNER */}
              <div className="space-y-4">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Primary Project Banner</Label>
                <div className="relative group/banner min-h-[350px] border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/30 flex flex-col items-center justify-center transition-all hover:bg-slate-50 hover:border-indigo-200 p-4 overflow-hidden shadow-inner">
                  {projectBannerPreview ? (
                    <img
                      src={projectBannerPreview}
                      className="absolute inset-0 w-full h-full object-cover transition-transform group-hover/banner:scale-105"
                      alt="Banner Preview"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-center gap-3">
                      <ImagePlus className="w-8 h-8 text-slate-400" />
                      <p className="text-slate-600 font-bold">Swap Project Banner</p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleProjectBanner}
                  />
                </div>
              </div>

              {/* PROJECT GALLERY */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <Images className="w-4 h-4 text-indigo-500" /> Project Gallery Collection
                  </Label>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-3 py-1 rounded-full font-bold">
                    {existingImages.length} Existing + {newImages.length} New
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {/* Existing Images */}
                  {existingImages.map((img, index) => (
                    <div key={index} className="relative group/existing h-24 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                      <img src={img.url} className="w-full h-full object-cover grayscale-[0.5]" alt={`Existing ${index}`} />
                      <div className="absolute top-1 right-1 bg-indigo-600 text-white p-1 rounded-md opacity-0 group-hover/existing:opacity-100 transition-opacity">
                        <Globe className="w-3 h-3" />
                      </div>
                    </div>
                  ))}

                  {/* New Image Previews */}
                  {newImagesPreview.map((url, index) => (
                    <div key={index} className="relative group/new h-24 rounded-2xl overflow-hidden border-2 border-indigo-200 ring-2 ring-indigo-50/50">
                      <img src={url} className="w-full h-full object-cover" alt={`New ${index}`} />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute inset-0 bg-red-600/60 opacity-0 group-hover/new:opacity-100 transition-opacity flex items-center justify-center text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {/* Add New Button */}
                  <div className="relative group/add h-24 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/30 flex flex-col items-center justify-center transition-all hover:bg-slate-50 hover:border-indigo-200 cursor-pointer">
                    <PlusCircle className="w-6 h-6 text-slate-400 group-hover/add:text-indigo-500 transition-colors" />
                    <input
                      type="file"
                      multiple
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleNewGalleryUpload}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                <div className="col-span-full space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Project Title</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-12 border-slate-200 focus:ring-indigo-500 rounded-xl bg-slate-50 font-bold text-lg"
                  />
                </div>

                <div className="col-span-full space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Description</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[150px] border-slate-200 focus:ring-indigo-500 rounded-xl bg-slate-50 p-4 leading-relaxed"
                  />
                </div>

                <div className="col-span-full space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <Cpu className="w-3 h-3 text-purple-600" /> Technologies Involved
                  </Label>
                  <Input
                    value={technologies}
                    onChange={(e) => setTechnologies(e.target.value)}
                    className="h-12 border-slate-200 focus:ring-purple-500 rounded-xl bg-slate-50 font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Stack Categorization</Label>
                  <Select value={stack} onValueChange={setStack}>
                    <SelectTrigger className="h-12 border-slate-200 rounded-xl bg-slate-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Full Stack">Full Stack</SelectItem>
                      <SelectItem value="Mern">MERN</SelectItem>
                      <SelectItem value="Mean">MEAN</SelectItem>
                      <SelectItem value="Next.JS">Next.JS</SelectItem>
                      <SelectItem value="React.JS">React.JS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Deployment Status</Label>
                  <Select value={deployed} onValueChange={setDeployed}>
                    <SelectTrigger className="h-12 border-slate-200 rounded-xl bg-slate-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Yes">Yes, Live</SelectItem>
                      <SelectItem value="No">No, Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <Github className="w-3 h-3" /> Source Code URL
                  </Label>
                  <Input
                    value={gitRepoLink}
                    onChange={(e) => setGitRepoLink(e.target.value)}
                    className="h-12 border-slate-200 focus:ring-indigo-500 rounded-xl bg-slate-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <Globe className="w-3 h-3" /> Live Project URL
                  </Label>
                  <Input
                    value={projectLink}
                    onChange={(e) => setProjectLink(e.target.value)}
                    className="h-12 border-slate-200 focus:ring-indigo-500 rounded-xl bg-slate-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
            {loading ? (
              <SpecialLoadingButton content="Synchronizing..." />
            ) : (
              <Button
                type="submit"
                className="h-14 px-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-95 transition-all flex items-center gap-3"
              >
                <Save className="w-5 h-5" /> Save Changes
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProject;
