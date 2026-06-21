'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    
    // Append the Web3Forms Access Key from env variable
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    
    if (!accessKey) {
      console.error("Web3Forms access key is missing");
      setStatus('error');
      setMessage("Contact form is not fully configured. Please try again later.");
      return;
    }
    
    formData.append("access_key", accessKey);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const data = await res.json();
      
      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'Message sent successfully!');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Failed to send message. Please try again.');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
        <input 
          type="text" 
          id="name" 
          name="name"
          required
          className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email"
          required
          className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
        <textarea 
          id="message" 
          name="message"
          rows={5}
          required
          className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
          placeholder="How can I help you?"
        />
      </div>

      {/* Web3Forms hidden configuration fields */}
      <input type="hidden" name="subject" value="New Submission from Portfolio Contact Form" />
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

      {status === 'success' && (
        <div className="flex items-center gap-2 p-3 text-sm text-green-600 bg-green-500/10 rounded-xl border border-green-500/20">
          <CheckCircle2 size={16} />
          <span>{message}</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-500/10 rounded-xl border border-red-500/20">
          <AlertCircle size={16} />
          <span>{message}</span>
        </div>
      )}

      <button 
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-foreground text-background rounded-xl font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending...' : (
          <>Send Message <Send size={18} /></>
        )}
      </button>
    </form>
  );
}
