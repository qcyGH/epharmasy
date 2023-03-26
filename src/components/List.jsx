import { useSelector } from "react-redux"

import { Card, CardSlider } from "./Card"

import "swiper/css";
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import "swiper/css/mousewheel"

export function List() {
  // get item from storage
  const { data, status } = useSelector((state) => state.shop.items);

  if (status != 200) {
    return <></>;
  }

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 transition-color duration-150 ease-in">
        Medicines
      </h2>
      <div className="mt-3 grid justify-items-center grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {
          data?.map((item) =>
            item.image2 != "any" ? (
              <CardSlider
                id={item.medicine_id}
                key={item.medicine_id}
                name={item.name}
                description={item.description}
                manufacturer={item.manufacturer}
                price={item.price}
                images={[item.image, item.image2]}
                item={item}
              />
            ) : (
              <Card
                id={item.medicine_id}
                key={item.medicine_id}
                name={item.name}
                description={item.description}
                manufacturer={item.manufacturer}
                price={item.price}
                image={item.image}
              />
            )
          )
        }
      </div>
    </>
  )
}
