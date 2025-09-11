"use strict";

function createSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const productData = [
      {
        name: "Patek Philippe Luxury Watch",
        description: "A timeless watch, symbol of elegance and precision.",
        total_value_in_cents: 2500000,
        total_shares: 100,
        share_price_in_cents: 25000,
      },
      {
        name: "Hermès Birkin Bag",
        description:
          "A fashion icon and symbol of exclusivity, handmade with the finest materials.",
        total_value_in_cents: 7500000,
        total_shares: 250,
        share_price_in_cents: 30000,
      },
    ];

    const productsToInsert = productData.map((p) => ({
      ...p,
      slug: createSlug(p.name),
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert("Products", productsToInsert);

    const productSlugs = productsToInsert.map((p) => p.slug);

    const products = await queryInterface.sequelize.query(
      "SELECT id, name, total_shares, share_price_in_cents FROM Products WHERE slug IN (:slugs)",
      {
        replacements: { slugs: productSlugs },
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );

    const allShares = [];

    products.forEach((product) => {
      for (let i = 0; i < product.total_shares; i++) {
        allShares.push({
          product_id: product.id,
          price_in_cents: product.share_price_in_cents,
          is_available: true,
          user_id: null,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    });

    await queryInterface.bulkInsert("ProductShares", allShares, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProductShares", null, {});
    await queryInterface.bulkDelete("Products", null, {});
  },
};
