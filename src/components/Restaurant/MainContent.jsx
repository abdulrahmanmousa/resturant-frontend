import React from "react";
import { useParams } from "react-router-dom";
import { Phone, Clock } from "lucide-react";

export default function MainContent() {
  const { id } = useParams();
  const ratings = [
    { label: 5, percentage: 60 },
    { label: 4, percentage: 20 },
    { label: 3, percentage: 10 },
    { label: 2, percentage: 5 },
    { label: 1, percentage: 5 },
  ];
  const restaurants = [
    {
      id: "1",
      name: "Pizzeria Delfina",
      rating: "4.5",
      reviews: "1,234",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828",
      phone: "(415) 123-4567",
      address: "123 Main Street, San Francisco, CA",
      hours: "Mon-Sun: 11:30 AM - 9:30 PM",
      menu: [
        {
          name: "Spinach Dip",
          price: "$12",
          image: "https://via.placeholder.com/50",
        },
        {
          name: "Caesar Salad",
          price: "$18",
          image: "https://via.placeholder.com/50",
        },
        {
          name: "Grilled Salmon",
          price: "$24",
          image: "https://via.placeholder.com/50",
        },
        {
          name: "Filet Mignon",
          price: "$28",
          image: "https://via.placeholder.com/50",
        },
      ],
    },
    {
      id: "2",
      name: "The House",
      rating: "4.3",
      reviews: "980",
      image: "https://images.unsplash.com/photo-1552566626-52b6e06c0211",
      phone: "(415) 987-6543",
      address: "456 Oak Street, San Francisco, CA",
      hours: "Mon-Fri: 12:00 PM - 10:00 PM",
      menu: [
        {
          name: "Bruschetta",
          price: "$10",
          image: "https://via.placeholder.com/50",
        },
        {
          name: "Lobster Ravioli",
          price: "$22",
          image: "https://via.placeholder.com/50",
        },
        {
          name: "Tiramisu",
          price: "$8",
          image: "https://via.placeholder.com/50",
        },
      ],
    },
    {
      id: "3",
      name: "Gary Danko",
      rating: "4.8",
      reviews: "2,100",
      image: "https://images.unsplash.com/photo-1541557435989-1b96273494f6",
      phone: "(415) 765-4321",
      address: "789 Pine Street, San Francisco, CA",
      hours: "Tue-Sun: 5:00 PM - 11:00 PM",
      menu: [
        {
          name: "Foie Gras",
          price: "$30",
          image: "https://via.placeholder.com/50",
        },
        {
          name: "Duck Confit",
          price: "$28",
          image: "https://via.placeholder.com/50",
        },
        {
          name: "Chocolate Souffle",
          price: "$15",
          image: "https://via.placeholder.com/50",
        },
      ],
    },
    {
      id: "4",
      name: "Zuni Cafe",
      rating: "4.6",
      reviews: "1,450",
      image: "https://images.unsplash.com/photo-1600891963836-6dc70f4c14f9",
      phone: "(415) 222-3333",
      address: "101 Market Street, San Francisco, CA",
      hours: "Everyday: 11:00 AM - 10:00 PM",
      menu: [
        {
          name: "Wood-Fired Chicken",
          price: "$26",
          image: "https://via.placeholder.com/50",
        },
        {
          name: "Oysters",
          price: "$18",
          image: "https://via.placeholder.com/50",
        },
        {
          name: "Panna Cotta",
          price: "$9",
          image: "https://via.placeholder.com/50",
        },
      ],
    },
  ];

  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return <h1 className="text-center text-red-500">Restaurant Not Found</h1>;
  }

  return (
    <div className="bg-white p-8 m-auto justify-center items-center w-3/4">
      {/* Restaurant Banner */}
      <div className="relative mb-6">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-64 object-cover rounded-md"
        />
        <h1 className="absolute bottom-4 left-4 text-white text-4xl font-bold">
          {restaurant.name}
        </h1>
      </div>

      {/* Overview Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Overview</h2>
        <p className="text-gray-700">
          {restaurant.name} is a popular restaurant in the heart of San
          Francisco. It’s known for its delicious food, friendly staff, and
          great atmosphere. The restaurant has a modern decor and a warm,
          inviting ambience. It’s a perfect spot for a romantic dinner, a family
          meal, or a night out with friends.
        </p>
      </div>

      <div className="bg-white p-6">
        {/* Images Row */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <img
            src="https://via.placeholder.com/150"
            alt="Restaurant Image 1"
            className="rounded-lg object-cover w-full h-40"
          />
          <img
            src="https://via.placeholder.com/150"
            alt="Restaurant Image 2"
            className="rounded-lg object-cover w-full h-40"
          />
          <img
            src="https://via.placeholder.com/150"
            alt="Restaurant Image 3"
            className="rounded-lg object-cover w-full h-40"
          />
          <img
            src="https://via.placeholder.com/150"
            alt="Restaurant Image 4"
            className="rounded-lg object-cover w-full h-40"
          />
        </div>

        {/* Contact Information */}
        <div className="grid grid-rows-2 gap-6 mb-6">
          <div className="flex items-center space-x-3">
            <Phone className="text-gray-700" size={24} />
            <div>
              <p className="font-bold">(415) 123-4567</p>
              <p className="text-gray-500">
                123 Main Street, San Francisco, CA
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="text-gray-700" size={24} />
            <div>
              <p className="font-bold">Hours</p>
              <p className="text-gray-500">Mon-Sun: 11:30 AM - 9:30 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* test */}
      <div className="flex items-start space-x-8">
        {/* Left Column: Overall Rating */}
        <div className="flex flex-col items-center">
          <h2 className="text-5xl font-bold text-gray-800">4.5</h2>
          <div className="flex text-red-500 text-2xl mb-1">★★★★☆</div>
          <p className="text-gray-500 text-sm">1,234 reviews</p>
        </div>

        {/* Right Column: Rating Bars */}
        <div className="flex-1 space-y-2">
          {ratings.map((rating) => (
            <div key={rating.label} className="flex items-center space-x-2">
              {/* Rating Number */}
              <p className="text-gray-700 font-semibold w-4 text-right">
                {rating.label}
              </p>

              {/* Progress Bar */}
              <div className="w-1/2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${rating.percentage}%` }}
                ></div>
              </div>

              {/* Percentage */}
              <p className="text-gray-500 text-sm w-8">{rating.percentage}%</p>
            </div>
          ))}
        </div>
      </div>
      {/* Table Availability */}
      <div className="mt-8 mb-8 w-1/2">
        <h2 className="text-2xl font-bold mb-4">Table Availability</h2>
        <div className="space-y-4">
          <h1>Date</h1>
          <select className="w-full border p-2 rounded-xl">
            <option>Choose date</option>
          </select>
          <h1>Time</h1>
          <select className="w-full border p-2 rounded-xl">
            <option>Choose time</option>
          </select>
          <h1>Guest Count</h1>
          <select className="w-full border p-2 rounded-xl">
            <option>Choose guest count</option>
          </select>
        </div>
      </div>

      {/* Menu Section */}
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <div className="grid grid-cols-2 gap-4">
        {restaurant.menu.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 border p-4 rounded-md shadow-sm"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-bold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Booking Section */}
      <div className="mt-8 w-1/2 ">
        <h2 className="text-2xl font-bold mb-4">Book a Table</h2>
        <form className="space-y-4">
          <select className="w-full p-2 border rounded-xl">
            <option>Choose date</option>
          </select>
          <select className="w-full p-2 border rounded-xl">
            <option>Choose time</option>
          </select>
          <select className="w-full p-2 border rounded-xl">
            <option>Choose guest count</option>
          </select>
          <button className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600">
            Find a Table
          </button>
        </form>
      </div>
    </div>
  );
}
