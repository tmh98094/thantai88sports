export type InfoSection = { heading: string; paragraphs: string[]; bullets?: string[] };
export type InfoPageContent = { eyebrow: string; title: string; description: string; updated: string; sections: InfoSection[] };

export const infoPages: Record<string, InfoPageContent> = {
  "gioi-thieu": {
    eyebrow: "Về chúng tôi",
    title: "Thể thao dễ hiểu. Nội dung có trách nhiệm.",
    description: "Thantai88sport là kênh nội dung tiếng Việt về cẩm nang thể thao, góc nhìn bóng đá và giải trí trực tuyến dành cho người trưởng thành.",
    updated: "03/07/2026",
    sections: [
      { heading: "Chúng tôi làm gì", paragraphs: ["Thantai88sport giúp độc giả theo dõi những câu chuyện đáng chú ý từ bóng đá Việt Nam, quốc tế và các xu hướng thể thao. Chúng tôi ưu tiên bối cảnh, cách giải thích rõ ràng và trải nghiệm đọc gọn gàng trên mọi thiết bị."] },
      { heading: "Cách nội dung được xây dựng", paragraphs: ["Mỗi bài viết cần có nguồn, thời điểm cập nhật, tác giả và mục đích rõ ràng. Nhận định luôn được trình bày như góc nhìn tham khảo, không phải lời hứa về kết quả."], bullets: ["Tách biệt tin tức, bình luận và nội dung quảng bá.", "Sửa lỗi công khai khi thông tin quan trọng thay đổi.", "Không sử dụng ngôn ngữ bảo đảm thắng hoặc lợi nhuận."] },
      { heading: "Mối quan hệ thương mại", paragraphs: ["Website có thể nhận hoa hồng khi người dùng đủ điều kiện truy cập đối tác qua liên kết giới thiệu. Mối quan hệ này không làm thay đổi nguyên tắc biên tập và không làm tăng chi phí truy cập của người đọc."] },
      { heading: "Đối tượng sử dụng", paragraphs: ["Các nội dung liên quan đến giải trí trực tuyến chỉ dành cho người từ 18 tuổi trở lên. Người dùng cần tự kiểm tra quy định tại nơi sinh sống và luôn đặt giới hạn phù hợp."] },
    ],
  },
  "lien-he": {
    eyebrow: "Kết nối",
    title: "Liên hệ với Thantai88sport",
    description: "Gửi phản hồi biên tập, yêu cầu sửa thông tin hoặc đề xuất hợp tác với đội ngũ Thantai88sport qua biểu mẫu liên hệ.",
    updated: "03/07/2026",
    sections: [
      { heading: "Phản hồi nội dung", paragraphs: ["Nếu phát hiện thông tin chưa chính xác, hãy gửi đường dẫn bài viết, nội dung cần xem lại và nguồn tham khảo. Chúng tôi ưu tiên các yêu cầu sửa lỗi có thể kiểm chứng."] },
      { heading: "Hợp tác", paragraphs: ["Đề xuất thương mại cần nêu rõ đơn vị, mục tiêu và phạm vi hợp tác. Nội dung tài trợ luôn phải được nhận diện rõ và tuân thủ tiêu chuẩn dành cho người trưởng thành."] },
    ],
  },
  "chinh-sach-bien-tap": {
    eyebrow: "Tiêu chuẩn nội dung",
    title: "Chính sách biên tập",
    description: "Nguyên tắc thu thập, kiểm chứng, cập nhật và phân biệt nội dung biên tập với nội dung thương mại trên Thantai88sport.",
    updated: "03/07/2026",
    sections: [
      { heading: "Chính xác và có bối cảnh", paragraphs: ["Chúng tôi cố gắng xác minh thông tin từ nguồn chính thức hoặc nhiều nguồn độc lập đáng tin cậy. Tin chưa được xác nhận phải được ghi rõ trạng thái và không được trình bày như sự thật đã kết luận."] },
      { heading: "Nhận định và dữ liệu", paragraphs: ["Bài nhận định phải nêu các yếu tố được sử dụng, như phong độ, lực lượng và lịch thi đấu. Dữ liệu quá khứ không bảo đảm kết quả tương lai."], bullets: ["Không cam kết tỷ lệ thắng.", "Không tạo cảm giác khẩn cấp giả tạo.", "Không nhắm nội dung iGaming đến người dưới 18 tuổi."] },
      { heading: "Sửa đổi và cập nhật", paragraphs: ["Khi phát hiện sai sót có ảnh hưởng đến ý nghĩa bài viết, chúng tôi cập nhật nội dung và ngày chỉnh sửa. Yêu cầu sửa lỗi có thể được gửi qua trang liên hệ."] },
      { heading: "Nội dung tài trợ", paragraphs: ["Bài viết hoặc vị trí có tài trợ được đánh dấu rõ. Đối tác thương mại không được quyền che giấu rủi ro hoặc thay đổi kết luận biên tập thành tuyên bố không thể kiểm chứng."] },
    ],
  },
  "quyen-rieng-tu": {
    eyebrow: "Dữ liệu cá nhân",
    title: "Chính sách quyền riêng tư",
    description: "Thông tin về loại dữ liệu Thantai88sport có thể xử lý, mục đích sử dụng và lựa chọn của người dùng khi truy cập website.",
    updated: "03/07/2026",
    sections: [
      { heading: "Dữ liệu được thu thập", paragraphs: ["Website có thể xử lý dữ liệu kỹ thuật cơ bản như loại thiết bị, trang đã xem và thời điểm truy cập. Khi bạn gửi biểu mẫu, chúng tôi nhận thông tin bạn chủ động cung cấp như tên, email và nội dung lời nhắn."] },
      { heading: "Mục đích sử dụng", paragraphs: ["Dữ liệu được dùng để vận hành website, trả lời yêu cầu, bảo vệ hệ thống, đo lường hiệu quả nội dung và đáp ứng nghĩa vụ hợp pháp khi áp dụng."] },
      { heading: "Chia sẻ và lưu trữ", paragraphs: ["Chúng tôi chỉ chia sẻ dữ liệu với nhà cung cấp cần thiết để vận hành dịch vụ hoặc khi pháp luật yêu cầu. Thời gian lưu trữ cần phù hợp với mục đích ban đầu và yêu cầu bảo mật."] },
      { heading: "Quyền lựa chọn", paragraphs: ["Bạn có thể yêu cầu xem lại, chỉnh sửa hoặc xóa thông tin đã gửi, trong giới hạn quy định áp dụng, bằng cách sử dụng biểu mẫu liên hệ trên website."] },
    ],
  },
  "dieu-khoan": {
    eyebrow: "Điều kiện sử dụng",
    title: "Điều khoản sử dụng",
    description: "Các điều kiện cơ bản khi truy cập nội dung, sử dụng liên kết bên thứ ba và tương tác với dịch vụ trên Thantai88sport.",
    updated: "03/07/2026",
    sections: [
      { heading: "Chấp nhận điều khoản", paragraphs: ["Khi sử dụng website, bạn đồng ý tuân thủ các điều khoản này và quy định áp dụng tại nơi sinh sống. Nếu không đồng ý, vui lòng ngừng truy cập."] },
      { heading: "Nội dung tham khảo", paragraphs: ["Thông tin thể thao, phân tích và cẩm nang trên website chỉ nhằm mục đích thông tin. Nội dung không phải tư vấn tài chính, pháp lý hoặc cam kết về kết quả."] },
      { heading: "Liên kết bên thứ ba", paragraphs: ["Website có thể dẫn đến nền tảng do bên thứ ba vận hành. Chúng tôi không kiểm soát điều khoản, tính khả dụng hoặc hoạt động xử lý dữ liệu của những website đó. Hãy đọc chính sách của bên thứ ba trước khi sử dụng."] },
      { heading: "Sử dụng hợp lệ", paragraphs: ["Bạn không được phá hoại hệ thống, thu thập dữ liệu trái phép, mạo danh hoặc sử dụng nội dung cho hành vi vi phạm pháp luật. Quyền truy cập có thể bị hạn chế khi phát hiện rủi ro an toàn."] },
    ],
  },
  cookie: {
    eyebrow: "Công nghệ website",
    title: "Chính sách cookie",
    description: "Cách cookie và công nghệ tương tự có thể hỗ trợ chức năng thiết yếu, phân tích hiệu suất và ghi nhớ lựa chọn trên website.",
    updated: "03/07/2026",
    sections: [
      { heading: "Cookie là gì", paragraphs: ["Cookie là tệp dữ liệu nhỏ được lưu trên thiết bị khi bạn truy cập website. Một số cookie cần thiết để trang hoạt động; loại khác có thể dùng cho đo lường sau khi có cơ sở đồng ý phù hợp."] },
      { heading: "Nhóm cookie", paragraphs: ["Website hiện chỉ cần các chức năng kỹ thuật thiết yếu. Nếu công cụ phân tích hoặc đo lường được bổ sung, chính sách và lựa chọn đồng ý sẽ được cập nhật trước khi công cụ đó hoạt động."], bullets: ["Thiết yếu: bảo mật và vận hành cơ bản.", "Tùy chọn: ghi nhớ cài đặt giao diện khi có.", "Phân tích: chỉ kích hoạt sau khi cơ chế đồng ý phù hợp được triển khai."] },
      { heading: "Quản lý lựa chọn", paragraphs: ["Bạn có thể xóa hoặc chặn cookie trong cài đặt trình duyệt. Việc tắt cookie thiết yếu có thể khiến một số chức năng không hoạt động đúng."] },
    ],
  },
  "choi-co-trach-nhiem": {
    eyebrow: "An toàn trước hết",
    title: "Chơi có trách nhiệm",
    description: "Hướng dẫn nhận diện rủi ro, đặt giới hạn và tìm hỗ trợ khi hoạt động giải trí trực tuyến không còn nằm trong tầm kiểm soát.",
    updated: "03/07/2026",
    sections: [
      { heading: "Cá cược không phải nguồn thu nhập", paragraphs: ["Cá cược luôn có nguy cơ thua tiền. Không xem đây là cách kiếm tiền, trả nợ hoặc giải quyết áp lực tài chính. Chỉ sử dụng số tiền có thể chấp nhận mất mà không ảnh hưởng đến chi tiêu thiết yếu."] },
      { heading: "Đặt giới hạn trước", paragraphs: ["Xác định giới hạn tiền và thời gian trước khi bắt đầu. Không nâng giới hạn khi đang phấn khích, căng thẳng hoặc muốn gỡ lại khoản đã thua."], bullets: ["Không vay tiền để tham gia.", "Không chơi khi đang căng thẳng hoặc dùng chất kích thích.", "Duy trì công việc, quan hệ và hoạt động ngoài màn hình."] },
      { heading: "Dấu hiệu cảnh báo", paragraphs: ["Cần dừng lại nếu bạn che giấu chi tiêu, liên tục phá vỡ giới hạn, mất ngủ, bỏ bê trách nhiệm hoặc cảm thấy phải tiếp tục để lấy lại tiền."] },
      { heading: "Tự loại trừ và hỗ trợ", paragraphs: ["Sử dụng công cụ giới hạn hoặc tự loại trừ của nền tảng. Khi cần, hãy nói chuyện với người bạn tin tưởng và tìm dịch vụ hỗ trợ chuyên môn có uy tín tại khu vực của bạn."] },
    ],
  },
  "18-plus": {
    eyebrow: "Giới hạn độ tuổi",
    title: "Nội dung chỉ dành cho người từ 18 tuổi",
    description: "Thantai88sport không cung cấp hoặc quảng bá nội dung iGaming cho trẻ vị thành niên và khuyến khích gia đình sử dụng công cụ bảo vệ phù hợp.",
    updated: "03/07/2026",
    sections: [
      { heading: "Yêu cầu độ tuổi", paragraphs: ["Bạn phải từ 18 tuổi trở lên và đáp ứng độ tuổi hợp pháp tại nơi sinh sống trước khi truy cập liên kết giải trí trực tuyến. Nếu chưa đủ tuổi, hãy rời khỏi các nội dung này."] },
      { heading: "Bảo vệ trẻ vị thành niên", paragraphs: ["Người lớn không nên chia sẻ tài khoản, phương thức thanh toán hoặc thiết bị đã đăng nhập. Có thể dùng công cụ kiểm soát của hệ điều hành, bộ định tuyến và trình duyệt để hạn chế truy cập."] },
      { heading: "Trách nhiệm của người dùng", paragraphs: ["Mỗi người dùng cần kiểm tra luật địa phương và thông tin xác minh tuổi của nền tảng bên thứ ba. Việc hiển thị liên kết không có nghĩa dịch vụ hợp pháp ở mọi khu vực."] },
    ],
  },
};
