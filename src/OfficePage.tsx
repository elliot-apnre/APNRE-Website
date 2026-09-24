import Header, { type NavLink } from './components/Header';
import OfficeHero from './components/OfficeHero';
import OfficeAbout from './components/OfficeAbout';
import Team from './components/Team';
import SuccessStories from './components/SuccessStories';
import WorkExamples from './components/WorkExamples';
import SwitchSection from './components/SwitchSection';
import AppraisalForm from './components/AppraisalForm';
import Faq from './components/Faq';
import FinalCta from './components/FinalCta';
import OfficesStrip from './components/OfficesStrip';
import Footer from './components/Footer';
import StickyMobileCta from './components/StickyMobileCta';
import type { Office } from './data/offices';
import { TEAM } from './data/team';

export default function OfficePage({ office }: { office: Office }) {
  const members = TEAM.filter((m) => m.office === office.id);

  const nav: NavLink[] = [
    { href: '#about', label: 'About' },
    { href: '#team', label: 'The Team' },
    ...(office.successStories.length > 0 ? [{ href: '#stories', label: 'Stories' }] : []),
    ...(office.workExamples.length > 0 ? [{ href: '#work', label: 'Our Work' }] : []),
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <>
      <Header nav={nav} currentOffice={office.id} />
      <main>
        <OfficeHero office={office} />
        <OfficeAbout office={office} />
        <Team
          members={members}
          heading={`Your ${office.name} team.`}
          lede="A named property manager you can reach directly."
        />
        <SuccessStories office={office} />
        <WorkExamples office={office} />
        <SwitchSection />
        <AppraisalForm office={office.id} />
        <Faq />
        <FinalCta />
        <OfficesStrip exclude={office.id} />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
