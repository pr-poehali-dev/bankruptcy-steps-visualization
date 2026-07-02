
INSERT INTO t_p48458750_bankruptcy_steps_vis.site_settings (key, value) VALUES
-- Card: Stages
('card_stages_stat_1_icon', 'Clock'),
('card_stages_stat_1_text', '5 этапов'),
('card_stages_stat_2_icon', 'Timer'),
('card_stages_stat_2_text', '6–12 месяцев'),
('card_stages_tag_1', 'Подача заявления'),
('card_stages_tag_2', 'Суд'),
('card_stages_tag_3', 'Реструктуризация'),
('card_stages_tag_4', 'Реализация'),
('card_stages_tag_5', 'Списание'),
-- Card: Consequences
('card_consequences_stat_1_icon', 'Ban'),
('card_consequences_stat_1_text', '5 ограничений'),
('card_consequences_stat_2_icon', 'ShieldCheck'),
('card_consequences_stat_2_text', 'Жильё сохраняется'),
('card_consequences_tag_1', 'Ограничения'),
('card_consequences_tag_2', 'Кредиты'),
('card_consequences_tag_3', 'Руководство'),
('card_consequences_tag_4', 'Что сохранится'),
('card_consequences_tag_5', 'Сроки'),
-- Card: Payments
('card_payments_stat_1_icon', 'Landmark'),
('card_payments_stat_1_text', 'от 300 ₽'),
('card_payments_stat_2_icon', 'Building2'),
('card_payments_stat_2_text', 'МФЦ — бесплатно'),
('card_payments_tag_1', 'Госпошлина'),
('card_payments_tag_2', 'Управляющий'),
('card_payments_tag_3', 'Публикации'),
('card_payments_tag_4', 'МФЦ бесплатно'),
('card_payments_tag_5', '')
ON CONFLICT (key) DO NOTHING;
