import MainLayout from "@/components/layouts/MainLayout";
import { Container } from "@/components/ui/Wrappers";
import { FC } from "react";
import { Title } from "@/components/ui/Typography";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CatalogSection from "@/components/catalog/CatalogSection";

import dynamic from "next/dynamic";

const ContactsMap = dynamic(() => import("@/components/ymaps/ContactsMap"), {
  ssr: false,
});

const ContactsPage: FC = () => {
  return (
    <MainLayout>
      <CatalogSection>
        <Container>
          <Breadcrumb
            items={[
              { title: "Главная", href: "/" },
              { title: "Контакты", href: "/contacts" },
            ]}
          />
          <Title level={1}>Контакты</Title>
          <div className="bg-white p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-10 shadow-sm">
            <address className="flex flex-col p-4 space-y-4 bg-gray-100 rounded-lg shadow-md not-italic">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  Телефон:
                </h2>
                <a
                  href="tel:+375296777400"
                  className="text-blue-500 hover:underline"
                >
                  +375 (29) 677-74-00
                </a>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Почта:</h2>
                <a
                  href="mailto:ritual-sculpture@mail.ru"
                  className="text-blue-500 hover:underline"
                >
                  ritual-sculpture@mail.ru
                </a>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  Режим работы:
                </h2>
                <p className="text-gray-600">Круглосуточно</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Адрес:</h2>
                <p className="text-gray-600">Михалишки дом 15</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700">УНП:</h2>
                <p className="text-gray-600">590264434</p>
              </div>
            </address>
            <div className="flex relative w-full pt-[100%] lg:h-[500px] lg:pt-0">
              <ContactsMap />
            </div>
          </div>
        </Container>
      </CatalogSection>
    </MainLayout>
  );
};

export default ContactsPage;
