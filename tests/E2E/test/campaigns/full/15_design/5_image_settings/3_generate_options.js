const {AccessPageBO} = require('../../../../selectors/BO/access_page');
const common_scenarios = require('../../../common_scenarios/image_settings');
const {ImageSettings} = require('../../../../selectors/BO/design/image_settings');
const {Menu} = require('../../../../selectors/BO/menu.js');
const {AddProductPage, ProductList} = require('../../../../selectors/BO/add_product_page');
const {productPage} = require('../../../../selectors/FO/product_page');
const {SearchProductPage} = require('../../../../selectors/FO/search_product_page');
const {CheckoutOrderPage} = require('../../../../selectors/FO/order_page');
let promise = Promise.resolve();

scenario('Generate options', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should log in successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  scenario('Access to "Image Settings" page then set "JPEG compression" and "PNG compression" input', client => {
    test('should go to "Design > Image Settings" page', () => client.goToSubtabMenuPage(Menu.Improve.Design.design_menu, Menu.Improve.Design.image_settings_submenu));
    test('should set "Image JPEG compression" input', () => client.waitAndSetValue(ImageSettings.jpeg_compression_input, 100));
    test('should set "Image PNG compression" input', () => client.waitAndSetValue(ImageSettings.png_compression_input, 9));
    test('should click on "Save" button', () => client.waitForExistAndClick(ImageSettings.save_generation_option_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(ImageSettings.bootstrap_panel.replace("%B", "success"), "The settings have been successfully updated."));
  }, 'common_client');
  common_scenarios.regenerateThumbnails();
  //TO DO : Can not check compression quality picture in automated tests
  scenario('Set "Maximum file size of product customization pictures" input', client => {
    test('should set "Maximum file size of product customization pictures" input', () => client.waitAndSetValue(ImageSettings.maximum_file_size, 1000000));
    test('should click on "Save" button', () => client.waitForExistAndClick(ImageSettings.save_generation_option_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(ImageSettings.bootstrap_panel.replace("%B", "success"), "The settings have been successfully updated."));
  }, 'product/check_product');
  common_scenarios.editProduct();
  scenario('Check product in Front Office', client => {
    test('should click on "Preview" button and go to Front Office', () => {
      return promise
        .then(() => client.waitForExistAndClick(AddProductPage.preview_buttons))
        .then(() => client.switchWindow(1))
        .then(() => client.pause(8000));
    });
    test('should click on "Choose file" and upload a picture', () => client.uploadPicture("max_img.JPG", AddProductPage.choose_file_button, 'image'));
    test('should click on "Save customization" button', () => client.waitForExistAndClick(productPage.save_customization_button));
    test('should verify the appearance of the red error', () => client.checkTextValue(ImageSettings.second_danger_panel, "Image is too large (6238 kB). Maximum allowed: 976 kB"));
    test('should close Front office window and go back to Back office', () => {
      return promise
        .then(() => client.closeOtherWindow(1))
        .then(() => client.switchWindow(0));
    });
    test('should go to "Catalog > Products" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
    test('should click on "Reset" button', () => client.waitForExistAndClick(ProductList.reset_button));
  }, 'product/check_product');
  scenario('Access to "Image Settings" page then change generation option parameters then edit product', client => {
    test('should go to "Design > Image Settings" page', () => client.goToSubtabMenuPage(Menu.Improve.Design.design_menu, Menu.Improve.Design.image_settings_submenu));
    test('should set "Maximum file size of product customization pictures" input', () => client.waitAndSetValue(ImageSettings.maximum_file_size, 8388608));
    test('should set "Product picture width" input', () => client.waitAndSetValue(ImageSettings.product_picture_width_input, 40));
    test('should set "Product picture height" input', () => client.waitAndSetValue(ImageSettings.product_picture_height_input, 40));
    test('should click on "Save" button', () => client.waitForExistAndClick(ImageSettings.save_generation_option_button));
    test('should click on "Shop name" then go to the Front Office', () => {
      return promise
        .then(() => client.waitForExistAndClick(AccessPageBO.shopname))
        .then(() => client.switchWindow(1));
    });
    test('should search for the product using search bar', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, "Customizable mug"));
    test('should click on the first product', () => client.waitForExistAndClick(productPage.first_product_all));
    test('should click on "Choose file" and upload a picture', () => client.uploadPicture("image_test.jpg", AddProductPage.choose_file_button, 'image'));
    test('should click on "Save customization" button', () => client.waitForExistAndClick(productPage.save_customization_button));
    test('should click on "Add to cart" button', () => client.waitForExistAndClick(productPage.quick_view_add_to_cart));
    test('should click on "Proceed to checkout" button', () => {
      return promise
        .then(() => client.pause(2000))
        .then(() => client.waitForExistAndClick(CheckoutOrderPage.proceed_to_checkout_modal_button));
    });
    test('should click on "Product customization" button', () => client.waitForExistAndClick(CheckoutOrderPage.last_product_customization_button));
    test('should check the appperence of modal with the uploaded picture', () => {
      return promise
        .then(() => client.pause(2000))
        .then(() => client.waitForExist(CheckoutOrderPage.last_product_modal_image));
    });
    test('should check the size of the picture is 40x40px', () => client.checkImageSize(CheckoutOrderPage.last_product_modal_image, '40', '40'));
    test('should clsoe modal', () => client.waitForExistAndClick(CheckoutOrderPage.last_product_modal_close_button));
    test('should close Front office window and go back to Back office', () => {
      return promise
        .then(() => client.closeOtherWindow(1))
        .then(() => client.switchWindow(0));
    });
  }, 'common_client');
  common_scenarios.changeImageFormat("jpg");
  common_scenarios.regenerateThumbnails();
  //TO DO : CHECK ALL IMAGES ARE WELL DISPLAYED
  common_scenarios.changeImageFormat("png");
  common_scenarios.regenerateThumbnails();
  //TO DO : CHECK ALL IMAGES ARE WELL DISPLAYED
  common_scenarios.changeImageFormat("png_all");
  common_scenarios.regenerateThumbnails();
  //TO DO : CHECK ALL IMAGES ARE WELL DISPLAYED
  scenario('Set "JPEG compression", "PNG compression", "Product picture width" and "Product picture height" inputs', client => {
    test('should set "Image JPEG compression" input', () => client.waitAndSetValue(ImageSettings.jpeg_compression_input, 90));
    test('should set "Image PNG compression" input', () => client.waitAndSetValue(ImageSettings.png_compression_input, 7));
    test('should set "Product picture width" input', () => client.waitAndSetValue(ImageSettings.product_picture_width_input, 64));
    test('should set "Product picture height" input', () => client.waitAndSetValue(ImageSettings.product_picture_height_input, 64));
    test('should click on "Save" button', () => client.waitForExistAndClick(ImageSettings.save_generation_option_button));
  }, 'common_client');
  common_scenarios.changeImageFormat("png");
  common_scenarios.regenerateThumbnails();
  common_scenarios.editProduct("Text");
  scenario('logout successfully from the Back Office', client => {
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);
