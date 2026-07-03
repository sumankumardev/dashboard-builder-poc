interface Props {
  title: string;
  children: React.ReactNode;
}

export default function WidgetCard({ title, children }: Props) {
  return (
    <div className="bg-white border rounded-lg shadow h-full flex flex-col">
      <div className="widget-card-header cursor-move border-b p-3 font-semibold">
        {title}
      </div>

      <div className="flex-1 p-2">{children}</div>
    </div>
  );
}
