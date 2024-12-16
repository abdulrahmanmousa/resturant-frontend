import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Offers() {
  const Offers = [
    {
      name: "Offer 1",
      image:
        "https://img.freepik.com/free-psd/realistic-fast-food-template-design_23-2149623421.jpg",
    },
    {
      name: "Offer 2",
      image:
        "https://img.freepik.com/free-psd/realistic-fast-food-template-design_23-2149623421.jpg",
    },
    {
      name: "Offer 3",
      image:
        "https://img.freepik.com/free-psd/realistic-fast-food-template-design_23-2149623421.jpg",
    },
    {
      name: "Offer 4",
      image:
        "https://img.freepik.com/free-psd/realistic-fast-food-template-design_23-2149623421.jpg",
    },
    {
      name: "Offer 5",
      image:
        "https://img.freepik.com/free-psd/realistic-fast-food-template-design_23-2149623421.jpg",
    },
  ];

  return (
    <>
      <h1 className="text-4xl font-bold text-center text-gray-800 my-8">
        Hot Offers
      </h1>{" "}
      <Carousel className="w-full ">
        <CarouselContent className="-ml-1">
          {Offers.map((Offer, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <Card>
                  <CardContent
                    className="flex aspect-square items-center justify-center p-6 bg-cover bg-center"
                    style={{ backgroundImage: `url(${Offer.image})` }}
                  >
                    <span className="text-2xl font-semibold text-white bg-black bg-opacity-50 p-2 rounded">
                      {Offer.name}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
//   return (
//     <>
//       <h1 className="text-4xl font-bold text-center text-gray-800 my-8">
//         Recommended Offers
//       </h1>{" "}
//       <Carousel className="w-full ">
//         <CarouselContent className="-ml-1">
//           {Array.from({ length: 5  }).map((_, index) => (
//             <CarouselItem
//               key={index}
//               className="pl-1 md:basis-1/2 lg:basis-1/3"
//             >
//               <div className="p-1">
//                 <Card>
//                   <CardContent className="flex aspect-square items-center justify-center p-6">
//                     <span className="text-2xl font-semibold">{}</span>
//                   </CardContent>
//                 </Card>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//     </>
//   );
// }
