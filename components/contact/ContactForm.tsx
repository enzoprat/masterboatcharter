'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(4, 'Required'),
  subject: z.string().min(2, 'Required'),
  message: z.string().min(10, 'Required'),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    // Demo: simulate request
    await new Promise((r) => setTimeout(r, 900));
    console.log('Contact submission', data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label={t('name')} error={errors.name?.message}>
          <input
            type="text"
            {...register('name')}
            className={inputCls}
            autoComplete="name"
          />
        </Field>
        <Field label={t('email')} error={errors.email?.message}>
          <input
            type="email"
            {...register('email')}
            className={inputCls}
            autoComplete="email"
          />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label={t('phone')} error={errors.phone?.message}>
          <input
            type="tel"
            {...register('phone')}
            className={inputCls}
            autoComplete="tel"
          />
        </Field>
        <Field label={t('subject')} error={errors.subject?.message}>
          <input type="text" {...register('subject')} className={inputCls} />
        </Field>
      </div>
      <Field label={t('message')} error={errors.message?.message}>
        <textarea {...register('message')} className={cn(inputCls, 'min-h-[160px] resize-y')} />
      </Field>
      <button
        type="submit"
        disabled={isSubmitting || submitted}
        className="btn-primary w-full sm:w-auto text-base px-8 py-4 disabled:opacity-60"
      >
        {submitted ? (
          <>
            <Check className="h-4 w-4" strokeWidth={2} /> Sent
          </>
        ) : isSubmitting ? (
          t('sending')
        ) : (
          <>
            {t('send')}
            <Send className="h-4 w-4" strokeWidth={1.5} />
          </>
        )}
      </button>
    </form>
  );
}

const inputCls =
  'w-full bg-white border border-sand-300 rounded-2xl px-4 py-3.5 text-deep-700 placeholder-deep-300 focus:border-deep-500 focus:ring-2 focus:ring-deep-200 transition-all duration-300 outline-none';

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider2 text-deep-500 font-medium mb-2">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
