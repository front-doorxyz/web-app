import React from "react";
import StarRating from "./StarRating";
import { type } from "os";

type Props = {
  title: string;
  content: any[];
  type: string;
};

const Block = (props: Props) => {
  return (
    <div className="bg-primary p-4 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-4">{props.title}</h1>
      <table className="w-full table-auto border-collapse">
        <tbody>
          {props.content.map((item, index) => {
            if (props.type === "star") {
              return (
                <tr key={index}>
                  <StarRating score={item} />
                </tr>
              );
            }
            return (
              <tr key={index}>
                <td className="px-4 py-2 border">{item}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Block;
