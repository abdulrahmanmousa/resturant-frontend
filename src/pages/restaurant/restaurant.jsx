import React from "react";
import Layout from "../../components/layout/layout";
import { useParams } from "react-router-dom";
import { Phone, Clock, UtensilsCrossed } from "lucide-react";
import DateTimePicker from "../../components/DateTimePicker";

export default function Restaurant() {
  const { id } = useParams();
  const ratings = [
    { label: 5, percentage: 60 },
    { label: 4, percentage: 20 },
    { label: 3, percentage: 10 },
    { label: 2, percentage: 5 },
    { label: 1, percentage: 5 },
  ];
  const tables = [
    { id: 1, name: "Table 1", capacity: "4 seats", status: "Available" },
    { id: 2, name: "Table 2", capacity: "2 seats", status: "Reserved" },
    { id: 3, name: "Table 3", capacity: "6 seats", status: "Available" },
    { id: 4, name: "Table 4", capacity: "8 seats", status: "Occupied" },
    { id: 5, name: "Table 5", capacity: "4 seats", status: "Reserved" },
    { id: 6, name: "Table 6", capacity: "2 seats", status: "Available" },
    { id: 7, name: "Table 7", capacity: "10 seats", status: "Occupied" },
    { id: 8, name: "Table 8", capacity: "4 seats", status: "Available" },
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
          image: "https://picsum.photos/800?random=1",
        },
        {
          name: "Caesar Salad",
          price: "$18",
          image: "https://picsum.photos/800?random=2",
        },
        {
          name: "Grilled Salmon",
          price: "$24",
          image: "https://picsum.photos/800?random=3",
        },
        {
          name: "Filet Mignon",
          price: "$28",
          image: "https://picsum.photos/800?random=4",
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
    <Layout>
      <div className="bg-white p-8 m-auto justify-center items-center w-3/4">
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
            inviting ambience. It’s a perfect spot for a romantic dinner, a
            family meal, or a night out with friends.
          </p>
        </div>

        <div className="bg-white space-y-8">
          {/* Images Row */}
          <div className="grid grid-cols-4 gap-4 ">
            {restaurant.menu.map((item, index) => (
              <img
                key={index}
                src={item.image}
                alt={item.name}
                className="rounded-xl object-cover aspect-square w-full "
              />
            ))}
          </div>

          {/* Contact Information */}
          <div className="grid grid-rows-2 gap-6 m-6">
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

        {/* Menu Section */}
        <h2 className="text-2xl font-bold m-6">Menu</h2>
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
        <div className="flex items-start space-x-8 py-10 ">
          {/* Left Column: Overall Rating */}
          <div className="flex flex-col items-center">
            <h2 className="text-5xl font-bold text-gray-800">4.5</h2>
            <div className="flex text-red-500 text-2xl mb-1">★★★★☆</div>
            <p className="text-gray-500 text-sm">1,234 reviews</p>
          </div>

          {/* Right Column: Rating Bars */}
          <div className="flex-1 space-y-2  ">
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
                <p className="text-gray-500 text-sm w-8">
                  {rating.percentage}%
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* taple Availability */}
        <div className="mt-8 mb-8  w-3/4 w-full relative gap-2  ">
          <h1 className=" text-4xl font-bold mb-6 text-center text-gray-800">
            Table Availability
          </h1>
          <img
            src="https://i.pinimg.com/736x/3d/5b/a8/3d5ba8dbfc44cb0289960774e742c38e.jpg"
            alt="table"
            className="max-w-[70vw] mx-auto object-cover rounded-3xl overflow-hidden rotate-90 max-h-[50vh] "
          />
          <div className="grid  gap-3  ">
            <div className="grid gap-3">
              <div className="grid grid-cols-4 gap-4 p-4">
                {tables.map((table) => (
                  <div
                    key={table.id}
                    className="bg-gray-200 flex flex-col items-center justify-center p-4 rounded-md shadow-md"
                  >
                    <UtensilsCrossed />
                    <h1 className="font-bold mt-2">{table.name}</h1>
                    <p className="text-sm">Capacity: {table.capacity}</p>
                    <p
                      className={`text-xs mt-1 ${
                        table.status === "Available"
                          ? "text-green-600"
                          : table.status === "Reserved"
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      Status: {table.status}
                    </p>
                  </div>
                ))}
              </div>

              <div />
            </div>
          </div>
        </div>
        {/* Table Booking Section */}
        <div className="mt-8 w-1/4 ">
          <h2 className="text-2xl font-bold mb-4">Book a Table</h2>
          <form className="space-y-4">
            <DateTimePicker />

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
    </Layout>
  );
}
{
  /* Table Booking Section */
}
{
  /* <div className="mt-8 w-1/2 ">
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
      </div> */
}
