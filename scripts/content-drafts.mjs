import { buildDraftMarkdown, makeOutputPath, parseCliArgs, printResult, writeSeoOpsFile } from "./seo-ops-lib.mjs";

const { dryRun, date } = parseCliArgs();

const markdown = buildDraftMarkdown({
  siteName: "Thantai88sports",
  topic: "Cách đọc lịch thi đấu để đánh giá thể lực đội bóng",
  angle:
    "Một bài guide evergreen giúp người đọc Việt Nam hiểu lịch thi đấu dày, di chuyển, nghỉ ngơi và xoay tua đội hình ảnh hưởng thế nào đến nhận định trước trận. Không đưa dự đoán chắc thắng.",
  internalLinks: [
    "/ca-cuoc-the-thao",
    "/tin-the-thao/nhan-dinh-truoc-tran-can-xem-gi",
    "/tin-the-thao/phan-tich-lich-thi-dau-va-the-luc",
    "/choi-co-trach-nhiem",
  ],
  generatedAt: date,
});

printResult(await writeSeoOpsFile(makeOutputPath("drafts", "sports-draft-lich-thi-dau-the-luc", date), markdown, { dryRun }));
