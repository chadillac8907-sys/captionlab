import { useState } from "react";

const ACCESS_CODE = "CAPTIONLAB2024";
const CONTACT_EMAIL = "hello@captionlabhq.com";
const GUMROAD_URL = "https://chadillac6.gumroad.com/l/dcsuv";

const TONES = ["Professional","Casual & Fun","Inspirational","Witty & Edgy","Storytelling","Luxury Brand"];
const PLATFORMS = ["Instagram","TikTok","LinkedIn","Twitter/X","Facebook","YouTube"];
const CONTENT_TYPES = ["Product/Service","Motivational Quote","Behind the Scenes","Tutorial/Tips","Announcement","Personal Story"];

const TESTIMONIALS = [
  { name: "Sarah M.", role: "Content Creator · 84K followers", text: "I was shpending 2 hours every single day writing captions. CaptionLab cut that to 10 minutes. My engagement is actually up because I'm posting more consistently.", stars: 5 },
  { name: "Marcus T.", role: "Small Business Owner · E-commerce", text: "My LinkedIn engagement went up 40% the first month. The tone modes are exactly what I needed — I can sound professional without sounding robotic.", stars: 5 },
  { name: "Jess R.", role: "Freelance Social Media Manager", text: "I manage 8 clients across different industries. CaptionLab is now non-negotiable in my workflow. It pays for itself ten times over every month.", stars: 5 },
  { name: "Daniel K.", role: "Restaurant Owner · Miami", text: "We used to pay an agency $500/month for captions. Now I do it myself in minutes and it's honestly better. Huge win for our small business.", stars: 5 },
];

const FAQS = [
  { q: "Is it really unlimited?", a: "Yes. One flat monthly price covers unlimited caption generation across all platforms and tone modes. No credits, no caps, no surprises." },
  { q: "Will my captions sound like AI wrote them?", a: "No — that's the whole point. CaptionLab is trained to write in natural human voices. You control the tone, and the output sounds like you, just sharper." },
  { q: "What platforms does it support?", a: "Instagram, TikTok, LinkedIn, Twitter/X, Facebook, and YouTube. Each platform gets captions optimized for its specific audience and style." },
  { q: "Do I need to know anything about AI to use this?", a: "Not at all. You describe your post in plain English, pick your settings, and hit generate. That's it. No tech knowledge required." },
  { q: "Can I cancel anytime?", a: "Yes, completely. Cancel from your Gumroad account in one click. No questions, no fees, no hassle." },
  { q: "Is there a free trial?", a: "We don't offer a free trial currently, but given the low monthly price and instant cancel option, most people just jump in — and stay." },
];

const PRIVACY_POLICY = `Last updated: January 2024

CaptionLab ("we", "our", or "us") operates captionlab.io. This policy explains how we handle your information.

INFORMATION WE COLLECT
We collect only what's necessary to provide the service: your access code (for authentication) and the content you type into the generator (processed in real time to generate captions). We do not store your generated content after your session ends.

HOW WE USE YOUR INFORMATION
Solely to provide the captioning service. We do not sell, rent, or share your data with third parties for marketing purposes.

COOKIES
We use minimal session cookies to keep you logged in during your visit. No tracking cookies or third-party analytics.

PAYMENTS
Payments are handled entirely by Gumroad. We do not store or have access to your payment details.

CONTACT
Questions? Email us at ${CONTACT_EMAIL}`;

const TERMS = `Last updated: January 2024

By accessing CaptionLab, you agree to these terms.

THE SERVICE
CaptionLab provides AI-generated social media captions for personal and business use. You are responsible for reviewing all generated content before publishing.

ACCEPTABLE USE
You may use CaptionLab for lawful purposes only. You may not resell, redistribute, or share access with others. One subscription = one user.

CONTENT OWNERSHIP
Content you generate is yours. We claim no ownership over captions created using CaptionLab.

SUBSCRIPTION & BILLING
Subscriptions are billed monthly via Gumroad. Cancel anytime. No refunds for partial months, but you keep access until the end of your billing period.

DISCLAIMER
CaptionLab is provided "as is." We do not guarantee specific results, engagement rates, or outcomes from using generated content.

CONTACT
Questions? Email us at ${CONTACT_EMAIL}`;

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}

:root{
  --bg:#09090b;
  --surface:#111113;
  --surface2:#1a1a1e;
  --border:rgba(255,255,255,0.07);
  --border2:rgba(255,255,255,0.12);
  --text:#f0ede8;
  --muted:#7a7775;
  --muted2:#5a5755;
  --accent:#e8f55a;
  --accent2:#c8d94a;
  --teal:#5af5d4;
  --rust:#f55a5a;
}

