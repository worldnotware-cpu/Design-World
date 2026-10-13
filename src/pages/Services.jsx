import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import { SecHead } from '../components/Reveal.jsx';
import CategorySections, { CatNav } from '../components/CategorySections.jsx';
   import ProcessCarousel from '../components/ProcessCarousel.jsx';
const STEPS = [
  ['Welcome', '01-welcome'], ['Discussion & planning', '02-discussion'], ['Quotation approval', '03-quotation'], ['Designing', '04-designing'],
  ['Proofing', '05-proofing'], ['Printing', '06-printing'], ['Packing', '07-packing'], ['Delivery', '08-delivery'],
];
const ease = [0.2, 0.8, 0.2, 1];

export default function Services() {
  return (
    <>
      <Seo title="Design & Printing Services | Design World" path="/services" og="services"
        description="Explore Design World's design, printing, and branding services for businesses and individuals, from creative concepts to professional printed materials." />
      <PageHero title="Make your business impossible to overlook.">
        <p>From distinctive brand identities to professionally printed materials, we turn ideas into designs that get noticed.</p>
        <Link className="btn btn-green" to="/contact">Start a project</Link>
      </PageHero>

      <section className="sec" aria-labelledby="work-h">
        <div className="wrap">
          <SecHead eyebrow="Portfolio" title="Work we are proud of" id="work-h">
            <p>Business cards, wedding invitations, banners, brochures and more &mdash; a selection of what we have designed and printed for businesses and families across Salem and beyond.</p>
          </SecHead>
          <CatNav />
        </div>
      </section>

      <CategorySections />

      <section className="sec" aria-labelledby="proc-h">
        <div className="wrap">
          <SecHead eyebrow="How we work" title="A simple process, from idea to delivery" id="proc-h" />
         <ProcessCarousel steps={STEPS} />
        </div>
      </section>
    </>
  );
}