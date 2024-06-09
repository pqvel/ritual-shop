import { FC } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import UslugaForm from "../../_components/forms/usluga/UslugaForm";

const AddUslugaPage: FC = async () => {
  return (
    <>
      <Breadcrumb
        items={[
          { title: "Главная", href: "/admin" },
          {
            title: "Услуги",
            href: "/admin/uslugi",
          },
          {
            title: "Добавить услугу",
            href: `/admin/uslugi/add-usluga`,
          },
        ]}
      />
      <UslugaForm />
    </>
  );
};

export default AddUslugaPage;