body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;}

/* ── SCROLLBAR ── */
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-track{background:var(--bg);}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:4px;}

/* ── NAV ── */
.nav{
  display:flex;justify-content:space-between;align-items:center;
  padding:1.1rem 1.5rem;border-bottom:1px solid var(--border);
  position:sticky;top:0;background:rgba(9,9,11,0.92);
  backdrop-filter:blur(12px);z-index:100;
}
.logo{
  font-family:'Syne',sans-serif;font-size:1.25rem;font-weight:800;
  letter-spacing:-0.02em;display:flex;align-items:center;gap:0.4rem;
}
.logo-dot{
  width:8px;height:8px;border-radius:50%;background:var(--accent);
  display:inline-block;
}
.nav-right{display:flex;align-items:center;gap:0.8rem;}
.nav-link{
  font-size:0.82rem;color:var(--muted);cursor:pointer;
  background:none;border:none;font-family:'DM Sans',sans-serif;
  transition:color 0.15s;padding:0.2rem;
}
.nav-link:hover{color:var(--text);}
.nav-cta{
  background:var(--accent);color:var(--bg);border:none;
  padding:0.55rem 1.2rem;border-radius:0.4rem;
  font-family:'Syne',sans-serif;font-size:0.82rem;font-weight:700;
  cursor:pointer;transition:all 0.2s;letter-spacing:0.01em;
}
.nav-cta:hover{background:var(--accent2);transform:translateY(-1px);}

/* ── HERO ── */
.hero{
  padding:5rem 1.5rem 4rem;text-align:center;
  position:relative;overflow:hidden;
}
.hero::before{
  content:'';position:absolute;
  width:600px;height:600px;
  background:radial-gradient(circle,rgba(232,245,90,0.06) 0%,transparent 65%);
  top:-100px;left:50%;transform:translateX(-50%);
  pointer-events:none;
}
.hero-badge{
  display:inline-flex;align-items:center;gap:0.4rem;
  background:rgba(232,245,90,0.08);border:1px solid rgba(232,245,90,0.2);
  color:var(--accent);padding:0.35rem 0.9rem;border-radius:2rem;
  font-size:0.72rem;font-weight:500;letter-spacing:0.1em;
  text-transform:uppercase;margin-bottom:1.8rem;
}
.hero h1{
  font-family:'Syne',sans-serif;
  font-size:clamp(2.4rem,9vw,5.2rem);
  font-weight:800;line-height:0.95;
  letter-spacing:-0.04em;margin-bottom:1.5rem;
  max-width:640px;margin-left:auto;margin-right:auto;
}
.hero h1 .hl{color:var(--accent);}
.hero h1 .it{font-family:'Instrument Serif',serif;font-weight:400;font-style:italic;}
.hero-sub{
  font-size:1rem;color:var(--muted);max-width:440px;
  margin:0 auto 2.5rem;line-height:1.7;
}
.hero-actions{display:flex;gap:0.8rem;justify-content:center;flex-wrap:wrap;}
.btn-primary{
  background:var(--accent);color:var(--bg);border:none;
  padding:0.85rem 1.8rem;border-radius:0.4rem;
  font-family:'Syne',sans-serif;font-size:0.88rem;font-weight:700;
  cursor:pointer;transition:all 0.2s;letter-spacing:0.01em;
}
.btn-primary:hover{background:var(--accent2);transform:translateY(-1px);}
.btn-ghost{
  background:transparent;color:var(--text);
  border:1px solid var(--border2);
  padding:0.85rem 1.8rem;border-radius:0.4rem;
  font-family:'DM Sans',sans-serif;font-size:0.88rem;font-weight:400;
  cursor:pointer;transition:all 0.2s;
}
.btn-ghost:hover{border-color:var(--accent);color:var(--accent);}

/* ── TICKER ── */
.ticker-wrap{
  overflow:hidden;border-top:1px solid var(--border);border-bottom:1px solid var(--border);
  padding:0.8rem 0;background:var(--surface);
}
.ticker{
  display:flex;gap:2rem;white-space:nowrap;
  animation:ticker 20s linear infinite;
}
.ticker-item{
  font-family:'Syne',sans-serif;font-size:0.75rem;font-weight:600;
  letter-spacing:0.12em;text-transform:uppercase;
  color:var(--muted2);display:flex;align-items:center;gap:0.6rem;flex-shrink:0;
}
.ticker-dot{color:var(--accent);}
@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* ── HOW IT WORKS ── */
.section{padding:4rem 1.5rem;max-width:960px;margin:0 auto;}
.section-label{
  font-size:0.7rem;font-weight:600;letter-spacing:0.15em;
  text-transform:uppercase;color:var(--accent);margin-bottom:0.8rem;
}
.section-title{
  font-family:'Syne',sans-serif;font-size:clamp(1.8rem,5vw,2.8rem);
  font-weight:800;letter-spacing:-0.03em;margin-bottom:0.5rem;
  line-height:1.1;
}
.section-sub{color:var(--muted);font-size:0.95rem;line-height:1.7;max-width:460px;}

