'use client'

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Autoplay from 'embla-carousel-autoplay'

const messages = [
  "You inspire more people than you realize 🌟",
  "Never stop believing in yourself 💪",
  "Someone appreciates your hard work ❤️",
  "Your smile can brighten someone's day 😊",
  "Keep going, your future self will thank you 🚀",
]

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex flex-col items-center justify-center text-center py-16 px-4">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Welcome to Mystery Message
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          Receive anonymous messages from friends, classmates, and anyone
          who wants to share their thoughts with you.
        </p>

        <div className="flex gap-4">
          <Link href="/sign-up">
            <Button size="lg">Get Started</Button>
          </Link>

          <Link href="/sign-in">
            <Button variant="outline" size="lg">
              Login
            </Button>
          </Link>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="flex flex-col items-center py-10">
        <h2 className="text-3xl font-bold mb-6">
          What People Might Say 
        </h2>

        <Carousel 
        plugins={[Autoplay({delay:2500})]}
        className="w-full max-w-md">
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex min-h-[180px] items-center justify-center p-8 text-center">
                      <p className="text-lg font-medium">
                        {message}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Use Mystery Message?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-bold text-xl mb-2">
                Anonymous Messages
              </h3>
              <p>
                Receive honest thoughts and feedback without revealing identities.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-bold text-xl mb-2">
                Secure Platform
              </h3>
              <p>
                Authentication and privacy built into the application.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-bold text-xl mb-2">
                Easy Sharing
              </h3>
              <p>
                Share your unique profile link and start receiving messages.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Mystery Message. Built with Next.js,
        TypeScript, NextAuth and MongoDB.
      </footer>
    </div>
  )
}

export default Home