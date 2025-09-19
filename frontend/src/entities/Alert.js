// src/entities/Alert.js

export class Alert {
  // Mock alert data
  static mockAlerts = [
    {
      id: 1,
      alert_type: "geofence",
      severity: "medium",
      location: { latitude: 19.0760, longitude: 72.8777, address: "Colaba Market, Mumbai" },
      description: "Tourist entered caution zone - increased vigilance recommended",
      status: "resolved",
      response_time: 45,
      contacts_notified: ["emergency_services"],
      created_date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      alert_type: "anomaly",
      severity: "low",
      location: { latitude: 19.0728, longitude: 72.8826, address: "Marine Drive, Mumbai" },
      description: "No activity detected for 2 hours - safety check initiated",
      status: "resolved",
      response_time: 120,
      contacts_notified: ["emergency_contacts"],
      created_date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 3,
      alert_type: "sos",
      severity: "critical",
      location: { latitude: 19.0596, longitude: 72.8295, address: "Taj Mahal Palace Hotel, Mumbai" },
      description: "Emergency SOS activated by tourist - immediate assistance required",
      status: "active",
      response_time: 30,
      contacts_notified: ["police", "medical", "emergency_contacts"],
      created_date: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    }
  ];

  // Simulate fetching alerts from API
  static async list(sort = "-created_date") {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Optional: implement sorting based on created_date
        let sorted = [...this.mockAlerts];
        if (sort === "-created_date") {
          sorted.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
        } else if (sort === "created_date") {
          sorted.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
        }
        resolve(sorted);
      }, 500); // simulate network delay
    });
  }
}
