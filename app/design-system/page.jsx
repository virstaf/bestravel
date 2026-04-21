import React from "react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DesignSystemPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div className="container mx-auto py-10 space-y-16 max-w-6xl">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Design System</h1>
        <p className="text-muted-foreground text-lg">
          A showcase of our core UI components, colors, and typography.
        </p>
      </div>

      {/* Colors Section */}
      <section className="space-y-6">
        <div className="border-b pb-2">
          <h2 className="text-2xl font-semibold tracking-tight">Colors</h2>
          <p className="text-muted-foreground">
            The primary color palette defined in our theme.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <ColorSwatch name="Primary" bgClass="bg-primary" textClass="text-primary-foreground" />
          <ColorSwatch name="Secondary" bgClass="bg-secondary" textClass="text-secondary-foreground" />
          <ColorSwatch name="Accent" bgClass="bg-accent" textClass="text-accent-foreground" />
          <ColorSwatch name="Muted" bgClass="bg-muted" textClass="text-muted-foreground" />
          <ColorSwatch name="Destructive" bgClass="bg-destructive" textClass="text-destructive-foreground" />
          <ColorSwatch name="Background" bgClass="bg-background" textClass="text-foreground" border />
          <ColorSwatch name="Card" bgClass="bg-card" textClass="text-card-foreground" border />
          <ColorSwatch name="Popover" bgClass="bg-popover" textClass="text-popover-foreground" border />
          <ColorSwatch name="Border" bgClass="bg-border" textClass="text-foreground" />
          <ColorSwatch name="Input" bgClass="bg-input" textClass="text-foreground" />
        </div>
      </section>

      {/* Typography Section */}
      <section className="space-y-6">
        <div className="border-b pb-2">
          <h2 className="text-2xl font-semibold tracking-tight">Typography</h2>
          <p className="text-muted-foreground">Standard text styles.</p>
        </div>
        <div className="space-y-6 max-w-2xl">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Heading 1</h1>
            <p className="text-sm text-muted-foreground mt-1">text-4xl font-bold tracking-tight</p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Heading 2</h2>
            <p className="text-sm text-muted-foreground mt-1">text-3xl font-semibold tracking-tight</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">Heading 3</h3>
            <p className="text-sm text-muted-foreground mt-1">text-2xl font-semibold tracking-tight</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold tracking-tight">Heading 4</h4>
            <p className="text-sm text-muted-foreground mt-1">text-xl font-semibold tracking-tight</p>
          </div>
          <div>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Paragraph. The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-sm text-muted-foreground mt-1">leading-7</p>
          </div>
          <div>
            <blockquote className="mt-6 border-l-2 pl-6 italic">
              "After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."
            </blockquote>
            <p className="text-sm text-muted-foreground mt-1">border-l-2 pl-6 italic</p>
          </div>
        </div>
      </section>

      {/* Content Blocks Section */}
      <section className="space-y-6">
        <div className="border-b pb-2">
          <h2 className="text-2xl font-semibold tracking-tight">Content Blocks (Prose)</h2>
          <p className="text-muted-foreground">
            Standard formatting for rich text, descriptions, and articles using the <code className="bg-muted px-1 py-0.5 rounded text-sm">.content</code> and <code className="bg-muted px-1 py-0.5 rounded text-sm">.article</code> classes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* .content class example */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-muted-foreground">Using <code className="text-foreground">.content</code></h3>
            <div className="content bg-muted/30 p-6 rounded-xl border">
              <h3>Package Description</h3>
              <p>
                Experience the ultimate getaway with our exclusive travel package. Enjoy luxurious accommodations, breathtaking views, and world-class amenities designed to make your stay unforgettable.
              </p>
              <p>
                This package includes:
              </p>
              <ul>
                <li>5 nights in a premium ocean-view suite</li>
                <li>Daily complimentary breakfast and dinner</li>
                <li>Access to the resort's private beach and spa facilities</li>
              </ul>
              <p>
                Book now to secure your spot in paradise!
              </p>
            </div>
          </div>

          {/* .article class example */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-muted-foreground">Using <code className="text-foreground">.article</code></h3>
            <div className="article bg-muted/30 p-6 rounded-xl border !max-w-none !mx-0 !py-0">
              <h2>A Guide to the Maldives</h2>
              <p>
                The Maldives is a tropical nation in the Indian Ocean composed of 26 ring-shaped atolls, which are made up of more than 1,000 coral islands. It's known for its beaches, blue lagoons and extensive reefs.
              </p>
              <h3>When to Visit</h3>
              <p>
                The best time to visit the Maldives is between November and April, outside of the monsoon season. We recommend planning your trip well in advance.
              </p>
              <blockquote>
                "The Maldives is not just a destination; it's a feeling of absolute serenity."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons Section */}
      <section className="space-y-6">
        <div className="border-b pb-2">
          <h2 className="text-2xl font-semibold tracking-tight">Buttons</h2>
          <p className="text-muted-foreground">All button variants and states.</p>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="default" disabled>Disabled</Button>
          <Button variant="default" size="sm">Small</Button>
          <Button variant="default" size="lg">Large</Button>
        </div>
      </section>

      {/* Badges Section */}
      <section className="space-y-6">
        <div className="border-b pb-2">
          <h2 className="text-2xl font-semibold tracking-tight">Badges</h2>
          <p className="text-muted-foreground">Inline badges.</p>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>

      {/* Inputs Section */}
      <section className="space-y-6">
        <div className="border-b pb-2">
          <h2 className="text-2xl font-semibold tracking-tight">Inputs</h2>
          <p className="text-muted-foreground">Form controls.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
          <div className="space-y-2">
            <label className="text-sm font-medium">Default Input</label>
            <Input placeholder="Enter something..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Disabled Input</label>
            <Input disabled placeholder="Disabled input..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">File Input</label>
            <Input type="file" />
          </div>
        </div>
      </section>

      {/* Avatars Section */}
      <section className="space-y-6">
        <div className="border-b pb-2">
          <h2 className="text-2xl font-semibold tracking-tight">Avatars</h2>
        </div>
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>VT</AvatarFallback>
          </Avatar>
        </div>
      </section>

      {/* Cards Section */}
      <section className="space-y-6">
        <div className="border-b pb-2">
          <h2 className="text-2xl font-semibold tracking-tight">Cards</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>A descriptive text for the card.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>The core content of the card goes here. It can be anything.</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}

function ColorSwatch({ name, bgClass, textClass, border = false }) {
  return (
    <div className="space-y-2">
      <div 
        className={`h-24 w-full rounded-md flex items-center justify-center p-4 font-medium text-sm ${bgClass} ${textClass} ${border ? 'border shadow-sm' : ''}`}
      >
        Aa
      </div>
      <div className="text-sm font-medium">
        {name}
        <div className="text-xs text-muted-foreground font-mono">{bgClass.replace('bg-', '')}</div>
      </div>
    </div>
  );
}
