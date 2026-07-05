import { getSportsWidgets } from "@/lib/sports-widgets";

export function SportsWidgets() {
  const widgets = getSportsWidgets();
  const updatedAt = new Date(widgets.generatedAt).toLocaleString("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Ho_Chi_Minh",
  });

  return (
    <section className="sports-widget-panel" aria-label="Dữ liệu thể thao tự động">
      <div className="sports-widget-head">
        <div>
          <span className="eyebrow">Dữ liệu cập nhật</span>
          <h2>Lịch đấu, kết quả & tín hiệu bài viết</h2>
        </div>
        <p>
          Cập nhật: {updatedAt} · Nguồn: {widgets.sourceStatus}
        </p>
      </div>
      <div className="sports-widget-grid">
        {widgets.sections.map((section) => (
          <article key={section.id}>
            <span>{section.title}</span>
            <p>{section.description}</p>
            <ul>
              {section.items.slice(0, 4).map((item) => (
                <li key={`${section.id}-${item.label}-${item.value}`}>
                  <strong>{item.label}</strong>
                  <b>{item.value}</b>
                  <small>{item.note}</small>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
