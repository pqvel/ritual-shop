import { FC } from "react";
import Link from "next/link";
import MainLayout from "@/components/layouts/MainLayout";
import { Container } from "@/components/ui/Wrappers";

const NotFound: FC = () => {
  return (
    <MainLayout>
      <Container className="flex justify-center items-center m-auto">
        <div className="flex flex-col items-center justify-center bg-white p-5 sm:p-10 max-w-2xl rounded-lg shadow-sm">
          <div className="font-semibold text-2xl sm:text-4xl text-center mb-4 sm:mb-8">
            Страница не найдена
          </div>
          <div className=" text-center text-gray-600 mb-4 sm:mb-8 text-lg sm:text-xl">
            Такой страницы не существует либо она была перенесана на другой
            адрес
          </div>
          <Link
            className=" bg-cyan-800 lg:hover:bg-cyal-900 text-white font-medium py-2 px-6 rounded sm:text-base text-xl"
            href="/"
          >
            На главную
          </Link>
        </div>
      </Container>
    </MainLayout>
  );
};

export default NotFound;
