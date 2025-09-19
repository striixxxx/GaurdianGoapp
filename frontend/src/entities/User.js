// src/entities/User.js

export class User {
  static async me() {
    // Future: yaha backend se current user fetch karna hoga
    // Example API call:
    // const res = await fetch("/api/user/me");
    // if (!res.ok) throw new Error("Not logged in");
    // return await res.json();

    // --- Temporary Dummy Data ---
    return {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      preferences: {
        theme: "light", // or "dark"
      },
    };
  }

  static async login(email, password) {
    // Future: login API call
    // const res = await fetch("/api/user/login", { method: "POST", body: JSON.stringify({ email, password }) })
    // return await res.json();
  }

  static async logout() {
    // Future: logout API call
  }
}
