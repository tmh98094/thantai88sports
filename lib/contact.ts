import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ tên.").max(80),
  email: z.email("Email chưa đúng định dạng.").max(160),
  message: z.string().trim().min(10, "Nội dung cần ít nhất 10 ký tự.").max(2000, "Nội dung tối đa 2.000 ký tự."),
  consent: z.literal(true, { error: "Bạn cần đồng ý với chính sách quyền riêng tư." }),
  website: z.string().max(0, "Yêu cầu không hợp lệ."),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function validateContact(input: unknown) {
  return contactSchema.safeParse(input);
}
