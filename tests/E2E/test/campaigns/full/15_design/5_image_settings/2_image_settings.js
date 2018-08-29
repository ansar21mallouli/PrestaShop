const {AccessPageBO} = require('../../../../selectors/BO/access_page');
const common_scenarios = require('../../../common_scenarios/image_settings');
const {ImageSettings} = require('../../../../selectors/BO/design/image_settings');
const {Menu} = require('../../../../selectors/BO/menu.js');

let firstImageSettingData = {
    name: 'home_default',
    width: '300',
    height: '300'
  },
  secondImageSettingData = {
    name: 'small_default',
    width: '300',
    height: '300'
  },
  thirdImageSettingData = {
    name: 'stores_default',
    width: '300',
    height: '300'
  },
  fourthImageSettingData = {
    name: 'stores_default',
    width: '170',
    height: '115'
  },
  fifthImageSettingData = {
    name: 'large_default',
    width: '800',
    height: '800'
  },
  sixthImageSettingData = {
    name: 'category_default',
    width: '141',
    height: '180'
  };

scenario('Image Settings', () => {

  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should log in successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  scenario('Access to "Image Settings" page then verify the existing of red message', client => {
    test('should go to "Design > Image Settings" page', () => client.goToSubtabMenuPage(Menu.Improve.Design.design_menu, Menu.Improve.Design.image_settings_submenu));
    test('should verify the appearance of the red message', () => client.checkTextValue(ImageSettings.danger_panel, 'By default, all images settings are already installed in your store. Do not delete them, you will need it!'));
    test('should get number of image settings', () => client.getTextInVar(ImageSettings.data_number_span, "number_image_settigns"));
  }, 'common_client');
  common_scenarios.sortImageSettings(ImageSettings.element_image_settings_table.replace('%B', 2), 'ID');
  common_scenarios.sortImageSettings(ImageSettings.element_image_settings_table.replace('%B', 3), 'Name');
  common_scenarios.sortImageSettings(ImageSettings.element_image_settings_table.replace('%B', 4), 'Width');
  common_scenarios.sortImageSettings(ImageSettings.element_image_settings_table.replace('%B', 5), 'Height');
  common_scenarios.sortImageSettings(ImageSettings.element_image_settings_table.replace('%B', 2), 'ID', false);
  common_scenarios.checkImageSettingByInputField(1, "image_typeFilter_id_image_type", 2, "Id");
  common_scenarios.checkImageSettingByInputField(1000, "image_typeFilter_id_image_type", 2, "Id", false);
  common_scenarios.checkImageSettingByInputField("cart_default", "image_typeFilter_name", 3, "Name");
  common_scenarios.checkImageSettingByInputField("setting_name", "image_typeFilter_name", 3, "Name", false);
  common_scenarios.checkImageSettingByInputField("125", "image_typeFilter_width", 4, "Width");
  common_scenarios.checkImageSettingByInputField("1000", "image_typeFilter_width", 4, "Width", false);
  common_scenarios.checkImageSettingByInputField("125", "image_typeFilter_height", 5, "Height");
  common_scenarios.checkImageSettingByInputField("1000", "image_typeFilter_height", 5, "Height", false);
  common_scenarios.checkImageSettingByListField("image_typeFilter_products", 6, "Products");
  common_scenarios.checkImageSettingByListField("image_typeFilter_categories", 7, "Categories");
  common_scenarios.checkImageSettingByListField("image_typeFilter_manufacturers", 8, "Brands");
  common_scenarios.checkImageSettingByListField("image_typeFilter_suppliers", 9, "Suppliers");
  common_scenarios.checkImageSettingByListField("image_typeFilter_stores", 10, "Stores");
  common_scenarios.editSettingsByWidthHeight(firstImageSettingData);
  common_scenarios.regenerateThumbnails();
  common_scenarios.checkImageFO("size", firstImageSettingData);
  common_scenarios.editSettingsByType(secondImageSettingData, "save", "categories_off", "icon-remove");
  common_scenarios.regenerateThumbnails();
  //To do : Verify if the category page is well displayed but not images
  common_scenarios.checkImageFO("page");
  common_scenarios.editSettingsByType(secondImageSettingData, "save", "categories_on", "icon-check");
  common_scenarios.regenerateThumbnails();
  //To do : Verify if the category page is well displayed with images
  common_scenarios.checkImageFO("page", true);
  common_scenarios.editSettingsByType(thirdImageSettingData, "cancel");
  common_scenarios.deleteImageSetting(thirdImageSettingData);
  common_scenarios.regenerateThumbnails();
  //TO DO : Check exception after deleting image format there is a bug in store page
  common_scenarios.checkStoreFO();
  common_scenarios.deleteImageWithBulkAction("category_default", "large_default");
  common_scenarios.regenerateThumbnails();
  //TO DO : Check exception after deleting image format there is a bug in product page
  common_scenarios.checkProductFO();
  common_scenarios.createImageType(true);
  common_scenarios.createImageType(false, fourthImageSettingData, 'off', 'off', 'off', 'off', 'on');
  common_scenarios.createImageType(false, fifthImageSettingData, 'on', 'off', 'on', 'on', 'off');
  common_scenarios.regenerateThumbnails();
  common_scenarios.checkStoreFO(true);
  common_scenarios.checkProductFO(true);
  common_scenarios.createImageType(false, sixthImageSettingData, 'off', 'on', 'off', 'off', 'off');
  scenario('Edit "' + firstImageSettingData.name.toUpperCase() + '" image', client => {
    test('should search for "' + firstImageSettingData.name.toUpperCase() + '" image setting', () => client.searchByValue(ImageSettings.search_input.replace("%B", "image_typeFilter_name"), ImageSettings.search_button, firstImageSettingData.name));
    test('should click on "Edit" action from the dropdown list', () => client.clickOnAction(ImageSettings.update_button));
    test('should set the "Width" input', () => client.waitAndSetValue(ImageSettings.width_input, 250));
    test('should set the "Height" input', () => client.waitAndSetValue(ImageSettings.height_input, 250));
    test('should click on "Save" button', () => client.waitForExistAndClick(ImageSettings.image_type_save_button));
  }, 'design');
  scenario('logout successfully from the Back Office', client => {
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'common_client');

}, 'common_client', true);
