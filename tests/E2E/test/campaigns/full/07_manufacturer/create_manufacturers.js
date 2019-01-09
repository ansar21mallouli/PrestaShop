const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {Brands} = require('../../../selectors/BO/catalogpage/Manufacturers/brands');
const {BrandAddress} = require('../../../selectors/BO/catalogpage/Manufacturers/brands_address');
const {Menu} = require('../../../selectors/BO/menu.js');
const welcomeScenarios = require('../../common_scenarios/welcome');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {SiteMapPageFO} = require('../../../selectors/FO/site_map_page');

scenario('Create "Brand" - "Brand address"', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'manufacturers');
  welcomeScenarios.findAndCloseWelcomeModal();
  scenario('Create a new "Brand"', client => {
    test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
    test('should click on "Add new brand" button', () => client.waitForExistAndClick(Brands.new_brand_button));
    test('should set the "Name" input', () => client.waitAndSetValue(Brands.name_input, 'PrestaShop' + date_time));
    test('should set the "Short Description" input', () => client.setEditorText(Brands.short_description_input, 'short description'));
    test('should set the "Description" input', () => client.setEditorText(Brands.description_input, 'description'));
    test('should upload "Picture" to the brand', () => client.uploadPicture("prestashop.png", Brands.image_input, "logo"));
    test('should set the "Meta title" input', () => client.waitAndSetValue(Brands.meta_title_input, "meta title"));
    test('should set the "Meta description" input', () => client.waitAndSetValue(Brands.meta_description_input, "meta description"));
    test('should set the "Meta keywords" input', () => client.addMetaKeywords(Brands.meta_keywords_input));
    test('should click on "Activate" button', () => client.waitForExistAndClick(Brands.active_button));
    test('should click on "Save" button', () => client.waitForExistAndClick(Brands.save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
  }, 'manufacturers');

  scenario('Check brand in Front Office', client => {
    test('should click on "Shop name" then go to the Front Office', () => {
      return promise
        .then(() => client.waitForExistAndClick(AccessPageBO.shopname))
        .then(() => client.switchWindow(1))
        .then(() => client.changeLanguage());
    });
    test('should click on "Sitemap" link on the footer', () => client.scrollWaitForExistAndClick(AccessPageFO.sitemap));
    test('should click on "Brands" link', () => client.waitForExistAndClick(SiteMapPageFO.brands_link));
  }, 'manufacturers');

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'manufacturers')

}, 'manufacturers', true);
