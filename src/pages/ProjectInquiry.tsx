import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ProjectInquiry = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; url: string }>>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    brand: "",
    projectType: "",
    details: "",
    timeline: "",
    budget: "",
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newUploadedFiles: Array<{ name: string; url: string }> = [];

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('project-references')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('project-references')
          .getPublicUrl(filePath);

        newUploadedFiles.push({ name: file.name, url: publicUrl });
      }

      setUploadedFiles([...uploadedFiles, ...newUploadedFiles]);
      toast.success(`${files.length} file(s) uploaded successfully!`);
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await supabase.functions.invoke("send-notification", {
        body: {
          type: "project_inquiry",
          ...formData,
          uploadedFiles,
        },
      });
      
      setIsSubmitted(true);
      toast.success("Your inquiry has been submitted!");
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error("Failed to send inquiry. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="max-w-[600px] text-center space-y-6 animate-fade-in">
          <h1 className="font-display font-bold text-white text-[48px] lg:text-[64px] leading-[1.1]">
            Thanks.
          </h1>
          <p className="font-body text-white/85 text-[18px] lg:text-[20px]">
            We'll reply within 24–48 hours.
          </p>
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="rounded-pill bg-white text-black hover:bg-white/90 font-label text-[15px] px-10 mt-8"
          >
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20 px-6 lg:px-12">
      <div className="max-w-[800px] mx-auto space-y-12">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors font-body text-[15px]"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        {/* Header */}
        <div className="space-y-4">
          <h1 className="font-display font-bold text-white text-[48px] lg:text-[64px] leading-[1.1] tracking-tight">
            Project Inquiry
          </h1>
          <p className="font-body text-white/85 text-[18px] lg:text-[20px]">
            Tell us about your brand and creative needs. We'll craft a proposal tailored to your vision.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-body text-white/90 text-[15px]">
                Name *
              </Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-body text-white/90 text-[15px]">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand" className="font-body text-white/90 text-[15px]">
              Brand / Company *
            </Label>
            <Input
              id="brand"
              type="text"
              required
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectType" className="font-body text-white/90 text-[15px]">
              Project Type *
            </Label>
            <Select
              value={formData.projectType}
              onValueChange={(value) => setFormData({ ...formData, projectType: value })}
              required
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-xl h-12">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="campaign">Campaign Visuals</SelectItem>
                <SelectItem value="product">Product Visuals</SelectItem>
                <SelectItem value="motion">Motion & Video</SelectItem>
                <SelectItem value="direction">Creative Direction</SelectItem>
                <SelectItem value="retainer">Retainer</SelectItem>
                <SelectItem value="custom">Custom Bundle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details" className="font-body text-white/90 text-[15px]">
              Project Details *
            </Label>
            <Textarea
              id="details"
              required
              rows={6}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="Tell us about your brand, target audience, creative vision, and goals..."
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl resize-none"
            />
          </div>

          {/* Upload References Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-body text-white/90 text-[15px]">
                Upload References
              </Label>
              <p className="font-body text-white/60 text-[14px]">
                Upload references to your brand work, products you want to feature, mood boards, or any visual inspiration. All file types accepted.
              </p>
            </div>

            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-white/40 transition-colors">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-3"
              >
                <Upload className="w-10 h-10 text-white/60" />
                <div>
                  <p className="font-body text-white/90 text-[15px]">
                    {isUploading ? "Uploading..." : "Click to upload files"}
                  </p>
                  <p className="font-body text-white/50 text-[13px] mt-1">
                    Images, PDFs, videos, or any file type
                  </p>
                </div>
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-3"
                  >
                    <span className="font-body text-white/90 text-[14px] truncate flex-1">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-white/60 hover:text-white transition-colors ml-3"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="timeline" className="font-body text-white/90 text-[15px]">
                Timeline *
              </Label>
              <Select
                value={formData.timeline}
                onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                required
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-xl h-12">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">ASAP (1-2 weeks)</SelectItem>
                  <SelectItem value="standard">Standard (2-4 weeks)</SelectItem>
                  <SelectItem value="flexible">Flexible (1-2 months)</SelectItem>
                  <SelectItem value="ongoing">Ongoing / Retainer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget" className="font-body text-white/90 text-[15px]">
                Budget Range *
              </Label>
              <Select
                value={formData.budget}
                onValueChange={(value) => setFormData({ ...formData, budget: value })}
                required
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-xl h-12">
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under1k">Under $1,000 AUD</SelectItem>
                  <SelectItem value="1k-3k">$1,000 - $3,000 AUD</SelectItem>
                  <SelectItem value="3k-5k">$3,000 - $5,000 AUD</SelectItem>
                  <SelectItem value="5k-10k">$5,000 - $10,000 AUD</SelectItem>
                  <SelectItem value="10k+">$10,000+ AUD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-6">
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-pill bg-white/20 border border-white/30 ring-1 ring-white/40 shadow-xl backdrop-blur-frosted text-white font-label text-[15px] h-14 transition-all duration-300 hover:bg-white/10 hover:ring-white/60"
            >
              Submit Project Inquiry
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectInquiry;
