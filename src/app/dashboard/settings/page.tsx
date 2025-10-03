"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Here you can configure your account preferences (e.g. notifications, themes, privacy).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