.steps{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
  gap:1px;background:var(--border);margin-top:2.5rem;
  border:1px solid var(--border);border-radius:0.8rem;overflow:hidden;
}
.step{
  background:var(--surface);padding:1.8rem 1.5rem;
  transition:background 0.2s;
}
.step:hover{background:var(--surface2);}
.step-num{
  font-family:'Instrument Serif',serif;font-size:3rem;
  font-style:italic;color:var(--accent);opacity:0.4;
  line-height:1;margin-bottom:0.8rem;
}
.step h3{
  font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;
  margin-bottom:0.4rem;letter-spacing:-0.01em;
}
.step p{font-size:0.84rem;color:var(--muted);line-height:1.6;}

/* ── FEATURES ── */
.features-grid{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:1rem;margin-top:2.5rem;
}
.feat-card{
  background:var(--surface);border:1px solid var(--border);
  border-radius:0.8rem;padding:1.5rem;transition:border-color 0.2s;
}
.feat-card:hover{border-color:var(--border2);}
.feat-icon{
  width:36px;height:36px;border-radius:0.4rem;
  background:rgba(232,245,90,0.1);display:flex;align-items:center;
  justify-content:center;font-size:1rem;margin-bottom:1rem;
}
.feat-card h3{
  font-family:'Syne',sans-serif;font-size:0.95rem;font-weight:700;
  margin-bottom:0.4rem;letter-spacing:-0.01em;
}
.feat-card p{font-size:0.83rem;color:var(--muted);line-height:1.6;}

/* ── TESTIMONIALS ── */
.testi-grid{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:1rem;margin-top:2.5rem;
}
.testi-card{
  background:var(--surface);border:1px solid var(--border);
  border-radius:0.8rem;padding:1.5rem;
}
.stars{color:var(--accent);font-size:0.75rem;letter-spacing:0.1em;margin-bottom:0.9rem;}
.testi-text{font-size:0.88rem;line-height:1.7;color:var(--text);margin-bottom:1.2rem;font-style:italic;}
.testi-name{
  font-family:'Syne',sans-serif;font-size:0.82rem;font-weight:700;
  margin-bottom:0.2rem;letter-spacing:-0.01em;
}
.testi-role{font-size:0.76rem;color:var(--muted);}

/* ── PRICING ── */
.pricing-wrap{padding:4rem 1.5rem;text-align:center;}
.pricing-card{
  max-width:380px;margin:2rem auto 0;
  background:var(--surface);border:1px solid var(--border2);
  border-radius:1rem;padding:2rem;text-align:left;
  position:relative;overflow:hidden;
}
.pricing-card::after{
  content:'';position:absolute;
  width:300px;height:300px;
  background:radial-gradient(circle,rgba(232,245,90,0.05) 0%,transparent 70%);
  top:-100px;right:-100px;pointer-events:none;
}
.price-tag{
  display:inline-block;background:rgba(232,245,90,0.1);
  border:1px solid rgba(232,245,90,0.25);color:var(--accent);
  font-size:0.7rem;font-weight:600;letter-spacing:0.1em;
  text-transform:uppercase;padding:0.25rem 0.7rem;
  border-radius:2rem;margin-bottom:1.5rem;
}
.price-num{
  font-family:'Syne',sans-serif;font-size:3.8rem;
  font-weight:800;letter-spacing:-0.04em;line-height:1;
  color:var(--text);
}
.price-num sup{font-size:1.5rem;vertical-align:top;margin-top:0.5rem;}
.price-num sub{font-size:1rem;font-weight:400;color:var(--muted);}
.price-desc{font-size:0.8rem;color:var(--muted);margin:0.3rem 0 1.5rem;}
.price-list{list-style:none;margin-bottom:1.8rem;}
.price-list li{
  padding:0.55rem 0;font-size:0.88rem;color:var(--muted);
  border-bottom:1px solid var(--border);
  display:flex;align-items:center;gap:0.6rem;
}
.price-list li:last-child{border-bottom:none;}
.price-list .chk{color:var(--accent);font-size:0.75rem;}

