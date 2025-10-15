import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl text-muted-foreground mt-4">Page not found</p>
        <Link href="/">
          <Button className="mt-6">Go Home</Button>
        </Link>
      </div>
    </div>
  );
}