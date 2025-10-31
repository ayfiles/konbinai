import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useLanguage } from "@/context/LanguageContext";
import { texts } from "@/lib/texts";

const ContactSection = () => {
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
  });
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptPrivacy) {
      toast.error(currentLang === 'DE' ? 'Bitte stimmen Sie der Datenschutzerklärung zu.' : 'Please accept the privacy policy.');
      return;
    }
    try {
      await supabase.functions.invoke("send-notification", {
        body: {
          type: "interest",
          ...formData,
        },
      });
      toast.success("Thanks! We'll be in touch soon.");
      setFormData({ name: "", email: "", interest: "" });
      setAcceptPrivacy(false);
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
            {texts[currentLang].contact_title}
          </h2>
          <p className="font-body text-white/85 text-[18px] lg:text-[20px]">
            {texts[currentLang].contact_subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-body text-white/90 text-[15px]">
              {texts[currentLang].form_name}
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
              {texts[currentLang].form_email}
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
              {texts[currentLang].form_interest}
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
                <SelectItem value="ai-campaigns">{texts[currentLang].interest_ai}</SelectItem>
                <SelectItem value="product-visuals">{texts[currentLang].interest_product}</SelectItem>
                <SelectItem value="motion-video">{texts[currentLang].interest_motion}</SelectItem>
                <SelectItem value="creative-direction">{texts[currentLang].interest_direction}</SelectItem>
                <SelectItem value="consulting">{texts[currentLang].interest_consulting}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Privacy consent */}
          <div className="pt-2">
            <div className="flex items-start gap-3 mb-4">
              <Checkbox id="privacy-mini" checked={acceptPrivacy} onCheckedChange={(v) => setAcceptPrivacy(Boolean(v))} className="mt-1" />
              <div className="font-body text-white/80 text-[14px] leading-6">
                <label htmlFor="privacy-mini" className="select-none cursor-pointer">
                  {currentLang === 'DE'
                    ? 'Ich habe die Datenschutzerklärung gelesen und stimme ihr zu.'
                    : 'I have read and agree to the privacy policy.'}
                </label>{" "}
                <button type="button" onClick={() => setPrivacyOpen(true)} className="underline hover:text-white">
                  {currentLang === 'DE' ? 'Datenschutzerklärung' : 'Privacy Policy'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-pill bg-white/20 border border-white/30 ring-1 ring-white/40 shadow-xl backdrop-blur-frosted text-white font-label text-[15px] h-12 transition-all duration-300 hover:bg-white/10 hover:ring-white/60"
            >
              {texts[currentLang].submit}
            </Button>
            <Button
              type="button"
              onClick={() => navigate("/project-inquiry")}
              size="lg"
              className="w-full rounded-pill bg-white/20 border border-white/30 ring-1 ring-white/40 shadow-xl backdrop-blur-frosted text-white font-label text-[15px] h-12 transition-all duration-300 hover:bg-white/10 hover:ring-white/60"
            >
              {texts[currentLang].full_inquiry}
            </Button>
          </div>
        </form>
        {privacyOpen && (
          <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 md:p-8 animate-fade-in" onClick={() => setPrivacyOpen(false)}>
            <div className="relative w-full max-w-[820px] max-h-[80vh] rounded-3xl bg-white/12 border border-white/20 backdrop-blur-frosted shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h3 className="text-white font-bold text-xl" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  {currentLang === 'DE' ? 'Datenschutzerklärung' : 'Privacy Policy'}
                </h3>
                <button onClick={() => setPrivacyOpen(false)} className="text-white/80 hover:text-white font-body">✕</button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[70vh] space-y-4 text-white/85">
                <p className="font-body text-[15px]">
                  {currentLang === 'DE'
                    ? 'Wir verarbeiten Ihre Angaben ausschließlich zur Bearbeitung Ihrer Anfrage. Ihre Daten werden sicher gespeichert und nicht an Dritte verkauft.'
                    : 'We process your information solely to handle your inquiry. Your data is stored securely and will not be sold to third parties.'}
                </p>
                <p className="font-body text-[15px]">
                  {currentLang === 'DE'
                    ? 'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertrag/ vorvertragliche Maßnahmen).'
                    : 'The legal basis is Art. 6(1)(b) GDPR (contract/pre-contractual measures).'}
                </p>
                <p className="font-body text-[15px]">
                  {currentLang === 'DE'
                    ? 'Sie können Auskunft, Berichtigung oder Löschung Ihrer Daten verlangen.'
                    : 'You can request access, correction, or deletion of your data at any time.'}
                </p>
                <p className="font-body text-[15px]">
                  {currentLang === 'DE'
                    ? 'Mit Klick auf „Senden“ stimmen Sie der Verarbeitung gemäß dieser Datenschutzerklärung zu.'
                    : 'By clicking “Submit”, you agree to the processing described in this privacy policy.'}
                </p>
              </div>
              <div className="px-6 py-4 border-t border-white/10 flex justify-end">
                <Button onClick={() => setPrivacyOpen(false)} className="rounded-pill bg-white text-black hover:bg-white/90 font-label text-[14px] px-6">
                  {currentLang === 'DE' ? 'Schließen' : 'Close'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
