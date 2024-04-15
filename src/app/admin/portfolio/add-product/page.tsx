import { FC } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";

type Props = {
  params: { category: string };
};

const getPortfolioPrudcts = async () => {};

const AddCategoryPage: FC<Props> = async ({ params }) => {
  // const parentCategory = await getCategories(params.category);

  return (
    <>
      <Breadcrumb
        items={[
          { title: "Главная", href: "/admin" },
          {
            title: "Портфолио",
            href: "/admin/portfolio",
          },
          {
            title: "Добавить изображение",
            href: `/admin/catalog/app-product`,
          },
        ]}
      />
      {/* <CategoryForm level={2} parentId={parentCategory.id} /> */}
    </>
  );
};

export default AddCategoryPage;
