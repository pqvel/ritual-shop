import MainLayout from "@/components/layouts/MainLayout";
import { Container } from "@/components/ui/Wrappers";
import { FC } from "react";
import { Title } from "@/components/ui/Typography";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CatalogSection from "@/components/catalog/CatalogSection";

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
          <div className="bg-white p-4 rounded-lg grid grid-cols-[2fr,1fr] gap-20 shadow-sm">
            <div className="flex flex-col">
              <p className="">
                Ritual-sculpture.by - Мы изготавливаем памятники, ограды и
                фурнитуру
              </p>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <h5>Телефоны:</h5>
                  <ul>
                    <li>
                      <a href="tel:+375299999999">+375 (29) 999-99-99</a>
                    </li>
                    <li>
                      <a href="tel:+375299999999">+375 (29) 999-99-99</a>
                    </li>
                  </ul>
                  <h5>Email:</h5>
                  <ul>
                    <li>
                      <a href="mailto:example@gmail.com">example@gmail.com</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </Container>
      </CatalogSection>
    </MainLayout>
  );
};

export default ContactsPage;