/* ── FAQ ── */
.faq-list{margin-top:2.5rem;}
.faq-item{
  border-bottom:1px solid var(--border);
  overflow:hidden;
}
.faq-q{
  width:100%;background:none;border:none;color:var(--text);
  font-family:'Syne',sans-serif;font-size:0.95rem;font-weight:600;
  text-align:left;padding:1.2rem 0;cursor:pointer;
  display:flex;justify-content:space-between;align-items:center;
  gap:1rem;letter-spacing:-0.01em;
  transition:color 0.15s;
}
.faq-q:hover{color:var(--accent);}
.faq-icon{
  font-size:1.2rem;color:var(--muted);flex-shrink:0;
  transition:transform 0.25s,color 0.15s;
}
.faq-icon.open{transform:rotate(45deg);color:var(--accent);}
.faq-a{
  font-size:0.88rem;color:var(--muted);line-height:1.75;
  max-height:0;overflow:hidden;transition:max-height 0.3s ease,padding 0.3s;
}
.faq-a.open{max-height:200px;padding-bottom:1.2rem;}

/* ── FOOTER ── */
.footer{
  border-top:1px solid var(--border);
  padding:2rem 1.5rem;
  display:flex;flex-direction:column;align-items:center;gap:1rem;
}
.footer-logo{
  font-family:'Syne',sans-serif;font-size:1rem;font-weight:800;
  letter-spacing:-0.02em;display:flex;align-items:center;gap:0.35rem;
}
.footer-links{display:flex;gap:1.5rem;flex-wrap:wrap;justify-content:center;}
.footer-link{
  font-size:0.78rem;color:var(--muted);cursor:pointer;
  background:none;border:none;font-family:'DM Sans',sans-serif;
  transition:color 0.15s;
}
.footer-link:hover{color:var(--accent);}
.footer-copy{font-size:0.74rem;color:var(--muted2);}

/* ── MODAL ── */
.modal-bg{
  position:fixed;inset:0;background:rgba(0,0,0,0.85);
  backdrop-filter:blur(4px);z-index:500;
  display:flex;align-items:flex-end;justify-content:center;
  padding:0;
}
.modal-box{
  background:var(--surface);border:1px solid var(--border2);
  border-radius:1rem 1rem 0 0;width:100%;max-width:600px;
  max-height:80vh;overflow-y:auto;padding:1.5rem;
}
.modal-header{
  display:flex;justify-content:space-between;align-items:center;
  margin-bottom:1.2rem;position:sticky;top:0;
  background:var(--surface);padding-bottom:0.8rem;
  border-bottom:1px solid var(--border);
}
.modal-title{
  font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700;
}
.modal-close{
  background:none;border:none;color:var(--muted);
  font-size:1.4rem;cursor:pointer;padding:0.2rem;
  transition:color 0.15s;line-height:1;
}
.modal-close:hover{color:var(--text);}
.modal-body{font-size:0.82rem;color:var(--muted);line-height:1.8;white-space:pre-wrap;}

/* ── LOGIN ── */
.login-wrap{
  min-height:100vh;display:flex;align-items:center;
  justify-content:center;padding:2rem;
  background:var(--bg);
}
.login-card{
  background:var(--surface);border:1px solid var(--border2);
  border-radius:1rem;padding:2.5rem 2rem;
  width:100%;max-width:360px;text-align:center;
}
.login-badge{
  width:48px;height:48px;border-radius:0.6rem;
  background:rgba(232,245,90,0.1);border:1px solid rgba(232,245,90,0.2);
  display:flex;align-items:center;justify-content:center;
  font-size:1.4rem;margin:0 auto 1.2rem;
}
.login-card h2{
  font-family:'Syne',sans-serif;font-size:1.5rem;font-weight:800;
  letter-spacing:-0.03em;margin-bottom:0.3rem;
}
.login-card p{font-size:0.83rem;color:var(--muted);margin-bottom:1.8rem;line-height:1.5;}
.login-input{
  width:100%;background:var(--surface2);border:1.5px solid var(--border);
  color:var(--text);font-family:'Syne',sans-serif;font-size:1rem;font-weight:600;
  padding:0.85rem 1rem;border-radius:0.5rem;letter-spacing:0.15em;
  text-align:center;margin-bottom:1rem;outline:none;transition:border-color 0.2s;
}
.login-input:focus{border-color:var(--accent);}
.login-input::placeholder{color:var(--muted);font-weight:400;letter-spacing:0.05em;}
.login-btn{
  width:100%;background:var(--accent);color:var(--bg);border:none;
  padding:0.85rem;border-radius:0.5rem;font-family:'Syne',sans-serif;
  font-size:0.88rem;font-weight:700;cursor:pointer;transition:all 0.2s;
}
.login-btn:hover{background:var(--accent2);}
.login-err{color:var(--rust);font-size:0.8rem;margin-top:0.5rem;}
.back-btn{
  display:block;margin-top:1.5rem;font-size:0.8rem;
  color:var(--muted);cursor:pointer;text-decoration:underline;
  background:none;border:none;font-family:'DM Sans',sans-serif;
  transition:color 0.15s;
}
.back-btn:hover{color:var(--text);}

