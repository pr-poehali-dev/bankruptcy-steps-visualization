
INSERT INTO t_p48458750_bankruptcy_steps_vis.site_settings (key, value) VALUES
  ('btn_hero_primary', 'Получить консультацию'),
  ('btn_hero_secondary', 'Как это работает'),
  ('btn_header_cta', 'Бесплатная консультация'),
  ('btn_stages_cta', 'Перейти к этапам'),
  ('btn_form_submit', 'Отправить заявку'),
  ('form_field_name_placeholder', 'Иван Иванов'),
  ('form_field_phone_placeholder', '+7 (___) ___-__-__'),
  ('form_field_message_placeholder', 'Сумма долга, количество кредиторов, наличие имущества...'),
  ('form_field_message_label', 'Кратко опишите ситуацию'),
  ('form_success_title', 'Заявка отправлена!'),
  ('form_success_text', 'Адвокат свяжется с вами в течение рабочего дня. Спасибо за обращение в АБ «Правовой статус».'),
  ('form_guarantee_1', 'Ответ в течение рабочего дня'),
  ('form_guarantee_2', 'Адвокатская тайна гарантирована'),
  ('form_guarantee_3', 'Без обязательств и скрытых условий'),
  ('form_privacy_text', 'Нажимая кнопку, вы соглашаетесь с обработкой персональных данных')
ON CONFLICT (key) DO NOTHING;
