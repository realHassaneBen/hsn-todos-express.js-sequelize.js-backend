export const ROLES = [
    {
        name: "ADMIN",
        description: "ADMIN Role",
        permissions: ["VIEW", "CREATE", "UPDATE", "DELETE"],
    },
    {
        name: "MODERATOR",
        description: "MODERATOR Role",
        permissions: ["VIEW", "CREATE", "UPDATE"],
    },
    {
        name: "EDITOR",
        description: "EDITOR Role",
        permissions: ["VIEW", "CREATE", "UPDATE"],
    },
    { name: "USER", description: "USER Role", permissions: ["VIEW"] },
    { name: "GUEST", description: "GUEST Role", permissions: ["VIEW"] },
    { name: "BOT", description: "BOT Role", permissions: ["VIEW"] },
    { name: "ANONYMOUS", description: "ANONYMOUS Role", permissions: ["VIEW"] },
];
