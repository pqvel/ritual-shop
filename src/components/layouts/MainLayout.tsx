import { FC, ReactNode } from "react";
import { Container } from "@/components/ui/Wrappers";
import Header from "@/components/header/Header";

type Props = {
  children: ReactNode;
};

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="pt-[80px] lg:pt-[146px] bg-gray-100 flex-1">
        {children}
      </main>
      <footer className=" bg-black bg-opacity-80 py-10 text-white">
        <Container>
          <span className=" text-sm">
            © Copyright &quot;Десяточка&quot; 2015г. ИП Скрипко Леонид Иосифович
            Свидетельство о гос. регистрации: 590264434, выдано 17.06.2011г.
            Островецким районным исполнительным комитетом
          </span>
          <div></div>
        </Container>
      </footer>
    </>
  );
};

export default MainLayout;
