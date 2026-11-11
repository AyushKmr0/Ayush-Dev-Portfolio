import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Code2, Mail, Play, Send, X } from "lucide-react";

import { socialLinks } from "../../about/data/about.data";
import { sendContactMessage } from "../services/contact.service";
import {
	contactSchema,
	type ContactFormValues,
} from "../schemas/contact.schema";

type SubmissionStatus = "idle" | "sent" | "error";

const contactEmail =
	socialLinks.find((link) => link.name === "Email")?.url.replace("mailto:", "") ??
	"";

export function ContactForm() {
	const [status, setStatus] = useState<SubmissionStatus>("idle");

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ContactFormValues>({
		resolver: zodResolver(contactSchema),
		mode: "onBlur",
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
		},
	});

	const onSubmit = async (values: ContactFormValues) => {
		setStatus("idle");
		try {
			await sendContactMessage(values);
			setStatus("sent");
			reset();
		} catch {
			setStatus("error");
		}
	};

	const inputClass =
		"w-full rounded-md border border-slate-200 bg-white px-3.5 py-3 font-mono text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
	const labelClass =
		"mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500";
	const errorClass = "mt-1.5 text-xs text-rose-600";

	return (
		<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-(--shadow-blue-hover)">
			<div className="flex items-center border-b border-slate-200 bg-slate-100">
				<div className="flex items-center gap-2 border-t-2 border-orange-500 rounded-tr-lg bg-white px-4 py-3 font-mono text-xs text-slate-700">
					<span className="font-bold text-blue-600">TS</span>
					<span>sendMessage.ts</span>
					<X size={12} className="ml-2 text-slate-400" aria-hidden="true" />
				</div>
				<div className="ml-auto hidden items-center gap-1.5 px-4 font-mono text-[10px] text-slate-500 sm:flex">
					<Code2 size={13} /> request.client
				</div>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6" noValidate>
				<div className="overflow-hidden rounded-xl border border-orange-200 bg-white">
					<div className="flex items-center justify-between gap-3 border-b border-orange-100 bg-orange-50/60 px-4 py-3">
						<div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-700">
							<Mail size={15} className="text-orange-600" />
							mail.compose
						</div>
						<span className="font-mono text-[10px] text-slate-500">POST /contact</span>
					</div>
					<div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2 font-mono text-[10px]">
						<span className="text-slate-500">
							to: <span className="text-orange-700">{contactEmail}</span>
						</span>
						<span className="text-slate-500">
							content-type: <span className="text-blue-700">application/json</span>
						</span>
					</div>

					<div className="space-y-4 p-4 sm:p-5">
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div>
								<label htmlFor="contact-name" className={labelClass}>Name</label>
								<input
									id="contact-name"
									{...register("name")}
									placeholder="Your name"
									className={inputClass}
									aria-invalid={Boolean(errors.name)}
								/>
								{errors.name && <p className={errorClass}>{errors.name.message}</p>}
							</div>
							<div>
								<label htmlFor="contact-email" className={labelClass}>Email</label>
								<input
									id="contact-email"
									type="email"
									autoComplete="email"
									{...register("email")}
									placeholder="you@example.com"
									className={inputClass}
									aria-invalid={Boolean(errors.email)}
								/>
								{errors.email && <p className={errorClass}>{errors.email.message}</p>}
							</div>
						</div>

						<div>
							<label htmlFor="contact-subject" className={labelClass}>Subject</label>
							<input
								id="contact-subject"
								{...register("subject")}
								placeholder="Project inquiry / Collaboration"
								className={inputClass}
								aria-invalid={Boolean(errors.subject)}
							/>
							{errors.subject && <p className={errorClass}>{errors.subject.message}</p>}
						</div>

						<div>
							<label htmlFor="contact-message" className={labelClass}>Message</label>
							<textarea
								id="contact-message"
								{...register("message")}
								rows={5}
								placeholder="Tell me about your project, timeline, and goals..."
								className={`${inputClass} min-h-36 resize-y`}
								aria-invalid={Boolean(errors.message)}
							/>
							{errors.message && <p className={errorClass}>{errors.message.message}</p>}
						</div>

						<p className="font-mono text-[10px] text-slate-400">
							// Your message is sent as a JSON request.
						</p>
					</div>
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					className="mt-5 inline-flex items-center gap-2 rounded-lg border border-orange-500 bg-orange-50 px-3 py-2 text-sm font-bold uppercase tracking-wide text-orange-700 transition hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-60">
					{isSubmitting ? <Send size={15} className="animate-pulse" /> : <Play size={15} className="fill-current" />}
					{isSubmitting ? "Sending..." : "Send message"}
				</button>

				{status === "sent" && (
					<p role="status" className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
						Message sent successfully. Thanks for reaching out.
					</p>
				)}
				{status === "error" && (
					<p role="alert" className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
						Message could not be sent. Please try again or email me directly.
					</p>
				)}
			</form>
		</div>
	);
}
