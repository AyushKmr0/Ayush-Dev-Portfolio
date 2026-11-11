
import { GraduationCap, MapPin, CheckCircle2 } from "lucide-react";

import { education } from "../data/about.data";

const EducationCard = () => {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-(--shadow-blue-hover)">

      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">
          Education
        </h3>

        <GraduationCap size={20} className="text-blue-600" />
      </div>

      <div className="space-y-5">
        {education.map((item) => (
          <div
            key={item.id}
            className="relative border-l-2 border-blue-100 pl-5"
          >
            <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-white bg-blue-600 ring-2 ring-blue-100" />

            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-blue-600">
                {item.status}
              </span>

              <CheckCircle2 size={14} className="text-green-500" />
            </div>

            <h4 className="mt-2 text-sm font-bold text-slate-800">
              {item.degree}
            </h4>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {item.institution}
            </p>

            <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
              <MapPin size={13} />
              {item.location}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default EducationCard;
