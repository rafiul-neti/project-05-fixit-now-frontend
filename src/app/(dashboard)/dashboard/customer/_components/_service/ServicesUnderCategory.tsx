import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategories } from "../../_actions/getCategories";
import { Category } from "@/lib/types/modules/category/category.types";
import BookServiceButton from "../BookServiceButton";

const ServicesUnderCategory = async () => {
  const categories: Category[] = await getCategories();

  return (
    <Tabs defaultValue={categories[0].name.toLowerCase()} className="">
      <TabsList variant={`line`}>
        {categories.map((c) => (
          <TabsTrigger key={c.id} value={c.id} className={`px-5`}>
            {c.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {categories.map((c) => {
        return (
          <TabsContent key={c.id} value={c.id}>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {c.services.map((s) => (
                <Card key={s.id} className="p-3">
                  <CardHeader>
                    <CardTitle>{s.name}</CardTitle>
                  </CardHeader>
                  <CardDescription>{s.description}</CardDescription>
                  <CardContent className="w-1/2">
                    <BookServiceButton serviceId={s.id} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default ServicesUnderCategory;
