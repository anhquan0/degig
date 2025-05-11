import { ExternalLink } from "lucide-react";

import { type ParentSkills } from "@/interface/skills";
import { getURLSanitized } from "@/utils/getURLSanitized";

interface ExtraInfoSectionProps {
  skills?: ParentSkills[];
  pocSocials?: string | undefined;
  region?: string | undefined;
  isGrant?: boolean;
}

export function ExtraInfoSection({ skills, pocSocials }: ExtraInfoSectionProps) {
  return (
    <div className="flex w-full flex-col gap-8 pt-2 md:w-[22rem]">
      <div className="hidden w-full flex-col items-start gap-2 text-sm md:flex">
        <p className="h-full text-center font-semibold text-slate-600">SKILLS NEEDED</p>
        <div className="flex flex-wrap gap-3">
          {skills?.map((skill) => (
            <div key={skill} className="m-0 rounded-sm bg-slate-100 px-4 py-1 text-xs font-medium text-slate-600">
              {skill}
            </div>
          ))}
        </div>
      </div>

      {pocSocials && (
        <div className="hidden w-full flex-col items-start gap-2 text-sm md:flex">
          <p className="h-full text-center font-semibold text-slate-600">CONTACT</p>
          <div>
            <a
              className="ph-no-capture inline items-center font-medium text-[#64768b]"
              href={getURLSanitized(pocSocials)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Reach out
              <ExternalLink className="mx-1 mb-1 inline h-4 w-4 text-[#64768b]" />
            </a>
            <span className="inline text-slate-500">if you have any questions about this job</span>
          </div>
        </div>
      )}
    </div>
  );
}
