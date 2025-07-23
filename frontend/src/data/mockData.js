export const users = [
  {
    _id: "64f19c73a6d9c2a45e01ab12",
    username: "johndoe123",
    fullName: "John Doe",
    email: "johndoe@example.com",
    phone: "+1-555-123-4567",
    role: "customer",
    photo: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg",
    address: {
      street: "123 Maple Street",
      city: "Springfield",
      state: "Illinois",
      pincode: "62704"
    },
    created_at: new Date("2025-07-20T10:30:00Z"),
    updated_at: new Date("2025-07-22T15:45:00Z")
  },
  {
    _id: "64f19c73a6d9c2a45e01ab34",
    username: "provider1",
    fullName: "Sarah Wilson",
    email: "sarah@coolairservices.com",
    phone: "+1-555-303-4040",
    role: "provider",
    photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    address: {
      street: "456 Elm Street",
      city: "Phoenix",
      state: "Arizona",
      pincode: "85001"
    },
    created_at: new Date("2025-05-22T09:30:00Z"),
    updated_at: new Date("2025-07-20T15:45:00Z")
  }
];

export const services = [
  {
    _id: "64f1d701b6e3b5001e01ab01",
    provider: "64f19d53a6d9c2a45e01ac01",
    name: "Home Cleaning",
    desc: "Professional home cleaning service for apartments and houses. Our team uses eco-friendly products and ensures thorough cleaning of all areas.",
    image: "https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg",
    price: 1200,
    unit: "per visit",
    created_at: new Date("2025-07-10T09:00:00Z"),
    updated_at: new Date("2025-07-20T14:30:00Z")
  },
  {
    _id: "64f1d701b6e3b5001e01ab02",
    provider: "64f19d53a6d9c2a45e01ac02",
    name: "AC Repair",
    desc: "Expert air conditioner repair and maintenance service. We handle all brands and provide 24/7 emergency service.",
    image: "https://images.pexels.com/photos/8092/pexels-photo.jpg",
    price: 1500,
    unit: "per unit",
    created_at: new Date("2025-06-25T11:15:00Z"),
    updated_at: new Date("2025-07-18T16:45:00Z")
  },
  {
    _id: "64f1d701b6e3b5001e01ab03",
    provider: "64f19d53a6d9c2a45e01ac03",
    name: "Plumbing Service",
    desc: "Reliable plumbing solutions for residential and commercial needs. Licensed professionals with years of experience.",
    image: "https://images.pexels.com/photos/8486944/pexels-photo-8486944.jpeg",
    price: 800,
    unit: "per hour",
    created_at: new Date("2025-07-01T08:00:00Z"),
    updated_at: new Date("2025-07-21T12:00:00Z")
  },
  {
    _id: "64f1d701b6e3b5001e01ab04",
    provider: "64f19d53a6d9c2a45e01ac01",
    name: "Garden Maintenance",
    desc: "Complete garden care including lawn mowing, pruning, and seasonal maintenance.",
    image: "https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg",
    price: 600,
    unit: "per visit",
    created_at: new Date("2025-07-05T10:00:00Z"),
    updated_at: new Date("2025-07-19T09:30:00Z")
  }
];

export const serviceProviders = [
  {
    _id: "64f19d53a6d9c2a45e01ac01",
    name: "Sparkle Clean Co.",
    owner: "64f19c73a6d9c2a45e01ab12",
    email: "contact@sparkleclean.com",
    phone: "+1-555-101-2020",
    desc: "Expert in residential and commercial cleaning services. Trusted by hundreds of satisfied customers.",
    image: "https://images.pexels.com/photos/4239151/pexels-photo-4239151.jpeg",
    avgRating: 4.6,
    address: {
      street: "789 Pine Avenue",
      city: "Los Angeles",
      state: "California",
      pincode: "90001"
    },
    created_at: new Date("2025-06-15T10:00:00Z"),
    updated_at: new Date("2025-07-18T13:00:00Z")
  },
  {
    _id: "64f19d53a6d9c2a45e01ac02",
    name: "CoolAir Services",
    owner: "64f19c73a6d9c2a45e01ab34",
    email: "support@coolairservices.com",
    phone: "+1-555-303-4040",
    desc: "AC installation, repair, and maintenance for all brands. 24/7 emergency service available.",
    image: "https://images.pexels.com/photos/2227832/pexels-photo-2227832.jpeg",
    avgRating: 4.8,
    address: {
      street: "456 Elm Street",
      city: "Phoenix",
      state: "Arizona",
      pincode: "85001"
    },
    created_at: new Date("2025-05-22T09:30:00Z"),
    updated_at: new Date("2025-07-20T15:45:00Z")
  },
  {
    _id: "64f19d53a6d9c2a45e01ac03",
    name: "PipeMasters",
    owner: "64f19c73a6d9c2a45e01ab56",
    email: "info@pipemasters.com",
    phone: "+1-555-505-6060",
    desc: "Licensed plumbing professionals for urgent and scheduled work. No job too big or small.",
    image: "https://images.pexels.com/photos/8486944/pexels-photo-8486944.jpeg",
    avgRating: 4.4,
    address: {
      street: "321 Oak Boulevard",
      city: "Austin",
      state: "Texas",
      pincode: "73301"
    },
    created_at: new Date("2025-06-01T11:45:00Z"),
    updated_at: new Date("2025-07-22T10:15:00Z")
  }
];

export const orders = [
  {
    _id: "order_001",
    customer: "64f19c73a6d9c2a45e01ab12",
    items: [
      {
        service: services[0],
        quantity: 1,
        provider: serviceProviders[0]
      }
    ],
    total: 1200,
    status: "pending",
    created_at: new Date("2025-07-23T10:00:00Z"),
    updated_at: new Date("2025-07-23T10:00:00Z")
  }
];