/* ── APP ── */
.app-nav{
  display:flex;justify-content:space-between;align-items:center;
  padding:1rem 1.5rem;border-bottom:1px solid var(--border);
  position:sticky;top:0;background:rgba(9,9,11,0.95);
  backdrop-filter:blur(12px);z-index:50;
}
.app-body{padding:1.5rem;max-width:680px;margin:0 auto;}
.app-title{
  font-family:'Syne',sans-serif;font-size:1.5rem;font-weight:800;
  letter-spacing:-0.03em;margin-bottom:0.2rem;
}
.app-sub{font-size:0.83rem;color:var(--muted);margin-bottom:1.8rem;}

.form-block{
  background:var(--surface);border:1px solid var(--border);
  border-radius:0.8rem;padding:1.3rem;margin-bottom:1rem;
}
.form-block-label{
  font-size:0.68rem;font-weight:600;letter-spacing:0.12em;
  text-transform:uppercase;color:var(--muted);margin-bottom:0.8rem;
  display:flex;align-items:center;gap:0.4rem;
}
.form-block-label span{
  background:rgba(232,245,90,0.1);color:var(--accent);
  width:18px;height:18px;border-radius:0.25rem;
  display:inline-flex;align-items:center;justify-content:center;
  font-size:0.65rem;font-weight:700;
}
.pill-row{display:flex;flex-wrap:wrap;gap:0.45rem;}
.pill{
  background:var(--surface2);border:1px solid var(--border);
  padding:0.4rem 0.9rem;border-radius:0.3rem;font-size:0.8rem;
  cursor:pointer;transition:all 0.15s;font-family:'DM Sans',sans-serif;
  color:var(--muted);
}
.pill.on{background:rgba(232,245,90,0.12);border-color:rgba(232,245,90,0.35);color:var(--accent);}
.pill:hover:not(.on){border-color:var(--border2);color:var(--text);}

.textarea{
  width:100%;min-height:85px;background:var(--surface2);
  border:1.5px solid var(--border);border-radius:0.5rem;
  padding:0.8rem 1rem;font-family:'DM Sans',sans-serif;
  font-size:0.88rem;color:var(--text);resize:vertical;
  outline:none;transition:border-color 0.2s;line-height:1.6;
}
.textarea:focus{border-color:var(--accent);}
.textarea::placeholder{color:var(--muted2);}
.char-ct{font-size:0.72rem;color:var(--muted2);text-align:right;margin-top:0.3rem;}

.gen-btn{
  width:100%;background:var(--accent);color:var(--bg);border:none;
  padding:0.95rem;border-radius:0.5rem;font-family:'Syne',sans-serif;
  font-size:0.9rem;font-weight:700;cursor:pointer;
  transition:all 0.2s;letter-spacing:0.01em;margin-top:0.5rem;
}
.gen-btn:hover:not(:disabled){background:var(--accent2);transform:translateY(-1px);}
.gen-btn:disabled{opacity:0.4;cursor:not-allowed;transform:none;}

.loading-row{display:flex;align-items:center;justify-content:center;gap:5px;padding:2rem;}
.dot{
  width:6px;height:6px;background:var(--accent);border-radius:50%;
  animation:blink 0.9s infinite;
}
.dot:nth-child(2){animation-delay:0.15s;}
.dot:nth-child(3){animation-delay:0.3s;}
@keyframes blink{0%,80%,100%{transform:scale(0.5);opacity:0.3;}40%{transform:scale(1);opacity:1;}}

.results{margin-top:1.5rem;}
.results-header{
  display:flex;justify-content:space-between;align-items:center;
  margin-bottom:1rem;
}
.results-label{
  font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;letter-spacing:-0.01em;
}
.result-card{
  background:var(--surface);border:1px solid var(--border);
  border-radius:0.8rem;padding:1.2rem 1.3rem;margin-bottom:0.8rem;
  transition:border-color 0.2s;
}
.result-card:hover{border-color:var(--border2);}
.result-tag{
  font-size:0.67rem;font-weight:600;letter-spacing:0.12em;
  text-transform:uppercase;color:var(--accent);margin-bottom:0.6rem;
}
.result-text{
  font-size:0.9rem;line-height:1.7;color:var(--text);
  white-space:pre-wrap;word-break:break-word;
}
.copy-btn{
  margin-top:0.7rem;background:var(--surface2);border:1px solid var(--border);
  padding:0.35rem 0.8rem;border-radius:0.3rem;font-size:0.75rem;
  color:var(--muted);cursor:pointer;transition:all 0.15s;
  font-family:'DM Sans',sans-serif;
}
.copy-btn:hover{background:rgba(232,245,90,0.1);border-color:var(--accent);color:var(--accent);}
.copy-btn.done{background:rgba(90,245,212,0.1);border-color:var(--teal);color:var(--teal);}

