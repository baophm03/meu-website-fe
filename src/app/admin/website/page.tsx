"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BannerPanel } from "./_components/banner/banner-panel";
import { ContactInfoPanel } from "./_components/contact-info/contact-info-panel";

export default function AdminWebsitePage() {
  const [activeTab, setActiveTab] = useState("banner");

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-5">
        <div className="overflow-x-auto pb-1">
          <TabsList className="h-auto min-w-max rounded-2xl bg-[#eaf2ff] p-1.5">
            <TabsTrigger
              value="banner"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-[#063e8e] data-[state=active]:bg-white data-[state=active]:text-[#063e8e]"
            >
              Banner
            </TabsTrigger>
            <TabsTrigger
              value="contact-info"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-[#063e8e] data-[state=active]:bg-white data-[state=active]:text-[#063e8e]"
            >
              Thông tin liên hệ
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="banner" className="mt-0">
          <Card className="rounded-[30px] border-[#063e8e]/10 shadow-sm">
            <CardHeader className="pb-5">
              <CardTitle className="text-2xl text-[#163b73]">
                Quản lý banner
              </CardTitle>
              <CardDescription className="mt-2 text-sm text-slate-600">
                Quản lý các banner hiển thị ở trang chủ (tiêu đề, mô tả, ảnh và các nút liên kết).
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <BannerPanel />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact-info" className="mt-0">
          <Card className="rounded-[30px] border-[#063e8e]/10 shadow-sm">
            <CardHeader className="pb-5">
              <CardTitle className="text-2xl text-[#163b73]">
                Thông tin liên hệ website
              </CardTitle>
              <CardDescription className="mt-2 text-sm text-slate-600">
                Quản lý các mục liên hệ (email, điện thoại, địa chỉ...) hiển thị trên trang liên hệ.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <ContactInfoPanel />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
