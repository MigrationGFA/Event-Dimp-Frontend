import React from "react";
import { Heading } from "../../Text";

const FoodAndDrinksPreferences = () => {
  const preferences = [
    { item: "Local Dishes", count: 50 },
    { item: "Appetizers", count: 30 },
    { item: "Alcoholic Drinks", count: 20 },
    { item: "Wines", count: 10 },
    { item: "Main Dishes", count: 40 },
  ];

  return (
    <div className="bg-sec13 shadow rounded-lg p-5 mb-5">
      <Heading level={3} className="text-lg font-semibold mb-4">Food and Drinks Preferences</Heading>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>Items</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {preferences.map((pref, index) => (
            <tr key={index} className="border-b">
              <td className="py-3">{pref.item}</td>
              <td className="py-3">{pref.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodAndDrinksPreferences;