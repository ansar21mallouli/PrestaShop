module.exports = {
  ImageSettings: {
    data_number_span: '//*[@id="form-image_type"]//span[@class="badge"]',
    danger_panel: '//*[@id="content"]/div[contains(@class, "alert-danger")]',
    bootstrap_panel: '//*[@id="content"]/div[@class="bootstrap"]/div[contains(@class, "%B")]',
    sort_icon: '//*[@id="table-image_type"]//span[contains(text(),"%B")]/a[%W]',
    element_image_settings_table: '//*[@id="table-image_type"]//tbody/tr[%ID]/td[%B]',
    search_input: '//*[@id="table-image_type"]//input[@name="%B"]',
    search_select: '//*[@id="table-image_type"]//select[@name="%B"]',
    search_button: '//*[@id="submitFilterButtonimage_type"]',
    reset_button: '//*[@id="table-image_type"]//button[@name="submitResetimage_type"]',
    search_no_results: '//*[@id="table-image_type"]//td[@class="list-empty"]',
    check_remove_icon: '//*[@id="table-image_type"]//tr[%ID]/td[%B]//i[@class="%ICON"]',
    type_image_select: '//*[@id="content"]//select[@name="type"]',
    regenerate_thumbnails_button: '//*[@id="content"]//button[@name="submitRegenerateimage_type"]',
    image_settings_table: '//*[@id="table-image_type"]',
    update_button: '//*[@id="table-image_type"]//a[@title="Edit"]',
    delete_button: '//*[@id="table-image_type"]//a[@class="delete"]',
    width_input: '//*[@id="width"]',
    height_input: '//*[@id="height"]',
    image_type_save_button: '//*[@id="image_type_form_submit_btn"]',
    type_toggle_button: '//*[@id="%B"]/../label[@for="%I"]',
    image_type_cancel_button: '//*[@id="image_type_form_cancel_btn"]',
    option_select: '//*[@id="table-image_type"]//button[@data-toggle="dropdown"]',
    action_group_button: '(//*[@id="form-image_type"]//div[contains(@class, "bulk-actions")]//a)[%ID]',
    bulk_action_select: '//*[@id="bulk_action_menu_image_type"]',
    checkbox_input: '#table-image_type > tbody > tr:nth-child(%B) > td.row-selector.text-center > input',
    text_checkbox_input: '//*[@id="table-image_type"]//tbody//td[contains(text(),"%B")]/../td[1]/input',
    new_image_type_button: '//*[@id="page-header-desc-image_type-new_image_type"]',
    name_image_type_input: '//*[@id="name"]',
    jpeg_compression_input: '//*[@id="conf_id_PS_JPEG_QUALITY"]//input',
    png_compression_input: '//*[@id="conf_id_PS_PNG_QUALITY"]//input',
    save_generation_option_button: '//*[@id="image_type_fieldset_images"]//button',
    maximum_file_size: '//*[@id="conf_id_PS_PRODUCT_PICTURE_MAX_SIZE"]//input',
    second_danger_panel: '//*[@id="notifications"]//article[contains(@class, "alert-danger")]',
    product_picture_width_input: '//*[@id="conf_id_PS_PRODUCT_PICTURE_WIDTH"]//input',
    product_picture_height_input: '//*[@id="conf_id_PS_PRODUCT_PICTURE_HEIGHT"]//input',
    image_format_radio_button: '//*[@id="PS_IMAGE_QUALITY_%B"]'
  }
};
