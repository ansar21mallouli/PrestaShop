const {Menu} = require('../../selectors/BO/menu.js');
const {ImageSettings} = require('../../selectors/BO/design/image_settings');
const {AddProductPage, ProductList} = require('../../selectors/BO/add_product_page');
let promise = Promise.resolve();

/**** Example of image setting ****
 * let imageSettingData = {
 *  name: 'image type name',
 *  width: 'width of the image',
 *  height: 'height of the image',
 * };
 */

module.exports = {

  regenerateThumbnails() {
    scenario('Regenerate thumbnails images', client => {
      test('should choose the image type from the list', () => client.waitAndSelectByValue(ImageSettings.type_image_select, "all"));
      test('should click on "Regenerate thumbnails" button', () => client.waitForExistAndClick(ImageSettings.regenerate_thumbnails_button));
      test('should cancel the confirmation alert', () => client.alertDismiss());
      test('should verify if we are still  on the "Image Settings" page', () => client.waitForVisible(ImageSettings.image_settings_table));
      test('should click on "Regenerate thumbnails" button', () => client.waitForExistAndClick(ImageSettings.regenerate_thumbnails_button));
      test('should accept the confirmation alert', () => client.alertAccept());
      test('should verify the appearance of the green validation', () => client.checkTextValue(ImageSettings.bootstrap_panel.replace("%B", "success"), "×\nThe thumbnails were successfully regenerated."));
    }, 'common_client');
  },
  changeImageFormat(format) {
    scenario('Change image format then check images in Front office', client => {
      test('should click on "' + format + '" radio button', () => client.scrollWaitForExistAndClick(ImageSettings.image_format_radio_button.replace("%B", format)));
      test('should click on "Save" button', () => client.waitForExistAndClick(ImageSettings.save_generation_option_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(ImageSettings.bootstrap_panel.replace("%B", "success"), "The settings have been successfully updated."));
    }, 'design');
  },
  editProduct(type = "File") {
    scenario('Edit product', client => {
      test('should go to "Catalog > Products" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
      test('should search for product by name', () => client.searchProductByName("Customizable mug"));
      test('should click on "Edit" button', () => client.waitForExistAndClick(ProductList.edit_button));
      test('should click on "Options" tab', () => client.scrollWaitForExistAndClick(AddProductPage.product_options_tab));
      test('should click on "Delete" button to delete "' + type.toUpperCase() + '"', () => client.scrollWaitForExistAndClick(AddProductPage.delete_customized_field_button));
      test('should click on "Yes" to confirm remodal', () => client.waitForExistAndClick(AddProductPage.delete_confirmation_button.replace('%BUTTON', "Yes"), 2000));
      test('should click on "Add a customization field" button', () => client.waitForExistAndClick(AddProductPage.options_add_customization_field_button, 2000));
      test('should set the customization field "Label"', () => client.waitAndSetValue(AddProductPage.options_second_custom_field_label, "personalized text"));
      test('should select the customization field "Type" "' + type.toUpperCase() + '"', () => client.waitAndSelectByVisibleText(AddProductPage.options_second_custom_field_type, type));
      test('should check "Required" field', () => client.waitForExistAndClick(AddProductPage.options_second_custom_field_require));
      test('should close symfony toolbar', () => {
        return promise
          .then(() => client.isVisible(AddProductPage.symfony_toolbar, 3000))
          .then(() => {
            if (global.isVisible) {
              client.waitForExistAndClick(AddProductPage.symfony_toolbar);
            }
          })
      });
      test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_button));
      if (type === "Text") {
        test('should go to "Catalog > Products" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
        test('should click on "Reset" button', () => client.waitForExistAndClick(ProductList.reset_button));
      }
    }, 'product/check_product');
  }
};
