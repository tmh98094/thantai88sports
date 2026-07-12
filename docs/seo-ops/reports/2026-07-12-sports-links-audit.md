# Audit internal link - Thantai88sports

- Site: Thantai88sports
- Mục đích: Tìm cơ hội internal link và kiểm tra disclosure/CTA trước khi publish.
- Thời điểm tạo: 2026-07-12T23:32:48.097Z
- Trạng thái xuất bản: Cần duyệt thủ công trước khi xuất bản

## Guardrails

- Không tự động deploy.
- Không tự động commit/push.
- Không tự động xuất bản nội dung iGaming hoặc betting.
- Chỉ dùng API miễn phí; nếu thiếu key hoặc hết quota thì ghi nhận trong report thay vì dừng hỏng.

## Biến môi trường/API

- Không phát hiện biến môi trường bắt buộc bị thiếu cho lần chạy này.

## Ghi chú compliance

- Nội dung chỉ dành cho độc giả 18+ và phải nhắc người đọc tự đặt giới hạn ngân sách.
- Không dùng các claim như “chắc thắng”, “lợi nhuận đảm bảo”, “không rủi ro” hoặc lời hứa hoàn tiền không có bằng chứng.
- Không bịa giấy phép, RTP, tỷ lệ trả thưởng, khuyến mãi, tốc độ rút tiền, đánh giá người dùng hoặc trạng thái pháp lý.
- Tin tức/thống kê/lich thi đấu cần có nguồn và ngày kiểm tra; nội dung evergreen không nên đổi ngày chỉ để trông mới hơn.
- Cần duyệt thủ công trước khi xuất bản; các script này chỉ tạo report hoặc bản nháp nội bộ.

## Tổng quan link

- Tổng link tìm thấy: 174.
- Internal link: 149.
- External link: 9.
- Link affiliate/CTA phát hiện: 0.

## Kiểm tra body link theo từng bài

- Đạt: argentina-egypt-world-cup-2026-truoc-tran — 3 internal body links
- Đạt: argentina-switzerland-world-cup-2026-ket-qua-3-1 — 5 internal body links
- Đạt: bong-da-viet-nam-xay-nen-tang — 3 internal body links
- Đạt: brazil-norway-world-cup-2026-ket-qua-1-2 — 3 internal body links
- Đạt: cach-chon-nguon-tin-the-thao-dang-tin-cay — 3 internal body links
- Đạt: cach-doc-ban-ket-world-cup-2026-co-trach-nhiem — 5 internal body links
- Đạt: cach-doc-the-tran-bong-da — 3 internal body links
- Đạt: cach-doc-ty-le-cuoc-the-thao — 3 internal body links
- Đạt: cach-theo-doi-chien-thuat-bong-da-quoc-te — 3 internal body links
- Đạt: cach-theo-doi-hai-tran-tu-ket-con-lai-world-cup-2026 — 5 internal body links
- Đạt: cach-theo-doi-tu-ket-world-cup-2026-co-trach-nhiem — 5 internal body links
- Đạt: canada-morocco-world-cup-2026-ket-qua-0-3 — 3 internal body links
- Đạt: champions-league-2026-bang-xep-hang-top-dau — 5 internal body links
- Đạt: colombia-ghana-world-cup-2026-ket-qua-1-0 — 3 internal body links
- Đạt: dau-hieu-hanh-vi-ca-cuoc-rui-ro — 3 internal body links
- Đạt: england-argentina-world-cup-2026-ban-ket-lich-thi-dau — 5 internal body links
- Đạt: france-morocco-world-cup-2026-tu-ket-lich-thi-dau — 5 internal body links
- Đạt: loi-the-san-nha-bong-da-viet-nam — 3 internal body links
- Đạt: mexico-england-world-cup-2026-ket-qua-2-3 — 3 internal body links
- Đạt: nhan-dinh-truoc-tran-can-xem-gi — 3 internal body links
- Đạt: norway-england-world-cup-2026-tu-ket-lich-thi-dau — 5 internal body links
- Đạt: paraguay-france-world-cup-2026-ket-qua-0-1 — 3 internal body links
- Đạt: phan-tich-france-spain-world-cup-2026-ban-ket — 5 internal body links
- Đạt: phan-tich-lich-thi-dau-va-the-luc — 3 internal body links
- Đạt: phan-tich-norway-england-world-cup-2026 — 5 internal body links
- Đạt: portugal-spain-world-cup-2026-ket-qua-0-1 — 3 internal body links
- Đạt: quan-ly-ngan-sach-giai-tri — 4 internal body links
- Đạt: spain-belgium-world-cup-2026-ket-qua-2-1 — 5 internal body links
- Đạt: spain-belgium-world-cup-2026-tu-ket-lich-thi-dau — 5 internal body links
- Đạt: switzerland-colombia-world-cup-2026-cach-doc-lich — 3 internal body links
- Đạt: the-thao-va-thoi-quen-theo-doi — 3 internal body links
- Đạt: thiet-lap-gioi-han-ngan-sach-ca-cuoc — 3 internal body links
- Đạt: tieu-chi-chon-nen-tang-ca-cuoc-the-thao — 3 internal body links
- Đạt: xu-huong-chien-thuat-bong-da-quoc-te — 3 internal body links

## Mẫu link cần kiểm tra

- CONTENT_GUIDE.md → ./docs/IMAGE_ASSETS.md
- CONTENT_GUIDE.md → ./docs/AI_IMAGE_PROMPTS.md
- OWNER_INPUTS.md → ./docs/IMAGE_ASSETS.md
- OWNER_INPUTS.md → ./docs/AI_IMAGE_PROMPTS.md
- README.md → ./CONTENT_GUIDE.md
- README.md → ./docs/IMAGE_ASSETS.md
- README.md → ./docs/AI_IMAGE_PROMPTS.md
- README.md → ./OWNER_INPUTS.md
- app/ca-cuoc-the-thao/page.tsx → https://thantai88.online/
- app/ca-cuoc-the-thao/page.tsx → /choi-co-trach-nhiem
- app/layout.tsx → #noi-dung
- app/not-found.tsx → /

## Việc nên làm

- Mỗi bài mới phải có ít nhất 3 internal links trong body, gồm /ca-cuoc-the-thao và 1–2 bài hoặc chủ đề liên quan.
- CTA trong body nên dẫn về /ca-cuoc-the-thao; nút CTA trực tiếp vẫn dùng /go/platform với rel sponsored/nofollow.
- Không để sports site cạnh tranh trực tiếp với main hub cho cùng một intent tổng quát.
