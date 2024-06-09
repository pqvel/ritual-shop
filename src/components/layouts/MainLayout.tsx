"use server";
import { FC, ReactNode } from "react";
import { Container, Grid } from "@/components/ui/Wrappers";
import Header from "@/components/header/Header";
import db from "@/db";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

const getCategories = async () => {
  return await db.category.findMany({
    where: {
      active: true,
      level: 1,
    },
    orderBy: {
      id: "asc",
    },
    include: {
      childCategories: {
        where: {
          active: true,
          level: 2,
        },
        orderBy: {
          id: "asc",
        },
      },
    },
  });
};

const MainLayout: FC<Props> = async ({ children }) => {
  // const categories = await getCategories();
  return (
    <>
      <Header />
      <main className="flex flex-col pt-[80px] lg:pt-[146px] bg-gray-100 flex-1">
        {children}
      </main>
      <footer className=" bg-black bg-opacity-80 py-10 text-white">
        <Container>
          <div className="">
            <div className="text-sm">
              © ritual-sculpture.by 2024г. ИП Скрипко Леонид Иосифович
              Свидетельство о гос. регистрации: 590264434, выдано 17.06.2011г.
              Островецким районным исполнительным комитетом ©
              {/* ritual-sculpture.by 2024г | УНП 590264434 */}
            </div>
            {/* <div className="grid grid-cols-2 gap-8">
              {categories.map((category) => (
                <div key={category.id}>
                  <Link
                    className="flex font-medium mb-2  lg:hover:underline underline-offset-2"
                    href={`/catalog/${category.slug}`}
                  >
                    {category.title}
                  </Link>
                  <ul className="grid grid-cols-1 gap-1">
                    {category.childCategories.map((childCategory) => (
                      <li className="flex" key={childCategory.id}>
                        <Link
                          className=" text-gray-200 transition lg:hover:text-gray-100 lg:hover:underline underline-offset-2"
                          href={`/catalog/${category.slug}/${childCategory.slug}`}
                        >
                          {childCategory.title}
                        </Link>
                      </li>
                    ))}
                    {category.childCategories.map((childCategory) => (
                      <li className="flex" key={childCategory.id}>
                        <Link
                          className=" text-gray-200 transition lg:hover:text-gray-100 lg:hover:underline underline-offset-2"
                          href={`/catalog/${category.slug}/${childCategory.slug}`}
                        >
                          {childCategory.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {categories.map((category) => (
                <div key={category.id}>
                  <Link
                    className="flex font-medium mb-2  lg:hover:underline underline-offset-2"
                    href={`/catalog/${category.slug}`}
                  >
                    {category.title}
                  </Link>
                  <ul className="grid grid-cols-1 gap-1">
                    {category.childCategories.map((childCategory) => (
                      <li className="flex" key={childCategory.id}>
                        <Link
                          className=" text-gray-200 transition lg:hover:text-gray-100 lg:hover:underline underline-offset-2"
                          href={`/catalog/${category.slug}/${childCategory.slug}`}
                        >
                          {childCategory.title}
                        </Link>
                      </li>
                    ))}
                    {category.childCategories.map((childCategory) => (
                      <li className="flex" key={childCategory.id}>
                        <Link
                          className=" text-gray-200 transition lg:hover:text-gray-100 lg:hover:underline underline-offset-2"
                          href={`/catalog/${category.slug}/${childCategory.slug}`}
                        >
                          {childCategory.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {categories.map((category) => (
                <div key={category.id}>
                  <Link
                    className="flex font-medium mb-2  lg:hover:underline underline-offset-2"
                    href={`/catalog/${category.slug}`}
                  >
                    {category.title}
                  </Link>
                  <ul className="grid grid-cols-1 gap-1">
                    {category.childCategories.map((childCategory) => (
                      <li className="flex" key={childCategory.id}>
                        <Link
                          className=" text-gray-200 transition lg:hover:text-gray-100 lg:hover:underline underline-offset-2"
                          href={`/catalog/${category.slug}/${childCategory.slug}`}
                        >
                          {childCategory.title}
                        </Link>
                      </li>
                    ))}
                    {category.childCategories.map((childCategory) => (
                      <li className="flex" key={childCategory.id}>
                        <Link
                          className=" text-gray-200 transition lg:hover:text-gray-100 lg:hover:underline underline-offset-2"
                          href={`/catalog/${category.slug}/${childCategory.slug}`}
                        >
                          {childCategory.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {categories.map((category) => (
                <div key={category.id}>
                  <Link
                    className="flex font-medium mb-2  lg:hover:underline underline-offset-2"
                    href={`/catalog/${category.slug}`}
                  >
                    {category.title}
                  </Link>
                  <ul className="grid grid-cols-1 gap-1">
                    {category.childCategories.map((childCategory) => (
                      <li className="flex" key={childCategory.id}>
                        <Link
                          className=" text-gray-200 transition lg:hover:text-gray-100 lg:hover:underline underline-offset-2"
                          href={`/catalog/${category.slug}/${childCategory.slug}`}
                        >
                          {childCategory.title}
                        </Link>
                      </li>
                    ))}
                    {category.childCategories.map((childCategory) => (
                      <li className="flex" key={childCategory.id}>
                        <Link
                          className=" text-gray-200 transition lg:hover:text-gray-100 lg:hover:underline underline-offset-2"
                          href={`/catalog/${category.slug}/${childCategory.slug}`}
                        >
                          {childCategory.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div> */}
          </div>
        </Container>
      </footer>
    </>
  );
};

export default MainLayout;
