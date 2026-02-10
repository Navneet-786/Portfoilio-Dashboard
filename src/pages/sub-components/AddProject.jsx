import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link, ImagePlus, PlusCircle, Layers, Cpu, Globe, ExternalLink, Github, Trash2, Images } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addNewProject,
  clearAllProjectErrors,
  getAllProjects,
  resetProjectSlice,
} from "@/store/slices/projectSlice";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");

  // Gallery State
  const [projectImages, setProjectImages] = useState([]);
  const [projectImagesPreview, setProjectImagesPreview] = useState([]);

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBannerPreview(reader.result);
      setProjectBanner(file);
    };
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);

    // Update raw files state
    setProjectImages(prev => [...prev, ...files]);

    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProjectImagesPreview(prev => [...prev, reader.result]);
      };
    });
  };

  const removeGalleryImage = (index) => {
    setProjectImages(prev => prev.filter((_, i) => i !== index));
    setProjectImagesPreview(prev => prev.filter((_, i) => i !== index));
  };

  const { loading, error, message } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const handleAddNewProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("technologies", technologies);
    formData.append("stack", stack);
    formData.append("deployed", deployed);
    formData.append("projectBanner", projectBanner);

    // Append Gallery Images
    projectImages.forEach((image) => {
      formData.append("projectImages", image);
    });

    dispatch(addNewProject(formData));
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
      // Reset local state
      setTitle("");
      setDescription("");
      setProjectBanner("");
      setProjectBannerPreview("");
      setGitRepoLink("");
      setProjectLink("");
      setTechnologies("");
      setStack("");
      setDeployed("");
      setProjectImages([]);
      setProjectImagesPreview([]);
    }
  }, [dispatch, error, loading, message]);

  return (
    <div className="flex-1 bg-slate-50/50 py-10 px-4 sm:px-10 sm:pl-28">
      <Card className="max-w-4xl mx-auto bg-white border-slate-200 shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
              <PlusCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-slate-900 tracking-tight">Add New Project</CardTitle>
              <CardDescription>Expand your portfolio with a new milestone achievement.</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleAddNewProject} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* TITLE */}
              <div className="col-span-full space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Project Title</Label>
                <Input
                  placeholder="e.g. Modern E-commerce Dashboard"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-12 border-slate-200 focus:ring-indigo-500 rounded-xl bg-slate-50/50 font-bold"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="col-span-full space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Project Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail your project's core purpose and key features..."
                  className="min-h-[120px] border-slate-200 focus:ring-indigo-500 rounded-xl bg-slate-50/50 p-4"
                />
              </div>

              {/* TECHNOLOGIES */}
              <div className="col-span-full space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Cpu className="w-3 h-3 text-purple-600" /> Technologies Utilized
                </Label>
                <Input
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  placeholder="React, Node.js, Tailwind CSS, etc."
                  className="h-12 border-slate-200 focus:ring-indigo-500 rounded-xl bg-slate-50/50 font-medium"
                />
              </div>

              {/* STACK */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Layers className="w-3 h-3" /> Technology Stack
                </Label>
                <Select value={stack} onValueChange={setStack}>
                  <SelectTrigger className="h-12 border-slate-200 rounded-xl bg-slate-50/50">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200">
                    <SelectItem value="Full Stack">Full Stack</SelectItem>
                    <SelectItem value="Mern">MERN</SelectItem>
                    <SelectItem value="Mean">MEAN</SelectItem>
                    <SelectItem value="Next.JS">Next.JS</SelectItem>
                    <SelectItem value="React.JS">React.JS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* DEPLOYED */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Globe className="w-3 h-3" /> Deployment Status
                </Label>
                <Select value={deployed} onValueChange={setDeployed}>
                  <SelectTrigger className="h-12 border-slate-200 rounded-xl bg-slate-50/50">
                    <SelectValue placeholder="Is it live?" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200">
                    <SelectItem value="Yes">Yes, Live</SelectItem>
                    <SelectItem value="No">No, In Dev</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* GITHUB */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Github className="w-3 h-3" /> Repository Link
                </Label>
                <Input
                  value={gitRepoLink}
                  onChange={(e) => setGitRepoLink(e.target.value)}
                  placeholder="https://github.com/..."
                  className="h-12 border-slate-200 focus:ring-indigo-500 rounded-xl bg-slate-50/50"
                />
              </div>

              {/* LIVE LINK */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <ExternalLink className="w-3 h-3" /> Production URL
                </Label>
                <Input
                  value={projectLink}
                  onChange={(e) => setProjectLink(e.target.value)}
                  placeholder="https://your-project.com"
                  className="h-12 border-slate-200 focus:ring-indigo-500 rounded-xl bg-slate-50/50"
                />
              </div>

              {/* BANNER */}
              <div className="col-span-full space-y-4">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Primary Project Banner</Label>
                <div className="relative group/banner min-h-[250px] border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/30 flex flex-col items-center justify-center transition-all hover:bg-slate-50 hover:border-indigo-200 p-8 overflow-hidden">
                  {projectBannerPreview ? (
                    <img
                      src={projectBannerPreview}
                      className="absolute inset-0 w-full h-full object-cover transition-transform group-hover/banner:scale-105"
                      alt="Preview"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="p-4 bg-white rounded-2xl shadow-sm">
                        <ImagePlus className="w-8 h-8 text-slate-400" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-600 font-bold">Upload Project Identity</p>
                        <p className="text-xs text-slate-400">PNG, JPG or WEBP (Main Image)</p>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleBannerUpload}
                  />
                </div>
              </div>

              {/* GALLERY */}
              <div className="col-span-full space-y-4">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Images className="w-3 h-3 text-indigo-500" /> Project Gallery (Multiple)
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {projectImagesPreview.map((url, index) => (
                    <div key={index} className="relative group/thumb h-24 rounded-2xl overflow-hidden border border-slate-200">
                      <img src={url} className="w-full h-full object-cover" alt={`Thumb ${index}`} />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute inset-0 bg-red-600/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <div className="relative group/gallery h-24 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/30 flex flex-col items-center justify-center transition-all hover:bg-slate-50 hover:border-indigo-200 cursor-pointer">
                    <PlusCircle className="w-6 h-6 text-slate-400 group-hover/gallery:text-indigo-500 transition-colors" />
                    <input
                      type="file"
                      multiple
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleGalleryUpload}
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-8 border-t border-slate-100 flex justify-end">
              {loading ? (
                <SpecialLoadingButton content="Publishing..." />
              ) : (
                <Button
                  type="submit"
                  className="h-14 px-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-95 transition-all"
                >
                  Publish Project
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProject;
