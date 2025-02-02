import axios from "axios";
import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);

  const [filteredList, setFilteredList] = useState([]);

  const [searchBox, setSearchBox] = useState("");

  useEffect(() => {
    fetchData();
  }, []); // ye API se Data fetch kr lega fetchData ko call krke, body render hogi fir API call or uske wapis re-render body

  const fetchData = async () => {
    const response = await axios.get(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999"
    );
    const json = await response.data;
    console.log(
      // check the data format is write or not because API is up to data and formate is changed
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setListOfRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredList(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  return listOfRestaurant.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter-container">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchBox}
            onChange={(e) => setSearchBox(e.target.value)}
          />
          <button
            onClick={() => {
              let filteredBox = listOfRestaurant.filter((res) =>
                res.info.name.toLowerCase().includes(searchBox.toLowerCase())
              );
              // includes:-  Yeh check karta hai ki "dom" string "domino's pizza" ke andar exist karti hai ya nahi.
              // "domino's pizza".includes("dom") = true and store in res
              // console.log(filteredBox);
              setFilteredList(filteredBox);
            }}>
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            let filteredRestaurant = listOfRestaurant.filter(
              (restaurant) => restaurant.info.avgRating > 4.5
            );

            setFilteredList(filteredRestaurant);
          }}>
          Top rated restaurant
        </button>
      </div>
      <div className="res-container">
        {filteredList?.map((restaurant) => (
          // breakets ka dhyan rakhna () = isme return krna nahi pdta
          // Par aapko yaad rakhna hai ki agar curly braces ({}) use karte ho, toh return lagana padega.
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
}; // ye

export default Body;

// .toLowerCase() → Case-insensitive search ke liye.
// .includes() → Check karta hai ki substring exist karti hai ya nahi.
// filter() → Sirf matching results ko return karta hai.
