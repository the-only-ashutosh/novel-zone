import { Card, CardBody } from "@heroui/react";
import React from "react";

const FilterPage = () => {
  return (
    <div className="flex flex-col mx-[5%] my-6">
      <Card>
        <CardBody className="flex flex-col px-4">
          <h2 className="font-semibold text-lg mb-2">Apply Filter</h2>
          <div className="h-0 w-full border-1 rounded-full" />
          <div className="flex flex-col my-4">
            <div className="flex flex-row sm:flex-col md:flex-col justify-around sm:justify-center">
              <div className="flex items-center mb-2 sm:justify-between">
                <p className="font-semibold">Genre:</p>
                <select className="border-1 rounded-md pl-2 pr-4 py-1 ml-2">
                  <option value="action">Action</option>
                  <option value="adventure">Adventure</option>
                  <option value="sci-fi">Sci-Fi</option>
                </select>
              </div>
              <div className="flex items-center mb-2 sm:justify-between">
                <p className="font-semibold">Category:</p>
                <select className="border-1 rounded-md pl-2 pr-4 py-1 ml-2">
                  <option value="ability-steal">Ability Steal</option>
                  <option value="adventure">Adventure</option>
                  <option value="army">Army</option>
                </select>
              </div>
            </div>
            <div className="flex items-center mb-2">
              <p className="font-semibold">Genres:</p>
              <input
                type="text"
                className="border-1 rounded-md pl-2 pr-4 py-1 w-full mx-4"
              />
            </div>
            <div className="flex items-center mb-2">
              <p className="font-semibold">Categories:</p>
              <input
                type="text"
                className="border-1 rounded-md pl-2 pr-4 py-1 w-full mx-4"
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default FilterPage;
