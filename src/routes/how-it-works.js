import i18next from 'i18next';
import ContentBody from "../components/content-body";
import  "../i18n";
const HowItWorks = () => {
  return (
    <div className="route--how-it-works">
      <ContentBody heading={i18next.t("how_it_works.heading")} body={i18next.t("how_it_works.body")} />
    </div>
  );
}

export default HowItWorks;
