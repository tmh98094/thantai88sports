export const categories = [
  {
    slug: "tin-the-thao",
    name: "Theo dõi tin thể thao",
    shortName: "Nguồn tin",
    description: "Kỹ năng chọn nguồn, kiểm chứng và theo dõi thông tin thể thao chủ động, có bối cảnh.",
  },
  {
    slug: "bong-da-viet-nam",
    name: "Bóng đá Việt Nam",
    shortName: "Việt Nam",
    description: "Góc nhìn gần gũi về đội tuyển, giải quốc nội và nhịp chuyển động của bóng đá Việt.",
  },
  {
    slug: "bong-da-quoc-te",
    name: "Bóng đá quốc tế",
    shortName: "Quốc tế",
    description: "Câu chuyện từ các giải đấu lớn, chiến thuật, phong độ và những nhân vật đáng theo dõi.",
  },
  {
    slug: "nhan-dinh",
    name: "Nhận định",
    shortName: "Nhận định",
    description: "Phân tích dữ liệu, bối cảnh và điểm nóng trước trận theo hướng tham khảo có trách nhiệm.",
  },
  {
    slug: "cam-nang",
    name: "Cẩm nang thể thao",
    shortName: "Cẩm nang",
    description: "Kiến thức nền, cách đọc trận đấu và nguyên tắc giải trí trực tuyến an toàn cho người trưởng thành.",
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}