.error-box{
  background:rgba(245,90,90,0.08);border:1px solid rgba(245,90,90,0.2);
  border-radius:0.6rem;padding:1rem;margin-top:1rem;
  color:#f8a0a0;font-size:0.85rem;line-height:1.5;
}
.logout-btn{
  background:none;border:1px solid var(--border);color:var(--muted);
  padding:0.4rem 0.9rem;border-radius:0.3rem;font-family:'DM Sans',sans-serif;
  font-size:0.78rem;cursor:pointer;transition:all 0.15s;
}
.logout-btn:hover{border-color:var(--rust);color:var(--rust);}
.spacer{height:3rem;}
`;

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ title, body, onClose }) {
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">{body}</div>
      </div>
    </div>
  );
}

// ─── LANDING ──────────────────────────────────────────────────────────────────
function Landing({ onLogin, onBuy }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [modal, setModal] = useState(null);

  const tickerItems = ["Instagram","TikTok","LinkedIn","Twitter/X","Facebook","YouTube","6 Tone Modes","Unlimited Generations","Hashtag Packages","Hook Writing","CTA Generator"];
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* NAV */}
      <nav className="nav">
        <div className="logo"><span className="logo-dot" />CaptionLab</div>
        <div className="nav-right">
          <button className="nav-link" onClick={onLogin}>Sign in</button>
          <button className="nav-cta" onClick={onBuy}>Get Access →</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">⚡ AI-Powered · Built for Creators & Brands</div>
        <h1>
          Content that<br />
          <span className="it hl">actually</span><br />
          <span className="hl">converts.</span>
        </h1>
        <p className="hero-sub">
          Stop staring at a blank caption box. CaptionLab writes scroll-stopping posts for any platform — tailored to your voice, in seconds.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={onBuy}>Start for $9/month →</button>
          <button className="btn-ghost" onClick={onLogin}>I have an access code</button>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker">
          {doubled.map((item, i) => (
            <span className="ticker-item" key={i}>
              <span className="ticker-dot">◆</span>{item}
            </span>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="section">
        <p className="section-label">How it works</p>
        <h2 className="section-title">Three steps.<br />Zero hassle.</h2>
        <p className="section-sub">No learning curve. If you can describe what you're posting about, you can use CaptionLab.</p>
        <div className="steps">
          {[
            { n: "01", title: "Describe your post", desc: "Tell us what you're posting about — a product launch, a tip, a story, anything. One sentence is enough." },
            { n: "02", title: "Pick your settings", desc: "Choose your platform, tone, and content type. Mix and match for every brand voice you manage." },
            { n: "03", title: "Copy & post", desc: "Grab your hook, caption, hashtags, and CTA individually — or copy everything at once." },
          ].map(s => (
            <div className="step" key={s.n}>
              <div className="step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className="section" style={{ paddingTop: 0 }}>
        <p className="section-label">Features</p>
        <h2 className="section-title">Everything you need.<br />Nothing you don't.</h2>
        <div className="features-grid">
          {[
            { icon: "◆", title: "6 Platforms", desc: "Captions are formatted and optimized for Instagram, TikTok, LinkedIn, Twitter/X, Facebook, and YouTube." },
            { icon: "◎", title: "6 Tone Modes", desc: "Professional, Casual, Inspirational, Witty, Storytelling, and Luxury. One tool for every brand." },
            { icon: "⬡", title: "Scroll-Stopping Hooks", desc: "Every generation includes a powerful first line designed to stop the scroll before the caption even starts." },
            { icon: "◈", title: "Hashtag Packages", desc: "Platform-specific hashtag sets automatically included — no more guessing what tags to use." },
            { icon: "⟐", title: "Call-to-Action Builder", desc: "CTA suggestions included with every post. Drive clicks, follows, DMs, or sales." },
            { icon: "◍", title: "Copy in One Click", desc: "Copy individual sections or grab the whole post at once. Ready to paste straight into your scheduler." },
          ].map(f => (
            <div className="feat-card" key={f.title}>
              <div className="feat-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="section" style={{ paddingTop: 0 }}>
        <p className="section-label">What people say</p>
        <h2 className="section-title">Creators & businesses<br />love CaptionLab.</h2>
        <div className="testi-grid">
          {TESTIMONIALS.map(t => (
            <div className="testi-card" key={t.name}>
              <div className="stars">{"★".repeat(t.stars)}</div>
              <p className="testi-text">"{t.text}"</p>
              <div className="testi-name">{t.name}</div>
              <div className="testi-role">{t.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PRICING */}
      <div className="pricing-wrap">
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p className="section-label" style={{ textAlign: "center" }}>Pricing</p>
          <h2 className="section-title" style={{ textAlign: "center", maxWidth: 400, margin: "0 auto 0.5rem" }}>One price.<br />Unlimited content.</h2>
          <p style={{ textAlign: "center", color: "var(--muted)", fontSize: "0.9rem" }}>No tiers. No credits. No upsells.</p>
          <div className="pricing-card">
            <span className="price-tag">Monthly Plan</span>
            <div className="price-num"><sup>$</sup>9<sub>/mo</sub></div>
            <p className="price-desc">Billed monthly · Cancel anytime</p>
            <ul className="price-list">
              {["Unlimited caption generation","All 6 platforms supported","All 6 tone modes","Hooks, captions, CTAs & hashtags","New features added regularly","Email support"].map(f => (
                <li key={f}><span className="chk">✓</span>{f}</li>
              ))}
            </ul>
            <button className="btn-primary" style={{ width: "100%" }} onClick={onBuy}>Get Instant Access →</button>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="section">
        <p className="section-label">FAQ</p>
        <h2 className="section-title">Questions answered.</h2>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <div className="faq-item" key={i}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {item.q}
                <span className={`faq-icon ${openFaq === i ? "open" : ""}`}>+</span>
              </button>
              <div className={`faq-a ${openFaq === i ? "open" : ""}`}>{item.a}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo"><span className="logo-dot" />CaptionLab</div>
        <div className="footer-links">
          <button className="footer-link" onClick={() => setModal("privacy")}>Privacy Policy</button>
          <button className="footer-link" onClick={() => setModal("terms")}>Terms of Service</button>
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ textDecoration: "none" }}>
            <button className="footer-link">{CONTACT_EMAIL}</button>
          </a>
        </div>
        <p className="footer-copy">© 2024 CaptionLab. All rights reserved.</p>
      </footer>

      {modal === "privacy" && <Modal title="Privacy Policy" body={PRIVACY_POLICY} onClose={() => setModal(null)} />}
      {modal === "terms" && <Modal title="Terms of Service" body={TERMS} onClose={() => setModal(null)} />}
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function Login({ onSuccess, onBack }) {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!code.trim()) return;
    setLoading(true);
    setTimeout(() => {
      if (code.trim().toUpperCase() === ACCESS_CODE) {
        onSuccess();
      } else {
        setErr("Invalid access code. Check your confirmation email and try again.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-badge">⚡</div>
        <h2>Welcome back</h2>
        <p>Enter the access code from your purchase confirmation email to unlock CaptionLab.</p>
        <input
          className="login-input"
          placeholder="Your access code"
          value={code}
          onChange={e => { setCode(e.target.value); setErr(""); }}
          onKeyDown={e => e.key === "Enter" && submit()}
          autoFocus
        />
        <button className="login-btn" onClick={submit} disabled={loading || !code.trim()}>
          {loading ? "Checking..." : "Unlock CaptionLab →"}
        </button>
        {err && <div className="login-err">{err}</div>}
        <p style={{ fontSize: "0.76rem", color: "var(--muted)", marginTop: "1.2rem" }}>
          Don't have a code?{" "}
          <span onClick={onBack} style={{ color: "var(--accent)", cursor: "pointer" }}>
            Get access →
          </span>
        </p>
        <button className="back-btn" onClick={onBack}>← Back to home</button>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function Generator({ onLogout }) {
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Casual & Fun");
  const [type, setType] = useState("Product/Service");
  const [topic, setTopic] = useState("");
  const [extras, setExtras] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [copied, setCopied] = useState({});

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setResults(null);
    try {
      const prompt = `You are an expert social media copywriter. Generate content for the following brief:

