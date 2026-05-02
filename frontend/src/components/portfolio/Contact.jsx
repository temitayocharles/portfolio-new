import React, { useState } from "react";
import { Mail, Linkedin, Github, Send, MapPin, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { profile } from "@/mock";
import { SectionLabel } from "./About";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in your name, email, and message.",
      });
      return;
    }
    setStatus("sending");
    // Mock submit — will be wired to backend later
    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem("tca_messages") || "[]");
      stored.push({ ...form, ts: new Date().toISOString() });
      localStorage.setItem("tca_messages", JSON.stringify(stored));
      setStatus("sent");
      toast({
        title: "Message captured (mock)",
        description: "Saved locally. Backend wiring will deliver it via email next.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 2400);
    }, 800);
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel index="05" title="Contact" />

        <div className="mt-12 grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-5">
            <h2 className="text-3xl lg:text-[2.5rem] font-semibold tracking-tight text-slate-50 leading-[1.1]">
              Let's build{" "}
              <span className="text-teal-300">reliable, secure, and AI-ready</span>{" "}
              infrastructure.
            </h2>
            <p className="mt-5 text-slate-400 leading-relaxed">
              Open to opportunities where I can help teams improve cloud
              reliability, accelerate delivery, reduce operational risk,
              strengthen DevSecOps, and build modern platform engineering
              systems — from Kubernetes and GitOps to AI-assisted operations.
            </p>

            <div className="mt-8 space-y-3">
              <ContactRow
                icon={Mail}
                label="Email"
                value={profile.email}
                href={`mailto:${profile.email}`}
              />
              <ContactRow
                icon={Linkedin}
                label="LinkedIn"
                value="linkedin.com/in/temitayocharles"
                href={profile.linkedin}
              />
              <ContactRow
                icon={Github}
                label="GitHub"
                value="github.com/temitayocharles"
                href={profile.github}
              />
              <ContactRow icon={MapPin} label="Location" value={profile.location} />
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 lg:p-8"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Name" htmlFor="name">
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Your full name"
                    className="bg-[#0e1620] border-white/10 text-slate-100 placeholder:text-slate-600 focus-visible:ring-teal-300/40 focus-visible:border-teal-300/40"
                  />
                </Field>
                <Field label="Email" htmlFor="email">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@company.com"
                    className="bg-[#0e1620] border-white/10 text-slate-100 placeholder:text-slate-600 focus-visible:ring-teal-300/40 focus-visible:border-teal-300/40"
                  />
                </Field>
              </div>
              <div className="mt-5">
                <Field label="Subject" htmlFor="subject">
                  <Input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    placeholder="Platform engineering engagement, hiring, collaboration..."
                    className="bg-[#0e1620] border-white/10 text-slate-100 placeholder:text-slate-600 focus-visible:ring-teal-300/40 focus-visible:border-teal-300/40"
                  />
                </Field>
              </div>
              <div className="mt-5">
                <Field label="Message" htmlFor="message">
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={onChange}
                    placeholder="Tell me about your team, the platform challenges you're facing, and what success looks like."
                    className="bg-[#0e1620] border-white/10 text-slate-100 placeholder:text-slate-600 focus-visible:ring-teal-300/40 focus-visible:border-teal-300/40 resize-none"
                  />
                </Field>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-xs text-slate-500 font-mono">
                  /response within 24h
                </p>
                <Button
                  type="submit"
                  disabled={status !== "idle"}
                  className="bg-teal-300 hover:bg-teal-200 text-[#0a0f14] font-medium min-w-[150px] shadow-[0_0_24px_-6px] shadow-teal-400/40"
                >
                  {status === "sending" && (
                    <>
                      <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                      Sending
                    </>
                  )}
                  {status === "sent" && (
                    <>
                      <Check className="h-4 w-4 mr-1.5" />
                      Sent
                    </>
                  )}
                  {status === "idle" && (
                    <>
                      <Send className="h-4 w-4 mr-1.5" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, htmlFor, children }) => (
  <div className="space-y-2">
    <Label
      htmlFor={htmlFor}
      className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-mono"
    >
      {label}
    </Label>
    {children}
  </div>
);

const ContactRow = ({ icon: Icon, label, value, href }) => {
  const inner = (
    <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-white/5 bg-white/[0.02] hover:border-teal-300/25 hover:bg-white/[0.04] transition-colors">
      <div className="h-9 w-9 rounded-md bg-teal-300/10 border border-teal-300/20 flex items-center justify-center text-teal-300">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-slate-500">{label}</div>
        <div className="text-sm text-slate-200 truncate">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block">
      {inner}
    </a>
  ) : (
    inner
  );
};

export default Contact;
