"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { fetchUsers } from "@/services/userService";
import { User } from "@/services/userService";

interface UsersDropdownProps {
    value: string;
    onValueChange: (value: string) => void;
}

export function UsersDropdown({ value, onValueChange }: UsersDropdownProps) {
    const [open, setOpen] = React.useState(false);
    const [users, setUsers] = React.useState<User[]>([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                const response = await fetchUsers({
                    limit: 100,
                });
                // Filter out admin users
                const filteredUsers = response.data.filter(
                    (user) => user.role === "USER",
                );
                setUsers(filteredUsers);
            } catch (error) {
                console.error("Failed to load users:", error);
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    const selectedUser = users.find((user) => user._id === value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading users...
                        </span>
                    ) : selectedUser ? (
                        <span className="truncate">
                            {selectedUser.username} ({selectedUser.email})
                        </span>
                    ) : (
                        "Select user..."
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search user..." />
                    <CommandList>
                        <CommandEmpty>No user found.</CommandEmpty>
                        <CommandGroup>
                            {users.map((user) => (
                                <CommandItem
                                    key={user._id}
                                    value={`${user.username} ${user.email}`}
                                    onSelect={() => {
                                        onValueChange(user._id);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === user._id
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-medium">
                                            {user.username}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {user.email}
                                        </span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
