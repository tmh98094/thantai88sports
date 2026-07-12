# Sports API cache dry-run/report

- Site: Thantai88sports
- Mục đích: Cập nhật dữ liệu bóng đá miễn phí để hiển thị widget và làm tín hiệu chọn chủ đề bài viết.
- Thời điểm tạo: 2026-07-12T12:49:05.192Z
- Trạng thái xuất bản: Cần duyệt thủ công trước khi xuất bản

## Guardrails

- Không tự động deploy.
- Không tự động commit/push.
- Không tự động xuất bản nội dung iGaming hoặc betting.
- Chỉ dùng API miễn phí; nếu thiếu key hoặc hết quota thì ghi nhận trong report thay vì dừng hỏng.

## Biến môi trường/API

- TheSportsDB: thiếu `THESPORTSDB_KEY`
- ScoreBat: thiếu `SCOREBAT_TOKEN`

## Ghi chú compliance

- Nội dung chỉ dành cho độc giả 18+ và phải nhắc người đọc tự đặt giới hạn ngân sách.
- Không dùng các claim như “chắc thắng”, “lợi nhuận đảm bảo”, “không rủi ro” hoặc lời hứa hoàn tiền không có bằng chứng.
- Không bịa giấy phép, RTP, tỷ lệ trả thưởng, khuyến mãi, tốc độ rút tiền, đánh giá người dùng hoặc trạng thái pháp lý.
- Tin tức/thống kê/lich thi đấu cần có nguồn và ngày kiểm tra; nội dung evergreen không nên đổi ngày chỉ để trông mới hơn.
- Cần duyệt thủ công trước khi xuất bản; các script này chỉ tạo report hoặc bản nháp nội bộ.

## Trạng thái provider

- Có key cho: football-data.org, API-Football.
- Lần chạy này tạo report và cập nhật public widget JSON để website có dữ liệu hiển thị.
- Đã cập nhật widget JSON: public\data\sports-widgets.json và public\data\sports-leagues.json
- Trạng thái widget: football-data.org.

## Rate limit

- football-data.org /competitions/PL/matches?dateFrom=2026-06-28&dateTo=2026-08-02: còn 9 request/phút.
- football-data.org /competitions/PL/standings: còn 9 request/phút.
- football-data.org /competitions/CL/matches?dateFrom=2026-06-28&dateTo=2026-08-02: còn 8 request/phút.
- football-data.org /competitions/CL/standings: còn 7 request/phút.
- football-data.org /competitions/PD/matches?dateFrom=2026-06-28&dateTo=2026-08-02: còn 6 request/phút.
- football-data.org /competitions/PD/standings: còn 5 request/phút.
- football-data.org /competitions/SA/matches?dateFrom=2026-06-28&dateTo=2026-08-02: còn 4 request/phút.
- football-data.org /competitions/SA/standings: còn 3 request/phút.
- football-data.org /competitions/WC/matches?dateFrom=2026-06-28&dateTo=2026-08-02: còn 2 request/phút.
- football-data.org /competitions/WC/standings: còn 1 request/phút.

## Thiết kế cache đề xuất

- football-data.org là nguồn chính cho lịch, kết quả và bảng xếp hạng hiện tại.
- API-Football giữ vai trò dự phòng hoặc dữ liệu lịch sử vì free plan hạn chế season hiện tại và tham số next/last.
- Không hiển thị odds/prediction như lời khuyên đặt cược; chỉ dùng dữ liệu làm tham khảo có nguồn.
