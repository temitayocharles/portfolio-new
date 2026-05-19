import React, { useState } from "react";
import axios from "axios";
import { Mail, Send, MapPin, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { profile } from "@/mock";
import { SectionLabel } from "./About";

const GithubIcon = ({ className = "" }) => (
  <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.59 2 12.253c0 4.529 2.865 8.369 6.839 9.725.5.094.683-.222.683-.494 0-.244-.009-.89-.014-1.747-2.782.62-3.369-1.374-3.369-1.374-.455-1.185-1.11-1.5-1.11-1.5-.908-.637.069-.624.069-.624 1.004.073 1.532 1.057 1.532 1.057.892 1.565 2.341 1.113 2.91.851.091-.662.35-1.113.636-1.369-2.221-.259-4.555-1.139-4.555-5.068 0-1.12.39-2.035 1.03-2.752-.103-.26-.446-1.303.098-2.715 0 0 .84-.276 2.75 1.052A9.37 9.37 0 0 1 12 6.957a9.37 9.37 0 0 1 2.504.345c1.909-1.328 2.747-1.052 2.747-1.052.546 1.412.203 2.455.1 2.715.64.717 1.028 1.632 1.028 2.752 0 3.939-2.337 4.806-4.566 5.06.359.317.679.944.679 1.902 0 1.372-.012 2.478-.012 2.815 0 .274.18.593.688.493C19.138 20.618 22 16.78 22 12.253 22 6.59 17.523 2 12 2Z" />
  </svg>
);
const LinkedinIcon = ({ className = "" }) => (
  <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.85-3.037-1.852 0-2.136 1.447-2.136 2.941v5.665H9.353V9h3.414v1.561h.049c.475-.9 1.637-1.85 3.369-1.85 3.602 0 4.267 2.371 4.267 5.455v6.286h-.005ZM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126ZM7.114 20.452H3.556V9h3.558v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
  </svg>
);


const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in your name, email, and message.",
      });
      return;
    }
    setStatus("sending");
    try {
      const { data } = await axios.post(`${API}/contact`, form, { timeout: 15000 });
      setStatus("sent");
      const delivered = data.email_status === "sent";
      toast({
        title: delivered ? "Message sent, check inbox" : "Message saved",
        description: delivered
          ? "Your message was emailed successfully. I'll respond within 24 hours."
          : "Saved successfully, I'll be in touch shortly. (Email delivery is being configured.)",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 2400);
    } catch (err) {
      setStatus("idle");
      const detail = err?.response?.data?.detail || err?.message || "Unknown error";
      toast({
        title: "Could not send message",
        description: typeof detail === "string" ? detail : "Please try again or email directly.",
      });
    }
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32">

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel index="07" title="Contact" />

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
              systems, from Kubernetes and GitOps to AI-assisted operations.
            </p>

            <div className="mt-8 space-y-3">
              <ContactRow
                icon={Mail}
                label="Email"
                value={profile.email}
                href={`mailto:${profile.email}`}
              />
              <ContactRow
                icon={LinkedinIcon}
                label="LinkedIn"
                value="linkedin.com/in/temitayocharles"
                href={profile.linkedin}
              />
              <ContactRow
                icon={GithubIcon}
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
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={`${label}: ${value}`} title={label} className="block group">
      {inner}
    </a>
  ) : (
    inner
  );
};

export default Contact;
