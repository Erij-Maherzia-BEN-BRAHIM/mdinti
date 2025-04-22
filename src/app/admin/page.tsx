import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersRound, Building2, Calendar, Activity } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the mdinti admin dashboard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <UsersRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Partners
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Events
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Next event in 5 days
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="members">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>
        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Members</CardTitle>
              <CardDescription>You have 12 total members.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["Ahmed Khelifi", "Leila Ben Salah", "Youssef Trabelsi"].map(
                  (name, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <div>{name}</div>
                      <div className="text-sm text-muted-foreground">
                        Added 2 weeks ago
                      </div>
                    </div>
                  )
                )}
                <div className="pt-2">
                  <Link
                    href="/admin/members"
                    className="text-sm text-primary hover:underline"
                  >
                    View all members →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="partners" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Partners</CardTitle>
              <CardDescription>You have 8 total partners.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  "UNESCO",
                  "Tunisian Heritage Society",
                  "Artisans Association",
                ].map((name, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>{name}</div>
                    <div className="text-sm text-muted-foreground">
                      Added 1 month ago
                    </div>
                  </div>
                ))}
                <div className="pt-2">
                  <Link
                    href="/admin/partners"
                    className="text-sm text-primary hover:underline"
                  >
                    View all partners →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>You have 6 active projects.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  "Heritage Preservation",
                  "Cultural Events",
                  "Education Programs",
                ].map((name, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>{name}</div>
                    <div className="text-sm text-muted-foreground">
                      Updated 3 days ago
                    </div>
                  </div>
                ))}
                <div className="pt-2">
                  <Link
                    href="/admin/activities"
                    className="text-sm text-primary hover:underline"
                  >
                    View all activities →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
