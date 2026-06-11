'use client'
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth"
import { Button } from "./ui/button";
import Link from "next/link";
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Navabar = () => {
    const { data: session } = useSession();
    const { setTheme } = useTheme()


    const user: User = session?.user as User

    return (
        <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

                <Link
                    href="/"
                    className="flex items-center gap-2"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
                        M
                    </div>

                    <div>
                        <p className="font-bold text-lg">
                            Mystery Message
                        </p>
                    </div>
                </Link>


                <div className="flex items-center gap-3">

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                            >
                                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

                                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

                                <span className="sr-only">
                                    Toggle theme
                                </span>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => setTheme("light")}
                            >
                                Light
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => setTheme("dark")}
                            >
                                Dark
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => setTheme("system")}
                            >
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {session ? (
                        <>
                            <div className="hidden md:flex items-center rounded-full border px-3 py-1 text-sm">
                                {user?.username || user?.email}
                            </div>

                            <Button
                                variant="destructive"
                                className="rounded-full"
                                onClick={() => signOut()}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Link href="/sign-in">
                            <Button className="rounded-full px-6">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>

            </div>
        </nav>
    )
}

export default Navabar