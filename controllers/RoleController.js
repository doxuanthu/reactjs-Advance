const storeDB = require("../db/store.json");
const usersDB = require("../db/users.json");
const { faker } = require("@faker-js/faker");

const { writeFile } = require("../services");

class RoleController {
  //   All products
  static getAllProducts(categories) {
    return categories.reduce((products, curr) => {
      products = products.concat(curr.products);
      return products;
    }, []);
  }

  // [GET] path: /api/role/user/products
  getProducts(req, res) {
    const _listProducts = RoleController.getAllProducts(storeDB.categories);

    res.json(_listProducts);
  }

  // [GET] path: /api/role/user/brands/:brand
  listProductsByBrand(req, res) {
    const _brand = req.params.brand;
    const _listProducts = RoleController.getAllProducts(storeDB.categories);
    const { id } = storeDB.brands.find((brand) => brand.name === _brand);
    const result = _listProducts.filter((prod) => prod.brand_id === id);

    res.json(result || []);
  }

  // [GET] path: /api/role/user/categories/:category
  listProductsByCategory(req, res) {
    const _category = req.params.category;
    const _listProducts = RoleController.getAllProducts(storeDB.categories);
    const { id } = storeDB.categories.find(
      (category) => category.name === _category
    );
    const result = _listProducts.filter((prod) => prod.category_id === id);

    res.json(result || []);
  }

  // [GET] path: /api/role/user/products/:id
  findProductById(req, res) {
    const _id = req.params.id;
    const _listProducts = RoleController.getAllProducts(storeDB.categories);
    const result = _listProducts.find((prod) => prod.id === _id);

    res.json(result || {});
  }

  // [POST] path: /api/role/staff/new-brand
  addNewBrand(req, res) {
    const payload = req.body;
    const newBrand = {
      id: faker.datatype.uuid(),
      ...payload,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const data = {
      brands: [...storeDB.brands, newBrand],
      categories: storeDB.categories,
    };
    writeFile("db/store.json", data);

    res.json(newBrand);
  }

  // [POST] path: /api/role/staff/new-category
  addNewCategory(req, res) {
    const payload = req.body;
    const newCategory = {
      id: faker.datatype.uuid(),
      ...payload,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const data = {
      brands: storeDB.brands,
      categories: [...storeDB.categories, newCategory],
    };
    writeFile("db/store.json", data);

    res.json(newCategory);
  }

  // [POST] path: /api/role/staff/new-product
  addNewProduct(req, res) {
    const payload = req.body;
    const _product = {
      ...payload,
      id: faker.datatype.uuid(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const _categories = storeDB.categories.map((cate) =>
      cate.id === _product.category_id
        ? { ...cate, products: [...cate.products, _product] }
        : cate
    );

    const data = {
      brands: storeDB.brands,
      categories: _categories,
    };

    writeFile("db/store.json", data);

    res.json(_product);
  }

  // [PATCH] path: /api/role/staff/update-brand/:brand_id
  updateBrandById(req, res) {
    const _id = req.params.id;
    const payload = req.body;

    const newBrands = storeDB.brands.map((brand) =>
      brand.id === _id ? { ...brand, ...payload, updatedAt: Date.now() } : brand
    );
    const data = {
      brands: newBrands,
      categories: storeDB.categories,
    };
    writeFile("db/store.json", data);

    res.json(newBrands.find((brand) => brand.id === _id));
  }

  // [PATCH] path: /api/role/staff/update-category/:category_id
  updateCategoryById(req, res) {
    const _id = req.params.id;
    const payload = req.body;

    const newCategories = storeDB.categories.map((cate) =>
      cate.id === _id ? { ...cate, ...payload, updatedAt: Date.now() } : cate
    );
    const data = {
      brands: storeDB.brands,
      categories: newCategories,
    };
    writeFile("db/store.json", data);

    res.json(newCategories.find((cate) => cate.id === _id));
  }

  // [PATCH] path: /api/role/staff/update-product/:id
  updateProductInfoById(req, res) {
    const _id = req.params.id;
    const payload = req.body;

    let _products = RoleController.getAllProducts(storeDB.categories);
    _products = _products.map((product) =>
      product.id === _id
        ? { ...product, ...payload, updatedAt: Date.now() }
        : product
    );
    const data = {
      brands: storeDB.brands,
      categories: storeDB.categories.map((cate) => ({
        ...cate,
        products: _products.filter((prod) => prod.category_id === cate.id),
      })),
    };
    writeFile("db/store.json", data);

    res.json(_products.find((prod) => prod.id === _id));
  }

  // [DELETE] path: /api/role/staff/delete-brand/:id
  deleteABrand(req, res) {
    const _id = req.params.id;
    const index = storeDB.brands.findIndex((brand) => brand.id === _id);

    storeDB.brands.splice(index, 1);

    const data = {
      brands: storeDB.brands,
      categories: storeDB.categories,
    };
    writeFile("db/store.json", data);

    res.json({});
  }

  // [DELETE] path: /api/role/staff/delete-category/:id
  deleteACategory(req, res) {
    const _id = req.params.id;
    const index = storeDB.categories.findIndex((cate) => cate.id === _id);

    storeDB.categories.splice(index, 1);

    const data = {
      brands: storeDB.brands,
      categories: storeDB.categories,
    };
    writeFile("db/store.json", data);

    res.json({});
  }

  // [DELETE] path: /api/role/staff/delete-product/:id
  deleteAProduct(req, res) {
    const _id = req.params.id;
    let _products = RoleController.getAllProducts(storeDB.categories);
    const index = _products.findIndex((prod) => prod.id === _id);

    _products.splice(index, 1);

    const data = {
      brands: storeDB.brands,
      categories: storeDB.categories.map((cate) => ({
        ...cate,
        products: _products.filter((prod) => prod.category_id === cate.id),
      })),
    };
    writeFile("db/store.json", data);

    res.json({});
  }

  // [PATCH] path: /api/role/admin/update-user/:id
  updateUserInfoById(req, res) {
    const _id = req.params.id;
    const users = usersDB.users.map((user) =>
      user.id === +_id
        ? {
            ...user,
            ...req.body,
            updatedAt: Date.now(),
          }
        : user
    );
    const data = {
      role_group: usersDB.role_group,
      users,
      config: {
        current_user_id: usersDB.users[usersDB.users.length - 1].id,
      },
    };

    writeFile("db/users.json", data);

    res.json(users.find((user) => user.id === +_id));
  }

  // [POST] path: /api/role/admin/new-user/
  addNewUser(req, res) {
    const newUser = {
      ...req.body,
      id: usersDB.config.current_user_id + 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const data = {
      role_group: usersDB.role_group,
      users: [...usersDB.users, newUser],
      config: {
        current_user_id: newUser.id,
      },
    };

    writeFile("db/users.json", data);

    res.json(newUser);
  }

  // [DELETE] path: /api/role/admin/delete-user/:id
  deleteUserById(req, res) {
    const _id = req.params.id;
    const index = usersDB.users.findIndex((user) => user.id === +_id);

    usersDB.users.splice(index, 1);

    const data = {
      brands: usersDB.role_group,
      users: usersDB.users,
      config: {
        current_user_id: usersDB.users[usersDB.users.length - 1].id,
      },
    };
    writeFile("db/users.json", data);

    res.json({});
  }

  // [GET] path: /api/role/admin/users
  getUsers(req, res) {
    res.json(usersDB.users);
  }

  // [GET] path: /api/role/admin/users/:id
  findUserById(req, res) {
    const _id = req.params.id;

    res.json(usersDB.users.find((user) => user.id === +_id));
  }
}

module.exports = new RoleController();