Platform: ${platform}
Tone: ${tone}
Content Type: ${type}
Topic: ${topic}
${extras ? `Additional context: ${extras}` : ""}

Respond ONLY with a valid JSON object — no markdown, no backticks, no explanation:
{
  "hook": "A powerful scroll-stopping first line (1-2 sentences max). Bold and specific.",
  "caption": "Full caption optimized for ${platform} in a ${tone} tone. Use natural line breaks. Do NOT include hashtags here. 3-6 sentences.",
  "cta": "One punchy call-to-action sentence. Action-oriented.",
  "hashtags": "10 relevant hashtags for ${platform} as a single line starting with #"
}`;

      const res = await fetch("/.netlify/functions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }]
        }),
      });
      const data = await res.json();
      const raw = data.content?.find(b => b.type === "text")?.text || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      setResults(JSON.parse(clean));
    } catch {
      setResults({ error: true });
    }
    setLoading(false);
  };

  const copy = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopied(p => ({ ...p, [key]: true }));
    setTimeout(() => setCopied(p => ({ ...p, [key]: false })), 2000);
  };

  const copyAll = () => {
    if (!results || results.error) return;
    copy("all", `${results.hook}\n\n${results.caption}\n\n${results.cta}\n\n${results.hashtags}`);
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <nav className="app-nav">
        <div className="logo"><span className="logo-dot" />CaptionLab</div>
        <button className="logout-btn" onClick={onLogout}>Sign out</button>
      </nav>

      <div className="app-body">
        <h1 className="app-title">Generate Content</h1>
        <p className="app-sub">Fill in your details below — the whole thing takes under a minute.</p>

        {[
          { num: "1", label: "Platform", items: PLATFORMS, val: platform, set: setPlatform },
          { num: "2", label: "Tone", items: TONES, val: tone, set: setTone },
          { num: "3", label: "Content Type", items: CONTENT_TYPES, val: type, set: setType },
        ].map(block => (
          <div className="form-block" key={block.label}>
            <div className="form-block-label"><span>{block.num}</span>{block.label}</div>
            <div className="pill-row">
              {block.items.map(item => (
                <button key={item} className={`pill ${block.val === item ? "on" : ""}`} onClick={() => block.set(item)}>{item}</button>
              ))}
            </div>
          </div>
        ))}

        <div className="form-block">
          <div className="form-block-label"><span>4</span>What's your post about?</div>
          <textarea
            className="textarea"
            placeholder="e.g. My new handmade candle collection launching this Friday — vanilla oak and sea salt scents. Limited stock."
            value={topic}
            onChange={e => setTopic(e.target.value)}
          />
          <div className="char-ct">{topic.length} chars</div>
        </div>

        <div className="form-block">
          <div className="form-block-label"><span>5</span>Extra context <span style={{ background: "none", color: "var(--muted)", fontSize: "0.68rem", fontWeight: 400, textTransform: "lowercase", letterSpacing: 0 }}>optional</span></div>
          <textarea
            className="textarea"
            style={{ minHeight: "56px" }}
            placeholder="Brand name, website, offer, anything else you want included..."
            value={extras}
            onChange={e => setExtras(e.target.value)}
          />
        </div>

        <button className="gen-btn" onClick={generate} disabled={loading || !topic.trim()}>
          {loading ? "Generating..." : "⚡ Generate Content"}
        </button>

        {loading && (
          <div className="loading-row">
            <div className="dot" /><div className="dot" /><div className="dot" />
          </div>
        )}

        {results && !results.error && (
          <div className="results">
            <div className="results-header">
              <div className="results-label">Your content ⚡</div>
              <button className={`copy-btn ${copied.all ? "done" : ""}`} onClick={copyAll}>
                {copied.all ? "✓ All copied!" : "Copy all"}
              </button>
            </div>
            {[
              { key: "hook", label: "Hook — First line", text: results.hook },
              { key: "caption", label: "Caption", text: results.caption },
              { key: "cta", label: "Call to Action", text: results.cta },
              { key: "hashtags", label: "Hashtags", text: results.hashtags },
            ].map(item => (
              <div className="result-card" key={item.key}>
                <div className="result-tag">{item.label}</div>
                <div className="result-text">{item.text}</div>
                <button
                  className={`copy-btn ${copied[item.key] ? "done" : ""}`}
                  onClick={() => copy(item.key, item.text)}
                >
                  {copied[item.key] ? "✓ Copied" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        )}

        {results?.error && (
          <div className="error-box">
            Something went wrong generating your content. Please try again — if it keeps happening, email {CONTACT_EMAIL}.
          </div>
        )}
        <div className="spacer" />
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function CaptionLab() {
  const [view, setView] = useState("landing");
  const handleBuy = () => window.open(GUMROAD_URL, "_blank");
  return (
    <>
      <style>{css}</style>
      {view === "landing" && <Landing onLogin={() => setView("login")} onBuy={handleBuy} />}
      {view === "login"   && <Login onSuccess={() => setView("app")} onBack={() => setView("landing")} />}
      {view === "app"     && <Generator onLogout={() => setView("landing")} />}
    </>
  );
}
