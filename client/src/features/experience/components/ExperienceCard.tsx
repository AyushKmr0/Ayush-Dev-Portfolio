
import {
  Building2,
  CalendarDays,
  MapPin,
  BriefcaseBusiness,
  CheckCircle2,
} from "lucide-react";

import type { Experience } from "../types/experience.types";

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({
  experience,
}: ExperienceCardProps) => {
  const period = [
    experience.startDate,
    experience.endDate,
  ]
    .filter(Boolean)
    .join(" — ");

  return (
    <article className="
      group rounded-2xl border border-blue-100
      bg-white p-5
      transition-all duration-300
      hover:-translate-y-1 hover:border-blue-300 shadow-(--shadow-blue-hover)
      hover:shadow-(--shadow-multi-secondary)
      sm:p-7
    ">
      <div className="flex flex-wrap items-start justify-between gap-4">

        <div className="flex items-start gap-3">
          <div className="
            flex h-12 w-12 shrink-0 items-center
            justify-center rounded-xl bg-blue-50
            text-blue-600
          ">
            <Building2 size={22} />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {experience.company}
            </h3>

            <p className="mt-1 text-sm font-medium text-blue-600">
              {experience.role}
            </p>
          </div>
        </div>

        <span className="
          rounded-lg border border-blue-100
          bg-blue-50 px-3 py-1.5
          font-mono text-[10px] font-semibold
          uppercase tracking-wider text-blue-700
        ">
          {experience.type}
        </span>
      </div>

      <div className="
        mt-6 flex flex-wrap gap-x-5 gap-y-3
        border-y border-slate-100 py-4
      ">
        {period && (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CalendarDays size={14} className="text-blue-500" />
            {period}
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <MapPin size={14} className="text-blue-500" />
          {experience.location}
        </div>

        {experience.current && (
          <div className="flex items-center gap-2 text-xs text-green-600">
            <CheckCircle2 size={14} />
            Currently working
          </div>
        )}
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-2">
          <BriefcaseBusiness size={15} className="text-blue-600" />

          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Overview
          </h4>
        </div>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          {experience.description}
        </p>
      </div>

      {experience.responsibilities.length > 0 && (
        <div className="mt-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Key Responsibilities
          </h4>

          <ul className="mt-3 space-y-3">
            {experience.responsibilities.map((item, index) => (
              <li
                key={`${experience.id}-responsibility-${index}`}
                className="flex items-start gap-3 text-sm leading-6 text-slate-600"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {experience.technologies.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {experience.technologies.map((technology) => (
            <span
              key={`${experience.id}-${technology}`}
              className="
                rounded-md border border-slate-200
                bg-slate-50 px-3 py-1.5
                font-mono text-[11px] text-slate-600
              "
            >
              {technology}
            </span>
          ))}
        </div>
      )}
    </article>
  );
};

export default ExperienceCard;
