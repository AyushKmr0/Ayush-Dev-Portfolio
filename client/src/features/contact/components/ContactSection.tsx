import SectionWrapper from "../../../components/common/SectionWrapper";
import SectionHeading from "../../../components/common/SectionHeading";

import { ContactInfo } from "./ContactInfo";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <SectionWrapper id="contact">
      <div className="space-y-10">
        <SectionHeading
          label="CONTACT"
          title="Let's work together"
          command="$ ./contact.exe"
          description="Have an opportunity or an interesting idea? Feel free to reach out."
        />

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </SectionWrapper>
  );
}
