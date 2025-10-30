import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await supabase.functions.invoke("send-notification", {
        body: {
          type: "interest",
          ...formData,
        },
      });
      
      toast.success("Thanks! We'll be in touch soon.");
      setFormData({ name: "", email: "", interest: "" });
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error("Failed to send. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative bg-black py-24 lg:py-32 px-6 lg:px-12">
      <div className="pointer-events-none absolute -top-10 left-0 right-0 h-10 lg:-top-16 lg:h-16 bg-gradient-to-b from-charcoal to-black" />
      <div className="max-w-[700px] mx-auto space-y-12">
        {/* Heading */}
        <div className="text-center space-y-4">
          <h2
            className="font-bold text-white text-[40px] lg:text-[56px] leading-[1.15] tracking-tight"
            style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
          >
            Lets Create Together.
          </h2>
          <p className="font-body text-white/85 text-[18px] lg:text-[20px]">
            We collaborate with brands who want more than stock visuals.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-body text-white/90 text-[15px]">
              Name
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
              Email
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

          <div className="space-y-2">
            <Label htmlFor="interest" className="font-body text-white/90 text-[15px]">
              I'm interested in
            </Label>
            <Select
              value={formData.interest}
              onValueChange={(value) => setFormData({ ...formData, interest: value })}
              required
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-xl h-12">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ai-campaigns">AI Campaigns</SelectItem>
                <SelectItem value="product-visuals">Product Visuals</SelectItem>
                <SelectItem value="motion-video">Motion & Video</SelectItem>
                <SelectItem value="creative-direction">Creative Direction</SelectItem>
                <SelectItem value="consulting">Consulting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-pill bg-white/20 border border-white/30 ring-1 ring-white/40 shadow-xl backdrop-blur-frosted text-white font-label text-[15px] h-12 transition-all duration-300 hover:bg-white/10 hover:ring-white/60"
            >
              I'm Interested
            </Button>
            <Button
              type="button"
              onClick={() => navigate("/project-inquiry")}
              size="lg"
              className="w-full rounded-pill bg-white/20 border border-white/30 ring-1 ring-white/40 shadow-xl backdrop-blur-frosted text-white font-label text-[15px] h-12 transition-all duration-300 hover:bg-white/10 hover:ring-white/60"
            >
              Full Project Inquiry
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
