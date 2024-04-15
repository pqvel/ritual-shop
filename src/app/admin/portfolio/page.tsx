import { FC } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/shadcn-ui/card";
import {
  Table,
  TableCaption,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/shadcn-ui/table";
import db from "../../../../db/db";
import PortfolioItem from "../_components/portfolio/PortfolioItem";

const getProtfolioProducts = async () => {
  return await db.portfolioProduct.findMany();
};

const PortfolioPage: FC = async () => {
  const portfolioProducts = await getProtfolioProducts();
  return (
    <>
      <Breadcrumb
        items={[
          { title: "Главная", href: "/" },
          { title: "Портфолио", href: "/portfolio" },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle className=" mb-4">Портфолио</CardTitle>
          <div className="flex flex-wrap justify-between  gap-2">
            <Link
              className="flex items-center justify-center px-4 py-2 text-sm rounded-lg border border-black"
              href={`/admin/portfolio/add-product`}
            >
              Добавить товар
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="bg-white">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Active</TableHead>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Дата добавления</TableHead>
                <TableHead>Изображение</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolioProducts.map((portfolioProduct) => (
                <PortfolioItem
                  key={portfolioProduct.id}
                  product={portfolioProduct}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default PortfolioPage;
