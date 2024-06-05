import React from "react";
import { Euler, Quaternion, Vector3 } from "three";
import { ScopeItem } from "../models/ScopeItem";
import { Category, CategoryMap } from "../models/Category";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return (
    date
      .toLocaleString("en-US", {
        month: "numeric", // "10"
        day: "numeric", // "26"
        year: "numeric", // "2024"
        hour: "numeric", // "3"
        minute: "2-digit", // "00"
        hour12: true, // use 12-hour time
        timeZoneName: "short", // "P.M." or "A.M." depending on locale; might include timezone
      })
      .replace(",", "")
      // Format AM/PM correctly.
      .replace(/ ([AP]M)$/, " $1.")
      // Correctly format the minute and AM/PM spacing and periods.
      .replace(/:00 /, ":00 ")
      .replace("AM", "A.M.")
      .replace("PM", "P.M.")
  );
}

export function calculatePositionInFront(
  position: Vector3,
  rotation: Euler,
  distance: number
) {
  const quaternion = new Quaternion().setFromEuler(
    new Euler(rotation.x, rotation.y, rotation.z, "YXZ")
  );

  const direction = new Vector3(0, 0, -1);
  direction.applyQuaternion(quaternion);

  return position.clone().add(direction.multiplyScalar(distance));
}

export const transformScopeItems = (scopeItems: ScopeItem[]): CategoryMap[] => {
  const categoryMap: { [key: string]: CategoryMap } = {};

  const getCategoryPath = (category: Category | undefined | null): string[] => {
    const path: string[] = [];
    while (category) {
      path.unshift(category.name);
      category = category.parentCategory;
    }
    return path;
  };

  const addScopeItemToCategory = (
    item: ScopeItem,
    path: string[],
    map: { [key: string]: CategoryMap }
  ) => {
    let currentMap = map;
    path.forEach((categoryName, index) => {
      if (!currentMap[categoryName]) {
        currentMap[categoryName] = {
          name: categoryName,
          subcategories: [],
          scopeItems: [],
        };
      }
      if (index === path.length - 1) {
        currentMap[categoryName].scopeItems.push(item);
      } else {
        if (
          !currentMap[categoryName].subcategories.some(
            (cat) => cat.name === path[index + 1]
          )
        ) {
          currentMap[categoryName].subcategories.push({
            name: path[index + 1],
            subcategories: [],
            scopeItems: [],
          });
        }
        currentMap = currentMap[categoryName].subcategories.reduce(
          (acc, subCat) => {
            acc[subCat.name] = subCat;
            return acc;
          },
          {} as { [key: string]: CategoryMap }
        );
      }
    });
  };

  scopeItems.forEach((item) => {
    const categoryPath = getCategoryPath(item.category);
    addScopeItemToCategory(item, categoryPath, categoryMap);
  });

  return Object.values(categoryMap);
};
