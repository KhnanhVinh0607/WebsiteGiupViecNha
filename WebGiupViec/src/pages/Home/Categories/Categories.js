import React, { useEffect, useState } from "react";
import TopCategoriesList from "./TopCategoriesList/TopCategoriesList";
import ConsumerElectronics from "./ConsumerElectronics/ConsumerElectronics";
import { getAllCategories } from "../../../services/categoryService";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [mouseCategoryId, setMouseCategoryId] = useState(null);
  const [keyboardCategoryId, setKeyboardCategoryId] = useState(null);
  const [headphonesCategoryId, setHeadphonesCategoryId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories(1, 12); // Fetch 12 categories
        const formattedCategories = data.categories.map((category) => ({
          id: category._id,
          title: category.categoryName,
          img: category.images,
        }));

        setCategories(formattedCategories);

        // Find and set the category IDs for specific items
        const mouseCategory = formattedCategories.find(
          (category) => category.title === "Giúp việc"
        );
        if (mouseCategory) {
          setMouseCategoryId(mouseCategory.id);
        }

        const keyboardCategory = formattedCategories.find(
          (category) => category.title === "Vệ sinh thiết bị"
        );
        if (keyboardCategory) {
          setKeyboardCategoryId(keyboardCategory.id);
        }

        const headphonesCategory = formattedCategories.find(
          (category) => category.title === "Đi chợ, mua đồ"
        );
        if (headphonesCategory) {
          setHeadphonesCategoryId(headphonesCategory.id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <section id="categories">
      <div className="container">
        <TopCategoriesList categories={categories} />
        {/* {mouseCategoryId && (
          <ConsumerElectronics
            title={"Giúp việc"}
            categoryId={mouseCategoryId}
          />
        )}
        {keyboardCategoryId && (
          <ConsumerElectronics
            title={"Vệ sinh thiết bị"}
            categoryId={keyboardCategoryId}
          />
        )}
        {headphonesCategoryId && (
          <ConsumerElectronics
            title={"Đi chợ, mua đồ"}
            categoryId={headphonesCategoryId}
          />
        )} */}
      </div>
    </section>
  );
};

export default Categories;
